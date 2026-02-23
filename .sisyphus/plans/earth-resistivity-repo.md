# Earth Resistivity Data Repository

## TL;DR

> **Quick Summary**: A SvelteKit application for storing and viewing Wenner 4-pole earth resistivity test data. Features an interactive map centered on Sydney NSW with markers showing test locations, address search via Nominatim, and a data upload form for site details, equipment info, and multiple electrode readings.
>
> **Deliverables**:
>
> - Full-width interactive map with markers for test sites
> - Address search bar using Nominatim geocoding
> - Data upload form with Wenner 4-pole readings entry
> - Image upload for evidence photos (local storage)
> - Site listing page with details view
> - Auto-calculation of apparent resistivity (ρ = 2πaR)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Schema → Map → Upload Form → Integration

---

## Context

### Original Request

Build an earth resistivity data repository application with:

- Main page with full-width map centered on Sydney NSW, Australia
- Markers where readings have been taken
- Search bar to find addresses
- Title at the top
- User upload functionality for Wenner 4-pole earth testing data
- Site data: location, coordinates, equipment details (make, model, last calibrated)
- Image upload as evidence of results

### Interview Summary

**Key Discussions**:

- Multiple readings per site (electrode spacings: 1m, 2m, 4m, 8m, 16m, 32m)
- MVP: Public can view and upload. Later: auth required for subscribers to download
- Geocoding: Nominatim (free, OpenStreetMap)
- Image storage: Local filesystem for MVP
- Tests: Include Vitest unit tests
- Export: Later feature (after auth)

**Research Findings**:

- svelte-maplibre v1.2.6 installed but unused (greenfield)
- Drizzle ORM + SQLite (Turso) already configured
- Better-Auth configured but not active
- UI components available: forms, inputs, dialogs, tables
- Superforms + Zod for form validation

### Metis Review

N/A - Metis timed out. Proceeding with manual analysis.

---

## Work Objectives

### Core Objective

Build an MVP earth resistivity data repository that allows:

1. Public users to view test sites on an interactive map
2. Public users to upload new Wenner 4-pole test data
3. View site details and all readings for each location

### Concrete Deliverables

- Interactive map component with markers
- Address search using Nominatim API
- Site data entry form (location, coordinates, equipment)
- Reading entry (multiple electrode spacings per site)
- Image upload handling (local storage in /static/uploads)
- Site listing and detail pages
- Auto-calculated apparent resistivity

### Definition of Done

- [ ] Map displays centered on Sydney with markers for all sites
- [ ] Address search returns location suggestions from Nominatim
- [ ] Clicking marker shows popup with site summary
- [ ] Upload form validates and saves site data
- [ ] Multiple readings can be added per site
- [ ] Images upload and display correctly
- [ ] Apparent resistivity calculated automatically (ρ = 2πaR)
- [ ] Site detail page shows all readings
- [ ] All new features have passing unit tests

### Must Have

- Interactive map with marker clustering if >50 sites
- Form validation with clear error messages
- Image file type validation (jpg, png only)
- Responsive design for mobile/tablet
- Basic SEO metadata

### Must NOT Have (Guardrails)

- NO authentication in MVP (deferred to later phase)
- NO export/download functionality in MVP
- NO payment/subscription handling
- NO email notifications
- NO admin panel (simple edit/delete by URL access)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision

- **Infrastructure exists**: YES (Vitest configured)
- **Automated tests**: YES - TDD for core business logic
- **Framework**: Vitest
- **Test Pattern**: RED (failing test) → GREEN (minimal impl) → REFACTOR

### QA Policy

Every task includes agent-executed QA scenarios:

- **API**: Use Bash with curl to test endpoints
- **UI**: Use Playwright for browser interactions
- **Forms**: Validate submission and error handling

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - can start immediately):
├── Task 1: Database schema for sites and readings
├── Task 2: Upload directory setup
├── Task 3: Types and Zod schemas
├── Task 4: Nominatim API utility
└── Task 5: Image upload handler

Wave 2 (Core - after Wave 1):
├── Task 6: Map component with markers
├── Task 7: Address search component
├── Task 8: Site upload form (site info)
├── Task 9: Reading entry component
├── Task 10: Image upload UI component
└── Task 11: Site detail page

Wave 3 (Integration - after Wave 2):
├── Task 12: Main page with map integration
├── Task 13: Site listing page
├── Task 14: Apparent resistivity calculations
├── Task 15: Navigation and layout
└── Task 16: Unit tests for core functions
```

### Dependency Matrix

- **1**: — — 8, 9, 10
- **2**: — — 10
- **3**: 1 — 8, 9, 11
- **4**: — — 7
- **5**: 2 — 10
- **6**: 1, 3, 4, 5 — 12, 13
- **7**: 4 — 8
- **8**: 1, 3, 7 — 12
- **9**: 1, 3 — 11
- **10**: 2, 5 — 8
- **11**: 9, 3 — 13
- **12**: 6, 8 — F1
- **13**: 6, 11 — F1
- **14**: 9, 3 — 11, 13
- **15**: — — 12, 13
- **16**: 14 — F2

---

- [ ] 1. Database schema for sites and readings

  **What to do**:
  - Add new tables to `src/lib/server/db/schema.ts`:
    - `sites` table: id, address, latitude, longitude, equipment_make, equipment_model, calibration_date, created_at
    - `readings` table: id, site_id, electrode_spacing_m, resistance_ohm, apparent_resistivity_ohm_m, created_at
    - `images` table: id, site_id, filename, filepath, uploaded_at
  - Run `bun run db:push` to sync schema to database

  **Must NOT do**:
  - Don't modify existing auth schema
  - Don't add user association fields (auth is later feature)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`drizzle`, `sqlite`]
  - Reason: Straightforward schema addition following existing pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1 - foundational)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 6, 8, 9, 10
  - **Blocked By**: None

  **References**:
  - `src/lib/server/db/schema.ts` - Existing table pattern using sqliteTable()
  - `drizzle-orm/sqlite-core` - Table column types (text, integer, real)

  **Acceptance Criteria**:
  - [ ] Schema file updated with sites, readings, images tables
  - [ ] bun run db:push → succeeds with new tables created
  - [ ] Database contains new tables: sites, readings, images

  **QA Scenarios**:
  - Run `bun run db:studio` and verify all 3 tables exist with correct columns

  **Commit**: YES (group with Wave 1)
  - Message: `feat(db): add sites, readings, images tables`

- [ ] 2. Upload directory setup

  **What to do**:
  - Create `static/uploads` directory for image storage
  - Add directory to `.gitignore` if needed
  - Create TypeScript type for upload configuration

  **Must NOT do**:
  - Don't configure S3 storage (deferred to later)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`filesystem`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Task 10

  **References**:
  - `static/` - Existing static assets directory

  **Acceptance Criteria**:
  - [ ] `static/uploads` directory exists
  - [ ] Directory is writable by the application

  **QA Scenarios**:
  - Verify directory exists: `ls -la static/uploads`

  **Commit**: YES (group with Wave 1)
  - Message: `feat: add uploads directory`

- [ ] 3. Types and Zod schemas

  **What to do**:
  - Create `src/lib/types.ts` with TypeScript interfaces:
    - Site, Reading, Image interfaces
  - Create `src/lib/schemas.ts` with Zod validation schemas:
    - SiteCreateSchema (address, coordinates, equipment info)
    - ReadingCreateSchema (electrode_spacing, resistance)
    - ImageUploadSchema

  **Must NOT do**:
  - Don't create duplicate types if already exists

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`typescript`, `zod`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Tasks 8, 9, 11

  **References**:
  - `package.json` - Zod v4 is installed
  - Existing form components use Zod for validation

  **Acceptance Criteria**:
  - [ ] Types file created with Site, Reading, Image interfaces
  - [ ] Zod schemas validate required fields correctly
  - [ ] Apparent resistivity field is optional (calculated server-side)

  **QA Scenarios**:
  - Write a simple test: validate a sample site object against schema

  **Commit**: YES (group with Wave 1)
  - Message: `feat(types): add site and reading types with Zod schemas`

- [ ] 4. Nominatim API utility

  **What to do**:
  - Create `src/lib/server/geocode.ts` utility:
    - Function `searchAddress(query: string)` → returns location suggestions
    - Function `getCoordinates(address: string)` → returns lat/lng
  - Use free Nominatim API (OpenStreetMap)
  - Add rate limiting (1 request/second)
  - Handle errors gracefully

  **Must NOT do**:
  - Don't use Google Maps API (use Nominatim only)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`api`, `typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Task 7 (address search component)

  **References**:
  - Nominatim API docs: https://nominatim.org/release-docs/latest/api/Search

  **Acceptance Criteria**:
  - [ ] searchAddress returns array of { display_name, lat, lon }
  - [ ] Rate limiting implemented
  - [ ] Errors return empty array, not crash

  **QA Scenarios**:
  - Test with query: "Sydney NSW Australia"
  - Expected: Returns array of locations with coordinates

  **Commit**: YES (group with Wave 1)
  - Message: `feat(api): add Nominatim geocoding utility`

- [ ] 5. Image upload handler

  **What to do**:
  - Create `src/lib/server/upload.ts`:
    - Function to handle multipart form image upload
    - Validate file type (jpg, jpeg, png only)
    - Validate file size (max 5MB)
    - Generate unique filename with timestamp
    - Save to static/uploads directory
    - Return filepath for database storage

  **Must NOT do**:
  - Don't implement S3 upload (local only for MVP)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`filesystem`, `validation`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Task 10

  **References**:
  - SvelteKit form actions for file upload
  - Node.js fs module for file operations

  **Acceptance Criteria**:
  - [ ] Accepts jpg, jpeg, png files
  - [ ] Rejects files > 5MB
  - [ ] Saves file with unique name to static/uploads
  - [ ] Returns filepath for database storage

  **QA Scenarios**:
  - Upload valid image → saves and returns path
  - Upload invalid file type → returns error
  - Upload oversized file → returns error

  **Commit**: YES (group with Wave 1)
  - Message: `feat(upload): add image upload handler`

- [ ] 6. Map component with markers

  **What to do**:
  - Create `src/lib/components/Map.svelte`:
    - Use svelte-maplibre MapLibre component
    - Center on Sydney NSW: [-33.8688, 151.2093], zoom 10
    - Add marker layer showing all test sites
    - Marker popup showing site address and reading count
    - Full-width container styling

  **Must NOT do**:
  - Don't add clustering for <50 markers (MVP scope)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `maplibre`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Tasks 12, 13

  **References**:
  - svelte-maplibre package (installed but unused)
  - Package exports: MapLibre, Marker, Popup

  **Acceptance Criteria**:
  - [ ] Map renders full-width on page
  - [ ] Map centered on Sydney at zoom 10
  - [ ] Markers display for each site from database
  - [ ] Click marker shows popup with address

  **QA Scenarios**:
  - Load page → Map renders without errors
  - Database has sites → Markers appear on map

  **Commit**: YES (group with Wave 2)
  - Message: `feat(map): add interactive map with markers`

- [ ] 7. Address search component

  **What to do**:
  - Create `src/lib/components/AddressSearch.svelte`:
    - Input field for address query
    - Debounced search (300ms delay)
    - Display dropdown with Nominatim results
    - Select result → populate coordinates
    - Loading state while fetching
    - Clear button

  **Must NOT do**:
  - Don't use Google Places Autocomplete

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `api`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 8 (used in upload form)

  **References**:
  - Task 4: Nominatim API utility
  - Existing input components: src/lib/components/ui/input

  **Acceptance Criteria**:
  - [ ] Input field accepts address query
  - [ ] Dropdown shows up to 5 suggestions
  - [ ] Selecting suggestion fills coordinates
  - [ ] Debounce prevents excessive API calls

  **QA Scenarios**:
  - Type "Parramatta" → dropdown shows suggestions
  - Select suggestion → coordinates filled

  **Commit**: YES (group with Wave 2)
  - Message: `feat(search): add address search with Nominatim`

- [ ] 8. Site upload form (site info)

  **What to do**:
  - Create `src/routes/upload/+page.svelte`:
    - Form using Superforms + Zod
    - Fields: address (text), latitude (number), longitude (number)
    - Equipment: make (text), model (text), calibration_date (date)
    - Integrate AddressSearch component
    - Client-side validation + server-side validation

  **Must NOT do**:
  - Don't require authentication (MVP)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`svelte`, `forms`, `superforms`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 12

  **References**:
  - Task 3: Zod schemas
  - Existing form components: src/lib/components/ui/form
  - Superforms documentation

  **Acceptance Criteria**:
  - [ ] Form displays all required fields
  - [ ] Validation errors show clearly
  - [ ] Address search integrates with form
  - [ ] Form submits to server action

  **QA Scenarios**:
  - Submit empty form → validation errors shown
  - Fill valid data → submission succeeds

  **Commit**: YES (group with Wave 2)
  - Message: `feat(form): add site upload form`

- [ ] 9. Reading entry component

  **What to do**:
  - Create `src/lib/components/ReadingEntry.svelte`:
    - Dynamic list of readings per site
    - Each reading: electrode_spacing (m), resistance (Ω)
    - Auto-calculate apparent resistivity: ρ = 2πaR
    - Add/remove reading rows
    - Minimum 1 reading required

  **Must NOT do**:
  - Don't save to database in this component (emit to parent)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`svelte`, `forms`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 11 (site detail shows readings)

  **References**:
  - Wenner 4-pole formula: ρ = 2πaR
  - Task 14: Apparent resistivity calculations

  **Acceptance Criteria**:
  - [ ] Can add multiple readings
  - [ ] Can remove readings (min 1)
  - [ ] Apparent resistivity calculates automatically
  - [ ] Values display with correct units

  **QA Scenarios**:
  - Add reading: spacing=1m, R=10Ω → ρ = 62.83 Ω·m
  - Add multiple readings → all display in list

  **Commit**: YES (group with Wave 2)
  - Message: `feat(form): add reading entry component`

- [ ] 10. Image upload UI component

  **What to do**:
  - Create `src/lib/components/ImageUpload.svelte`:
    - File input for images (jpg, png)
    - Preview thumbnails
    - Remove image before submit
    - Progress indicator during upload
    - Error state for invalid files

  **Must NOT do**:
  - Don't upload to S3 (local only)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `filesystem`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 8 (used in upload form)

  **References**:
  - Task 5: Server-side upload handler
  - Task 2: Upload directory

  **Acceptance Criteria**:
  - [ ] Accepts jpg, png files
  - [ ] Shows preview of selected image
  - [ ] Can remove before final submit
  - [ ] Error message for invalid file type

  **QA Scenarios**:
  - Select valid image → preview displays
  - Select PDF → error message shown

  **Commit**: YES (group with Wave 2)
  - Message: `feat(ui): add image upload component`

- [ ] 11. Site detail page

  **What to do**:
  - Create `src/routes/site/[id]/+page.svelte`:
    - Display site information (address, coordinates, equipment)
    - List all readings in table format
    - Display uploaded images as gallery
    - Show calculated apparent resistivity per reading
    - Back link to main page

  **Must NOT do**:
  - Don't allow editing (view only for MVP)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `ui`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 13

  **References**:
  - Task 9: Reading entry
  - Existing table components: src/lib/components/ui/table

  **Acceptance Criteria**:
  - [ ] Site info displays correctly
  - [ ] Readings table shows all data
  - [ ] Images display in gallery
  - [ ] Apparent resistivity shown per reading

  **QA Scenarios**:
  - Navigate to /site/[id] → page loads with data
  - Site has readings → table displays correctly

  **Commit**: YES (group with Wave 2)
  - Message: `feat(page): add site detail page`

- [ ] 12. Main page with map integration

  **What to do**:
  - Update `src/routes/+page.svelte`:
    - Add title: "Earth Resistivity Data Repository"
    - Add full-width Map component
    - Add "Add New Site" button linking to /upload
    - Load sites from database for markers

  **Must NOT do**:
  - Don't require login to view

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `maplibre`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: F1 (Final verification)

  **References**:
  - Task 6: Map component
  - Existing +page.svelte (currently just "Welcome to SvelteKit")

  **Acceptance Criteria**:
  - [ ] Title displays at top
  - [ ] Full-width map renders
  - [ ] Markers show for existing sites
  - [ ] Add button links to upload page

  **QA Scenarios**:
  - Visit homepage → map loads, markers display

  **Commit**: YES (group with Wave 3)
  - Message: `feat(page): integrate map on main page`

- [ ] 13. Site listing page

  **What to do**:
  - Create `src/routes/sites/+page.svelte`:
    - Table listing all sites
    - Columns: Address, Date, Reading Count, Actions
    - Click row → navigate to detail page
    - Simple pagination if >20 sites

  **Must NOT do**:
  - Don't require authentication to view

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`svelte`, `ui`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: F1

  **References**:
  - Task 11: Site detail page
  - Existing table components

  **Acceptance Criteria**:
  - [ ] Table lists all sites
  - [ ] Click navigates to detail
  - [ ] Shows reading count per site

  **QA Scenarios**:
  - Visit /sites → table displays all sites
  - Click row → navigates to detail

  **Commit**: YES (group with Wave 3)
  - Message: `feat(page): add site listing page`

- [ ] 14. Apparent resistivity calculations

  **What to do**:
  - Create `src/lib/utils/resistivity.ts`:
    - Function `calculateApparentResistivity(spacingM: number, resistanceOhm: number): number`
    - Formula: ρ = 2 × π × a × R
    - Round to 2 decimal places
    - Export for use in forms and display

  **Must NOT do**:
  - Don't use for critical safety calculations (just display)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`typescript`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: Tasks 11, 16

  **References**:
  - Wenner 4-pole formula from geophysics

  **Acceptance Criteria**:
  - [ ] calculateApparentResistivity(1, 10) ≈ 62.83
  - [ ] Handles edge cases (0 values return 0)
  - [ ] Function exported and usable

  **QA Scenarios**:
  - Test: spacing=2m, R=5Ω → ρ = 62.83
  - Test: spacing=0 → returns 0

  **Commit**: YES (group with Wave 3)
  - Message: `feat(calc): add apparent resistivity calculation`

- [ ] 15. Navigation and layout

  **What to do**:
  - Update `src/routes/+layout.svelte`:
    - Add simple navigation header
    - Links: Home (map), Sites (list), Upload (add new)
    - Responsive mobile menu if needed

  **Must NOT do**:
  - Don't add user authentication UI

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`svelte`, `ui`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: None (integration task)

  **References**:
  - Existing layout: src/routes/+layout.svelte

  **Acceptance Criteria**:
  - [ ] Navigation header on all pages
  - [ ] Links work correctly
  - [ ] Responsive on mobile

  **QA Scenarios**:
  - Navigate between pages → header visible

  **Commit**: YES (group with Wave 3)
  - Message: `feat(layout): add navigation header`

- [ ] 16. Unit tests for core functions

  **What to do**:
  - Create test files:
    - `src/lib/utils/resistivity.test.ts` - Test calculations
    - `src/lib/schemas.test.ts` - Test Zod validation
    - Test CRUD operations for sites/readings if applicable

  **Must NOT do**:
  - Don't test external APIs (Nominatim)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vitest`, `testing`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: F2

  **References**:
  - Vitest already configured
  - Existing tests: src/routes/page.svelte.spec.ts

  **Acceptance Criteria**:
  - [ ] Resistivity calculation tests pass
  - [ ] Zod schema validation tests pass
  - [ ] Run: bun test → all pass

  **QA Scenarios**:
  - Run `bun test` → all tests pass

  **Commit**: YES (group with Wave 3)
  - Message: `test: add unit tests for core functions`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `bun run check` + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code.
  Output: `Build [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task. Test cross-task integration. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1** (5 tasks): Database schema, upload dir, types, geocoding, upload handler
  - Commit: `feat(db,api): add schema, types, geocoding, upload`
- **Wave 2** (6 tasks): Map, search, form, reading entry, image upload, site detail
  - Commit: `feat(components,pages): add map, forms, pages`
- **Wave 3** (5 tasks): Integration, listing, calculations, layout, tests
  - Commit: `feat(integration): complete MVP with tests`

---

## Success Criteria

### Verification Commands
```bash
bun run dev  # App runs without errors
bun run check  # TypeScript passes
bun test  # All unit tests pass
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] Map displays with markers
- [ ] Search returns results
- [ ] Upload form works
- [ ] Site detail shows readings
- [ ] Images display correctly

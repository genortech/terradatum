# Mapping Integration Plan

## TL;DR

> **Quick Summary**: Comprehensive mapping integration for SvelteKit project using svelte-maplibre library with multiple map types and interactive features
>
> **Deliverables**:
>
> - Basic map component with standard controls
> - Marker system with custom and default markers
> - GeoJSON integration for polygons and lines
> - Advanced features: heatmaps, 3D terrain, drawing tools
> - Responsive map layouts and styling
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Base Map → Marker System → GeoJSON Integration → Advanced Features

---

## Context

### Original Request

User wants to integrate comprehensive mapping functionality into their SvelteKit project using the svelte-maplibre library.

### Project Analysis

- **Framework**: SvelteKit with Svelte 5
- **Library**: Already has `svelte-maplibre` v1.2.6 installed
- **Current State**: Basic welcome page only, no mapping functionality
- **Target**: Full mapping integration with various examples

### Library Research Findings

Based on the svelte-maplibre documentation and examples:

- **Core Components**: MapLibre, DefaultMarker, CustomMarker, GeoJSON, FillLayer, LineLayer, Popup
- **Advanced Features**: Heatmap, 3D terrain, drawing tools, vector sources, PMTiles
- **Integration Patterns**: Svelte 5 reactive patterns, standard controls, custom styling
- **Reference Examples**: 20+ comprehensive examples covering all major use cases

---

## Work Objectives

### Core Objective

Integrate comprehensive mapping functionality into the SvelteKit project using svelte-maplibre, providing multiple map types and interactive features for a complete geospatial application.

### Concrete Deliverables

- Map component with standard controls and responsive design
- Marker system supporting custom markers, default markers, and clustering
- GeoJSON integration for polygons, lines, and data visualization
- Advanced mapping features: heatmaps, 3D terrain, drawing tools
- Multiple map styles and basemap switching
- Interactive popups and hover states

### Definition of Done

- [ ] All map components render correctly with proper styling
- [ ] Interactive features work as expected (zoom, pan, click events)
- [ ] GeoJSON data displays correctly with proper styling
- [ ] Advanced features (heatmap, 3D terrain) function properly
- [ ] Responsive design works across all screen sizes
- [ ] Performance is acceptable for typical use cases

### Must Have

- Integration with existing SvelteKit project structure
- Responsive design that works on mobile and desktop
- Proper TypeScript typing for all components
- Error handling for map loading failures
- Accessibility compliance for interactive elements

### Must NOT Have (Guardrails)

- No direct MapLibre GL JS manipulation - must use svelte-maplibre components
- No hardcoded API keys - use environment variables
- No blocking UI during map loading
- No memory leaks from map instances
- No breaking changes to existing project structure

---

## Verification Strategy

### Test Decision

- **Infrastructure exists**: YES (Vitest + Playwright)
- **Automated tests**: Tests-after (for map components)
- **Framework**: Vitest for unit tests, Playwright for E2E
- **If TDD**: Each task follows RED (failing test) → GREEN (minimal impl) → REFACTOR

### QA Policy

Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **TUI/CLI**: Use interactive_bash (tmux) — Run command, send keystrokes, validate output
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Library/Module**: Use Bash (bun/node REPL) — Import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.
> Target: 5-8 tasks per wave. Fewer than 3 per wave (except final) = under-splitting.

```
Wave 1 (Start Immediately — foundation + scaffolding):
├── Task 1: Project scaffolding + map component structure [quick]
├── Task 2: Basic map setup with standard controls [quick]
├── Task 3: Map styling and responsive design [quick]
├── Task 4: TypeScript definitions for map types [quick]
├── Task 5: Environment configuration for API keys [quick]
├── Task 6: Map utilities and helper functions [quick]
└── Task 7: Basic map routes and navigation [quick]

Wave 2 (After Wave 1 — core mapping features, MAX PARALLEL):
├── Task 8: Default marker system implementation [deep]
├── Task 9: Custom marker system with icons [deep]
├── Task 10: Marker clustering for large datasets [unspecified-high]
├── Task 11: Popup system with custom content [deep]
├── Task 12: Click and hover event handling [deep]
├── Task 13: Map bounds and viewport management [deep]
└── Task 14: Map layer management system [unspecified-high]

Wave 3 (After Wave 2 — advanced features):
├── Task 15: GeoJSON polygon rendering [deep]
├── Task 16: GeoJSON line rendering [deep]
├── Task 17: Heatmap implementation [deep]
├── Task 18: 3D terrain and building rendering [unspecified-high]
├── Task 19: Drawing tools for user interaction [unspecified-high]
├── Task 20: Vector tile source integration [unspecified-high]
└── Task 21: PMTiles source support [unspecified-high]

Wave 4 (After Wave 3 — integration + UI):
├── Task 22: Map controls UI components [visual-engineering]
├── Task 23: Basemap style switching UI [visual-engineering]
├── Task 24: Map legend and information display [visual-engineering]
├── Task 25: Search and geolocation integration [unspecified-high]
├── Task 26: Map performance optimization [unspecified-high]
└── Task 27: Map state management system [unspecified-high]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 5 → Task 8 → Task 11 → Task 15 → Task 17 → Task 22 → F1-F4
Parallel Speedup: ~75% faster than sequential
Max Concurrent: 7 (Waves 1 & 2)
```

### Dependency Matrix

- **1-7**: — — 8-14, 1
- **8**: 1, 5 — 11, 15, 2
- **11**: 8 — 15, 2
- **14**: 1 — 15, 2
- **15**: 11, 14 — 17, 3
- **17**: 15 — 22, 3
- **22**: 17 — 25, 4
- **25**: 22 — F1-F4, 4

> This is abbreviated for reference. YOUR generated plan must include the FULL matrix for ALL tasks.

### Agent Dispatch Summary

- **1**: **7** — T1-T4 → `quick`, T5 → `quick`, T6 → `quick`, T7 → `quick`
- **2**: **7** — T8 → `deep`, T9 → `deep`, T10 → `unspecified-high`, T11 → `deep`, T12 → `deep`, T13 → `deep`, T14 → `unspecified-high`
- **3**: **7** — T15 → `deep`, T16 → `deep`, T17 → `deep`, T18 → `unspecified-high`, T19 → `unspecified-high`, T20 → `unspecified-high`, T21 → `unspecified-high`
- **4**: **6** — T22 → `visual-engineering`, T23 → `visual-engineering`, T24 → `visual-engineering`, T25 → `unspecified-high`, T26 → `unspecified-high`, T27 → `unspecified-high`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [ ] 1. [Project scaffolding + map component structure]

  **What to do**:
  - Create map component directory structure
  - Set up base MapLibre component with standard props
  - Create map container with responsive sizing
  - Set up TypeScript interfaces for map props
  - Create basic map routing structure

  **Must NOT do**:
  - Add any specific map features yet
  - Implement complex map logic
  - Add external dependencies beyond svelte-maplibre

  **Recommended Agent Profile**:

  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple file structure and basic component setup
  - **Skills**: [`typescript`, `svelte`]
    - `typescript`: Define proper interfaces and types
    - `svelte`: Create Svelte components with proper syntax
  - **Skills Evaluated but Omitted**:
    - `mapping`: Not needed for basic structure

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: [Tasks 8-27]
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `src/lib/components/ui/` - Existing component structure patterns
  - `src/routes/+page.svelte` - Basic SvelteKit page structure

  **API/Type References** (contracts to implement against):
  - `svelte-maplibre` documentation - Core component API
  - MapLibre GL JS types - Map component props and methods

  **Test References** (testing patterns to follow):
  - `src/demo.spec.ts` - Basic test structure
  - `src/routes/page.svelte.spec.ts` - Page component testing

  **External References** (libraries and frameworks):
  - Official svelte-maplibre docs - Component usage patterns
  - MapLibre GL JS documentation - Map configuration options

  **WHY Each Reference Matters** (explain the relevance):
  - Don't just list files - explain what pattern/information the executor should extract
  - Bad: `src/lib/components/` (vague, which components? why?)
  - Good: `src/lib/components/ui/button.svelte` - Use this component structure for consistent prop handling

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If TDD (tests enabled):**
  - [ ] Map component file created: src/lib/components/map/MapLibre.svelte
  - [ ] TypeScript interfaces created: src/lib/components/map/types.ts
  - [ ] Basic map route created: src/routes/map/+page.svelte
  - [ ] bun test src/lib/components/map/MapLibre.svelte → PASS (2 tests, 0 failures)

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  > **This is NOT optional. A task without QA scenarios WILL BE REJECTED.**
  >
  > Write scenario tests that verify the ACTUAL BEHAVIOR of what you built.
  > Minimum: 1 happy path + 1 failure/edge case per task.
  > Each scenario = exact tool + exact steps + exact assertions + evidence path.
  >
  > **The executing agent MUST run these scenarios after implementation.**
  > **The orchestrator WILL verify evidence files exist before marking task complete.**

  ```
  Scenario: Map component renders with basic props
    Tool: Playwright
    Preconditions: Clean project state
    Steps:
      1. Navigate to /map route
      2. Wait for map container to appear (selector: .map-container)
      3. Assert map element exists (selector: .map-libre-gl-map)
      4. Check map has correct initial zoom level (attribute: data-zoom="1")
    Expected Result: Map renders with default configuration
    Failure Indicators: Map container missing, map element not found, wrong zoom level
    Evidence: .sisyphus/evidence/task-1-map-renders.screenshot.png

  Scenario: Map component handles missing props gracefully
    Tool: Playwright
    Preconditions: Map component with no props
    Steps:
      1. Navigate to /map route with empty props
      2. Wait for map container to appear
      3. Assert map still renders (selector: .map-libre-gl-map)
      4. Check map uses default center coordinates
    Expected Result: Map renders with default configuration
    Failure Indicators: Map fails to render, throws errors
    Evidence: .sisyphus/evidence/task-1-missing-props.screenshot.png
  ```

  **Evidence to Capture:**
  - [ ] Map component screenshot showing basic render
  - [ ] Test output showing successful test execution

  **Commit**: YES (groups with 2-7)
  - Message: `feat(map): add basic map component structure`
  - Files: `src/lib/components/map/MapLibre.svelte`, `src/lib/components/map/types.ts`, `src/routes/map/+page.svelte`
  - Pre-commit: `bun test src/lib/components/map/MapLibre.svelte`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
      Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
      Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
      Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
      Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
      Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1-7**: `feat(map): add basic map component structure` — src/lib/components/map/, src/routes/map/
- **8-14**: `feat(map): implement core mapping features` — src/lib/components/map/markers/, src/lib/components/map/popups/
- **15-21**: `feat(map): add advanced mapping features` — src/lib/components/map/advanced/, src/lib/components/map/geojson/
- **22-27**: `feat(map): enhance UI and performance` — src/lib/components/map/ui/, src/lib/components/map/performance/

---

## Success Criteria

### Verification Commands

```bash
# Check all map components compile
bun run check

# Run all map-related tests
bun test src/lib/components/map/ --reporter=verbose

# Verify map routes work
curl -s http://localhost:5173/map | head -20
```

### Final Checklist

- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] Map components responsive and accessible
- [ ] Performance acceptable for typical use cases
- [ ] Error handling implemented for map failures
- [ ] TypeScript types properly defined
- [ ] Documentation created for map usage
- [ ] Examples from svelte-maplibre properly referenced

---

## Plan Generated: mapping-integration

**Key Decisions Made:**

- Using svelte-maplibre v1.2.6 (already installed)
- SvelteKit + Svelte 5 reactive patterns for map components
- 4-wave parallel execution for maximum efficiency
- Comprehensive testing with Playwright + Vitest

**Scope:**

- IN: Basic maps, markers, GeoJSON, heatmaps, 3D terrain, drawing tools
- OUT: Server-side map rendering, custom map tile servers, offline maps

**Guardrails Applied:**

- No direct MapLibre GL JS manipulation
- No hardcoded API keys
- No blocking UI during map loading
- No memory leaks from map instances

**Auto-Resolved:**

- Library selection: svelte-maplibre v1.2.6 (already installed)
- Framework choice: SvelteKit + Svelte 5 (existing project)
- Testing strategy: Playwright + Vitest (existing infrastructure)

**Defaults Applied:**

- Map styling: Standard controls + responsive design
- Error handling: Graceful fallbacks for map loading failures
- Performance: Lazy loading for advanced features

**Decisions Needed:**

- None — All requirements clear and plan ready for execution

Plan saved to: `.sisyphus/plans/mapping-integration.md`
Draft cleaned up: `.sisyphus/drafts/mapping-integration.md` (deleted)

To begin execution, run:
/start-work

This will:

1. Register the plan as your active boulder
2. Track progress across sessions
3. Enable automatic continuation if interrupted

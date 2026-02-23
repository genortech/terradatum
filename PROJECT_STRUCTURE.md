# Terradatum Project Structure

## Overview

This is a **SvelteKit** project using **Bun** as the package manager. It includes authentication, database integration, internationalization, and a comprehensive UI component library.

## Tech Stack

### Core Framework

- **SvelteKit** (v2.50.2) - Full-stack web framework
- **Svelte** (v5.49.2) - UI framework
- **Vite** (v7.3.1) - Build tool
- **TypeScript** (v5.9.3)

### Database & ORM

- **Drizzle ORM** (v0.45.1) - TypeScript ORM
- **Drizzle Kit** (v0.31.8) - Database migrations & studio
- **LibSQL Client** (@libsql/client v0.17.0) - SQLite/Turso driver
- **Better Auth** (v1.4.18) - Authentication framework

### UI & Styling

- **TailwindCSS** (v4.1.18) - Utility-first CSS framework
- **Tailwind Forms** (@tailwindcss/forms v0.5.11) - Form styling plugin
- **Tailwind Typography** (@tailwindcss/typography v0.5.19) - Prose styling
- **Tailwind Variants** (v3.2.2) - Component variant utilities
- **Tailwind Merge** (v3.4.0) - Class merging utility
- **LayerChart** (v2.0.0-next.43) - Svelte charting library
- **bits-ui** (v2.14.4) - Component primitives
- **Embla Carousel** (v8.6.0) - Carousel component

### Internationalization

- **Paraglide** (@inlang/paraglide-js v2.10.0) - i18n framework

### Forms & Validation

- **Superforms** (sveltekit-superforms v2.29.1) - Form handling
- **Formsnap** (v2.0.1) - Form component library
- **Zod** (v4.3.6) - Schema validation

### Maps

- **Svelte MapLibre** (v1.2.6) - MapLibre GL JS wrapper

### Testing

- **Vitest** (v4.0.18) - Unit testing
- **Playwright** (v1.58.1) - E2E testing

### Development Tools

- **ESLint** (v9.39.2) - Linting
- **Prettier** (v3.8.1) - Code formatting

## Directory Structure

```
terradatum/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   └── ui/              # Reusable UI components
│   │   │       ├── accordion/
│   │   │       ├── alert-dialog/
│   │   │       ├── aspect-ratio/
│   │   │       ├── avatar/
│   │   │       ├── badge/
│   │   │       ├── button/
│   │   │       ├── calendar/
│   │   │       ├── card/
│   │   │       ├── chart/
│   │   │       ├── checkbox/
│   │   │       ├── collapsible/
│   │   │       ├── command/
│   │   │       ├── context-menu/
│   │   │       ├── dialog/
│   │   │       ├── dropdown-menu/
│   │   │       ├── form/
│   │   │       ├── input/
│   │   │       ├── label/
│   │   │       ├── menubar/
│   │   │       ├── navigation-menu/
│   │   │       ├── popover/
│   │   │       ├── progress/
│   │   │       ├── radio-group/
│   │   │       ├── range-calendar/
│   │   │       ├── resizable/
│   │   │       ├── scroll-area/
│   │   │       ├── select/
│   │   │       ├── separator/
│   │   │       ├── sheet/
│   │   │       ├── sidebar/
│   │   │       ├── skeleton/
│   │   │       ├── slider/
│   │   │       ├── sonner/
│   │   │       ├── spinner/
│   │   │       ├── switch/
│   │   │       ├── table/
│   │   │       ├── tabs/
│   │   │       ├── textarea/
│   │   │       ├── toast/
│   │   │       ├── toggle/
│   │   │       ├── toggle-group/
│   │   │       └── tooltip/
│   │   ├── hooks/               # Custom Svelte hooks
│   │   └── utils.ts             # Utility functions (cn, etc.)
│   ├── routes/
│   │   ├── +layout.svelte       # Root layout
│   │   ├── +page.svelte         # Home page
│   │   └── demo/                # Demo routes
│   │       ├── +page.svelte     # Demo index
│   │       ├── better-auth/     # Auth demo
│   │       └── paraglide/       # i18n demo
│   ├── app.d.ts                 # TypeScript declarations
│   ├── app.html                 # HTML template
│   ├── hooks.server.ts          # Server hooks
│   └── hooks.ts                 # Client hooks
├── static/                      # Static assets
├── messages/                    # i18n translation files
│   ├── en.json
│   └── es.json
├── drizzle.config.ts            # Drizzle configuration
├── svelte.config.js             # SvelteKit configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.js             # ESLint configuration
├── playwright.config.ts         # Playwright configuration
├── components.json               # shadcn-svelte component config
└── package.json
```

## Key Configuration Files

### drizzle.config.ts

Database configuration for Drizzle ORM with SQLite/Turso.

### svelte.config.js

SvelteKit configuration with mdsvex for Markdown support.

### vite.config.ts

Vite configuration with TailwindCSS and devtools JSON plugin.

### components.json

shadcn-svelte component library configuration.

## Scripts

| Command                | Description                 |
| ---------------------- | --------------------------- |
| `bun run dev`          | Start development server    |
| `bun run build`        | Build for production        |
| `bun run preview`      | Preview production build    |
| `bun run check`        | Run Svelte type checking    |
| `bun run lint`         | Run ESLint and Prettier     |
| `bun run format`       | Format code with Prettier   |
| `bun run test`         | Run unit and E2E tests      |
| `bun run db:push`      | Push database schema        |
| `bun run db:generate`  | Generate database types     |
| `bun run db:migrate`   | Run database migrations     |
| `bun run db:studio`    | Open Drizzle Studio         |
| `bun run auth:schema`  | Generate Better Auth schema |

## Database

The project uses **SQLite** via **Turso** with Drizzle ORM. Database schema is managed through Drizzle Kit migrations.

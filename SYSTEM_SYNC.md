# SYSTEM_SYNC – Internal Tool Strategy

## Purpose
Internal Tool Strategy is the admin console for the End to End Company Products system. It gives internal staff a secure, browser-based surface to inspect live data, run safe mutations, and audit activity.

## Who uses it
- **Admin** – full control across entities, configuration, and bulk operations.
- **Editor** – manages day-to-day CRUD flows for users and domain records.
- **Read-only** – reviews data without making changes; ideal for support and finance.
- **Support / Audit** – consumes history, audit logs, and upcoming feature-flag tooling.

## What it does
- Surfaces data from `server-strategy` APIs (initially users, with future domain entities).
- Provides CRUD workflows with guardrails, confirmations, and logging.
- Acts as a human-friendly Swagger, with tables, filters, forms, and detail panels.
- Will evolve to include bulk edits, audit log review, internal-only feature toggles, and ops dashboards.

## Relationships to other repos
- Reads from `server-strategy` over future `/admin/...` endpoints.
- Shares strict TypeScript models and `Result<T>` helpers from `common-strategy`.
- Aligns with `web-client-strategy` for build tooling (Vite, Vitest, ESLint, Prettier).
- Runs behind internal authentication; deployment + auth flows are orchestrated alongside our other web clients.

## UX Contract (E2E-XS v1 – Internal Tool)
- Render every screen inside the shared `AppShell`: sticky TopBar, left Sidebar, main content canvas, and optional right-side Inspector panel.
- TopBar always shows the generic app label, current page title, global search placeholder, command palette trigger (`Ctrl/⌘+K`), notifications icon, AI entry point, and user avatar stub.
- Sidebar houses primary navigation (Dashboard, Users, Data Explorer, System, Settings) and supports collapse/expand behaviors; new pages must plug in here.
- Command Palette stays available via the keyboard shortcut and the TopBar button, exposing navigation/actions such as toggling the sidebar or opening the AI assistant.
- Inspector panels display entity details on the right and are opened through shared helpers; tables/lists should trigger the inspector for drill-ins rather than bespoke modals.
- The AI Assistant panel remains visible and launchable (TopBar + Command Palette) even if the underlying AI is stubbed.
- Use the shared design tokens (`src/theme/tokens.ts`) reflected in `:root` CSS variables for colors, typography, spacing, radii, and shadows—avoid hard-coded values or brand names.
- New features should follow the table + filters + inspector pattern, reusing shell primitives, toasts, skeleton states, and future bulk action affordances.

## Data & Integrations
- **Users List (Internal Tool)**  
  - **Source:** `server-strategy` `GET /admin/users` (currently backed by an in-memory seed containing admin/editor/viewer/ops records).  
  - **Client:** `internal-tool-strategy` Users page via `fetchUsers()` in `src/api/users.ts`.  
  - **Config:** `VITE_API_BASE_URL` sets the server base (defaults to `http://localhost:4000` in dev).  
  - **Offline fallback:** Set `VITE_USE_MOCK_USERS=true` to force the UI to use the built-in mock data instead of calling the server.

## Source of truth
Process, permissions, and flow diagrams live in Confluence under **3 – Product & Features / 3.5 – Internal Tools**. Treat this repo as the UI implementation of those documents; defer to Confluence for canonical decisions around roles, data contracts, and rollout sequencing.


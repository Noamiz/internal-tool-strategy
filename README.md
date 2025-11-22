# Internal Tool Strategy

Internal administration and operations web app for the End to End Company Products system. Built with React, TypeScript, and Vite to give internal staff a modern console over server data.

## Architecture
- **UI shell** – App-wide sidebar + top bar layout rendered via `AppShell`, routing handled by React Router.
- **Features** – Each domain lives under `src/features`. First MVP feature is `users` with mock data.
- **API layer** – `src/api/*` centralizes fetch logic and typed contracts. Uses `common-strategy` for `User`, `Result<T>`, etc. Real calls will target `/admin/...` endpoints on `server-strategy`.
- **Shared packages** – Depends on `common-strategy` for strict TS models and result helpers. Intended to integrate with `server-strategy` for data and authentication.

## Current status (MVP)
- E2E-XS v1 shell: sticky TopBar, collapsible Sidebar, design tokens, inspector lane, and routing via nested layouts.
- Users page powered by a typed hook + mock API that returns `Result<UsersListResponse>`, now with row selection + inspector details.
- Command Palette (Ctrl/⌘+K) and AI Assistant panel stubs for modern navigation + guidance flows.
- Vitest + Testing Library coverage for layout interactions (command palette, AI panel) plus the Users feature.
- ESLint + Prettier aligned with `web-client-strategy`.

## Scripts
| Command | Description |
| --- | --- |
| `yarn dev` | Run Vite dev server |
| `yarn build` | Production build |
| `yarn preview` | Preview production build |
| `yarn test` | Run Vitest suite (jsdom) |
| `yarn lint` | ESLint over `src` |

## Users page flow
1. `useUsers` hook calls `fetchUsersMock`, which returns a mocked `Result<UsersListResponse>`.
2. `UsersPage` renders loading/error states, then passes users to `UsersTable`.
3. `UsersTable` renders semantic HTML table with email, display name, active state, and timestamps.
4. Once server-strategy exposes `/admin/users`, swap to `fetchUsers` (already exported) so only the hook logic changes.

## Future directions
- Role-based access control layered on top of internal auth.
- Per-entity CRUD surfaces (domains beyond users).
- Bulk edits, audit log viewer, feature-flag management, and system settings screens.

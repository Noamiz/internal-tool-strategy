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

## Source of truth
Process, permissions, and flow diagrams live in Confluence under **3 – Product & Features / 3.5 – Internal Tools**. Treat this repo as the UI implementation of those documents; defer to Confluence for canonical decisions around roles, data contracts, and rollout sequencing.


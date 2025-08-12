# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Repository contributor guide `AGENTS.md` with structure, commands, style, and PR rules.
- Dashboard redesign (post-login): hero greeting, quick actions, date range filters, KPI cards with trends, Recent Activity, low-inventory alert, tasks panel, welcome banner.
- Auth health indicator chip and session-expired snackbar on login.
- Frontend utilities `src/utils/format.ts` for dates, currency, numbers; constants for categories/units.
- Backend endpoints:
  - `GET /auth/me` to validate current token.
  - `GET /meta/enums` to expose financial categories, stock units, and types.
  - `GET /onboarding/status` to drive first-run setup.
- Frontend uses backend enums in Financial/Inventory dialogs (with local fallback).

### Changed
- Theme updated (palette, rounded shapes, backgrounds).
- Charts are lazy-loaded and filter-aware; dashboard uses typed data.
- Setup Wizard no longer re-creates the user; contextual steps (Farm → Lot → Crop) and skippable flow.
- `/reports` now requires authentication for consistency.
- CORS config broadened for local development.

### Fixed
- DataGrid crashes on undefined values by hardening value formatters.
- 401 loops: app validates token on load, retries transient 401 once, and redirects cleanly to login on invalid tokens.
- Build error in `NewLogin.tsx` by wrapping top-level JSX and placing `Snackbar` correctly.

### Developer Experience
- Response interceptor clears stale tokens and sets a `sessionExpired` flag to inform the user on next login.
- Saved last route and persisted dashboard filters and thresholds in `localStorage`.


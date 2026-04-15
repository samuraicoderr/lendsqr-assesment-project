# Lendsqr Frontend Assessment

## Overview

This project is a frontend implementation of a Lendsqr-style loan operations dashboard. It includes authentication, protected dashboard routes, reusable data-table patterns, and rich list/detail workflows across users, loans, transactions, reports, and related modules.

The app is built with Next.js App Router and uses local mock API route handlers to keep the assessment reproducible while preserving realistic frontend architecture (service layer, API client, token lifecycle, and typed domain models).

## Live Demo

- Live URL: https://williams-samuel-lendsqr-fe-test.vercel.app/
- GitHub: https://github.com/samuraicoderr/lendsqr-fe-test

## Features

- Authentication flow with protected dashboard routes
- Reusable `GenericTable` with sorting, filtering, row actions, and pagination
- Dynamic detail routes for all core modules (`[id]` pages)
- API client with retries, timeouts, interceptors, and token refresh flow
- Service-layer caching and in-flight request de-duplication
- Responsive dashboard shell (navbar, sidebar, notifications panel)
- Unit/component tests for helper utilities and UI primitives

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- SCSS Modules + shared style tokens/mixins
- Zustand (auth/token state persistence)
- @popperjs/core (filter dropdown positioning)
- react-tooltip (status tooltips)
- Jest + Testing Library

## Getting Started

### Prerequisites

- Node.js (recommended: 22.x)
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Then open http://localhost:3000.

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
	app/                 # App Router pages, layouts, mock API route handlers
	components/          # Reusable UI and domain layout components
	lib/
		api/               # ApiClient, auth providers, services, domain types
		FrontendLinks.ts   # Frontend route constants
		BackendLinks.ts    # Backend/mock API route constants
	styles/              # Global SCSS tokens, mixins, base utilities
.docs/
	screenshots/         # Submission screenshots
```

## Key Decisions

- Used Next.js route handlers under `src/app/mock-api/**` to simulate backend capabilities (filtering, pagination, PATCH/PUT), enabling realistic UI-to-API workflows without external dependencies.
- Centralized transport concerns in `ApiClient` and auth/token concerns in `authContext` + `TokenManager`.
- Kept view state local in feature components while persisting only auth continuity data via Zustand + `localStorage`.
- Implemented reusable table infrastructure (`GenericTable` + `Paginator`) to keep behavior consistent across many dashboard domains.
- Adopted Popper.js + portal rendering for robust dropdown behavior in constrained/scrollable table layouts.

## Testing

Run all tests:

```bash
npm test -- --runInBand
```

Current test coverage includes:
- Utility logic (`cn`, `interpretServerError`)
- Route helper modules (`FrontendLinks`, `BackendLinks`)
- Auth redirect safety helpers
- UI components (`ConfirmModal`, `StatusPill`)

## Screenshots

### Login
![Login Screen](.docs/screenshots/login-screen.png)

### Dashboard
![Dashboard Screen](.docs/screenshots/dashboard-screen.png)

### Users
![Users List Screen](.docs/screenshots/users-list-screen.png)

### User Details
![User Details Screen](.docs/screenshots/users-detail-screen.png)

## Additional Submission Documentation

For the full engineering write-up (architecture, trade-offs, challenges, and decisions), see:

- `.docs/submission-documentation.md`

# Car Show 2027 — Registration Dashboard (Frontend)

React + TypeScript + Vite + Tailwind CSS dashboard for the Car Show Registration System.
Event staff use it to browse, search, filter and paginate car show registrations, and to see
event KPIs (totals, collected/uncollected payments, confirmed/checked-in counts).

## Tech stack

- **React 19 + TypeScript** (built with Vite)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- REST API: C# / .NET 10 backend (see the `backend/` folder in the repository root)

## How to run

```bash
cd frontend   # (this folder: Frontend-Gaarilao)
npm install
npm run dev
```

Open the URL Vite prints (default: http://localhost:5173).

## How to switch between sample data and the real API

Both data sources live in `src/api/` and expose the **same function names and return
shapes**, so switching is a one-line change — no other file needs to be touched:

| File | What it does |
|---|---|
| `src/api/sample-data.ts` | 28 sample registrations. `getRegistrations()` / `getSummary()` filter, page and total the data **in the browser** (no backend needed). |
| `src/api/registrationsApi.ts` | Real `fetch()` calls to the C# API using `VITE_API_BASE_URL`. |

### Step 1 — Choose the data source

Open **`src/pages/RegistrationsPage.tsx`** and look at the imports near the top (lines ~5–10):

```ts
// SAMPLE DATA (default while the backend is not ready):
import { getRegistrations, getSummary } from "../api/sample-data";
// REAL API (comment the line above, uncomment these):
// import { getRegistrations, getSummary } from "../api/registrationsApi";
```

**To use sample data:** keep the `sample-data` import active (and the `registrationsApi`
one commented out) — this is the current state.

**To use the real API:** comment out the `sample-data` import and uncomment the
`registrationsApi` import, like this:

```ts
// import { getRegistrations, getSummary } from "../api/sample-data";
import { getRegistrations, getSummary } from "../api/registrationsApi";
```

Save the file — Vite hot-reloads the dashboard immediately.

### Step 2 — Point the real API at the backend URL

The real API reads the base URL from **`.env.development`** in this folder:

```
VITE_API_BASE_URL=http://localhost:5205
```

Change the port to match whatever the backend actually prints when it starts
(`cd backend`, then `dotnet run --project Api`). After editing `.env.development`,
**restart the dev server** (`npm run dev`) for the new value to take effect.

> Note: only use sample data for demos/screenshots before the backend is ready.
> The graded "full dashboard" screenshot (Screenshot 2) must show data coming from
> the real C# API.

### What the API calls do

| Function | HTTP call | Used for |
|---|---|---|
| `getRegistrations(filters)` | `GET /api/registrations?participantName=&type=&status=&page=&pageSize=` | Table rows + pagination totals |
| `getSummary()` | `GET /api/registrations/summary` | KPI cards |

The JSON shapes are defined in `src/api/types.ts` and must match the shared API contract
in the project requirements (do not rename fields without agreeing with the backend
developer first).

### Switching checklist (for the backend developer)

1. ✅ Backend runs locally and Scalar shows the endpoints.
2. ✅ CORS is enabled for `http://localhost:5173` (the Vite dev origin).
3. ✅ Field names in the JSON response match `src/api/types.ts` exactly
   (e.g. `paymentStatus`, not `payment_status`).
4. ✅ Enum values are spelled exactly `Exhibitor / Competitor / VIP` and
   `Pending / Confirmed / CheckedIn / Cancelled` (note the camelCase `CheckedIn`).
5. ✅ `.env.development` port matches the backend's exposed URL.
6. → Then flip the import in `RegistrationsPage.tsx` and the dashboard is live against
   the real API.

## Project structure

```
src/
├── api/
│   ├── types.ts              # shared JSON contract types
│   ├── sample-data.ts        # sample data (browser-side filtering/paging)
│   └── registrationsApi.ts   # real fetch calls to the C# API
├── hooks/
│   └── useDebounce.ts        # 400 ms debounce for the participant name search
├── components/
│   ├── KpiCard.tsx / KpiCards.tsx     # KPI row (6 cards)
│   ├── RegistrationFilters.tsx       # search + type + status + Clear filters
│   ├── RegistrationTable.tsx         # table rows + skeleton loading rows
│   ├── Pagination.tsx                # Prev/Next, page numbers, "Showing x–y of N"
│   ├── StatusBadge.tsx               # Pending / Confirmed / CheckedIn / Cancelled
│   └── PaymentBadge.tsx              # Unpaid (red) / Partial (amber) / Paid (green)
├── pages/
│   └── RegistrationsPage.tsx # owns all state: filters, page, data, loading, error
├── App.tsx
└── index.css                 # Tailwind import
```

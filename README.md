# Project Title: Car Show Registration System

## Team Members and Roles
| Member | Role |
|---|---|
| Aivy C. Bolaño | Backend Developer |
| Christian Erl Garilao | Frontend Developer |

## How to Run

### Frontend (React + Vite, in `Frontend-Gaarilao/`)

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev` (open the printed localhost URL)
3. The app runs on **sample data** by default. To switch to the real C# API,
   edit `Frontend-Gaarilao/src/pages/RegistrationsPage.tsx` and swap the
   imports — see `Frontend-Gaarilao/README.md` for the step-by-step guide.
4. The API base URL is configured in `Frontend-Gaarilao/.env.development`
   (`VITE_API_BASE_URL=http://localhost:5205`).

### Backend (C# / .NET 10, `backend/`)

Run from the repository root once the backend solution is in place:
`cd backend`, then `dotnet run --project Api`.

### Screenshots

Submission screenshots are stored in `docs/screenshots/` with the file names
listed in the project requirements (e.g. `04-post-create-201.png`).

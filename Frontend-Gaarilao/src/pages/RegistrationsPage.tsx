import { useEffect, useState } from "react";

// SWITCH BETWEEN SAMPLE DATA AND THE REAL API HERE.
// Sample data (default while the backend is not ready):
import { getRegistrations, getSummary, createRegistration, type CreateRegistrationInput } from "../api/sample-data";
// Real API (comment the lines above, uncomment these):
// import { getRegistrations, getSummary } from "../api/registrationsApi";

import type {
  Registration,
  RegistrationFilters as RegistrationFilterState,
  RegistrationSummary,
} from "../api/types";
import { useDebounce } from "../hooks/useDebounce";
import { KpiCards } from "../components/KpiCards";
import { RegistrationFilters } from "../components/RegistrationFilters";
import { RegistrationTable } from "../components/RegistrationTable";
import { Pagination } from "../components/Pagination";
import { AddRegistrationModal } from "../components/AddRegistrationModal";

const DEFAULT_FILTERS: RegistrationFilterState = {
  participantName: "",
  type: "All",
  status: "All",
  page: 1,
  pageSize: 10,
};

export function RegistrationsPage() {
  // All state that is shared between filters, table and pagination lives here,
  // in the parent page component, because children need it together.
  const [filters, setFilters] = useState<RegistrationFilterState>(DEFAULT_FILTERS);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [listState, setListState] = useState<{
    totalCount: number;
    totalPages: number;
  }>({ totalCount: 0, totalPages: 1 });
  const [error, setError] = useState<string | null>(null);
  // Bumping this re-runs both fetch effects — that is the "Try again" button.
  const [reloadToken, setReloadToken] = useState(0);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  // Debounced copy of the search text so the API is only called after the
  // user stops typing (~400 ms).
  const debouncedName = useDebounce(filters.participantName, 400);

  // A key that identifies exactly what the table should be showing right now.
  // "Loading" is derived (current key not answered yet) instead of being set
  // synchronously inside an effect, which avoids cascading renders and keeps
  // stale responses from overwriting newer data.
  const requestKey = `${filters.type}|${filters.status}|${filters.page}|${filters.pageSize}|${debouncedName}|${reloadToken}`;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const loading = loadedKey !== requestKey;

  // Fetch the registrations for the current filters.
  useEffect(() => {
    let active = true;
    getRegistrations({ ...filters, participantName: debouncedName })
      .then((response) => {
        if (!active) return;
        setRegistrations(response.items);
        setListState({ totalCount: response.totalCount, totalPages: response.totalPages });
        setError(null);
        setLoadedKey(requestKey);
      })
      .catch(() => {
        if (!active) return;
        setError("Cannot reach the API. Please check your connection and try again.");
        setRegistrations([]);
        setLoadedKey(requestKey);
      });
    return () => {
      active = false;
    };
  }, [filters, debouncedName, requestKey]);

  // The summary refetches when type/status filters or the search change too,
  // so totals always reflect what the list is showing.
  const summaryKey = `${filters.type}|${filters.status}|${debouncedName}|${reloadToken}`;

  useEffect(() => {
    let active = true;
    getSummary()
      .then((nextSummary) => {
        if (!active) return;
        setSummary(nextSummary);
      })
      .catch(() => {
        // Summary failure alone should not block the table; KpiCards shows placeholders.
        if (!active) return;
        setSummary(null);
      });
    return () => {
      active = false;
    };
  }, [summaryKey]);

  // Any filter change resets pagination back to page 1.
  const updateFilters = (patch: Partial<RegistrationFilterState>) =>
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));

  const handleClear = () => setFilters(DEFAULT_FILTERS);

  const handleAddRegistration = async (input: CreateRegistrationInput) => {
    try {
      setError(null);
      const response = await createRegistration(input);
      // Add the new registration to the top of the list
      setRegistrations((prev) => [response.registration, ...prev]);
      setListState((prev) => ({ ...prev, totalCount: prev.totalCount + 1 }));
      // Also refresh summary
      const newSummary = await getSummary();
      setSummary(newSummary);
    } catch {
      setError("Failed to add participant. Please try again.");
    }
  };

  const isEmpty = !loading && !error && registrations.length === 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Car Show 2027 — Registration Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse, search and filter event registrations. AutoVista Events · Sorsogon City Coliseum
        </p>
      </header>

      {/* KPI cards first — visual hierarchy: cards, then filters, then table. */}
      <section aria-label="Event summary" className="mb-6">
        <KpiCards summary={summary} />
      </section>

      {/* Action and Filters bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <RegistrationFilters
          filters={filters}
          onSearchChange={(participantName) => updateFilters({ participantName })}
          onTypeChange={(type) => updateFilters({ type })}
          onStatusChange={(status) => updateFilters({ status })}
          onClear={handleClear}
        />
        <button
          type="button"
          onClick={() => { setModalKey((k) => k + 1); setIsModalOpen(true); }}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0 self-start sm:self-end"
        >
          <svg className="inline-block h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Participant
        </button>
      </div>

      {/* Loading / empty / error states — the page is never blank.
          Loading is communicated by the KPI placeholders and skeleton rows. */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setReloadToken((token) => token + 1)}
            className="mt-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try again
          </button>
        </div>
      )}
      {isEmpty && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-medium text-slate-600">No registrations match your filters.</p>
          <button
            type="button"
            onClick={handleClear}
            className="mt-3 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear filters
          </button>
        </div>
      )}

      <section aria-label="Registrations table">
        <RegistrationTable registrations={registrations} loading={loading} />
      </section>

      <div className="mt-4">
        <Pagination
          page={filters.page}
          pageSize={filters.pageSize}
          totalCount={listState.totalCount}
          totalPages={listState.totalPages}
          loading={loading}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          onPageSizeChange={(pageSize) => updateFilters({ pageSize })}
        />
      </div>

      {/* Add Registration Modal */}
      <AddRegistrationModal key={modalKey} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddRegistration} />
    </main>
  );
}

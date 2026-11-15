import { useCallback, useEffect, useState } from "react";

// SWITCH BETWEEN SAMPLE DATA AND THE REAL API HERE.
// Sample data (default while the backend is not ready):
import { getRegistrations, getSummary } from "../api/sample-data";
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
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced copy of the search text so the API is only called after the
  // user stops typing (~400 ms).
  const debouncedName = useDebounce(filters.participantName, 400);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRegistrations({ ...filters, participantName: debouncedName });
      setRegistrations(response.items);
      setListState({ totalCount: response.totalCount, totalPages: response.totalPages });
    } catch {
      setError("Cannot reach the API. Please check your connection and try again.");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedName]);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      setSummary(await getSummary());
    } catch {
      // Summary failure alone should not block the table; KpiCards shows a message.
      setSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  // Re-fetch registrations whenever filters (or the debounced name) change.
  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  // Re-fetch the summary when filters change too, so totals reflect them.
  useEffect(() => {
    loadSummary();
  }, [loadSummary, filters.type, filters.status, debouncedName]);

  // Any filter change resets pagination back to page 1.
  const updateFilters = (patch: Partial<RegistrationFilterState>) =>
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));

  const handleClear = () => setFilters(DEFAULT_FILTERS);

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
        {summaryLoading && summary === null && (
          <p className="mt-2 text-sm text-slate-500" role="status">
            Loading summary…
          </p>
        )}
      </section>

      <section className="mb-4" aria-label="Filters">
        <RegistrationFilters
          filters={filters}
          onSearchChange={(participantName) => updateFilters({ participantName })}
          onTypeChange={(type) => updateFilters({ type })}
          onStatusChange={(status) => updateFilters({ status })}
          onClear={handleClear}
        />
      </section>

      {/* Loading / empty / error states — the page is never blank. */}
      {loading && (
        <p className="mb-4 text-sm font-medium text-slate-600" role="status">
          Loading registrations…
        </p>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            onClick={loadRegistrations}
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
    </main>
  );
}

import type { RegistrationFilters, RegistrationStatus, RegistrationType } from "../api/types";

interface RegistrationFiltersProps {
  filters: RegistrationFilters;
  onSearchChange: (participantName: string) => void;
  onTypeChange: (type: RegistrationType | "All") => void;
  onStatusChange: (status: RegistrationStatus | "All") => void;
  onClear: () => void;
}

const inputClasses =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm " +
  "placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export function RegistrationFilters({
  filters,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}: RegistrationFiltersProps) {
  return (
    <section className="flex flex-wrap items-center gap-3" aria-label="Registration filters">
      <div>
        <label htmlFor="participant-search" className="mb-1 block text-xs font-medium text-slate-500">
          Participant name
        </label>
        <input
          id="participant-search"
          type="text"
          value={filters.participantName}
          placeholder="Search participant name…"
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${inputClasses} w-64`}
        />
      </div>

      <div>
        <label htmlFor="type-filter" className="mb-1 block text-xs font-medium text-slate-500">
          Registration type
        </label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={(e) => onTypeChange(e.target.value as RegistrationType | "All")}
          className={inputClasses}
        >
          <option value="All">All</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div>
        <label htmlFor="status-filter" className="mb-1 block text-xs font-medium text-slate-500">
          Status
        </label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => onStatusChange(e.target.value as RegistrationStatus | "All")}
          className={inputClasses}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">CheckedIn</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 self-start rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Clear filters
      </button>
    </section>
  );
}

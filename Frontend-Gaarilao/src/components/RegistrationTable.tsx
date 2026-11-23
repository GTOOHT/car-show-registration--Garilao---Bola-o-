import { useMemo, useState } from "react";
import type { Registration, RegistrationStatus } from "../api/types";
import { PaymentBadge } from "./PaymentBadge";
import { StatusBadge } from "./StatusBadge";

const peso = (amount: number) =>
  `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const date = (iso: string) =>
  new Date(iso).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

// Status sorts by lifecycle order (workflow stage), not alphabetically.
const STATUS_ORDER: Record<RegistrationStatus, number> = {
  Pending: 0,
  Confirmed: 1,
  CheckedIn: 2,
  Cancelled: 3,
};

type SortKey =
  | "registrationNumber"
  | "registrationDate"
  | "participantName"
  | "carMakeModel"
  | "registrationType"
  | "status"
  | "registrationFee";

type SortDirection = "asc" | "desc";

const SORT_ACCESSORS: Record<SortKey, (r: Registration) => string | number> = {
  registrationNumber: (r) => r.registrationNumber,
  registrationDate: (r) => r.registrationDate,
  participantName: (r) => r.participantName.toLowerCase(),
  carMakeModel: (r) => r.carMakeModel.toLowerCase(),
  registrationType: (r) => r.registrationType,
  status: (r) => STATUS_ORDER[r.status],
  registrationFee: (r) => r.registrationFee,
};

// The API contract has no sort parameter, so sorting is applied to the rows
// currently on screen (client-side). The wire data is never modified.
function sortRegistrations(
  registrations: Registration[],
  key: SortKey | null,
  direction: SortDirection,
): Registration[] {
  if (!key) return registrations;
  const accessor = SORT_ACCESSORS[key];
  const factor = direction === "asc" ? 1 : -1;
  return [...registrations].sort((a, b) => {
    const av = accessor(a);
    const bv = accessor(b);
    if (av < bv) return -1 * factor;
    if (av > bv) return 1 * factor;
    return 0;
  });
}

function ChevronIcon({ direction }: { direction: SortDirection }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-3 w-3 ${direction === "asc" ? "" : "rotate-180"}`}
      aria-hidden="true"
    >
      <path d="M4 10l4-4.5 4 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface RegistrationTableProps {
  registrations: Registration[];
  loading: boolean;
}

export function RegistrationTable({ registrations, loading }: RegistrationTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sorted = useMemo(
    () => sortRegistrations(registrations, sortKey, sortDirection),
    [registrations, sortKey, sortDirection],
  );

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Same column clicked again: flip direction, then a third click clears.
      if (sortDirection === "asc") setSortDirection("desc");
      else {
        setSortKey(null);
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const columns: Array<{ key: SortKey; label: string; align?: "right" }> = [
    { key: "registrationNumber", label: "Reg. No." },
    { key: "registrationDate", label: "Date" },
    { key: "participantName", label: "Participant" },
    { key: "carMakeModel", label: "Car" },
    { key: "registrationType", label: "Type" },
    { key: "status", label: "Status" },
    { key: "registrationFee", label: "Fee / Paid", align: "right" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">Car Show 2027 event registrations</caption>
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
          <tr>
            {columns.map((col) => {
              const active = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={active ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
                  className={`px-4 py-3 ${col.align === "right" ? "text-right" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={`inline-flex items-center gap-1 rounded uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      active
                        ? "text-slate-800 dark:text-slate-100"
                        : "hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {col.label}
                    {active && <ChevronIcon direction={sortDirection} />}
                  </button>
                </th>
              );
            })}
            <th scope="col" className="px-4 py-3">
              Payment
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                  ))}
                </tr>
              ))
            : sorted.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {r.registrationNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-400">{date(r.registrationDate)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{r.participantName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{r.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-800 dark:text-slate-100">{r.carMakeModel}</p>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{r.plateNumber}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.registrationType}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-slate-700 dark:text-slate-200">
                    {peso(r.registrationFee)} / {peso(r.amountPaid)}
                  </td>
                  <td className="px-4 py-3">
                    <PaymentBadge paymentStatus={r.paymentStatus} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

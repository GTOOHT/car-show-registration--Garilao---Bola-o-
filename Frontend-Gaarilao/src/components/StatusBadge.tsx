import type { ReactNode } from "react";
import type { RegistrationStatus } from "../api/types";

const BADGES: Record<RegistrationStatus, { label: string; classes: string; icon: ReactNode }> = {
  Pending: {
    label: "Pending",
    classes: "bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/30",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" />
        <path d="M8 5.25V8l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Confirmed: {
    label: "Confirmed",
    classes: "bg-blue-100 text-blue-800 ring-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/30",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  CheckedIn: {
    label: "Checked In",
    classes: "bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <rect x="3" y="2.75" width="10" height="10.5" rx="1.5" />
        <path d="M5.75 8l1.75 1.75L10.75 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Cancelled: {
    label: "Cancelled",
    classes: "bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-400/30",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" />
        <path d="M5.75 5.75l4.5 4.5M10.25 5.75l-4.5 4.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  const badge = BADGES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${badge.classes}`}
    >
      {badge.icon}
      {badge.label}
    </span>
  );
}

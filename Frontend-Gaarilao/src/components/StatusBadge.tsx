import type { RegistrationStatus } from "../api/types";

const STYLES: Record<RegistrationStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 ring-amber-600/20",
  Confirmed: "bg-blue-100 text-blue-800 ring-blue-600/20",
  CheckedIn: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  Cancelled: "bg-red-100 text-red-800 ring-red-600/20",
};

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}

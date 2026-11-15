import type { RegistrationSummary } from "../api/types";
import { KpiCard } from "./KpiCard";

const peso = (amount: number) =>
  `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function KpiCards({ summary }: { summary: RegistrationSummary | null }) {
  if (summary === null) {
    // Placeholder KPI cards while the summary loads, so the row never jumps.
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-7 w-16 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  const collectionRate =
    summary.totalFees > 0 ? (summary.totalPayments / summary.totalFees) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <KpiCard label="Total Registrations" value={summary.totalRegistrations.toLocaleString()} />
      <KpiCard label="Total Payments" value={peso(summary.totalPayments)} accentClass="text-green-600" />
      <KpiCard label="Uncollected Payments" value={peso(summary.uncollectedPayments)} accentClass="text-red-600" />
      <KpiCard label="Confirmed" value={summary.confirmed} accentClass="text-blue-600" />
      <KpiCard label="Checked In" value={summary.checkedIn} accentClass="text-emerald-600" />
      <KpiCard label="Collection Rate" value={`${collectionRate.toFixed(1)}%`} />
    </div>
  );
}

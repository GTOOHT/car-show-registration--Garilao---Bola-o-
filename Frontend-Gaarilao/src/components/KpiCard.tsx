interface KpiCardProps {
  label: string;
  value: string | number;
  accentClass?: string;
}

export function KpiCard({ label, value, accentClass = "text-slate-800 dark:text-slate-100" }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <p className="min-h-10 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${accentClass}`}>{value}</p>
    </div>
  );
}

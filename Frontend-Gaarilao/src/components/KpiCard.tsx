interface KpiCardProps {
  label: string;
  value: string | number;
  accentClass?: string;
}

export function KpiCard({ label, value, accentClass = "text-slate-800" }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${accentClass}`}>{value}</p>
    </div>
  );
}

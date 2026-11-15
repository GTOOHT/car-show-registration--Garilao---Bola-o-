import type { Registration } from "../api/types";
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

interface RegistrationTableProps {
  registrations: Registration[];
  loading: boolean;
}

export function RegistrationTable({ registrations, loading }: RegistrationTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Reg. No.</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Participant</th>
            <th className="px-4 py-3">Car</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Fee / Paid</th>
            <th className="px-4 py-3">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    </td>
                  ))}
                </tr>
              ))
            : registrations.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">
                    {r.registrationNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{date(r.registrationDate)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{r.participantName}</p>
                    <p className="text-xs text-slate-500">{r.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-800">{r.carMakeModel}</p>
                    <p className="font-mono text-xs text-slate-500">{r.plateNumber}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.registrationType}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap text-slate-700">
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

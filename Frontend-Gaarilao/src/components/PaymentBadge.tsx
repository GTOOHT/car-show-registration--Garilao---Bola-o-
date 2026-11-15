import type { PaymentStatus } from "../api/types";

const STYLES: Record<PaymentStatus, string> = {
  Unpaid: "bg-red-100 text-red-800 ring-red-600/20",
  Partial: "bg-amber-100 text-amber-800 ring-amber-600/20",
  Paid: "bg-green-100 text-green-800 ring-green-600/20",
};

export function PaymentBadge({ paymentStatus }: { paymentStatus: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${STYLES[paymentStatus]}`}
    >
      {paymentStatus}
    </span>
  );
}

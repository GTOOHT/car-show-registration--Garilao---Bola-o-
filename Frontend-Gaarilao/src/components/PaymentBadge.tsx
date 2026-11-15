import type { ReactNode } from "react";
import type { PaymentStatus } from "../api/types";

const BADGES: Record<PaymentStatus, { label: string; classes: string; icon: ReactNode }> = {
  Unpaid: {
    label: "Unpaid",
    classes: "bg-red-100 text-red-800 ring-red-600/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" />
        <path d="M8 4.75v6.5M10.25 6.5c-.5-.75-3.75-1.25-3.75.5s4 .75 3.5 2.5c-.4 1.4-3 1-3.75.25" strokeLinecap="round" />
      </svg>
    ),
  },
  Partial: {
    label: "Partial",
    classes: "bg-amber-100 text-amber-800 ring-amber-600/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" />
        <path d="M8 2.25v11.5A5.75 5.75 0 008 2.25z" fill="currentColor" stroke="none" opacity="0.35" />
        <circle cx="8" cy="8" r="5.75" />
      </svg>
    ),
  },
  Paid: {
    label: "Paid",
    classes: "bg-green-100 text-green-800 ring-green-600/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.75" />
        <path d="M5.25 8.25l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export function PaymentBadge({ paymentStatus }: { paymentStatus: PaymentStatus }) {
  const badge = BADGES[paymentStatus];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${badge.classes}`}
    >
      {badge.icon}
      {badge.label}
    </span>
  );
}

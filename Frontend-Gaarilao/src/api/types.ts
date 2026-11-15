// Shared types — these must match the JSON contract agreed with the Backend Developer.
// Do not rename fields without agreeing with your partner first.

export type RegistrationType = "Exhibitor" | "Competitor" | "VIP";
export type RegistrationStatus = "Pending" | "Confirmed" | "CheckedIn" | "Cancelled";
export type PaymentStatus = "Unpaid" | "Partial" | "Paid";

export interface Registration {
  id: string;
  registrationNumber: string;
  registrationDate: string;
  participantName: string;
  contactNumber: string;
  email: string;
  address: string;
  carMakeModel: string;
  plateNumber: string;
  registrationType: RegistrationType;
  status: RegistrationStatus;
  registrationFee: number;
  amountPaid: number;
  paymentStatus: PaymentStatus;
}

export interface RegistrationListResponse {
  items: Registration[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface RegistrationSummary {
  totalRegistrations: number;
  confirmed: number;
  checkedIn: number;
  pending: number;
  cancelled: number;
  totalFees: number;
  totalPayments: number;
  uncollectedPayments: number;
}

// Query params sent to GET /api/registrations
export interface RegistrationFilters {
  participantName: string;
  type: RegistrationType | "All";
  status: RegistrationStatus | "All";
  page: number;
  pageSize: number;
}

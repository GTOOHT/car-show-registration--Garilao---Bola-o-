// Real API calls to the C# backend. Same function names and return shapes as
// sample-data.ts — to switch between them, only the import in
// RegistrationsPage.tsx changes.

import type {
  RegistrationFilters,
  RegistrationListResponse,
  RegistrationSummary,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5205";

function buildQueryString(filters: RegistrationFilters): string {
  const params = new URLSearchParams();
  if (filters.participantName.trim() !== "") {
    params.set("participantName", filters.participantName.trim());
  }
  if (filters.type !== "All") params.set("type", filters.type);
  if (filters.status !== "All") params.set("status", filters.status);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  return params.toString();
}

export async function getRegistrations(filters: RegistrationFilters): Promise<RegistrationListResponse> {
  const response = await fetch(`${API_BASE_URL}/api/registrations?${buildQueryString(filters)}`);
  if (!response.ok) {
    throw new Error(`The API returned an error (HTTP ${response.status}).`);
  }
  return response.json() as Promise<RegistrationListResponse>;
}

export async function getSummary(): Promise<RegistrationSummary> {
  const response = await fetch(`${API_BASE_URL}/api/registrations/summary`);
  if (!response.ok) {
    throw new Error(`The API returned an error (HTTP ${response.status}).`);
  }
  return response.json() as Promise<RegistrationSummary>;
}

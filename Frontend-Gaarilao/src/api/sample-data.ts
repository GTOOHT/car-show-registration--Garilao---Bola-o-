// Sample data so the dashboard can be built and demoed before the backend is ready.
// Same function names and return shapes as registrationsApi.ts — to switch to the
// real API, only the import in RegistrationsPage.tsx needs to change.

import type {
  Registration,
  RegistrationFilters,
  RegistrationListResponse,
  RegistrationSummary,
} from "./types";

const sampleRegistrations: Registration[] = [
  { id: "3f2c9a1e-0001", registrationNumber: "CS27-0001", registrationDate: "2027-02-10T08:30:00Z", participantName: "Juan Dela Cruz", contactNumber: "09171234567", email: "juan@example.com", address: "123 Rizal St., Naga City", carMakeModel: "Toyota Supra MK4", plateNumber: "ABC 1234", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 1000, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0002", registrationNumber: "CS27-0002", registrationDate: "2027-02-10T09:05:00Z", participantName: "Maria Santos", contactNumber: "09281234567", email: "maria@example.com", address: "45 Magsaysay Ave., Legazpi City", carMakeModel: "Ford Mustang GT", plateNumber: "XYZ 5678", registrationType: "VIP", status: "Confirmed", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0003", registrationNumber: "CS27-0003", registrationDate: "2027-02-10T10:12:00Z", participantName: "Pedro Reyes", contactNumber: "09061234567", email: "pedro@example.com", address: "78 Quezon Blvd., Sorsogon City", carMakeModel: "Honda Civic Type R", plateNumber: "LMN 9012", registrationType: "Exhibitor", status: "Pending", registrationFee: 2000, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0004", registrationNumber: "CS27-0004", registrationDate: "2027-02-10T11:40:00Z", participantName: "Ana Lopez", contactNumber: "09195550011", email: "ana@example.com", address: "12 Bonifacio St., Sorsogon City", carMakeModel: "Mazda MX-5 Miata", plateNumber: "QRS 3456", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 2500, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0005", registrationNumber: "CS27-0005", registrationDate: "2027-02-10T13:22:00Z", participantName: "Jose Rizal Mendoza", contactNumber: "09179998877", email: "jose@example.com", address: "9 Aguinaldo St., Albay", carMakeModel: "Nissan Skyline R34", plateNumber: "TUV 7890", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0006", registrationNumber: "CS27-0006", registrationDate: "2027-02-10T14:55:00Z", participantName: "Carmen Aquino", contactNumber: "09284445566", email: "carmen@example.com", address: "30 Mabini St., Sorsogon City", carMakeModel: "Chevrolet Camaro SS", plateNumber: "WXY 1234", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 2000, amountPaid: 1000, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0007", registrationNumber: "CS27-0007", registrationDate: "2027-02-11T08:05:00Z", participantName: "Rafael Lim", contactNumber: "09067778899", email: "rafael@example.com", address: "5 Del Pilar St., Irosin", carMakeModel: "Subaru WRX STI", plateNumber: "ZAB 5678", registrationType: "Competitor", status: "Cancelled", registrationFee: 2500, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0008", registrationNumber: "CS27-0008", registrationDate: "2027-02-11T09:18:00Z", participantName: "Grace Villanueva", contactNumber: "09176665544", email: "grace@example.com", address: "88 Luneta St., Bulan", carMakeModel: "Porsche 911 Carrera", plateNumber: "CDE 9012", registrationType: "VIP", status: "Confirmed", registrationFee: 5000, amountPaid: 2500, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0009", registrationNumber: "CS27-0009", registrationDate: "2027-02-11T10:30:00Z", participantName: "Miguel Torres", contactNumber: "09283332211", email: "miguel@example.com", address: "17 Burgos St., Gubat", carMakeModel: "BMW M3 E46", plateNumber: "FGH 3456", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 2000, amountPaid: 2000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0010", registrationNumber: "CS27-0010", registrationDate: "2027-02-11T11:47:00Z", participantName: "Isabel Garcia", contactNumber: "09061112233", email: "isabel@example.com", address: "24 Jacinto St., Matnog", carMakeModel: "Mercedes-Benz AMG GT", plateNumber: "IJK 7890", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 2500, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0011", registrationNumber: "CS27-0011", registrationDate: "2027-02-11T13:10:00Z", participantName: "Andres Bonifacio Jr.", contactNumber: "09172223344", email: "andres@example.com", address: "3 Katipunan St., Castilla", carMakeModel: "Dodge Challenger Hellcat", plateNumber: "LMN 1234", registrationType: "Exhibitor", status: "Pending", registrationFee: 2000, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0012", registrationNumber: "CS27-0012", registrationDate: "2027-02-11T14:28:00Z", participantName: "Liwayway Cruz", contactNumber: "09285551199", email: "liwayway@example.com", address: "63 Taft Ave., Sorsogon City", carMakeModel: "Volkswagen Golf R", plateNumber: "OPQ 5678", registrationType: "VIP", status: "Confirmed", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0013", registrationNumber: "CS27-0013", registrationDate: "2027-02-12T08:02:00Z", participantName: "Fernando Poe", contactNumber: "09069991188", email: "fernando@example.com", address: "41 Recto Ave., Casiguran", carMakeModel: "Lexus LFA", plateNumber: "RST 9012", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 1250, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0014", registrationNumber: "CS27-0014", registrationDate: "2027-02-12T09:26:00Z", participantName: "Corazon Ramos", contactNumber: "09171114455", email: "corazon@example.com", address: "7 Aurora St., Barcelona", carMakeModel: "Audi R8 V10", plateNumber: "UVW 3456", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0015", registrationNumber: "CS27-0015", registrationDate: "2027-02-12T10:44:00Z", participantName: "Emilio Aguinaldo", contactNumber: "09286663377", email: "emilio@example.com", address: "19 Kawit St., Pilar", carMakeModel: "Tesla Model S Plaid", plateNumber: "XYZ 7890", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 2000, amountPaid: 2000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0016", registrationNumber: "CS27-0016", registrationDate: "2027-02-12T11:59:00Z", participantName: "Sylvia Marasigan", contactNumber: "09064447788", email: "sylvia@example.com", address: "52 Aguinaldo Hwy., Sorsogon City", carMakeModel: "Jeep Wrangler Rubicon", plateNumber: "ABC 9012", registrationType: "Exhibitor", status: "Pending", registrationFee: 2000, amountPaid: 500, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0017", registrationNumber: "CS27-0017", registrationDate: "2027-02-12T13:31:00Z", participantName: "Ramon Magsaysay", contactNumber: "09173336699", email: "ramon@example.com", address: "15 Ziga Ave., Sorsogon City", carMakeModel: "Toyota Land Cruiser 70", plateNumber: "DEF 1234", registrationType: "Competitor", status: "Cancelled", registrationFee: 2500, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0018", registrationNumber: "CS27-0018", registrationDate: "2027-02-12T15:05:00Z", participantName: "Teresita Bautista", contactNumber: "09287770022", email: "teresita@example.com", address: "29 Sorsogon St., Donsol", carMakeModel: "Nissan GT-R R35", plateNumber: "GHI 5678", registrationType: "VIP", status: "Confirmed", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0019", registrationNumber: "CS27-0019", registrationDate: "2027-02-13T08:15:00Z", participantName: "Bayani Alcantara", contactNumber: "09063335522", email: "bayani@example.com", address: "66 San Juan St., Prieto Diaz", carMakeModel: "Mitsubishi Lancer Evo IX", plateNumber: "JKL 9012", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 2500, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0020", registrationNumber: "CS27-0020", registrationDate: "2027-02-13T09:38:00Z", participantName: "Rosa Luna", contactNumber: "09175552288", email: "rosa@example.com", address: "8 Mabini Ext., Magallanes", carMakeModel: "Kia Stinger GT", plateNumber: "MNO 3456", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 2000, amountPaid: 2000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0021", registrationNumber: "CS27-0021", registrationDate: "2027-02-13T11:02:00Z", participantName: "Alfredo Santos", contactNumber: "09281119944", email: "alfredo@example.com", address: "74 Rizal St., Sta. Magdalena", carMakeModel: "Hyundai Ioniq 5 N", plateNumber: "PQR 7890", registrationType: "Exhibitor", status: "Pending", registrationFee: 2000, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0022", registrationNumber: "CS27-0022", registrationDate: "2027-02-13T12:20:00Z", participantName: "Gloria Diaz", contactNumber: "09068884466", email: "gloria@example.com", address: "35 Tordesillas St., Juban", carMakeModel: "Ferrari 296 GTB", plateNumber: "STU 1234", registrationType: "VIP", status: "Confirmed", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0023", registrationNumber: "CS27-0023", registrationDate: "2027-02-13T14:41:00Z", participantName: "Emmanuel Pelaez", contactNumber: "09174443355", email: "emmanuel@example.com", address: "2 Quarantina St., Bulusan", carMakeModel: "Lamborghini Huracan EVO", plateNumber: "VWX 5678", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 1000, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0024", registrationNumber: "CS27-0024", registrationDate: "2027-02-14T08:09:00Z", participantName: "Lourdes Estrada", contactNumber: "09282225533", email: "lourdes@example.com", address: "59 Gen. Luna St., Sorsogon City", carMakeModel: "Mini Cooper S JCW", plateNumber: "YZA 9012", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 2000, amountPaid: 0, paymentStatus: "Unpaid" },
  { id: "3f2c9a1e-0025", registrationNumber: "CS27-0025", registrationDate: "2027-02-14T09:54:00Z", participantName: "Ninoy Aquino III", contactNumber: "09065551177", email: "ninoy@example.com", address: "11 Concepcion St., Sorsogon City", carMakeModel: "Pagani Huayra", plateNumber: "BCD 3456", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000, amountPaid: 5000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0026", registrationNumber: "CS27-0026", registrationDate: "2027-02-14T11:16:00Z", participantName: "Marcela Agoncillo", contactNumber: "09173338811", email: "marcela@example.com", address: "46 Mabini St., Sorsogon City", carMakeModel: "Alfa Romeo Giulia QV", plateNumber: "EFG 7890", registrationType: "Competitor", status: "Pending", registrationFee: 2500, amountPaid: 1250, paymentStatus: "Partial" },
  { id: "3f2c9a1e-0027", registrationNumber: "CS27-0027", registrationDate: "2027-02-14T13:35:00Z", participantName: "Tomas Claudio", contactNumber: "09289996633", email: "tomas@example.com", address: "23 Magallanes St., Sorsogon City", carMakeModel: "Jaguar F-Type R", plateNumber: "HIJ 1234", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 2000, amountPaid: 2000, paymentStatus: "Paid" },
  { id: "3f2c9a1e-0028", registrationNumber: "CS27-0028", registrationDate: "2027-02-14T15:20:00Z", participantName: "Petra Alcantara", contactNumber: "09061117733", email: "petra@example.com", address: "91 Tolosa St., Gubat", carMakeModel: "Renault Megane RS", plateNumber: "KLM 5678", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500, amountPaid: 2500, paymentStatus: "Paid" },
];

function matchesFilters(r: Registration, filters: RegistrationFilters): boolean {
  const name = filters.participantName.trim().toLowerCase();
  const nameOk = name === "" || r.participantName.toLowerCase().includes(name);
  const typeOk = filters.type === "All" || r.registrationType === filters.type;
  const statusOk = filters.status === "All" || r.status === filters.status;
  return nameOk && typeOk && statusOk;
}

export async function getRegistrations(filters: RegistrationFilters): Promise<RegistrationListResponse> {
  const filtered = sampleRegistrations.filter((r) => matchesFilters(r, filters));
  const start = (filters.page - 1) * filters.pageSize;
  const items = filtered.slice(start, start + filters.pageSize);
  // Simulate network latency so loading states are visible.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    items,
    page: filters.page,
    pageSize: filters.pageSize,
    totalCount: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / filters.pageSize)),
  };
}

export async function getSummary(): Promise<RegistrationSummary> {
  const totalFees = sampleRegistrations.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = sampleRegistrations.reduce((sum, r) => sum + r.amountPaid, 0);

  // Simulate network latency so loading states are visible.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    totalRegistrations: sampleRegistrations.length,
    confirmed: sampleRegistrations.filter((r) => r.status === "Confirmed").length,
    checkedIn: sampleRegistrations.filter((r) => r.status === "CheckedIn").length,
    pending: sampleRegistrations.filter((r) => r.status === "Pending").length,
    cancelled: sampleRegistrations.filter((r) => r.status === "Cancelled").length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}

import { useState } from "react";
import type { Registration, RegistrationType, RegistrationStatus } from "../api/types";

interface AddRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (registration: Omit<Registration, "id" | "registrationNumber" | "registrationDate" | "paymentStatus">) => void;
}

const TYPE_OPTIONS: RegistrationType[] = ["Exhibitor", "Competitor", "VIP"];
const STATUS_OPTIONS: RegistrationStatus[] = ["Pending", "Confirmed", "CheckedIn", "Cancelled"];

// Predefined car options for the select dropdown
const CAR_OPTIONS = [
  "Toyota Supra MK4",
  "Ford Mustang GT",
  "Honda Civic Type R",
  "Mazda MX-5 Miata",
  "Nissan Skyline R34",
  "Chevrolet Camaro SS",
  "Subaru WRX STI",
  "Porsche 911 Carrera",
  "BMW M3 E46",
  "Mercedes-Benz AMG GT",
  "Dodge Challenger Hellcat",
  "Volkswagen Golf R",
  "Lexus LFA",
  "Audi R8 V10",
  "Tesla Model S Plaid",
  "Jeep Wrangler Rubicon",
  "Toyota Land Cruiser 70",
  "Nissan GT-R R35",
  "Mitsubishi Lancer Evo IX",
  "Kia Stinger GT",
  "Hyundai Ioniq 5 N",
  "Ferrari 296 GTB",
  "Lamborghini Huracan EVO",
  "Mini Cooper S JCW",
  "Pagani Huayra",
  "Alfa Romeo Giulia QV",
  "Jaguar F-Type R",
  "Renault Megane RS",
  "Other (specify)",
];

export function AddRegistrationModal({ isOpen, onClose, onAdd }: AddRegistrationModalProps) {
  const [formData, setFormData] = useState({
    participantName: "",
    contactNumber: "",
    email: "",
    address: "",
    carMakeModel: "",
    customCar: "",
    plateNumber: "",
    registrationType: "Exhibitor" as RegistrationType,
    status: "Pending" as RegistrationStatus,
    registrationFee: "",
    amountPaid: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.participantName.trim()) {
      newErrors.participantName = "Participant name is required";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.carMakeModel) {
      newErrors.carMakeModel = "Car is required";
    }
    if (formData.carMakeModel === "Other (specify)" && !formData.customCar.trim()) {
      newErrors.customCar = "Please specify the car model";
    }
    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = "Plate number is required";
    }
    if (!formData.registrationFee) {
      newErrors.registrationFee = "Registration fee is required";
    } else if (parseFloat(formData.registrationFee) < 0) {
      newErrors.registrationFee = "Fee must be positive";
    }
    if (!formData.amountPaid) {
      newErrors.amountPaid = "Amount paid is required";
    } else if (parseFloat(formData.amountPaid) < 0) {
      newErrors.amountPaid = "Amount paid must be positive";
    } else if (formData.registrationFee && parseFloat(formData.amountPaid) > parseFloat(formData.registrationFee)) {
      newErrors.amountPaid = "Amount paid cannot exceed registration fee";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const carValue = formData.carMakeModel === "Other (specify)" ? formData.customCar : formData.carMakeModel;

    const fee = parseFloat(formData.registrationFee);
    const paid = parseFloat(formData.amountPaid);

    const newRegistration: Omit<Registration, "id" | "registrationNumber" | "registrationDate" | "paymentStatus"> = {
      participantName: formData.participantName.trim(),
      contactNumber: formData.contactNumber.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      carMakeModel: carValue,
      plateNumber: formData.plateNumber.trim().toUpperCase(),
      registrationType: formData.registrationType,
      status: formData.status,
      registrationFee: fee,
      amountPaid: paid,
    };

    onAdd(newRegistration);
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sticky top-0 bg-white z-10">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-800">
            Add New Participant
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Participant Info Section */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-slate-700">Participant Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="participantName" className="block text-xs font-medium text-slate-500 mb-1">
                  Participant Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="participantName"
                  type="text"
                  value={formData.participantName}
                  onChange={(e) => handleChange("participantName", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.participantName ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="Juan Dela Cruz"
                  aria-invalid={errors.participantName ? "true" : "false"}
                  aria-describedby={errors.participantName ? "participantName-error" : undefined}
                />
                {errors.participantName && (
                  <p id="participantName-error" className="mt-1 text-xs text-red-600" role="alert">{errors.participantName}</p>
                )}
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-xs font-medium text-slate-500 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.contactNumber ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="09171234567"
                  aria-invalid={errors.contactNumber ? "true" : "false"}
                  aria-describedby={errors.contactNumber ? "contactNumber-error" : undefined}
                />
                {errors.contactNumber && (
                  <p id="contactNumber-error" className="mt-1 text-xs text-red-600" role="alert">{errors.contactNumber}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-500 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.email ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="juan@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-xs font-medium text-slate-500 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.address ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="123 Rizal St., Naga City"
                  aria-invalid={errors.address ? "true" : "false"}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                {errors.address && (
                  <p id="address-error" className="mt-1 text-xs text-red-600" role="alert">{errors.address}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Car Info Section */}
          <fieldset className="space-y-4 border-t border-slate-200 pt-4">
            <legend className="text-sm font-medium text-slate-700">Car Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="carMakeModel" className="block text-xs font-medium text-slate-500 mb-1">
                  Car <span className="text-red-500">*</span>
                </label>
                <select
                  id="carMakeModel"
                  value={formData.carMakeModel}
                  onChange={(e) => handleChange("carMakeModel", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.carMakeModel ? "border-red-300" : "border-slate-300"
                  }`}
                  aria-invalid={errors.carMakeModel ? "true" : "false"}
                  aria-describedby={errors.carMakeModel ? "carMakeModel-error" : undefined}
                >
                  <option value="">Select a car…</option>
                  {CAR_OPTIONS.map((car) => (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  ))}
                </select>
                {errors.carMakeModel && (
                  <p id="carMakeModel-error" className="mt-1 text-xs text-red-600" role="alert">{errors.carMakeModel}</p>
                )}
              </div>
              <div>
                <label htmlFor="customCar" className="block text-xs font-medium text-slate-500 mb-1">
                  Specify Car Model
                </label>
                <input
                  id="customCar"
                  type="text"
                  value={formData.customCar}
                  onChange={(e) => handleChange("customCar", e.target.value)}
                  disabled={formData.carMakeModel !== "Other (specify)"}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    formData.carMakeModel !== "Other (specify)" ? "bg-slate-50 cursor-not-allowed" : ""
                  } ${errors.customCar ? "border-red-300" : "border-slate-300"}`}
                  placeholder="Enter car make & model"
                  aria-invalid={errors.customCar ? "true" : "false"}
                  aria-describedby={errors.customCar ? "customCar-error" : undefined}
                />
                {errors.customCar && (
                  <p id="customCar-error" className="mt-1 text-xs text-red-600" role="alert">{errors.customCar}</p>
                )}
              </div>
              <div>
                <label htmlFor="plateNumber" className="block text-xs font-medium text-slate-500 mb-1">
                  Plate Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="plateNumber"
                  type="text"
                  value={formData.plateNumber}
                  onChange={(e) => handleChange("plateNumber", e.target.value.toUpperCase())}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.plateNumber ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="ABC 1234"
                  aria-invalid={errors.plateNumber ? "true" : "false"}
                  aria-describedby={errors.plateNumber ? "plateNumber-error" : undefined}
                />
                {errors.plateNumber && (
                  <p id="plateNumber-error" className="mt-1 text-xs text-red-600" role="alert">{errors.plateNumber}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Registration Details Section */}
          <fieldset className="space-y-4 border-t border-slate-200 pt-4">
            <legend className="text-sm font-medium text-slate-700">Registration Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="registrationType" className="block text-xs font-medium text-slate-500 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="registrationType"
                  value={formData.registrationType}
                  onChange={(e) => handleChange("registrationType", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-slate-300`}
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-xs font-medium text-slate-500 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-slate-300`}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status === "CheckedIn" ? "Checked In" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Payment status is auto-calculated: <strong>Unpaid</strong> (₱0), <strong>Partial</strong> (less than fee), or <strong>Paid</strong> (equal to fee).
            </p>
          </fieldset>

          {/* Fee Section */}
          <fieldset className="space-y-4 border-t border-slate-200 pt-4">
            <legend className="text-sm font-medium text-slate-700">Fee / Paid</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="registrationFee" className="block text-xs font-medium text-slate-500 mb-1">
                  Registration Fee (₱) <span className="text-red-500">*</span>
                </label>
                <input
                  id="registrationFee"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.registrationFee}
                  onChange={(e) => handleChange("registrationFee", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.registrationFee ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="2500.00"
                  aria-invalid={errors.registrationFee ? "true" : "false"}
                  aria-describedby={errors.registrationFee ? "registrationFee-error" : undefined}
                />
                {errors.registrationFee && (
                  <p id="registrationFee-error" className="mt-1 text-xs text-red-600" role="alert">{errors.registrationFee}</p>
                )}
              </div>
              <div>
                <label htmlFor="amountPaid" className="block text-xs font-medium text-slate-500 mb-1">
                  Amount Paid (₱) <span className="text-red-500">*</span>
                </label>
                <input
                  id="amountPaid"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amountPaid}
                  onChange={(e) => handleChange("amountPaid", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.amountPaid ? "border-red-300" : "border-slate-300"
                  }`}
                  placeholder="0.00"
                  aria-invalid={errors.amountPaid ? "true" : "false"}
                  aria-describedby={errors.amountPaid ? "amountPaid-error" : undefined}
                />
                {errors.amountPaid && (
                  <p id="amountPaid-error" className="mt-1 text-xs text-red-600" role="alert">{errors.amountPaid}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 sticky bottom-0 bg-white pb-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
namespace Application.Features.Registrations.CreateRegistration;

public sealed record CreateRegistrationResponse(
Guid Id,
string RegistrationNumber,
DateTime RegistrationDate,
string ParticipantName,
string ContactNumber,
string Email,
string Address,
string CarMakeModel,
string PlateNumber,
string RegistrationType,
string Status,
decimal RegistrationFee,
decimal AmountPaid,
string PaymentStatus
);
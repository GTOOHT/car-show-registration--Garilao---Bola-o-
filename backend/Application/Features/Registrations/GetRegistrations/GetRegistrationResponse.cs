namespace Application.Features.Registrations.GetRegistrations;

public sealed record GetRegistrationsResponse(
IReadOnlyList<RegistrationListItem> Items,
int Page,
int PageSize,
int TotalCount,
int TotalPages
);

public sealed record RegistrationListItem(
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
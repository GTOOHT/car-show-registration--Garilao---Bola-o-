using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrations;

public sealed record GetRegistrationsQuery(
string? Type = null,
string? Status = null,
string? ParticipantName = null,
int Page = 1,
int PageSize = 10
) : IQuery<Result<GetRegistrationsResponse>>;
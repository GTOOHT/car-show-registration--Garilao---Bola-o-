using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrationSummary;

public sealed record GetRegistrationSummayQuery()
    : IQuery<Result<GetRegistrationSummaryResponse>>;
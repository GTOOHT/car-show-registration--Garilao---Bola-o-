using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registrations.GetRegistrationById;

public sealed record GetRegistrationByIdQuery(Guid Id)
    : IQuery<Result<GetRegistrationByIdResponse>>;
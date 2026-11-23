using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.GetRegistrations;

public sealed class GetRegistrationsHandler
: IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>> {
    private readonly IAppDbContext _context;

    public GetRegistrationsHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<GetRegistrationsResponse>> HandleAsync(
    GetRegistrationsQuery query,
    CancellationToken cancellationToken = default)
    {
        var registrations = _context.Registrations.AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Type))
        {
            var type = Enum.Parse<RegistrationType>(query.Type, true);
            registrations = registrations.Where(r => r.RegistrationType == type);
        }

        if (!string.IsNullOrWhiteSpace(query.Status))
        {
            var status = Enum.Parse<RegistrationStatus>(query.Status, true);
            registrations = registrations.Where(r => r.Status == status);
        }

        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var name = query.ParticipantName.Trim().ToLower();

            registrations = registrations.Where(r => r.ParticipantName.ToLower().Contains(name));
        }

        var totalCount = await registrations.CountAsync(cancellationToken);

        var items = await registrations
        .OrderByDescending(r => r.RegistrationDate)
        .Skip((query.Page - 1) * query.PageSize)
        .Take(query.PageSize)
        .Select(r => new RegistrationListItem(
        r.Id,
        r.RegistrationNumber,
        r.RegistrationDate,
        r.ParticipantName,
        r.ContactNumber,
        r.Email,
        r.Address,
        r.CarMakeModel,
        r.PlateNumber,
        r.RegistrationType.ToString(),
        r.Status.ToString(),
        r.RegistrationFee,
        r.AmountPaid,
        r.PaymentStatus
        ))
        .ToListAsync(cancellationToken);

        var totalPages = (int)Math.Ceiling(
        totalCount / (double)query.PageSize);

        var response = new GetRegistrationsResponse(
        items,
        query.Page,
        query.PageSize,
        totalCount,
        totalPages
        );

        return Result<GetRegistrationsResponse>.Success(response);
    }
}
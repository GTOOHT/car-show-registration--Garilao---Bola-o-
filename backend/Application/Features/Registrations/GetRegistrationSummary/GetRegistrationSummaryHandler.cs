using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.GetRegistrationSummary;

public sealed class GetRegistrationSummaryHandler
: IQueryHandler<GetRegistrationSummayQuery, Result<GetRegistrationSummaryResponse>> 
{
    private readonly IAppDbContext _context;

    public GetRegistrationSummaryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<GetRegistrationSummaryResponse>> 
    HandleAsync(
    GetRegistrationSummayQuery query,
    CancellationToken cancellationToken = default)
    {
        var registrations = _context.Registrations.AsNoTracking();

        var totalRegistrations = await registrations.CountAsync(cancellationToken);

        var confirmed = await registrations.CountAsync(
        r => r.Status == RegistrationStatus.Confirmed,
        cancellationToken);

        var checkedIn = await registrations.CountAsync(
        r => r.Status == RegistrationStatus.CheckedIn,
        cancellationToken);

        var pending = await registrations.CountAsync(
        r => r.Status == RegistrationStatus.Pending,
        cancellationToken);

        var cancelled = await registrations.CountAsync(
        r => r.Status == RegistrationStatus.Cancelled,
        cancellationToken);

        var totalFees = await registrations
        .Where(r => r.Status != RegistrationStatus.Cancelled)
        .SumAsync(r => (decimal?)r.RegistrationFee, cancellationToken) ?? 0m;

        var totalPayments = await registrations
        .Where(r => r.Status != RegistrationStatus.Cancelled)
        .SumAsync(r => (decimal?)r.AmountPaid, cancellationToken) ?? 0m;

        var response = new GetRegistrationSummaryResponse(
        totalRegistrations,
        confirmed,
        checkedIn,
        pending,
        cancelled,
        totalFees,
        totalPayments,
        totalFees - totalPayments
        );

        return Result<GetRegistrationSummaryResponse>.Success(response);
    }
}
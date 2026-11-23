using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationHandler
: ICommandHandler<CreateRegistrationCommand,Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _context;

    public CreateRegistrationHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
    CreateRegistrationCommand command,
    CancellationToken cancellationToken = default)
    {
        var plateNumber = command.PlateNumber.Trim().ToUpperInvariant();

        var plateExists = await _context.Registrations
        .AnyAsync(r => r.PlateNumber.ToUpper() == plateNumber, cancellationToken);

        if (plateExists)
        {
            return Result<CreateRegistrationResponse>.Failure(
            new Error(
            "Registration.Conflict.DuplicatePlateNumber",
            "A registration with this plate number already exists."
            )
            );
        }

        var lastRegistration = await _context.Registrations
        .OrderByDescending(r => r.RegistrationNumber)
        .FirstOrDefaultAsync(cancellationToken);

        var nextNumber = lastRegistration == null
        ? 1
        : int.Parse(lastRegistration.RegistrationNumber.Split('-')[1]) + 1;

        var fee = command.RegistrationType switch
        {
            RegistrationType.Exhibitor => 1500m,
            RegistrationType.Competitor => 2500m,
            RegistrationType.VIP => 5000m,
            _ => 0m
        };

        if (command.AmountPaid < 0 || command.AmountPaid > fee)
        {
            return Result<CreateRegistrationResponse>.Failure(
            Error.Validation(
            "Registration.Validation.InvalidAmountPaid",
            "Amount paid must be between zero and the registration fee."
            )
            );
        }

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = $"CS27-{nextNumber:D4}",
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = plateNumber,
            RegistrationType = command.RegistrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        _context.Registrations.Add(registration);

        await _context.SaveChangesAsync(cancellationToken);

        var response = new CreateRegistrationResponse(
        registration.Id,
        registration.RegistrationNumber,
        registration.RegistrationDate,
        registration.ParticipantName,
        registration.ContactNumber,
        registration.Email,
        registration.Address,
        registration.CarMakeModel,
        registration.PlateNumber,
        registration.RegistrationType.ToString(),
        registration.Status.ToString(),
        registration.RegistrationFee,
        registration.AmountPaid,
        registration.PaymentStatus
        );

        return Result<CreateRegistrationResponse>.Success(response);
    }
}
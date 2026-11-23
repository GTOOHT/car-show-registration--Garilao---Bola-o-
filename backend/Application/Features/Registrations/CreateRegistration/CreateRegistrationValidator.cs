using Application.Features.Registrations.CreateRegistration;
using FluentValidation;

namespace Application.Features.Registrations.CreateRegistration;

public sealed class CreateRegistrationValidator
: AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
        .NotEmpty()
        .MaximumLength(150);

        RuleFor(x => x.ContactNumber)
        .NotEmpty()
        .Matches(@"^09\d{9}$")
        .WithMessage("Contact number must be a valid Philippine mobile number (09XXXXXXXXX).");

        RuleFor(x => x.Email)
        .NotEmpty()
        .EmailAddress()
        .MaximumLength(200);

        RuleFor(x => x.Address)
        .NotEmpty()
        .MaximumLength(300);

        RuleFor(x => x.CarMakeModel)
        .NotEmpty()
        .MaximumLength(100);

        RuleFor(x => x.PlateNumber)
        .NotEmpty()
        .MaximumLength(15);

        RuleFor(x => x.RegistrationType)
        .IsInEnum();

        RuleFor(x => x.AmountPaid)
        .GreaterThanOrEqualTo(0);
    }
}
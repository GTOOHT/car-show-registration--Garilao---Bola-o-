using FluentValidation;

namespace Application.Features.Registrations.GetRegistrations;

public sealed class GetRegistrationsValidator
: AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.Page)
        .GreaterThanOrEqualTo(1);

        RuleFor(x => x.PageSize)
        .InclusiveBetween(1, 50);

        RuleFor(x => x.ParticipantName)
        .MaximumLength(150);

        RuleFor(x => x.Type)
        .Must(BeValidType)
        .When(x => !string.IsNullOrWhiteSpace(x.Type))
        .WithMessage("Registration type must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.Status)
        .Must(BeValidStatus)
        .When(x => !string.IsNullOrWhiteSpace(x.Status))
        .WithMessage("Status must be Pending, Confirmed, CheckedIn, or Cancelled.");
    }

    private static bool BeValidType(string? type) => Enum.TryParse<Domain.Enums.RegistrationType>(type, true, out var parsed) && Enum.IsDefined(parsed);

    private static bool BeValidStatus(string? status) => Enum.TryParse<Domain.Enums.RegistrationStatus>(status, true, out var parsed) && Enum.IsDefined(parsed);
}
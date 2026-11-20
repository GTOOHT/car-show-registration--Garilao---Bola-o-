using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;


public class Registration : BaseEntity
{
    public string RegistrationNumber { get; set; } = string.Empty;

    public DateTime RegistrationDate { get; set; }

    public string ParticipantName { get; set; } = string.Empty;

    public string ContactNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string CarMakeModel { get; set; } = string.Empty;

    public string PlateNumber { get; set; } = string.Empty;

    public RegistrationType RegistrationType { get; set; }

    public RegistrationStatus Status { get; set; } = RegistrationStatus.Pending;

    public decimal RegistrationFee { get; set; }

    public decimal AmountPaid { get; set; }

    public string PaymentStatus => AmountPaid == 0 ? "Unpaid" :
    AmountPaid < RegistrationFee ? "Partial" : "Paid";
}
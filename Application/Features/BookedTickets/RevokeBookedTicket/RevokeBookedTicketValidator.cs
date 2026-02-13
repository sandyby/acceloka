using AccelokaSandy.Application.Features.BookedTickets.RevokeBookedTicket;
using FluentValidation;

public class RevokeBookedTicketValidator : AbstractValidator<RevokeBookedTicketCommand>
{

    public RevokeBookedTicketValidator()
    {
        RuleFor(rt => rt.BookedTicketId).NotEmpty().WithMessage("Booked ticket ID is required!");
        RuleFor(rt => rt.Quantity).GreaterThan(0).WithMessage("Quantity to revoke must be greater than 0!");
    }
}
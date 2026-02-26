using System.Data;
using Application.Features.BookedTickets.EditBookedTicket;
using FluentValidation;

public class EditBookedTicketValidator : AbstractValidator<EditBookedTicketCommand>
{
    public EditBookedTicketValidator()
    {
        RuleFor(bt => bt.BookedTicketId).NotEmpty().WithMessage("Booked ticket ID is required!");
        RuleFor(bt => bt.ToBeEditedBookedTickets).NotEmpty().WithMessage("Please edit at least one booked ticket!");
        RuleForEach(bt => bt.ToBeEditedBookedTickets).ChildRules(btc =>
        {
            btc.RuleFor(bt => bt.BookedTicketCode).NotEmpty().WithMessage("Booked ticket code is required!");
            btc.RuleFor(bt => bt.NewQuantity).GreaterThanOrEqualTo(1).WithMessage("The new quantity must be at least 1!");
        });
        RuleFor(bt => bt.ToBeEditedBookedTickets).Must(bts => bts.GroupBy(t => t.BookedTicketCode, StringComparer.OrdinalIgnoreCase).All(g => g.Count() == 1)).WithMessage("No duplicate booked ticket codes are allowed in the edit request body!");
    }
}
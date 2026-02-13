using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using FluentValidation;

public class BookTicketsValidator : AbstractValidator<BookTicketsCommand>
{
    public BookTicketsValidator()
    {
        RuleFor(bts => bts.BookedTickets).NotEmpty().WithMessage("Please book at least one ticket!");
        RuleForEach(bts => bts.BookedTickets).ChildRules(bt =>
        {
            bt.RuleFor(t => t.TicketCode).NotEmpty().WithMessage("Ticket code is required!");
            bt.RuleFor(t => t.Quantity).GreaterThan(0).WithMessage("Quantity must be greater than 0!");
        });
    }
}
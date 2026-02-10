using AccelokaSandy.Requests.Tickets;
using FluentValidation;

public class CreateTicketValidator : AbstractValidator<CreateTicket>
{
    public CreateTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty();
        RuleFor(t => t.TicketName).NotEmpty();
        RuleFor(t => t.TicketCategory).NotEmpty();
        RuleFor(t => t.Quota).NotEmpty();
        RuleFor(t => t.Price).NotEmpty();
        RuleFor(t => t.EventDate).NotEmpty();
    }
}
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateTicketValidator : AbstractValidator<CreateTicketCommand>
{
    public CreateTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty();
        RuleFor(t => t.TicketName).NotEmpty();
        RuleFor(t => t.TicketCategoryId).NotEmpty();
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0);
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0);
        RuleFor(t => t.EventDate).GreaterThan(DateTime.UtcNow);
    }
}
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateConcertTicketValidator : AbstractValidator<CreateConcertTicketCommand>
{
    public CreateConcertTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryName).NotEmpty().WithMessage("Ticket category name is required!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        RuleFor(t => t.Venue).NotEmpty().WithMessage("Concert venue is required!");
        RuleFor(t => t.Artist).NotEmpty().WithMessage("Artist is required!");
        RuleFor(t => t.SeatSection).NotEmpty().WithMessage("Seat section is required!");
        RuleFor(t => t.ConcertDate).NotEmpty().WithMessage("Concert date is required!");
        RuleFor(t => t.Duration).Must(d => d > TimeSpan.Zero).WithMessage("Duration must be greater than 0!");
        RuleFor(t => t.ConcertDate).Must(cd => cd > DateTime.Today.AddHours(1)).WithMessage("Concert time must be at least 1 hour after the ticket is ");
    }
}
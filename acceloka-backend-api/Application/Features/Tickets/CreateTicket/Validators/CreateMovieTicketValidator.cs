using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateMovieTicketValidator : AbstractValidator<CreateMovieTicketCommand>
{
    public CreateMovieTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryName).NotEmpty().WithMessage("Ticket category name is required!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        RuleFor(t => t.Cinema).NotEmpty().WithMessage("Cinema is required!");
        RuleFor(t => t.CinemaType).NotEmpty().WithMessage("Cinema type is required!");
        RuleFor(t => t.SeatSection).NotEmpty().WithMessage("Seat section is required!");
        RuleFor(t => t.Duration).Must(d => d > TimeSpan.Zero).WithMessage("Duration must be greater than 0!");
        RuleFor(t => t.ScreeningTime).Must(sd => sd > DateTime.Today.AddHours(24)).WithMessage("Screening time must be at least 24 hour after the ticket is created!");
    }
}
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateBusTicketValidator : AbstractValidator<CreateBusTicketCommand>
{
    public CreateBusTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryName).NotEmpty().WithMessage("Ticket category name is required!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        RuleFor(t => t.BusCode).NotEmpty().WithMessage("Bus code is required!");
        RuleFor(t => t.BusType).NotEmpty().WithMessage("Bus type is required!");
        RuleFor(t => t.SeatClass).NotEmpty().WithMessage("Seat class is required!");
        RuleFor(t => t.DepartureStop).NotEmpty().WithMessage("Departure stop is required!");
        RuleFor(t => t.ArrivalStop).NotEmpty().WithMessage("Arrival stop is required!");
        RuleFor(t => t.Duration).Must(d => d > TimeSpan.Zero).WithMessage("Duration must be greater than 0!");
        RuleFor(t => t.DepartureTime).Must(dt => dt > DateTime.Today.AddHours(24)).WithMessage("Departure time must be at least 24 hour after the ticket is created!");
        RuleFor(t => t.TransitsCount).GreaterThanOrEqualTo(0).WithMessage("Transits count must be at least 0!");
    }
}
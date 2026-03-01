using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateFlightTicketValidator : AbstractValidator<CreateFlightTicketCommand>
{
    public CreateFlightTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryName).NotEmpty().WithMessage("Ticket category name is required!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        RuleFor(t => t.Airline).NotEmpty().WithMessage("Airline name is required!");
        RuleFor(t => t.SeatClass).NotEmpty().WithMessage("Seatclass is required!");
        RuleFor(t => t.DepartureAirport).NotEmpty().WithMessage("Departure airport is required!");
        RuleFor(t => t.ArrivalAirport).NotEmpty().WithMessage("Arrival airport is required!");
        RuleFor(t => t.DepartureTime).NotEmpty().WithMessage("Departure time is required!");
        RuleFor(t => t.Duration).Must(d => d > TimeSpan.Zero).WithMessage("Duration must be greater than 0!");
        RuleFor(t => t.BaggageKg).GreaterThanOrEqualTo(0).WithMessage("Baggages weight must be greater than or equal to 0!");
        RuleFor(t => t.TransitsCount).GreaterThanOrEqualTo(0).WithMessage("Transits count must be greater than or equal to 0!");
    }
}
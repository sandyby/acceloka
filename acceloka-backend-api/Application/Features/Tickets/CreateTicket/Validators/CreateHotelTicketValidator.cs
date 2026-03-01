using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateHotelTicketValidator : AbstractValidator<CreateHotelTicketCommand>
{
    public CreateHotelTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryName).NotEmpty().WithMessage("Ticket category name is required!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        RuleFor(t => t.HotelName).NotEmpty().WithMessage("Hotel name is required!");
        RuleFor(t => t.RoomType).NotEmpty().WithMessage("Room type is required!");
        RuleFor(t => t.MinCheckInDate).NotEmpty().WithMessage("Min. check out date is required!");
        RuleFor(t => t.MaxCheckOutDate).NotEmpty().WithMessage("Max. check out date is required!");
        RuleFor(t => t.MinCheckInDate).GreaterThan(DateTime.UtcNow.AddHours(1)).WithMessage("Min. check in time must be at least 1 hour after the ticket is created!");
        RuleFor(t => t.MaxCheckOutDate).GreaterThan(t => t.MinCheckInDate.AddDays(1)).WithMessage("Max. check out date must at least be 1 day after check in date!");
    }
}
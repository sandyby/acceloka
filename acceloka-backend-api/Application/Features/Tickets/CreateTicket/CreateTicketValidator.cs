using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using FluentValidation;

public class CreateTicketValidator : AbstractValidator<CreateTicketCommand>
{
    public CreateTicketValidator()
    {
        RuleFor(t => t.TicketCode).NotEmpty().MinimumLength(3).WithMessage("Ticket code is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketName).NotEmpty().MinimumLength(3).WithMessage("Ticket name is required and must be at least 3 characters long!");
        RuleFor(t => t.TicketCategoryId).NotEmpty().WithMessage("Ticket category ID is required!");
        RuleFor(t => t.Quota).GreaterThanOrEqualTo(0).WithMessage("Quota must be greater than or equal to 0!");
        RuleFor(t => t.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0!");
        // karena ini cuma sebagai helper populasi data, jadi event date dibuat harus di tanggal yang sama saja, karena memang seharusnya ada rule tambahan atau semacamnya jika di real prod app, mungkin seperti registrasi ticket sales minimal bbrp jam sebelum event datenya atau semacamnya
        RuleFor(t => t.EventDate).GreaterThan(DateTime.UtcNow.Date).WithMessage("Event date must be today or in the future!");
    }
}
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using FluentValidation;

public class GetAvailableTicketsValidator : AbstractValidator<GetAvailableTicketsQuery>
{
    private readonly HashSet<string> _allowedOrderByFields = new(StringComparer.OrdinalIgnoreCase)
    {
        "TicketCode",
        "TicketName",
        "TicketCategory",
        "Price",
        "EventDate"
    };

    private readonly HashSet<string> _allowedOrderStates = new(StringComparer.OrdinalIgnoreCase)
    {
        "asc", "desc"
    };

    public GetAvailableTicketsValidator()
    {
        RuleFor(t => t.MaxPrice).GreaterThanOrEqualTo(0).When(t => t.MaxPrice.HasValue).WithMessage("Max. price must be greater than or equal to 0!");
        RuleFor(t => t.MinEventDate).GreaterThanOrEqualTo(DateTime.UtcNow.Date).When(t => t.MinEventDate.HasValue).WithMessage("Min. event date must be today or in the upcoming days!");
        RuleFor(t => t.MaxEventDate).GreaterThanOrEqualTo(DateTime.UtcNow.Date).When(t => t.MaxEventDate.HasValue).WithMessage("Max. event date must be today or in the upcoming days!");
        RuleFor(t => t.MaxEventDate).GreaterThanOrEqualTo(t => t.MinEventDate).When(t => t.MinEventDate.HasValue && t.MaxEventDate.HasValue).WithMessage("Max. event date must be greater than or equal to min. event date!");
        RuleFor(t => t.PageNumber).GreaterThan(0).WithMessage("Page number must be greater than 0!");
        RuleFor(t => t.PageSize).GreaterThan(0).LessThanOrEqualTo(20).WithMessage("Page size must be between 1 and 20!");
        RuleFor(t => t.OrderBy).Must(t => string.IsNullOrWhiteSpace(t) || _allowedOrderByFields.Contains(t)).WithMessage($"Order by must be one of the following: {string.Join(", ", _allowedOrderByFields)}");
        RuleFor(t => t.OrderState).Must(t => string.IsNullOrWhiteSpace(t) || _allowedOrderStates.Contains(t)).WithMessage($"Order state must be one of the following: {string.Join(", ", _allowedOrderStates)}");

        // ! somehow in development env, return error responsesnya untuk orderby & orderstate berbeda dengan di production env, jadi kalau mau sesuai standard rfc or clean responses, boleh diubah dulu di launchsettings.json ke production, tapi no swagger ui, via query only
    }
}
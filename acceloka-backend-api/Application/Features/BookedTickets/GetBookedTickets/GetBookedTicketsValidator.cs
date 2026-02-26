using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
using FluentValidation;

public class GetBookedTicketsValidator : AbstractValidator<GetBookedTicketsQuery>
{
    private readonly HashSet<string> _allowedOrderByFields = new(StringComparer.OrdinalIgnoreCase)
    {
        "TicketCategory",
        "EventDate",
        "BookedAt",
    };
    private readonly HashSet<string> _allowedOrderStates = new(StringComparer.OrdinalIgnoreCase)
    {
        "asc",
        "desc"
    };
    public GetBookedTicketsValidator()
    {
        RuleFor(t => t.MaxBookedAt).GreaterThanOrEqualTo(t => t.MinBookedAt).When(t => t.MinBookedAt.HasValue && t.MaxBookedAt.HasValue).WithMessage("Max. booked at must be greater than or equal to min. booked at!");
        RuleFor(t => t.MaxEventDate).GreaterThanOrEqualTo(t => t.MinEventDate).When(t => t.MinEventDate.HasValue && t.MaxEventDate.HasValue).WithMessage("Max. event date must be greater than or equal to min. event date!");
        RuleFor(t => t.PageNumber).GreaterThan(0).WithMessage("Page number must be greater than 0!");
        RuleFor(t => t.PageSize).GreaterThan(0).LessThanOrEqualTo(20).WithMessage("Page size must be between 1 and 20!");
        RuleFor(t => t.OrderBy).Must(t => string.IsNullOrWhiteSpace(t) || _allowedOrderByFields.Contains(t)).WithMessage($"Order by must be one of the following: {string.Join(", ", _allowedOrderByFields)}");
        RuleFor(t => t.OrderState).Must(t => string.IsNullOrWhiteSpace(t) || _allowedOrderStates.Contains(t)).WithMessage("Order state must be either 'asc' or 'desc'!");
    }
}
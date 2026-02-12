using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using FluentValidation;

public class GetAvailableTicketsValidator : AbstractValidator<GetAvailableTicketsQuery>
{
    public GetAvailableTicketsValidator()
    {
        RuleFor(t => t.MaxPrice).GreaterThanOrEqualTo(0).When(t => t.MaxPrice.HasValue);
        RuleFor(t => t.MaxEventDate).GreaterThanOrEqualTo(t => t.MinEventDate).When(t => t.MinEventDate.HasValue && t.MaxEventDate.HasValue);
        RuleFor(t => t.MinEventDate).LessThanOrEqualTo(t => t.MaxEventDate).When(t => t.MinEventDate.HasValue && t.MaxEventDate.HasValue);
        RuleFor(t => t.MinEventDate).GreaterThanOrEqualTo(DateTime.UtcNow.Date).When(t => t.MinEventDate.HasValue);
        RuleFor(t => t.MaxEventDate).GreaterThanOrEqualTo(DateTime.UtcNow.Date).When(t => t.MaxEventDate.HasValue);
        RuleFor(t => t.PageNumber).GreaterThan(0);
        RuleFor(t => t.PageSize).GreaterThan(0).LessThanOrEqualTo(20);
        //     string? TicketCategory,
        // string? TicketCode,
        // string? TicketName,
        // int? MaxPrice,
        // DateTime? MinEventDate,
        // DateTime? MaxEventDate,
        // string? OrderBy = "TicketCode",
        // string? OrderState = "asc",
        // int PageNumber = 1,
        // int PageSize = 10
    }
}
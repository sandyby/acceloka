using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;

public record GetAvailableTicketsQuery(
    string? TicketCategory,
    string? TicketCode,
    string? TicketName,
    int? MaxPrice,
    DateTime? MinEventDate,
    DateTime? MaxEventDate,
    string? OrderBy = "TicketCode",
    string? OrderState = "asc",
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<GetAvailableTicketsResponse>;
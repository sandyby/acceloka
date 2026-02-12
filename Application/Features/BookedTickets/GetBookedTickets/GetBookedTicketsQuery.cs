using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;

public record GetBookedTicketsQuery(
    string? TicketCategory,
    DateTime? MinEventDate,
    DateTime? MaxEventDate,
    string? OrderBy = "TicketCode",
    string? OrderState = "asc",
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<GetBookedTicketsResponse>;
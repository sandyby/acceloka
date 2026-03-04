using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;

public record GetAvailableTicketsQuery(
    string? TicketCategory,
    string? TicketCode,
    string? TicketName,
    int? MaxPrice,
    // DateTime? MinEventDate,
// DateTime? MaxEventDate,

    // flight stuff coba dlu
    DateTime? MinDeparture,
    DateTime? MaxDeparture,
    DateTime? MinArrival,
    DateTime? MaxArrival,
    string? Airline,
    List<string>? Amenities,
    string? SeatClass,

    string? OrderBy = "TicketCode",
    string? OrderState = "asc",
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<GetAvailableTicketsResponse>;
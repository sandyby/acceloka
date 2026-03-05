using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;

public record GetAvailableTicketsQuery(
    string? TicketCategory,
    string? TicketCode,
    string? TicketName,
    int? MaxPrice,
    bool? Direct,

    DateTime? MinDeparture,
    DateTime? MaxDeparture,
    DateTime? MinArrival,
    DateTime? MaxArrival,
    string[]? Airlines,
    string[]? Amenities,
    string[]? SeatClasses,
    int? BaggageKg,

    DateTime? MinCheckIn,
    DateTime? MaxCheckOut,
    string[]? HotelNames,
    string[]? RoomTypes,
    int? MaxOccupancy,

    DateTime? MinConcert,
    DateTime? MaxConcert,
    string[]? Venues,
    string[]? Artists,
    string[]? SeatSections,
    string[]? Packages,

    DateTime? MinScreening,
    DateTime? MaxScreening,
    string[]? Cinemas,
    string[]? Types,
    int? MaxDuration,

    string? OrderBy = "TicketCode",
    string? OrderState = "asc",
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<GetAvailableTicketsResponse>;
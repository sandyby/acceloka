using MediatR;

public record CreateFlightTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string Airline,
    DateTime DepartureTime,
    TimeSpan Duration,
    string DepartureAirport,
    string ArrivalAirport,
    string SeatClass,
    int BaggageKg,
    int TransitsCount,
    List<string> Amenities
) : IRequest<CreateTicketResponse>;
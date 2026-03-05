namespace AccelokaSandy.Domain.Entities.Tickets;

public class FlightTicket : TicketBase
{
    public required string Airline { get; set; }
    public required string DepartureAirport { get; set; }
    public required string ArrivalAirport { get; set; }
    public int BaggageKg { get; set; }
}

/*
public record CreateFlightTicketCommand(
    string TicketCode,
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
*/
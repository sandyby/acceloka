namespace AccelokaSandy.Domain.Entities;

public class FlightTicket : TicketBase
{
    public required string Airline { get; set; }
    public DateTime DepartureTime { get; set; }
    public TimeSpan Duration { get; set; }
    public required string DepartureAirport { get; set; }
    public required string ArrivalAirport { get; set; }
    public required string SeatClass { get; set; } = "economy";
    public int BaggageKg { get; set; } = 25;
    public int TransitsCount { get; set; } = 0;
    public List<string>? Amenities { get; set; }
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
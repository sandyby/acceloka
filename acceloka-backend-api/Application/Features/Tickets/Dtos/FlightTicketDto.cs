namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class FlightTicketDto : TicketDto
{
    public required string Airline { get; set; }
    public required DateTime DepartureTime { get; set; }
    public required TimeSpan Duration { get; set; }
    public required string DepartureAirport { get; set; }
    public required string ArrivalAirport { get; set; }
    public required string SeatClass { get; set; }
    public required int BaggageKg { get; set; }
    public required int TransitsCount { get; set; }
    public List<string>? Amenities { get; set; }
}
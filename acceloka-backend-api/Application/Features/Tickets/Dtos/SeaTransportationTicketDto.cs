namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class SeaTransportationTicketDto : TicketDto
{
    public required string TransportationType { get; set; }
    public required string Company { get; set; }
    public required string SeatClass { get; set; }
    public required string DeparturePort { get; set; }
    public required string ArrivalPort { get; set; }
    public required DateTime DepartureTime { get; set; }
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; }
    public required List<string>? Amenities { get; set; }
}
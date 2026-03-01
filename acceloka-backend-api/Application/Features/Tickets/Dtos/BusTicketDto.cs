namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class BusTicketDto : TicketDto
{
    public required string BusCode { get; set; }
    public required string BusType { get; set; }
    public required string SeatClass { get; set; }
    public required string DepartureStop { get; set; }
    public required string ArrivalStop { get; set; }
    public required DateTime DepartureTime { get; set; }
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; }
    public required List<string>? Amenities { get; set; }
}
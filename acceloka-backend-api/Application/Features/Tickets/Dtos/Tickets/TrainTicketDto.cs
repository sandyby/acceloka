namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TrainTicketDto : TicketDto
{
    public required string TrainCode { get; set; }
    public required string TrainType { get; set; }
    public required string SeatClass { get; set; }
    public required string DepartureStation { get; set; }
    public required string ArrivalStation { get; set; }
    public required DateTime DepartureTime { get; set; }
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; }
    public required List<string>? Amenities { get; set; }
}
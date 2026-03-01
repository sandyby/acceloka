namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class ConcertTicketDto : TicketDto
{
    public required string Venue { get; set; }
    public required string Artist { get; set; }
    public required string SeatSection { get; set; }
    public required DateTime ConcertDate { get; set; }
    public required TimeSpan Duration { get; set; }
    public required List<string>? Packages { get; set; }
}
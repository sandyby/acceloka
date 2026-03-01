namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class MovieTicketDto : TicketDto
{
    public required string Cinema { get; set; }
    public required string CinemaType { get; set; }
    public required TimeSpan Duration { get; set; }
    public required string SeatSection { get; set; }
    public required DateTime ScreeningTime { get; set; }
}
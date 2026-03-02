namespace AccelokaSandy.Domain.Entities.Tickets;


public class ConcertTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string Venue { get; set; }
    public required string Artist { get; set; }
    public required string SeatSection { get; set; }
    public required DateTime ConcertDate { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 15, 0, 0);
    public required List<string>? Packages { get; set; } = new();
}
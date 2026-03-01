namespace AccelokaSandy.Domain.Entities;


public class MovieTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string Cinema { get; set; }
    public required string CinemaType { get; set; } = "Deluxe";
    public required TimeSpan Duration { get; set; }
    public required string SeatSection { get; set; }
    public required DateTime ScreeningTime { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 9, 0, 0);
}
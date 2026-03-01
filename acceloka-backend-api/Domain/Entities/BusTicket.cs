namespace AccelokaSandy.Domain.Entities;


public class BusTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string BusCode { get; set; }
    public required string BusType { get; set; } = "Single Deck";
    public required string SeatClass { get; set; } = "Economy";
    public required string DepartureStop { get; set; }
    public required string ArrivalStop { get; set; }
    public required DateTime DepartureTime { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 9, 0, 0);
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; } = 0;
    public required List<string>? Amenities { get; set; }
}
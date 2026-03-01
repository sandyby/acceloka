namespace AccelokaSandy.Domain.Entities;


public class SeaTransportationTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string TransportationType { get; set; }
    public required string Company { get; set; }
    public required string SeatClass { get; set; } = "Basic";
    public required string DeparturePort { get; set; }
    public required string ArrivalPort { get; set; }
    public required DateTime DepartureTime { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 9, 0, 0);
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; } = 0;
    public required List<string>? Amenities { get; set; }
}
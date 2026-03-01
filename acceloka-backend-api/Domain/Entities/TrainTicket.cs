namespace AccelokaSandy.Domain.Entities;


public class TrainTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string TrainCode { get; set; }
    public required string TrainType { get; set; } = "Long Distance";
    public required string SeatClass { get; set; }
    public required string DepartureStation { get; set; }
    public required string ArrivalStation { get; set; }
    public required DateTime DepartureTime { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 13, 0, 0);
    public required TimeSpan Duration { get; set; }
    public required int TransitsCount { get; set; } = 0;
    public required List<string>? Amenities { get; set; }
}
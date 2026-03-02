namespace AccelokaSandy.Domain.Entities.Tickets;


public class BusTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string BusCode { get; set; }
    public required string BusType { get; set; } = "Single Deck";
    public required string DepartureStop { get; set; }
    public required string ArrivalStop { get; set; }
}
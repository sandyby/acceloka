namespace AccelokaSandy.Domain.Entities.Tickets;


public class SeaTransportationTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string TransportationType { get; set; }
    public required string Company { get; set; }
    public required string DeparturePort { get; set; }
    public required string ArrivalPort { get; set; }
}
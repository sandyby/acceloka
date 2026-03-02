namespace AccelokaSandy.Domain.Entities.Tickets;


public class TrainTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public required string TrainCode { get; set; }
    public required string TrainType { get; set; } = "Long Distance";
    public required string DepartureStation { get; set; }
    public required string ArrivalStation { get; set; }
}
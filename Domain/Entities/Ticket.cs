namespace AccelokaSandy.Domain.Entities;

public class Ticket
{
    public int TicketCode { get; set; }
    public required string TicketName { get; set; }
    public required string TicketCategory { get; set; }
    public int Quota { get; set; }
    public int Price { get; set; }
    public DateTime EventDate { get; set; }
}
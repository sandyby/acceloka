namespace AccelokaSandy.Domain.Entities;

public class Ticket
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TicketCode { get; set; }
    public required string TicketName { get; set; }
    // public required string TicketCategory { get; set; }
    public required string CategoryId { get; set; }
    public int Quota { get; set; }
    public int Price { get; set; }
    public DateTime EventDate { get; set; }
    public TicketCategory TicketCategory { get; set; } = null!;
}
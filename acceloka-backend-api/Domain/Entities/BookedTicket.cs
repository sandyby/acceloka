namespace AccelokaSandy.Domain.Entities;

public class BookedTicket
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string BookedTicketCode { get; set; }
    public required string TicketId { get; set; }
    public required int Quantity { get; set; }
    public DateTime BookedAt { get; set; } = DateTime.UtcNow;
    public Ticket Ticket { get; set; } = null!;
}
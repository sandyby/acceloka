namespace AccelokaSandy.Domain.Entities;

public abstract class TicketBase
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TicketCode { get; set; }
    public required string TicketName { get; set; }
    public int Quota { get; set; }
    public int Price { get; set; }
    public required string CategoryId { get; set; }
    public TicketCategory TicketCategory { get; set; } = null!;
}
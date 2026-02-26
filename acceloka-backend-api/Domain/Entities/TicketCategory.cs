namespace AccelokaSandy.Domain.Entities;

public class TicketCategory
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TicketCategoryName { get; set; }
    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
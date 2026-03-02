using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Domain.Entities.Categories;

public class TicketCategory
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TicketCategoryName { get; set; }
    public ICollection<TicketBase> Tickets { get; set; } = new List<TicketBase>();
}
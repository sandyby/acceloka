using AccelokaSandy.Domain.Entities.Categories;

namespace AccelokaSandy.Domain.Entities.Tickets;

public abstract class TicketBase
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string TicketCode { get; set; }
    public required string TicketName { get; set; }
    public int Quota { get; set; }
    public int Price { get; set; }
    public required string CategoryId { get; set; }
    public TicketCategory TicketCategory { get; set; } = null!;

    // shareddddddd
    public List<string>? Amenities { get; set; } = new();
    public DateTime? DepartureTime { get; set; }
    public TimeSpan? Duration { get; set; }
    public string? SeatClass { get; set; }
    public int? TransitsCount { get; set; }
    public int? BaggageKg { get; set; }
}
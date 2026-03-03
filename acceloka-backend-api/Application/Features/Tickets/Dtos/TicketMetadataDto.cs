
namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketMetadataDto
{
    public int MaxPrice { get; set; }

    public DateTime? EarliestDeparture { get; set; }
    public DateTime? LatestDeparture { get; set; }

    public List<string> Airlines { get; set; } = new();
    public List<string> Amenities { get; set; } = new();
    public List<string> SeatClasses { get; set; } = new();
}
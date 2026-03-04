
namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketMetadataDto
{
    public int MaxPrice { get; set; }

    public DateTime? MinDeparture { get; set; }
    public DateTime? MaxDeparture { get; set; }
    public DateTime? MinArrival { get; set; }
    public DateTime?  MaxArrival { get; set; }

    public List<string> Airlines { get; set; } = new();
    public List<string> Amenities { get; set; } = new();
    public List<string> SeatClasses { get; set; } = new();
}
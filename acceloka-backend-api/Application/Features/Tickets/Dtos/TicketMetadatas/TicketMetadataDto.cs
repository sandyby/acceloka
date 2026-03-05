
namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketMetadataDto
{
    // TODO: pelajarin approach 1
    // public int MaxPrice { get; set; }
    // public Dictionary<string, object?> FilterFields { get; set; } = new();

    // approach 2
    public int MaxPrice { get; set; }

    public int? MaxOccupancy { get; set; }
    public DateTime? MinDeparture { get; set; }
    public DateTime? MaxDeparture { get; set; }
    public DateTime? MinArrival { get; set; }
    public DateTime? MaxArrival { get; set; }
    public DateTime? MinCheckInDate { get; set; }
    public DateTime? MaxCheckOutDate { get; set; }
    public DateTime? MinConcertDate { get; set; }
    public DateTime? MaxConcertDate { get; set; }
    public List<string> Airlines { get; set; } = new();
    public List<string> HotelNames { get; set; } = new();
    public List<string> Venues { get; set; } = new();
    public List<string> Artists { get; set; } = new();
    public List<string> RoomTypes { get; set; } = new();
    public List<string> SeatClasses { get; set; } = new();
    public List<string> SeatSections { get; set; } = new();
    public List<string> Amenities { get; set; } = new();
    public List<string> Packages { get; set; } = new();
}
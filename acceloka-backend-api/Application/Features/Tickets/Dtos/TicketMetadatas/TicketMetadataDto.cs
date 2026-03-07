
namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketMetadataDto
{
    // TODO: pelajarin approach 1 untuk refactor/scalable?
    // public int MaxPrice { get; set; }
    // public Dictionary<string, object?> FilterFields { get; set; } = new();

    // approach 2
    public int MaxPrice { get; set; }
    public int? MaxOccupancy { get; set; }
    public int? MaxDurationInMinutes { get; set; }
    public int? MaxBaggageKg { get; set; }
    public int? DirectCount { get; set; }
    public int? TransitsCount { get; set; }
    public DateTime? MinDeparture { get; set; }
    public DateTime? MaxDeparture { get; set; }
    public DateTime? MinArrival { get; set; }
    public DateTime? MaxArrival { get; set; }
    public DateTime? MinCheckInDate { get; set; }
    public DateTime? MaxCheckOutDate { get; set; }
    public DateTime? MinConcertDate { get; set; }
    public DateTime? MaxConcertDate { get; set; }
    public DateTime? MinScreeningTime { get; set; }
    public DateTime? MaxScreeningTime { get; set; }
    public List<string>? Airlines { get; set; }
    public List<string>? HotelNames { get; set; }
    public List<string>? Venues { get; set; }
    public List<string>? Cinemas { get; set; }
    public List<string>? Artists { get; set; }
    public List<string>? RoomTypes { get; set; }
    public List<string>? Types { get; set; }
    public List<string>? SeatClasses { get; set; }
    public List<string>? SeatSections { get; set; }
    public List<string>? Amenities { get; set; }
    public List<string>? Packages { get; set; }
}
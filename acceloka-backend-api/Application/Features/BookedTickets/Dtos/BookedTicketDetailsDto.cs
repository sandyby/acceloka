public class BookedTicketDetailsDto
{
    public required string BookedTicketCode { get; set; }
    public int Quantity { get; set; }
    public int SnapshotTotalPrice { get; set; }

    public required string TicketName { get; set; }
    public required string TicketCategory { get; set; }
    public int OriginalPrice { get; set; }

    // shared
    public string? Duration { get; set; }
    public string? SeatSection { get; set; }
    public List<string>? Amenities { get; set; }
    public DateTime? DepartureTime { get; set; }
    public int? TransitsCount { get; set; }

    public string? SeatClass { get; set; }

    // flight ticket details
    public string? Airline { get; set; }
    public string? DepartureAirport { get; set; }
    public string? ArrivalAirport { get; set; }
    public int? BaggageKg { get; set; }

    // hotel
    public string? HotelName { get; set; }
    public string? RoomType { get; set; }
    public DateTime? MinCheckInDate { get; set; }
    public DateTime? MaxCheckOutDate { get; set; }
    public int? MaxOccupancy { get; set; }

    // movie
    public string? Cinema { get; set; }
    public string? CinemaType { get; set; }
    public DateTime? ScreeningTime { get; set; }

    // concert
    public string? Venue { get; set; }
    public string? Artist { get; set; }
    public DateTime? ConcertDate { get; set; }
    public List<string>? Packages { get; set; }

    // train
    public string? TrainCode { get; set; }
    public string? TrainType { get; set; }
    public string? DepartureStation { get; set; }
    public string? ArrivalStation { get; set; }

    // bus
    public string? BusCode { get; set; }
    public string? BusType { get; set; }
    public string? DepartureStop { get; set; }
    public string? ArrivalStop { get; set; }

    // sea transport
    public string? TransportationType { get; set; }
    public string? Company { get; set; }
    public string? DeparturePort { get; set; }
    public string? ArrivalPort { get; set; }
}
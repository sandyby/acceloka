namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class HotelTicketDto : TicketDto
{
    public required string HotelName { get; set; }
    public required string RoomType { get; set; }
    public required DateTime MinCheckInDate { get; set; }
    public required DateTime MaxCheckOutDate { get; set; }
    public required int MaxOccupancy { get; set; }
    public List<string>? Amenities { get; set; }
}
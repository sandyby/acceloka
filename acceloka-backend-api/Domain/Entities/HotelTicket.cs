namespace AccelokaSandy.Domain.Entities;


public class HotelTicket : TicketBase
{
    public static DateTime tomorrow = DateTime.Today.AddDays(1);
    public static DateTime dayAfterTomorrow = tomorrow.AddDays(1);
    public required string HotelName { get; set; }
    public required string RoomType { get; set; } = "Single";
    public required DateTime MinCheckInDate { get; set; } = new DateTime(tomorrow.Year, tomorrow.Month, tomorrow.Day, 7, 0, 0);
    public required DateTime MaxCheckOutDate { get; set; } = new DateTime(dayAfterTomorrow.Year, dayAfterTomorrow.Month, dayAfterTomorrow.Day, 7, 0, 0);
    public required int MaxOccupancy { get; set; } = 1;
    public List<string>? Amenities { get; set; }
}

/*
using MediatR;

public record CreateHotelTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string HotelName,
    string RoomType,
    DateTime MinCheckInDate,
    DateTime MaxCheckOutDate,
    int maxOccupancy,
    List<string> Amenities
): IRequest<CreateTicketResponse>;
*/
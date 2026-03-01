using MediatR;

public record CreateHotelTicketCommand(
    string TicketCode,
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
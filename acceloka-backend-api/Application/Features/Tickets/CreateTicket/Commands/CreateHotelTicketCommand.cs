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
    int MaxOccupancy,
    List<string> Amenities
): IRequest<CreateTicketResponse>;
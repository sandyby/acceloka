using MediatR;

public record CreateBusTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string BusCode,
    string BusType,
    string SeatClass,
    string DepartureStop,
    string ArrivalStop,
    DateTime DepartureTime,
    TimeSpan Duration,
    int TransitsCount,
    List<string> Amenities
) : IRequest<CreateTicketResponse>;
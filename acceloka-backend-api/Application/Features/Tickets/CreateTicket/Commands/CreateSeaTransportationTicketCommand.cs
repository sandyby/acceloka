using MediatR;

public record CreateSeaTransportationTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string TransportationType,
    string Company,
    string SeatClass,
    string DeparturePort,
    string ArrivalPort,
    DateTime DepartureTime,
    TimeSpan Duration,
    int TransitsCount,
    List<string> Amenities
): IRequest<CreateTicketResponse>;
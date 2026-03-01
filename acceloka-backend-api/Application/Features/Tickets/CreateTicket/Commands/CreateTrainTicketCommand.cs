using MediatR;

public record CreateTrainTicketCommand(
    string TicketCode,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string TrainCode,
    string SeatClass,
    string DepartureStation,
    string ArrivalStation,
    DateTime DepartureTime,
    TimeSpan Duration,
    int TransitsCount,
    List<string> Amenities
) : IRequest<CreateTicketResponse>;
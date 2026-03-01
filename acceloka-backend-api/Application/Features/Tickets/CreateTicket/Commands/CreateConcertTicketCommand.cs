using MediatR;

public record CreateConcertTicketCommand(
    string TicketCode,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string Venue,
    string Artist,
    string SeatSection,
    TimeSpan Duration,
    DateTime ConcertDate
): IRequest<CreateTicketResponse>;
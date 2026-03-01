using MediatR;

public record CreateConcertTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string Venue,
    string Artist,
    string SeatSection,
    TimeSpan Duration,
    DateTime ConcertDate,
    List<string>? Packages
): IRequest<CreateTicketResponse>;
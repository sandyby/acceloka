using MediatR;

public record CreateMovieTicketCommand(
    string TicketCode,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string Cinema,
    TimeSpan Duration,
    string SeatSection,
    DateTime ScreeningDate
): IRequest<CreateTicketResponse>;
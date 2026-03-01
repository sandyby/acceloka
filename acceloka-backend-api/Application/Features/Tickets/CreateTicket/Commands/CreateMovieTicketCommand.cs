using MediatR;

public record CreateMovieTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    string Cinema,
    string CinemaType,
    TimeSpan Duration,
    string SeatSection,
    DateTime ScreeningTime
): IRequest<CreateTicketResponse>;
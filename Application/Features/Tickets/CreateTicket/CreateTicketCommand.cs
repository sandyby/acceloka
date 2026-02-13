using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.CreateTicket;

public record CreateTicketCommand(
    string TicketCode,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    DateTime EventDate
) : IRequest<CreateTicketResponse>;

public record CreateTicketRequest(
    string TicketCode,
    string TicketCategoryId,
    string TicketName,
    int Quota,
    int Price,
    DateTime EventDate
);
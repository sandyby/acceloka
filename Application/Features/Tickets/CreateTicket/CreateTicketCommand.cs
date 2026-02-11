using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.CreateTicket;

public record CreateTicketCommand(
    string TicketCode,
    string TicketName,
    string TicketCategoryId,
    int Quota,
    int Price,
    DateTime EventDate
    ) : IRequest<CreateTicketResponse>;
// public record TicketDto(string TicketCode, string TicketName, string TicketCategory, int Quota, int Price, DateTime EventDate);
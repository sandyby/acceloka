using MediatR;

namespace AccelokaSandy.Requests.Tickets;

public record CreateTicket(int TicketCode, string TicketName, string TicketCategory, int Quota, int Price, DateTime EventDate): IRequest<TicketDto>;
public record TicketDto(int TicketCode, string TicketName, string TicketCategory, int Quota, int Price, DateTime EventDate);
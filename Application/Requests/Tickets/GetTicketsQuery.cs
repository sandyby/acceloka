using MediatR;

namespace AccelokaSandy.Requests.Tickets;

public record GetTicketsQuery() : IRequest<List<TicketDto>>;
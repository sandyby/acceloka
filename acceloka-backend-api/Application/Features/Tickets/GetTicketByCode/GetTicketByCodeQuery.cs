using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.GetTicketByCode;

public record GetTicketByCodeQuery(
    string TicketCode
    ) : IRequest<GetTicketByCodeResponse>;
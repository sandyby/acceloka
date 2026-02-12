using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketByCode;

public record GetBookedTicketByCodeQuery(string BookedTicketCode) : IRequest<GetBookedTicketByCodeResponse>;
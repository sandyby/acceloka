using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;

public record GetBookedTicketsQuery() : IRequest<GetBookedTicketsResponse>;
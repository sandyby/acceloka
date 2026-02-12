using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketById;

public record GetBookedTicketByIdQuery(string BookedTicketId) : IRequest<GetBookedTicketByIdResponse>;
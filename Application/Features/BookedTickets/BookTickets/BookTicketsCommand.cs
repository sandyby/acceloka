using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.BookTickets;

public record BookTicketsCommand(
    List<BookTicketsBodyContent> BookedTickets
) : IRequest<BookTicketsResponse>;
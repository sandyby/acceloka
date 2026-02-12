using MediatR;

namespace AccelokaSandy.Application.Features.BookedTickets.BookTickets;

public record BookTicketCommand(string TicketCategoryName) : IRequest<BookTicketResponse>;
using MediatR;
namespace AccelokaSandy.Application.Features.BookedTickets.RevokeBookedTicket;

public record RevokeBookedTicketCommand(string BookedTicketId, string BookedTicketCode, int Quantity) : IRequest<RevokeBookedTicketResponse>;
using MediatR;

namespace Application.Features.BookedTickets.EditBookedTicket;

public record EditBookedTicketCommand(
    string BookedTicketId,
    List<EditBookedTicketBodyContent> ToBeEditedBookedTickets
    ) : IRequest<EditBookedTicketResponse>;

public record EditBookedTicketBodyContent(
    string BookedTicketCode,
    int NewQuantity
);
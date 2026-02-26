using Application.Features.BookedTickets;

public record RevokeBookedTicketResponse(
    string BookedTicketId,
    List<UpdatedBookedTicketDto> UpdatedBookedTickets
);
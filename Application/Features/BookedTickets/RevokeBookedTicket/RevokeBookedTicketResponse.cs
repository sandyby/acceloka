public record RevokeBookedTicketResponse(
    string BookedTicketId,
    List<UpdatedBookedTicketDto> UpdatedBookedTickets
);

public record UpdatedBookedTicketDto(
    string BookedTicketCode,
    string BookedTicketName,
    string BookedTicketCategoryName,
    int Quantity
);

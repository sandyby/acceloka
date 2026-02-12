public record GetBookedTicketByIdResponse(
    string BookedTicketId,
    string BookedTicketCode,
    string BookedTicketName,
    DateTime EventDate,
    DateTime BookedAt,
    int Quantity
);
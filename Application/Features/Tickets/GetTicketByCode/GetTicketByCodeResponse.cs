public record GetTicketByCodeResponse(
    DateTime EventDate,
    string TicketCategory,
    string TicketCode,
    string TicketName,
    int Quota,
    int Price
);
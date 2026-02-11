public record CreateTicketResponse(
    string TicketCode,
    string TicketCategory,
    string TicketName,
    int Quota,
    decimal Price,
    DateTime EventDate
);
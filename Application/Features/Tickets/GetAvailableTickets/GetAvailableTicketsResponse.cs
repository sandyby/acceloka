public record GetAvailableTicketsResponse(
    DateTime EventDate,
    string TicketCategory,
    string TicketCode,
    string TicketName,
    int Quota,
    int Price
);
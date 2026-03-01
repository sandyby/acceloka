public record GetTicketByCodeResponse(
    string TicketCategory,
    string TicketCode,
    string TicketName,
    int Quota,
    int Price
);
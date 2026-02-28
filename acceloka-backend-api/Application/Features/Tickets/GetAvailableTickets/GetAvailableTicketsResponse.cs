public class GetAvailableTicketsResponse
{
    public List<AvailableTicketDto> AvailableTickets { get; set; } = new();
    public int TotalTicketsCount { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
}

public record AvailableTicketDto(
    DateTime EventDate,
    string TicketCategory,
    string TicketCode,
    string TicketName,
    int Quota,
    int Price
);
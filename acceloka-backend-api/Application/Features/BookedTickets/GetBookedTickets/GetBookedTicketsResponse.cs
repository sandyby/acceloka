public class GetBookedTicketsResponse
{
    public List<BookedTicketDto> BookedTickets { get; set; } = new();
    public int TotalBookedTickets { get; set; }
}
public record BookedTicketDto(
    string BookedTicketId,
    string BookedTicketCode,
    string TicketName,
    string TicketCategory,
    DateTime EventDate,
    DateTime BookedAt,
    int Quantity,
    int UnitPrice,
    int TotalPriceAmount
);
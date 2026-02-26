public class GetBookedTicketByIdResponse
{

    public string BookedTicketId { get; set; } = string.Empty;
    public DateTime BookedAt { get; set; }
    public List<BookedTicketByIdPerCategorySummaryDto> BookedTicketsByIdPerCategorySummary { get; set; } = new();
}

public record BookedTicketByIdPerCategorySummaryDto(
    int QuantityPerCategory,
    string CategoryName,
    List<BookedTicketsByCategory> bookedTicketsByCategory
);

public record BookedTicketsByCategory(
    string BookedTicketCode,
    string TicketName,
    DateTime EventDate,
    int Quantity,
    int UnitPrice,
    int TotalPriceAmount
);
public class GetBookedTicketByIdResponse
{
    public List<BookedTicketByIdPerCategorySummaryDto> BookedTicketsByIdPerCategory { get; set; } = new();
}

public record BookedTicketByIdPerCategorySummaryDto(
    int QuantityPerCategory,
    string CategoryName,
    List<BookedTicketsByIdDto> BookedTicketsById
);

public record BookedTicketsByIdDto(
    string BookedTicketId,
    string BookedTicketCode,
    string TicketName,
    DateTime EventDate,
    DateTime BookedAt,
    int Quantity,
    int UnitPrice,
    int TotalPriceAmount
);
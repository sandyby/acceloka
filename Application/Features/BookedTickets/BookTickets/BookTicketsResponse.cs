public record BookTicketsResponse(
    int TotalPriceAmount,
    List<CategorySummaryDto> TicketsPerCategories
);

public record BookedTicketDetailDto(
    string BookedTicketCode,
    string TicketName,
    int Quantity,
    int UnitPrice,
    int TotalPriceAmount
);
public record CategorySummaryDto(
    string CategoryName,
    int TotalPriceAmount,
    List<BookedTicketDetailDto> BookedTickets
);

// public class GetAvailableTicketsResponse
// {
//     public List<AvailableTicketDto> AvailableTickets { get; set; } = new ();
//     public int TotalTicketsCount { get; set; }
// }

// public record AvailableTicketDto(
//     DateTime EventDate,
//     string TicketCategory,
//     string TicketCode,
//     string TicketName,
//     int Quota,
//     int Price
// );
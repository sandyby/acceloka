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
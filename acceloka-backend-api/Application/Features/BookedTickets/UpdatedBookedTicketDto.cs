namespace Application.Features.BookedTickets;

public record UpdatedBookedTicketDto(
    string BookedTicketCode,
    string BookedTicketName,
    string BookedTicketCategoryName,
    int Quantity
);
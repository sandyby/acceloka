public class EditBookedTicketResponse
{
    string BookedTicketId { get; init; } = String.Empty;
    List<EditedBookedTicketDto> EditedBookedTickets { get; init; } = new();
}

public record EditedBookedTicketDto(
    string BookedTicketCode,
    string BookedTicketName,
    string BookedTicketCategoryName,
    int Quantity
);
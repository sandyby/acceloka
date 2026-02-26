using Application.Features.BookedTickets;

public class EditBookedTicketResponse
{
    public string BookedTicketId { get; init; } = String.Empty;
    public List<UpdatedBookedTicketDto> UpdatedBookedTickets { get; init; } = new List<UpdatedBookedTicketDto>();
}
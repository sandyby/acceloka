namespace AccelokaSandy.Application.Features.BookedTickets.BookTickets;

public class BookTicketsBodyContent(
    string ticketCode,
    int quantity
)
{
    public string TicketCode { get; set; } = ticketCode;
    public int Quantity { get; set; } = quantity;
}
using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Domain.Entities.Bookings;

public interface IBookedTicketDto
{
    public string BookedTicketCode { get; set; }
    public string TicketId { get; set; }
    public int Quantity { get; set; }
    public int SnapshotTotalPrice { get; set; }
    public TicketBase Ticket { get; set; }
    public int OriginalPrice { get; set; }
}

// public abstract class BookedTicketBase
// {
//     public string Id { get; private set; } = Guid.NewGuid().ToString();

//     protected BookedTicketBase()
//     {

//     }
//     protected BookedTicketBase(TicketBase ticket, int quantity)
//     {
//         Ticket = ticket ?? throw new ArgumentNullException("The ticket to be booked is required!");
//         TicketId = ticket.Id;
//         Quantity = quantity > 0 ? quantity : throw new ArgumentException("Quantity must be greater than 0!");
//         OriginalPrice = ticket.Price;
//         SnapshotTotalPrice = ticket.Price * quantity;
//     }
// }
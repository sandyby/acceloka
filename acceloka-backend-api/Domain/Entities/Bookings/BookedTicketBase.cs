using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Domain.Entities.Bookings;

public class BookedTicket
{
    public string Id { get; private set; } = Guid.NewGuid().ToString();
    public required string BookedTicketCode { get; set; }
    public required string TicketId { get; set; }
    public required string BookingId { get; set; }
    public required Booking Booking { get; set; } = null!;
    public required int Quantity { get; set; }
    public int SnapshotTotalPrice { get; private set; }
    public TicketBase Ticket { get; set; } = null!;
    public int OriginalPrice { get; private set; }
    protected BookedTicket()
    {

    }
    public BookedTicket(TicketBase ticket, int quantity, string bookingId)
    {
        if (ticket == null)
        {
            throw new ArgumentNullException("The ticket to be booked is required!");
        }
        if (quantity <= 0)
        {
            throw new ArgumentException("Quantity must be greater than 0!");
        }
        Ticket = ticket;
        TicketId = ticket.Id;
        Quantity = quantity;
        BookingId = bookingId;
        OriginalPrice = ticket.Price;
        SnapshotTotalPrice = ticket.Price * quantity;
    }
}
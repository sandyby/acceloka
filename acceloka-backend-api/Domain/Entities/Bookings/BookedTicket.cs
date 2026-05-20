using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Domain.Entities.Bookings;

public class BookedTicket
{
    public string Id { get; private set; } = Guid.NewGuid().ToString();

    // public required string BookedTicketCode { get; set; } // ? i assume it is used in most big apps for slug-like purpose? readability for users? tapi not too important for now
    public string TicketId { get; private set; } = default!;
    public string BookingId { get; private set; } = default!;
    public Booking Booking { get; set; } = null!;
    public int Quantity { get; set; }
    public int SnapshotUnitPrice { get; private set; }
    public int TotalPrice => SnapshotUnitPrice * Quantity;
    public TicketBase Ticket { get; set; } = null!;

    protected BookedTicket() { }

    public BookedTicket(TicketBase ticket, int quantity, string bookingId)
    {
        if (ticket == null)
        {
            throw new NotFoundException("The ticket to be booked is missing or might not exists!");
        }
        if (quantity <= 0)
        {
            throw new InvalidQuantityException("Quantity must be greater than 0!");
        }
        Ticket = ticket;
        TicketId = ticket.Id;
        Quantity = quantity;
        BookingId = bookingId;
        SnapshotUnitPrice = ticket.Price;
    }

    public void UpdateQuantity(int newQuantity)
    {
        if (newQuantity <= 0)
        {
            throw new InvalidQuantityException("The new ticket quantity must be greater than 0!");
        }

        this.Quantity = newQuantity;
    }
}

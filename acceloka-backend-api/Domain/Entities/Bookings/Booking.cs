using AccelokaSandy.Domain.Entities.Bookings;

public class Booking
{
    public string Id { get; private set; } = Guid.NewGuid().ToString();
    public string? UserId { get; private set; } = "admin_test_user";
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; private set; }
    public BookingStatus Status { get; private set; } = BookingStatus.PENDING;
    public int TotalPrice { get; private set; }
    public List<BookedTicket> BookedTickets { get; private set; } = new();

    public IReadOnlyCollection<BookedTicket> Tickets => BookedTickets.AsReadOnly();

    public void AddTicket(BookedTicket ticket)
    {
        if (ticket == null) throw new ArgumentNullException("Ticket is required!");
        BookedTickets.Add(ticket);
        RecalculateTotalPrice();
    }

    public void RemoveTicket(string bookedTicketId)
    {
        var ticket = BookedTickets.FirstOrDefault(t => t.Id == bookedTicketId);

        if (ticket != null)
        {
            BookedTickets.Remove(ticket);
            RecalculateTotalPrice();
        }
    }

    public void RecalculateTotalPrice()
    {
        TotalPrice = BookedTickets.Sum(t => t.Quantity * t.Ticket.Price);
    }

    public void ConfirmBooking()
    {
        if (Status != BookingStatus.PENDING) throw new InvalidOperationException("Booking is not on pending state!");
        Status = BookingStatus.COMPLETED;
        UpdatedAt = DateTime.UtcNow;
    }
}

public enum BookingStatus
{
    PENDING,
    COMPLETED,
    CANCELLED
}
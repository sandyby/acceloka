using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Domain.Entities.Bookings;

public class Booking
{
    public string Id { get; private set; } = Guid.NewGuid().ToString();
    public string? UserId { get; private set; } = "admin_test_user";
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; private set; }
    public BookingStatus Status { get; private set; } = BookingStatus.PENDING;
    public int TotalPrice => _BookedTickets.Sum(bt => bt.TotalPrice);
    private List<BookedTicket> _BookedTickets = new();

    public IReadOnlyCollection<BookedTicket> BookedTickets => _BookedTickets.AsReadOnly();

    public void AddTicket(BookedTicket ticket)
    {
        if (this.Status != BookingStatus.PENDING)
        {
            throw new InvalidOperationException("Adding new tickets into the booking is not allowed after it is completed!");
        }
        if (ticket == null) throw new ArgumentNullException("Ticket is required!");
        _BookedTickets.Add(ticket);
        this.UpdatedAt = DateTime.UtcNow;
        // RecalculateTotalPrice();
    }

    public void RemoveTicket(string bookedTicketId)
    {
        if (this.Status != BookingStatus.PENDING)
        {
            throw new InvalidOperationException("Removing tickets from the booking is not allowed after it is completed!");
        }
        var ticket = BookedTickets.FirstOrDefault(t => t.Id == bookedTicketId);

        if (ticket == null)
        {
            throw new NotFoundException($"Booked ticket with the ID {bookedTicketId} is not found!");
        }
        _BookedTickets.Remove(ticket);
        this.UpdatedAt = DateTime.UtcNow;
        // RecalculateTotalPrice();
    }

    // public void RecalculateTotalPrice()
    // {
    //     TotalPrice = BookedTickets.Sum(t => t.SnapshotTotalPrice);
    // }

    public void UpdateTicketQuantity(string bookedTicketId, int newQuantity)
    {
        var bookedTicket = _BookedTickets.FirstOrDefault(t => t.Id == bookedTicketId);

        if (bookedTicket == null)
        {
            throw new NotFoundException($"Booked ticket with the ID {bookedTicketId} is not found!");
        }
        if (newQuantity <= 0)
        {
            throw new InvalidQuantityException("The new ticket quantity must be greater than 0!");
        }
        bookedTicket.UpdateQuantity(newQuantity);
        this.UpdatedAt = DateTime.UtcNow;
        // RecalculateTotalPrice();
    }

    public void ConfirmBooking()
    {
        if (this.Status == BookingStatus.COMPLETED)
        {
            throw new InvalidOperationException("Booking is already confirmed!");
        }
        else if (this.Status == BookingStatus.CANCELLED)
        {
            throw new InvalidOperationException("Booking is already cancelled!");
        }
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
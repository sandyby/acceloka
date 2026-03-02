using AccelokaSandy.Application.Features.Tickets.Dtos;

namespace AccelokaSandy.Application.Features.Bookings.Dtos;

public class BookingItemDto
{
    public ITicketDto Ticket { get; set; } = null!;
    public int Quantity { get; set; }
    public int SnapshotPrice { get; set; }
}
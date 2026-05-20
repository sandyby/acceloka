

namespace AccelokaSandy.Application.Features.Bookings.Dtos;

public class BookingDto
{
    public required string BookingId { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.PENDING;
    public int TotalPrice { get; set; } = 0;
    public List<BookingItemDto> BookingItems { get; set; } = new();
}
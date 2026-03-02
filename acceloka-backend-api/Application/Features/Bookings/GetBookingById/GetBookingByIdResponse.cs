using MediatR;
using AccelokaSandy.Application.Features.Bookings.Dtos;

public class GetBookingByIdResponse
{
    public Guid BookingId { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = null!;
    public List<BookingItemDto> Items { get; set; } = new();
}
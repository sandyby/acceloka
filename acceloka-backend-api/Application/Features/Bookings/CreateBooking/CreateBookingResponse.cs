using MediatR;
using AccelokaSandy.Application.Features.Bookings.Dtos;

public class CreateBookingResponse
{
    public string BookingId { get; set; } = null!;
    public string Status { get; set; } = null!;
    public int TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
}
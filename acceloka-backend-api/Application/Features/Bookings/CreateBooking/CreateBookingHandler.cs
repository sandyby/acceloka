using AccelokaSandy.Application.Features.Bookings.CreateBooking;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;

public class CreateBookingHandler : IRequestHandler<CreateBookingCommand, CreateBookingResponse>
{
    private readonly AppDbContext _context;

    public CreateBookingHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<CreateBookingResponse> Handle(CreateBookingCommand request, CancellationToken ct)
    {
        
        
        var booking = new Booking();
        await _context.AddAsync(booking);

        return new CreateBookingResponse
        {
            BookingId = booking.Id,
            Status = booking.Status.ToString(),
            TotalPrice = booking.TotalPrice,
            CreatedAt = booking.CreatedAt
        };
    }
}
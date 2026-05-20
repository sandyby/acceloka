using MediatR;

namespace AccelokaSandy.Application.Features.Bookings.CreateBooking;

public record CreateBookingCommand(
) : IRequest<CreateBookingResponse>;
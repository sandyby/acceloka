using MediatR;

namespace AccelokaSandy.Application.Features.Bookings.GetBookingById;

public record GetBookingByIdQuery(
    string BookingId
) : IRequest<GetBookingByIdResponse?>;
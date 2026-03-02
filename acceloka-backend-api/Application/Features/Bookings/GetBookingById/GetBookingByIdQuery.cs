using MediatR;

public record GetBookingByIdQuery(
    string BookingId
) : IRequest<GetBookingByIdResponse?>;
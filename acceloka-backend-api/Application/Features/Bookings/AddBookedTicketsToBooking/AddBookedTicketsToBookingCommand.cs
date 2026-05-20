using MediatR;

namespace AccelokaSandy.Application.Features.Bookings.AddBookedTicketsToBooking;

public record AddBookedTicketsToBookingCommand(
    string BookingId,
    AddBookedTicketsToBookingRequest BookedTicket
) : IRequest<AddBookedTicketsToBookingResponse>;

public record AddBookedTicketsToBookingBodyContent(
    string TicketId,
    int Quantity
);

public record AddBookedTicketsToBookingRequest(
    AddBookedTicketsToBookingBodyContent BookedTicket
);
using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Bookings.AddBookedTicketsToBooking;
using AccelokaSandy.Domain.Entities.Bookings;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.Internal;

public class AddBookedTicketsToBookingHandler
    : IRequestHandler<AddBookedTicketsToBookingCommand, AddBookedTicketsToBookingResponse>
{
    private readonly AppDbContext _context;

    public AddBookedTicketsToBookingHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<AddBookedTicketsToBookingResponse> Handle(
        AddBookedTicketsToBookingCommand request,
        CancellationToken ct
    )
    {
        var bookingExists = await _context.Bookings.FirstOrDefaultAsync(
            bk => bk.Id == request.BookingId,
            ct
        );

        if (bookingExists == null)
        {
            throw new NotFoundException($"The booking with Id {request.BookingId} doesn't exist!");
        }

        var toBeBookedTicketExists = await _context.Tickets.FirstOrDefaultAsync(
            t => t.Id == request.BookedTicket.BookedTicket.TicketId,
            ct
        );

        if (toBeBookedTicketExists == null)
        {
            throw new NotFoundException(
                $"The ticket to be added in the booking cart with the Id {request.BookedTicket.BookedTicket.TicketId} doesn't exist!"
            );
        }

        var bookedTicketExists = bookingExists.BookedTickets.FirstOrDefault(bt =>
            bt.TicketId == toBeBookedTicketExists.Id
        );

        if (bookedTicketExists != null)
        {
            bookedTicketExists.UpdateQuantity(
                bookedTicketExists.Quantity + request.BookedTicket.BookedTicket.Quantity
            );
        }
        else
        {
            bookedTicketExists = new BookedTicket(
                toBeBookedTicketExists,
                request.BookedTicket.BookedTicket.Quantity,
                request.BookingId
            );
            bookingExists.AddTicket(bookedTicketExists);
        }

        await _context.SaveChangesAsync();

        return new AddBookedTicketsToBookingResponse
        {
            BookingId = bookingExists.Id,
            BookedTicketId = bookedTicketExists.TicketId,
            CreatedAt = DateTime.UtcNow,
            Quantity = bookedTicketExists.Quantity,
            TotalPrice = bookedTicketExists.Quantity * bookedTicketExists.SnapshotUnitPrice,
        };
    }
}

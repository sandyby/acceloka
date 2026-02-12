using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketById;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetBookedTicketByIdHandler : IRequestHandler<GetBookedTicketByIdQuery, GetBookedTicketByIdResponse>
{
    private readonly AppDbContext _context;
    public GetBookedTicketByIdHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<GetBookedTicketByIdResponse> Handle(GetBookedTicketByIdQuery request, CancellationToken ct)
    {
        var bookedTicket = await _context.BookedTickets.AsNoTracking().Include(bt => bt.Ticket).Where(bt => bt.Id == request.BookedTicketId).Select(bt => new GetBookedTicketByIdResponse(
            bt.Id,
            bt.BookedTicketCode,
            bt.Ticket.TicketName,
            bt.Ticket.EventDate,
            bt.BookedAt,
            bt.Quantity
        )).FirstOrDefaultAsync();

        if (bookedTicket is null)
        {
            throw new NotFoundException($"Booked ticket with the ID '{request.BookedTicketId}' was not found!");
        }

        return bookedTicket;
    }
}
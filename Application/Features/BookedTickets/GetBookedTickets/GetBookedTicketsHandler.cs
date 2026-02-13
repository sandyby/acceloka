using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetBookedTicketsHandler : IRequestHandler<GetBookedTicketsQuery, GetBookedTicketsResponse>
{
    private readonly AppDbContext _context;
    public GetBookedTicketsHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<GetBookedTicketsResponse> Handle(GetBookedTicketsQuery request, CancellationToken ct)
    {
        var query = _context.BookedTickets.AsNoTracking().Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory).AsQueryable();

        if (!string.IsNullOrEmpty(request.TicketCategory))
        {
            query = query.Where(bt => bt.Ticket.TicketCategory.TicketCategoryName.ToLower() == request.TicketCategory.ToLower());
        }

        if (request.MinBookedAt.HasValue)
        {
            query = query.Where(bt => bt.BookedAt >= request.MinBookedAt.Value);
        }

        if (request.MaxBookedAt.HasValue)
        {
            query = query.Where(bt => bt.BookedAt <= request.MaxBookedAt.Value);
        }

        if (request.MinEventDate.HasValue)
        {
            query = query.Where(bt => bt.Ticket.EventDate >= request.MinEventDate.Value);
        }

        if (request.MaxEventDate.HasValue)
        {
            query = query.Where(bt => bt.Ticket.EventDate <= request.MaxEventDate.Value);
        }

        var totalFilteredTicketsCount = await query.CountAsync();

        var isOrderStateDesc = request.OrderState?.ToLower() == "desc";
        query = request.OrderBy?.ToLower() switch
        {
            "ticketcategory" => isOrderStateDesc ? query.OrderByDescending(bt => bt.Ticket.TicketCategory.TicketCategoryName) : query.OrderBy(bt => bt.Ticket.TicketCategory.TicketCategoryName),
            "eventdate" => isOrderStateDesc ? query.OrderByDescending(bt => bt.Ticket.EventDate) : query.OrderBy(bt => bt.Ticket.EventDate),
            "bookedat" => isOrderStateDesc ? query.OrderByDescending(bt => bt.BookedAt) : query.OrderBy(bt => bt.BookedAt),
            _ => !isOrderStateDesc ? query.OrderBy(bt => bt.Ticket.EventDate) : query.OrderByDescending(bt => bt.Ticket.EventDate)
        };

        var skipNumber = (request.PageNumber - 1) * request.PageSize;

        var bookedTickets = await query.Skip(skipNumber).Take(request.PageSize).Select(bt => new BookedTicketDto
        (
            bt.Id,
            bt.BookedTicketCode,
            bt.Ticket.TicketName,
            bt.Ticket.TicketCategory.TicketCategoryName,
            bt.Ticket.EventDate,
            bt.BookedAt,
            bt.Quantity,
            bt.Ticket.Price,
            bt.Quantity * bt.Ticket.Price
        )).ToListAsync();

        return new GetBookedTicketsResponse
        {
            BookedTickets = bookedTickets,
            TotalBookedTickets = totalFilteredTicketsCount
        };
    }
}
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
        var bookedTickets = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory).Where(bt => EF.Functions.ILike(bt.Id, request.BookedTicketId)).ToListAsync(ct);

        if (!bookedTickets.Any())
        {
            throw new NotFoundException($"The booked ticket with the id '{request.BookedTicketId}' does not exist!");
        }

        var groupedBookedTicketsByCategory = bookedTickets.GroupBy(bt => bt.Ticket.TicketCategory.TicketCategoryName).Select(g => new BookedTicketByIdPerCategorySummaryDto(
            g.Sum(bt => bt.Quantity),
            g.Key,
            g.Select(bt => new BookedTicketsByCategory(
                bt.BookedTicketCode,
                bt.Ticket.TicketName,
                bt.Ticket.EventDate,
                bt.Quantity,
                (int)bt.Ticket.Price,
                (int)(bt.Quantity * bt.Ticket.Price)
            )).ToList()
        )).ToList();

        return new GetBookedTicketByIdResponse
        {
            BookedTicketId = bookedTickets.First().Id,
            BookedAt = bookedTickets.First().BookedAt,
            BookedTicketsByIdPerCategorySummary = groupedBookedTicketsByCategory
        };
    }
}
using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class BookTicketsHandler : IRequestHandler<BookTicketsCommand, BookTicketsResponse>
{
    private readonly AppDbContext _context;
    public BookTicketsHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<BookTicketsResponse> Handle(BookTicketsCommand request, CancellationToken ct)
    {
        var collapsedRequestedTicketCodes = request.BookedTickets
            .GroupBy(bt => bt.TicketCode.ToUpper())
            .Select(g => new
            {
                TicketCode = g.Key,
                TotalQuantity = g.Sum(bt => bt.Quantity)
            }).ToList();

        var toBeBookedTicketCodes = collapsedRequestedTicketCodes.Select(bt => bt.TicketCode).ToList();

        var validToBeBookedTickets = await _context.Tickets.Include(t => t.TicketCategory).Where(t => toBeBookedTicketCodes.Contains(t.TicketCode)).ToListAsync(ct);

        var groupedBookedTicketId = Guid.NewGuid().ToString();

        var bookedTickets = new List<BookedTicket>();
        var bookedTicketsResponse = new List<BookedTicketDetailDto>();

        foreach (var ticketToBeBooked in collapsedRequestedTicketCodes)
        {
            var ticket = validToBeBookedTickets.FirstOrDefault(t => t.TicketCode.Equals(ticketToBeBooked.TicketCode, StringComparison.OrdinalIgnoreCase));
            // ordinalignorecase katanya lebih better in performance (gc wise) dan culture invariant

            if (ticket == null)
            {
                throw new NotFoundException($"The ticket with the code '{ticketToBeBooked.TicketCode}' does not exist!");
            }

            if (ticket.Quota <= 0)
            {
                throw new ValidationException($"The ticket with the code '{ticketToBeBooked.TicketCode}' is out of quota!");
            }

            if (ticketToBeBooked.TotalQuantity > ticket.Quota)
            {
                throw new InvalidQuantityException($"The quantity '{ticketToBeBooked.TotalQuantity}' exceeds the remaining quota '{ticket.Quota}' for ticket code '{ticket.TicketCode}'!");
            }

            if (ticket.EventDate <= DateTime.UtcNow)
            {
                throw new ValidationException($"The sales for the ticket coded '{ticketToBeBooked.TicketCode}' has been closed! It took place on {ticket.EventDate.ToString("yyyy-MM-dd HH:mm:ss")} UTC!");
            }

            ticket.Quota -= ticketToBeBooked.TotalQuantity;

            var bookedTicket = new BookedTicket
            {
                Id = groupedBookedTicketId,
                BookedTicketCode = ticket.TicketCode,
                TicketId = ticket.Id,
                Quantity = ticketToBeBooked.TotalQuantity,
                BookedAt = DateTime.UtcNow
            };
            bookedTickets.Add(bookedTicket);
            bookedTicketsResponse.Add(new BookedTicketDetailDto(
                ticket.TicketCode,
                ticket.TicketName,
                ticketToBeBooked.TotalQuantity,
                ticket.Price,
                ticket.Price * ticketToBeBooked.TotalQuantity
            ));
        }

        _context.BookedTickets.AddRange(bookedTickets);
        await _context.SaveChangesAsync(ct);

        var categorySummaries = bookedTicketsResponse.GroupBy(bt => validToBeBookedTickets.First(t => t.TicketCode == bt.BookedTicketCode).TicketCategory.TicketCategoryName)
            .Select(g => new CategorySummaryDto(
                g.Key,
                g.Sum(bt => bt.TotalPriceAmount),
                g.ToList()
            )).ToList();

        var grandTotal = bookedTicketsResponse.Sum(bt => bt.TotalPriceAmount);

        return new BookTicketsResponse(
            grandTotal,
            categorySummaries
        );
    }
}
using System.ComponentModel.DataAnnotations;
using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
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
        var toBeBookedTicketCodes = request.BookedTickets.Select(bt => bt.TicketCode).ToList();

        var validToBeBookedTickets = await _context.Tickets.Include(t => t.TicketCategory).Where(t => toBeBookedTicketCodes.Contains(t.TicketCode)).ToListAsync(ct);

        var bookedTickets = new List<BookedTicket>();
        var bookedTicketsResponse = new List<BookedTicketDetailDto>();

        foreach (var ticketToBeBooked in request.BookedTickets)
        {
            var ticket = validToBeBookedTickets.FirstOrDefault(t => t.TicketCode == ticketToBeBooked.TicketCode);

            if (ticket is null)
            {
                throw new NotFoundException($"The ticket with the code '{ticketToBeBooked.TicketCode}' does not exist!");
            }

            if (ticket.Quota <= 0)
            {
                throw new ValidationException($"The ticket with the code '{ticketToBeBooked.TicketCode}' is out of quota!");
            }

            if (ticketToBeBooked.Quantity > ticket.Quota)
            {
                throw new ValidationException($"The quantity '{ticketToBeBooked.Quantity}' exceeds the remaining quota '{ticket.Quota}' for ticket code '{ticket.TicketCode}'!");
            }

            if (ticket.EventDate <= DateTime.UtcNow)
            {
                throw new ValidationException($"The sales for the ticket coded '{ticketToBeBooked.TicketCode}' has been closed! It took place on {ticket.EventDate.ToString("yyyy-MM-dd HH:mm:ss")} UTC!");
            }

            ticket.Quota -= ticketToBeBooked.Quantity;

            var bookedTicket = new BookedTicket
            {
                Id = Guid.NewGuid().ToString(),
                BookedTicketCode = ticket.TicketCode,
                TicketId = ticket.Id,
                Quantity = ticketToBeBooked.Quantity,
                BookedAt = DateTime.UtcNow
            };
            bookedTickets.Add(bookedTicket);
            bookedTicketsResponse.Add(new BookedTicketDetailDto(
                ticket.TicketCode,
                ticket.TicketName,
                ticketToBeBooked.Quantity,
                ticket.Price,
                ticket.Price * ticketToBeBooked.Quantity
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
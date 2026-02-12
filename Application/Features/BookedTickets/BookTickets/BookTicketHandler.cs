using System.ComponentModel.DataAnnotations;
using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class BookTicketHandler : IRequestHandler<BookTicketCommand, BookTicketResponse>
{
    private readonly AppDbContext _context;
    public BookTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<BookTicketResponse> Handle(BookTicketCommand request, CancellationToken ct)
    {
        var categoryExists = await _context.TicketCategories.AnyAsync(tc => tc.TicketCategoryName == request.TicketCategoryName, ct);

        if (categoryExists)
        {
            throw new ValidationException($"The category with the name '{request.TicketCategoryName}' already exist!");
        }

        var ticketCategory = new TicketCategory
        {
            TicketCategoryName = request.TicketCategoryName
        };
        _context.TicketCategories.Add(ticketCategory);
        await _context.SaveChangesAsync(ct);
        return new BookTicketResponse(
            ticketCategory.Id,
            ticketCategory.TicketCategoryName
            );
    }
}
using System.ComponentModel.DataAnnotations;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateTicketHandler : IRequestHandler<CreateTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateTicketCommand request, CancellationToken ct)
    {
        var categoryExists = await _context.TicketCategories.AnyAsync(c => c.Id == request.TicketCategoryId, ct);

        if (!categoryExists)
        {
            throw new ValidationException("The category selected doesn't exist!");
        }
        
        var ticket = new Ticket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            EventDate = request.EventDate,
        };
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            ticket.TicketCode,
            ticket.TicketCategory.TicketCategoryName,
            ticket.TicketName,
            ticket.Quota,
            ticket.Price,
            ticket.EventDate
            );
    }
}
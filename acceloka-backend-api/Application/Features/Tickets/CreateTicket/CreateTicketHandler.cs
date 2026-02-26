using AccelokaSandy.Application.Common.Exceptions;
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
        var categoryExists = await _context.TicketCategories.FirstOrDefaultAsync(c => c.Id == request.TicketCategoryId, ct);

        if (categoryExists == null)
        {
            throw new NotFoundException("category selected doesn't exist!");
        }

        var ticketCodeExists = await _context.Tickets.AnyAsync(t => EF.Functions.ILike(t.TicketCode, request.TicketCode), ct);

        if (ticketCodeExists)
        {
            throw new DuplicateValuesException($"The ticket with the code '{request.TicketCode}' already exist!");
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
            categoryExists.TicketCategoryName,
            ticket.TicketName,
            ticket.Quota,
            ticket.Price,
            ticket.EventDate
            );
    }
}
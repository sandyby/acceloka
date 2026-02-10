using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Requests.Tickets;
using MediatR;

public class CreateTicketHandler : IRequestHandler<CreateTicket, TicketDto>
{
    private readonly AppDbContext _context;
    public CreateTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<TicketDto> Handle(CreateTicket request, CancellationToken ct)
    {
        var ticket = new Ticket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            TicketCategory = request.TicketName,
            Quota = request.Quota,
            Price = request.Price,
            EventDate = request.EventDate,
        };
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync(ct);
        return new TicketDto(ticket.TicketCode, ticket.TicketName, ticket.TicketCategory, ticket.Quota, ticket.Price, ticket.EventDate);
    }
}
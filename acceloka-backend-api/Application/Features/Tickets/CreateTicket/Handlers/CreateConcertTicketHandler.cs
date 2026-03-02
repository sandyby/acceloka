using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities.Tickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateConcertTicketHandler : IRequestHandler<CreateConcertTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateConcertTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateConcertTicketCommand request, CancellationToken ct)
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

        ConcertTicket concertTicket = new ConcertTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            Venue = request.Venue,
            SeatSection = request.SeatSection,
            Artist = request.Artist,
            ConcertDate = request.ConcertDate,
            Duration = request.Duration,
            Packages = request.Packages,
        };
        _context.Tickets.Add(concertTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            concertTicket.TicketCode,
            categoryExists.TicketCategoryName,
            concertTicket.TicketName,
            concertTicket.Quota,
            concertTicket.Price
        );
    }
}
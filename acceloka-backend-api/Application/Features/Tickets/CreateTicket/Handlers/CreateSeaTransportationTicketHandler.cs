using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateSeaTransportationTicketHandler : IRequestHandler<CreateSeaTransportationTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateSeaTransportationTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateSeaTransportationTicketCommand request, CancellationToken ct)
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

        SeaTransportationTicket seaTransportationTicket = new SeaTransportationTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            TransportationType = request.TransportationType,
            Company = request.Company,
            SeatClass = request.SeatClass,
            DeparturePort = request.DeparturePort,
            ArrivalPort = request.ArrivalPort,
            DepartureTime = request.DepartureTime,
            Duration = request.Duration,
            TransitsCount = request.TransitsCount,
            Amenities = request.Amenities,
        };
        _context.Tickets.Add(seaTransportationTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            seaTransportationTicket.TicketCode,
            categoryExists.TicketCategoryName,
            seaTransportationTicket.TicketName,
            seaTransportationTicket.Quota,
            seaTransportationTicket.Price
        );
    }
}
using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateBusTicketHandler : IRequestHandler<CreateBusTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateBusTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateBusTicketCommand request, CancellationToken ct)
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

        BusTicket busTicket = new BusTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            BusCode = request.BusCode,
            BusType = request.BusType,
            SeatClass = request.SeatClass,
            DepartureStop = request.DepartureStop,
            ArrivalStop = request.ArrivalStop,
            DepartureTime = request.DepartureTime,
            Duration = request.Duration,
            TransitsCount = request.TransitsCount,
            Amenities = request.Amenities,
        };
        _context.Tickets.Add(busTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            busTicket.TicketCode,
            categoryExists.TicketCategoryName,
            busTicket.TicketName,
            busTicket.Quota,
            busTicket.Price
        );
    }
}
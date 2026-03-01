using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateFlightTicketHandler : IRequestHandler<CreateFlightTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateFlightTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateFlightTicketCommand request, CancellationToken ct)
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

        FlightTicket flightTicket = new FlightTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            Airline = request.Airline,
            SeatClass = request.SeatClass,
            DepartureTime = request.DepartureTime,
            Duration = request.Duration,
            DepartureAirport = request.DepartureAirport,
            ArrivalAirport = request.ArrivalAirport,
            BaggageKg = request.BaggageKg,
            TransitsCount = request.TransitsCount,
            Amenities = request.Amenities
        };
        _context.Tickets.Add(flightTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            flightTicket.TicketCode,
            categoryExists.TicketCategoryName,
            flightTicket.TicketName,
            flightTicket.Quota,
            flightTicket.Price
        );
    }
}
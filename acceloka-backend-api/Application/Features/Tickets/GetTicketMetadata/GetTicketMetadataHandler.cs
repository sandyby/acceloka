using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities.Tickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetTicketMetadataHandler
    : IRequestHandler<GetTicketMetadataQuery, TicketMetadataDto>
{
    private readonly AppDbContext _context;

    public GetTicketMetadataHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<TicketMetadataDto> Handle(GetTicketMetadataQuery request, CancellationToken ct)
    {
        var dto = new TicketMetadataDto();

        if (string.Equals(request.TicketCategory, "flights", StringComparison.OrdinalIgnoreCase))
        {
            var flights = _context.Tickets.Where(t => t.Quota > 0).AsQueryable().OfType<FlightTicket>().AsQueryable();

            if (await flights.AnyAsync(ct))
            {
                dto.MaxPrice = await flights
                .Select(f => f.Price)
                .MaxAsync(ct);

                dto.MinDeparture = await flights
                    .Select(f => f.DepartureTime ?? DateTime.MinValue)
                    .MinAsync(ct);

                dto.MaxDeparture = await flights
                    .Select(f => f.DepartureTime ?? DateTime.MaxValue)
                    .MaxAsync(ct);

                dto.MinArrival = await flights
                    .Select(f => f.DepartureTime + f.Duration)
                    .MinAsync(ct);

                dto.MaxArrival = await flights
                    .Select(f => f.DepartureTime + f.Duration)
                    .MaxAsync(ct);

                dto.Airlines = await flights
                    .Select(f => f.Airline)
                    .Distinct()
                    .ToListAsync(ct);

                var amenitiesQuery = flights
            .Select(f => f.Amenities)
            .ToListAsync(ct);

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities
                    .Where(a => a != null)
                    .SelectMany(a => a!)
                    .Distinct()
                    .ToList();

                dto.SeatClasses = await flights
                    .Select(f => f.SeatClass ?? string.Empty)
                    .Distinct()
                    .ToListAsync(ct);
            }
        }

        return dto;
    }
}
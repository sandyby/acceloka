using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities.Tickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetTicketMetadataHandler
    : IRequestHandler<GetTicketMetadataQuery, TicketMetadataDto>
{
    private readonly AppDbContext _db;

    public GetTicketMetadataHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<TicketMetadataDto> Handle(GetTicketMetadataQuery request, CancellationToken ct)
    {
        var dto = new TicketMetadataDto();

        if (string.Equals(request.TicketCategory, "flights", StringComparison.OrdinalIgnoreCase))
        {
            var flights = _db.Tickets.OfType<FlightTicket>().AsQueryable();

            if (await flights.AnyAsync(ct))
            {
                dto.MaxPrice = await flights
                .Select(f => f.Price)
                .MaxAsync(ct);

                dto.EarliestDeparture = await flights
                    .Select(f => f.DepartureTime)
                    .MinAsync(ct);

                dto.LatestDeparture = await flights
                    .Select(f => f.DepartureTime)
                    .MaxAsync(ct);

                dto.Airlines = await flights
                    .Select(f => f.Airline)
                    .Distinct()
                    .ToListAsync(ct);

                var amenitiesQuery = flights
            .Select(f => f.Amenities)
            .ToListAsync(ct);  // Bring to memory

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities
                    .Where(a => a != null)
                    .SelectMany(a => a)
                    .Distinct()
                    .ToList();

                dto.SeatClasses = await flights
                    .Select(f => f.SeatClass ?? string.Empty)  // ← handle null SeatClass
                    .Distinct()
                    .ToListAsync(ct);
            }
        }

        return dto;
    }
}
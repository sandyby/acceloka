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
            var flights = _context.Tickets.OfType<FlightTicket>().Where(t => t.Quota > 0 && t.DepartureTime > DateTime.UtcNow).AsQueryable();

            if (await flights.AnyAsync(ct))
            {
                dto.MaxPrice = await flights.Select(f => f.Price).MaxAsync(ct);
                dto.MinDeparture = await flights.Select(f => f.DepartureTime).MinAsync(ct);
                dto.MaxDeparture = await flights.Select(f => f.DepartureTime).MaxAsync(ct);
                dto.MinArrival = await flights.Select(f => f.DepartureTime + f.Duration).MinAsync(ct);
                dto.MaxArrival = await flights.Select(f => f.DepartureTime + f.Duration).MaxAsync(ct);

                dto.Airlines = await flights.Select(f => f.Airline).Distinct().ToListAsync(ct);

                var amenitiesQuery = flights.Select(f => f.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
                dto.SeatClasses = await flights.Select(f => f.SeatClass ?? "").Distinct().ToListAsync(ct);
            }
        }
        else if (string.Equals(request.TicketCategory, "hotels", StringComparison.OrdinalIgnoreCase))
        {
            var hotels = _context.Tickets.OfType<HotelTicket>().Where(t => t.Quota > 0 && t.MinCheckInDate > DateTime.UtcNow).AsQueryable();

            if (await hotels.AnyAsync(ct))
            {
                dto.MaxPrice = await hotels.Select(h => h.Price).MaxAsync(ct);
                dto.MinCheckInDate = await hotels.Select(h => h.MinCheckInDate).MinAsync(ct);
                dto.MaxCheckOutDate = await hotels.Select(h => h.MaxCheckOutDate).MaxAsync(ct);
                dto.HotelNames = await hotels.Select(h => h.HotelName).Distinct().ToListAsync(ct);
                dto.RoomTypes = await hotels.Select(h => h.RoomType).Distinct().ToListAsync(ct);
                var maxOccupancyValues = await hotels.Select(h => h.MaxOccupancy).ToListAsync();

                dto.MaxOccupancy = maxOccupancyValues.Any() ? maxOccupancyValues.Max() : 1;
                var amenitiesQuery = hotels.Select(f => f.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
            }
        }
        else if (string.Equals(request.TicketCategory, "concerts", StringComparison.OrdinalIgnoreCase))
        {
            var concerts = _context.Tickets.OfType<ConcertTicket>().Where(t => t.Quota > 0 && t.ConcertDate > DateTime.UtcNow).AsQueryable();

            if (await concerts.AnyAsync(ct))
            {
                dto.MaxPrice = await concerts.Select(c => c.Price).MaxAsync(ct);
                dto.MinConcertDate = await concerts.Select(c => c.ConcertDate).MinAsync(ct);
                dto.MaxConcertDate = await concerts.Select(c => c.ConcertDate).MaxAsync(ct);
                dto.Venues = await concerts.Select(c => c.Venue).Distinct().ToListAsync(ct);
                dto.Artists = await concerts.Select(c => c.Artist).Distinct().ToListAsync(ct);
                dto.SeatSections = await concerts.Select(c => c.SeatSection).Distinct().ToListAsync(ct);
                var packagesQuery = concerts.Select(f => f.Packages).ToListAsync();
                var packages = await packagesQuery;
                dto.Packages = packages.Where(pkg => pkg != null).SelectMany(pkg => pkg!).Distinct().ToList();
            }
        }

        return dto;
    }
}
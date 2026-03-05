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
                dto.MaxBaggageKg = await flights.Select(f => f.BaggageKg).MaxAsync(ct);
                dto.TransitsCount = await flights.CountAsync(f => f.TransitsCount > 0, ct);
                dto.DirectCount = await flights.CountAsync(f => f.TransitsCount == 0, ct);

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
                // dto.RoomTypes = await hotels.Select(h => h.RoomType).Distinct().ToListAsync(ct);
                dto.Types = await hotels.Select(h => h.RoomType).Distinct().ToListAsync(ct);
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
                var packagesQuery = concerts.Select(c => c.Packages).ToListAsync();
                var packages = await packagesQuery;
                dto.Packages = packages.Where(pkg => pkg != null).SelectMany(pkg => pkg!).Distinct().ToList();
            }
        }
        else if (string.Equals(request.TicketCategory, "movies", StringComparison.OrdinalIgnoreCase))
        {
            var movies = _context.Tickets.OfType<MovieTicket>().Where(t => t.Quota > 0 && t.ScreeningTime > DateTime.UtcNow).AsQueryable();

            if (await movies.AnyAsync(ct))
            {
                dto.MaxPrice = await movies.Select(m => m.Price).MaxAsync(ct);
                dto.MinScreeningTime = await movies.Select(m => m.ScreeningTime).MinAsync(ct);
                dto.MaxScreeningTime = await movies.Select(m => m.ScreeningTime).MaxAsync(ct);
                var fetchedMaxDuration = await movies.Select(m => m.Duration).MaxAsync(ct) ?? new TimeSpan(99, 59, 0);
                dto.MaxDurationInMinutes = Convert.ToInt32(Math.Round(fetchedMaxDuration.TotalMinutes));
                dto.Cinemas = await movies.Select(m => m.Cinema).Distinct().ToListAsync(ct);
                dto.Types = await movies.Select(m => m.CinemaType).Distinct().ToListAsync(ct);
                dto.SeatSections = await movies.Select(m => m.SeatSection).Distinct().ToListAsync(ct);
            }
        }
        else if (string.Equals(request.TicketCategory, "trains", StringComparison.OrdinalIgnoreCase))
        {
            var trains = _context.Tickets.OfType<TrainTicket>().Where(t => t.Quota > 0 && t.DepartureTime > DateTime.UtcNow).AsQueryable();

            if (await trains.AnyAsync(ct))
            {
                dto.MaxPrice = await trains.Select(tr => tr.Price).MaxAsync(ct);
                dto.MinDeparture = await trains.Select(tr => tr.DepartureTime).MinAsync(ct);
                dto.MaxDeparture = await trains.Select(tr => tr.DepartureTime).MaxAsync(ct);
                dto.MinArrival = await trains.Select(tr => tr.DepartureTime + tr.Duration).MinAsync(ct);
                dto.MaxArrival = await trains.Select(tr => tr.DepartureTime + tr.Duration).MaxAsync(ct);
                dto.Types = await trains.Select(tr => tr.TrainType).Distinct().ToListAsync(ct);
                dto.TransitsCount = await trains.CountAsync(tr => tr.TransitsCount > 0, ct);
                dto.DirectCount = await trains.CountAsync(tr => tr.TransitsCount == 0, ct);

                var amenitiesQuery = trains.Select(tr => tr.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
                dto.SeatClasses = await trains.Select(tr => tr.SeatClass ?? "").Distinct().ToListAsync(ct);
            }
        }
        else if (string.Equals(request.TicketCategory, "buses", StringComparison.OrdinalIgnoreCase))
        {
            var buses = _context.Tickets.OfType<BusTicket>().Where(t => t.Quota > 0 && t.DepartureTime > DateTime.UtcNow).AsQueryable();

            if (await buses.AnyAsync(ct))
            {
                dto.MaxPrice = await buses.Select(bus => bus.Price).MaxAsync(ct);
                dto.MinDeparture = await buses.Select(bus => bus.DepartureTime).MinAsync(ct);
                dto.MaxDeparture = await buses.Select(bus => bus.DepartureTime).MaxAsync(ct);
                dto.MinArrival = await buses.Select(bus => bus.DepartureTime + bus.Duration).MinAsync(ct);
                dto.MaxArrival = await buses.Select(bus => bus.DepartureTime + bus.Duration).MaxAsync(ct);
                dto.Types = await buses.Select(bus => bus.BusType).Distinct().ToListAsync(ct);
                dto.TransitsCount = await buses.CountAsync(bus => bus.TransitsCount > 0, ct);
                dto.DirectCount = await buses.CountAsync(bus => bus.TransitsCount == 0, ct);

                var amenitiesQuery = buses.Select(bus => bus.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
                dto.SeatClasses = await buses.Select(bus => bus.SeatClass ?? "").Distinct().ToListAsync(ct);
            }
        }
        else if (string.Equals(request.TicketCategory, "sea-transportations", StringComparison.OrdinalIgnoreCase))
        {
            var seaTransports = _context.Tickets.OfType<SeaTransportationTicket>().Where(t => t.Quota > 0 && t.DepartureTime > DateTime.UtcNow).AsQueryable();

            if (await seaTransports.AnyAsync(ct))
            {
                dto.MaxPrice = await seaTransports.Select(sea => sea.Price).MaxAsync(ct);
                dto.MinDeparture = await seaTransports.Select(sea => sea.DepartureTime).MinAsync(ct);
                dto.MaxDeparture = await seaTransports.Select(sea => sea.DepartureTime).MaxAsync(ct);
                dto.MinArrival = await seaTransports.Select(sea => sea.DepartureTime + sea.Duration).MinAsync(ct);
                dto.MaxArrival = await seaTransports.Select(sea => sea.DepartureTime + sea.Duration).MaxAsync(ct);
                dto.Types = await seaTransports.Select(sea => sea.TransportationType).Distinct().ToListAsync(ct);
                dto.TransitsCount = await seaTransports.CountAsync(sea => sea.TransitsCount > 0, ct);
                dto.DirectCount = await seaTransports.CountAsync(sea => sea.TransitsCount == 0, ct);

                var amenitiesQuery = seaTransports.Select(sea => sea.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
                dto.SeatClasses = await seaTransports.Select(sea => sea.SeatClass ?? "").Distinct().ToListAsync(ct);
            }
        }

        return dto;
    }
}
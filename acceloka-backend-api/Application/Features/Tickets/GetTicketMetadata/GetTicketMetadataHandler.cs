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

            // if (await flights.AnyAsync(ct))
            // {
            //     dto.MaxPrice = await flights
            //     .Select(f => f.Price)
            //     .MaxAsync(ct);

            //     dto.MinDeparture = await flights
            //         .Select(f => f.DepartureTime ?? DateTime.MinValue)
            //         .MinAsync(ct);

            //     dto.MaxDeparture = await flights
            //         .Select(f => f.DepartureTime ?? DateTime.MaxValue)
            //         .MaxAsync(ct);

            //     dto.MinArrival = await flights
            //         .Select(f => f.DepartureTime + f.Duration)
            //         .MinAsync(ct);

            //     dto.MaxArrival = await flights
            //         .Select(f => f.DepartureTime + f.Duration)
            //         .MaxAsync(ct);

            //     dto.Airlines = await flights
            //         .Select(f => f.Airline)
            //         .Distinct()
            //         .ToListAsync(ct);

            //     var amenitiesQuery = flights
            // .Select(f => f.Amenities)
            // .ToListAsync(ct);

            //     var amenities = await amenitiesQuery;
            //     dto.Amenities = amenities
            //         .Where(a => a != null)
            //         .SelectMany(a => a!)
            //         .Distinct()
            //         .ToList();

            //     dto.SeatClasses = await flights
            //         .Select(f => f.SeatClass ?? string.Empty)
            //         .Distinct()
            //         .ToListAsync(ct);
            // }

            if (await flights.AnyAsync(ct))
            {
                dto.MaxPrice = await flights.Select(f => f.Price).MaxAsync(ct);
                dto.MinDeparture = await flights.Select(f => f.DepartureTime).MinAsync(ct);
                dto.MaxDeparture = await flights.Select(f => f.DepartureTime).MaxAsync(ct);
                dto.MinArrival = await flights.Select(f => f.DepartureTime + f.Duration).MinAsync(ct);
                dto.MaxArrival = await flights.Select(f => f.DepartureTime + f.Duration).MaxAsync(ct);

                dto.Airlines = await flights.Select(f => f.Airline).Distinct().ToListAsync(ct);
                // dto.Amenities = await flights.SelectMany(f => f.Amenities ?? Enumerable.Empty<string>()).Distinct().ToListAsync(ct);
                var amenitiesQuery = flights.Select(f => f.Amenities).ToListAsync();

                var amenities = await amenitiesQuery;
                dto.Amenities = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
                dto.SeatClasses = await flights.Select(f => f.SeatClass ?? "").Distinct().ToListAsync(ct);

                // dto.FilterFields["minDeparture"] = await flights.MinAsync(f => f.DepartureTime, ct);

                // dto.FilterFields["maxDeparture"] = await flights.MaxAsync(f => f.DepartureTime, ct);

                // dto.FilterFields["minArrival"] = await flights.MinAsync(f => f.DepartureTime + f.Duration, ct);

                // dto.FilterFields["maxArrival"] = await flights.MaxAsync(f => f.DepartureTime + f.Duration, ct);

                // dto.FilterFields["airlines"] = await flights.Select(f => f.Airline).Distinct().ToListAsync(ct);

                // dto.FilterFields["seatClasses"] = await flights.Select(f => f.SeatClass).Distinct().ToListAsync(ct);

                // var amenitiesQuery = flights.Select(f => f.Amenities).ToListAsync();

                // var amenities = await amenitiesQuery;
                // dto.FilterFields["amenities"] = amenities.Where(a => a != null).SelectMany(a => a!).Distinct().ToList();
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
                // dto.Amenities = await hotels.SelectMany(h => h.Amenities ?? Enumerable.Empty<string>()).Distinct().ToListAsync(ct);
            }
        }

        return dto;
    }
}
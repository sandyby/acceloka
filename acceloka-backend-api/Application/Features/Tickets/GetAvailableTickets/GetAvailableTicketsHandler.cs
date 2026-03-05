using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using AccelokaSandy.Application.Common.Mappings;
using Microsoft.EntityFrameworkCore;
using MediatR;
using AccelokaSandy.Domain.Entities.Tickets;

public class GetAvailableTicketsHandler : IRequestHandler<GetAvailableTicketsQuery, GetAvailableTicketsResponse>
{
    private readonly AppDbContext _context;
    private readonly ITicketToDtoMapper _mapper;

    public GetAvailableTicketsHandler(AppDbContext context, ITicketToDtoMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    public async Task<GetAvailableTicketsResponse> Handle(GetAvailableTicketsQuery request, CancellationToken ct)
    {
        var query = _context.Tickets.Include(t => t.TicketCategory).Where(t => t.Quota > 0).AsQueryable();

        if (!string.IsNullOrEmpty(request.TicketCategory))
        {
            query = query.Where(t => EF.Functions.ILike(t.TicketCategory.TicketCategoryName, request.TicketCategory));
        }
        if (!string.IsNullOrEmpty(request.TicketCode))
        {
            query = query.Where(t => EF.Functions.ILike(t.TicketCode, request.TicketCode));
        }
        if (!string.IsNullOrEmpty(request.TicketName))
        {
            query = query.Where(t => EF.Functions.ILike(t.TicketName, request.TicketName));
        }
        if (request.MaxPrice.HasValue)
        {
            query = query.Where(t => t.Price <= request.MaxPrice);
        }

        if (request.TicketCategory!.Equals("flights", StringComparison.OrdinalIgnoreCase))
        {
            var flightTicketQuery = query.OfType<FlightTicket>();
            if (request.MinDeparture.HasValue)
            {
                var minDeparture = DateTime.SpecifyKind(request.MinDeparture.Value, DateTimeKind.Utc);
                flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime >= minDeparture);
            }

            if (request.MaxDeparture.HasValue)
            {
                var maxDeparture = DateTime.SpecifyKind(request.MaxDeparture.Value, DateTimeKind.Utc);
                flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime <= maxDeparture);
            }

            if (request.MinArrival.HasValue)
            {
                var minArrival = DateTime.SpecifyKind(request.MinArrival.Value, DateTimeKind.Utc);
                flightTicketQuery = flightTicketQuery.Where(ft => (ft.DepartureTime + ft.Duration) >= minArrival);
            }

            if (request.MaxArrival.HasValue)
            {
                var maxArrival = DateTime.SpecifyKind(request.MaxArrival.Value, DateTimeKind.Utc);
                flightTicketQuery = flightTicketQuery.Where(ft => (ft.DepartureTime + ft.Duration) <= maxArrival);
            }

            if (request.Airlines != null && request.Airlines.Any())
            {
                flightTicketQuery = flightTicketQuery.Where(ft => request.Airlines.Contains(ft.Airline));
            }

            if (request.SeatClasses != null && request.SeatClasses.Any())
            {
                flightTicketQuery = flightTicketQuery.Where(ft => request.SeatClasses.Contains(ft.SeatClass));
            }

            if (request.BaggageKg.HasValue)
            {
                flightTicketQuery = flightTicketQuery.Where(ft => ft.BaggageKg >= request.BaggageKg);
            }

            if (request.Direct.HasValue)
            {
                if (request.Direct.Value)
                {
                    flightTicketQuery = flightTicketQuery.Where(ft => ft.TransitsCount == 0);
                }
                else
                {
                    flightTicketQuery = flightTicketQuery.Where(ft => ft.TransitsCount > 0);
                }
            }

            if (request.Amenities != null && request.Amenities.Any())
            {
                var normalizedAmenitiesRequest = request.Amenities.Where(a => !string.IsNullOrWhiteSpace(a)).Select(a => a.Trim().ToLower()).ToArray();
                if (normalizedAmenitiesRequest != null && normalizedAmenitiesRequest.Any())
                {
                    flightTicketQuery = flightTicketQuery.Where(ft => ft.Amenities != null && EF.Functions.JsonExistAny(ft.Amenities, normalizedAmenitiesRequest));
                }
            }

            query = flightTicketQuery;
        }
        else if (request.TicketCategory!.Equals("hotels", StringComparison.OrdinalIgnoreCase))
        {
            var hotelTicketQuery = query.OfType<HotelTicket>();
            if (request.MinCheckIn.HasValue)
            {
                var minCheckInDate = DateTime.SpecifyKind(request.MinCheckIn.Value, DateTimeKind.Utc);
                hotelTicketQuery = hotelTicketQuery.Where(htl => htl.MinCheckInDate >= minCheckInDate);
            }

            if (request.MaxCheckOut.HasValue)
            {
                var maxCheckOutDate = DateTime.SpecifyKind(request.MaxCheckOut.Value, DateTimeKind.Utc);
                hotelTicketQuery = hotelTicketQuery.Where(htl => htl.MaxCheckOutDate <= maxCheckOutDate);
            }

            if (request.HotelNames != null && request.HotelNames.Any())
            {
                hotelTicketQuery = hotelTicketQuery.Where(htl => request.HotelNames.Contains(htl.HotelName));
            }

            if (request.Types != null && request.Types.Any())
            {
                hotelTicketQuery = hotelTicketQuery.Where(htl => request.Types.Contains(htl.RoomType));
            }

            if (request.Amenities != null && request.Amenities.Any())
            {
                var normalizedAmenitiesRequest = request.Amenities.Where(a => !string.IsNullOrWhiteSpace(a)).Select(a => a.Trim().ToLower()).ToArray();
                if (normalizedAmenitiesRequest != null && normalizedAmenitiesRequest.Any())
                {
                    hotelTicketQuery = hotelTicketQuery.Where(htl => htl.Amenities != null && EF.Functions.JsonExistAny(htl.Amenities, normalizedAmenitiesRequest));
                }
            }

            query = hotelTicketQuery;
        }
        else if (request.TicketCategory!.Equals("concerts", StringComparison.OrdinalIgnoreCase))
        {
            var concertTicketQuery = query.OfType<ConcertTicket>();
            if (request.MinConcert.HasValue)
            {
                var minConcertDate = DateTime.SpecifyKind(request.MinConcert.Value, DateTimeKind.Utc);
                concertTicketQuery = concertTicketQuery.Where(c => c.ConcertDate.Date >= minConcertDate.Date);
            }

            if (request.MaxConcert.HasValue)
            {
                var maxConcertDate = DateTime.SpecifyKind(request.MaxConcert.Value, DateTimeKind.Utc);
                concertTicketQuery = concertTicketQuery.Where(c => c.ConcertDate.Date <= maxConcertDate.Date);
            }

            if (request.Venues != null && request.Venues.Any())
            {
                concertTicketQuery = concertTicketQuery.Where(c => request.Venues.Contains(c.Venue));
            }

            if (request.Artists != null && request.Artists.Any())
            {
                concertTicketQuery = concertTicketQuery.Where(c => request.Artists.Contains(c.Artist));
            }

            if (request.SeatSections != null && request.SeatSections.Any())
            {
                concertTicketQuery = concertTicketQuery.Where(c => request.SeatSections.Contains(c.SeatSection));
            }

            if (request.Packages != null && request.Packages.Any())
            {
                var normalizedPackagesRequest = request.Packages.Where(pkg => !string.IsNullOrWhiteSpace(pkg)).Select(pkg => pkg.Trim().ToLower()).ToArray();
                if (normalizedPackagesRequest != null && normalizedPackagesRequest.Any())
                {
                    concertTicketQuery = concertTicketQuery.Where(c => c.Packages != null && EF.Functions.JsonExistAny(c.Packages, normalizedPackagesRequest));
                }
            }

            query = concertTicketQuery;
        }
        else if (request.TicketCategory!.Equals("movies", StringComparison.OrdinalIgnoreCase))
        {
            var movieTicketQuery = query.OfType<MovieTicket>();
            if (request.MinScreening.HasValue)
            {
                var minScreeningTime = DateTime.SpecifyKind(request.MinScreening.Value, DateTimeKind.Utc);
                movieTicketQuery = movieTicketQuery.Where(c => c.ScreeningTime >= minScreeningTime);
            }

            if (request.MaxScreening.HasValue)
            {
                var maxScreeningTime = DateTime.SpecifyKind(request.MaxScreening.Value, DateTimeKind.Utc);
                movieTicketQuery = movieTicketQuery.Where(m => m.ScreeningTime <= maxScreeningTime);
            }

            if (request.Cinemas != null && request.Cinemas.Any())
            {
                movieTicketQuery = movieTicketQuery.Where(m => request.Cinemas.Contains(m.Cinema));
            }

            if (request.Types != null && request.Types.Any())
            {
                movieTicketQuery = movieTicketQuery.Where(m => request.Types.Contains(m.CinemaType));
            }

            if (request.SeatSections != null && request.SeatSections.Any())
            {
                movieTicketQuery = movieTicketQuery.Where(m => request.SeatSections.Contains(m.SeatSection));
            }

            // * kalo data type string
            // if (!string.IsNullOrWhiteSpace(request.MaxDuration))
            // {
            //     var normalizedMaxDurationRequest = request.MaxDuration.Trim();
            //     if (TimeSpan.TryParseExact(request.MaxDuration, @"HH\:mm", null, out var maxDurationTimeSpan))
            //     {
            //         movieTicketQuery = movieTicketQuery.Where(m => m.Duration <= maxDurationTimeSpan);
            //     }
            // }

            // * int, kalo dari zod passing sebagai int (total minutes)
            if (request.MaxDuration.HasValue)
            {
                var maxDurationTimeSpan = TimeSpan.FromMinutes(request.MaxDuration.Value);
                movieTicketQuery = movieTicketQuery.Where(m => m.Duration <= maxDurationTimeSpan);
            }

            query = movieTicketQuery;
        }
        else if (request.TicketCategory!.Equals("trains", StringComparison.OrdinalIgnoreCase))
        {
            var trainTicketQuery = query.OfType<TrainTicket>();
            if (request.MinDeparture.HasValue)
            {
                var minDeparture = DateTime.SpecifyKind(request.MinDeparture.Value, DateTimeKind.Utc);
                trainTicketQuery = trainTicketQuery.Where(tr => tr.DepartureTime >= minDeparture);
            }

            if (request.MaxDeparture.HasValue)
            {
                var maxDeparture = DateTime.SpecifyKind(request.MaxDeparture.Value, DateTimeKind.Utc);
                trainTicketQuery = trainTicketQuery.Where(tr => tr.DepartureTime <= maxDeparture);
            }

            if (request.MinArrival.HasValue)
            {
                var minArrival = DateTime.SpecifyKind(request.MinArrival.Value, DateTimeKind.Utc);
                trainTicketQuery = trainTicketQuery.Where(tr => (tr.DepartureTime + tr.Duration) >= minArrival);
            }

            if (request.MaxArrival.HasValue)
            {
                var maxArrival = DateTime.SpecifyKind(request.MaxArrival.Value, DateTimeKind.Utc);
                trainTicketQuery = trainTicketQuery.Where(tr => (tr.DepartureTime + tr.Duration) <= maxArrival);
            }

            if (request.Types != null && request.Types.Any())
            {
                trainTicketQuery = trainTicketQuery.Where(tr => request.Types.Contains(tr.TrainType));
            }

            if (request.SeatClasses != null && request.SeatClasses.Any())
            {
                trainTicketQuery = trainTicketQuery.Where(tr => request.SeatClasses.Contains(tr.SeatClass));
            }

            if (request.Direct.HasValue)
            {
                if (request.Direct.Value)
                {
                    trainTicketQuery = trainTicketQuery.Where(tr => tr.TransitsCount == 0);
                }
                else
                {
                    trainTicketQuery = trainTicketQuery.Where(tr => tr.TransitsCount > 0);
                }
            }

            if (request.Amenities != null && request.Amenities.Any())
            {
                var normalizedAmenitiesRequest = request.Amenities.Where(a => !string.IsNullOrWhiteSpace(a)).Select(a => a.Trim().ToLower()).ToArray();
                if (normalizedAmenitiesRequest != null && normalizedAmenitiesRequest.Any())
                {
                    trainTicketQuery = trainTicketQuery.Where(tr => tr.Amenities != null && EF.Functions.JsonExistAny(tr.Amenities, normalizedAmenitiesRequest));
                }
            }

            query = trainTicketQuery;
        }
        else if (request.TicketCategory!.Equals("buses", StringComparison.OrdinalIgnoreCase))
        {
            var busTicketQuery = query.OfType<BusTicket>();
            if (request.MinDeparture.HasValue)
            {
                var minDeparture = DateTime.SpecifyKind(request.MinDeparture.Value, DateTimeKind.Utc);
                busTicketQuery = busTicketQuery.Where(bus => bus.DepartureTime >= minDeparture);
            }

            if (request.MaxDeparture.HasValue)
            {
                var maxDeparture = DateTime.SpecifyKind(request.MaxDeparture.Value, DateTimeKind.Utc);
                busTicketQuery = busTicketQuery.Where(bus => bus.DepartureTime <= maxDeparture);
            }

            if (request.MinArrival.HasValue)
            {
                var minArrival = DateTime.SpecifyKind(request.MinArrival.Value, DateTimeKind.Utc);
                busTicketQuery = busTicketQuery.Where(bus => (bus.DepartureTime + bus.Duration) >= minArrival);
            }

            if (request.MaxArrival.HasValue)
            {
                var maxArrival = DateTime.SpecifyKind(request.MaxArrival.Value, DateTimeKind.Utc);
                busTicketQuery = busTicketQuery.Where(bus => (bus.DepartureTime + bus.Duration) <= maxArrival);
            }

            if (request.Types != null && request.Types.Any())
            {
                busTicketQuery = busTicketQuery.Where(bus => request.Types.Contains(bus.BusType));
            }

            if (request.SeatClasses != null && request.SeatClasses.Any())
            {
                busTicketQuery = busTicketQuery.Where(bus => request.SeatClasses.Contains(bus.SeatClass));
            }

            if (request.Direct.HasValue)
            {
                if (request.Direct.Value)
                {
                    busTicketQuery = busTicketQuery.Where(bus => bus.TransitsCount == 0);
                }
                else
                {
                    busTicketQuery = busTicketQuery.Where(bus => bus.TransitsCount > 0);
                }
            }

            if (request.Amenities != null && request.Amenities.Any())
            {
                var normalizedAmenitiesRequest = request.Amenities.Where(a => !string.IsNullOrWhiteSpace(a)).Select(a => a.Trim().ToLower()).ToArray();
                if (normalizedAmenitiesRequest != null && normalizedAmenitiesRequest.Any())
                {
                    busTicketQuery = busTicketQuery.Where(bus => bus.Amenities != null && EF.Functions.JsonExistAny(bus.Amenities, normalizedAmenitiesRequest));
                }
            }

            query = busTicketQuery;
        }
        else if (request.TicketCategory!.Equals("sea-transportations", StringComparison.OrdinalIgnoreCase))
        {
            var seaTransportationTicketQuery = query.OfType<SeaTransportationTicket>();
            if (request.MinDeparture.HasValue)
            {
                var minDeparture = DateTime.SpecifyKind(request.MinDeparture.Value, DateTimeKind.Utc);
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => sea.DepartureTime >= minDeparture);
            }

            if (request.MaxDeparture.HasValue)
            {
                var maxDeparture = DateTime.SpecifyKind(request.MaxDeparture.Value, DateTimeKind.Utc);
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => sea.DepartureTime <= maxDeparture);
            }

            if (request.MinArrival.HasValue)
            {
                var minArrival = DateTime.SpecifyKind(request.MinArrival.Value, DateTimeKind.Utc);
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => (sea.DepartureTime + sea.Duration) >= minArrival);
            }

            if (request.MaxArrival.HasValue)
            {
                var maxArrival = DateTime.SpecifyKind(request.MaxArrival.Value, DateTimeKind.Utc);
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => (sea.DepartureTime + sea.Duration) <= maxArrival);
            }

            if (request.Types != null && request.Types.Any())
            {
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => request.Types.Contains(sea.TransportationType));
            }

            if (request.SeatClasses != null && request.SeatClasses.Any())
            {
                seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => request.SeatClasses.Contains(sea.SeatClass));
            }

            if (request.Direct.HasValue)
            {
                if (request.Direct.Value)
                {
                    seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => sea.TransitsCount == 0);
                }
                else
                {
                    seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => sea.TransitsCount > 0);
                }
            }

            if (request.Amenities != null && request.Amenities.Any())
            {
                var normalizedAmenitiesRequest = request.Amenities.Where(a => !string.IsNullOrWhiteSpace(a)).Select(a => a.Trim().ToLower()).ToArray();
                if (normalizedAmenitiesRequest != null && normalizedAmenitiesRequest.Any())
                {
                    seaTransportationTicketQuery = seaTransportationTicketQuery.Where(sea => sea.Amenities != null && EF.Functions.JsonExistAny(sea.Amenities, normalizedAmenitiesRequest));
                }
            }

            query = seaTransportationTicketQuery;
        }

        var totalFilteredTicketsCount = await query.CountAsync();

        bool isOrderStateDesc = request.OrderState?.ToLower() == "desc";
        // TODO: dynamic sorting?
        query = request.OrderBy?.ToLower() switch
        {
            "ticketcategory" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketCategory.TicketCategoryName) : query.OrderBy(t => t.TicketCategory.TicketCategoryName),
            "ticketname" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketName) : query.OrderBy(t => t.TicketName),
            "price" => isOrderStateDesc ? query.OrderByDescending(t => t.Price) : query.OrderBy(t => t.Price),
            // TODO: decide sorting logics later
            // "departuretime" => isOrderStateDesc ? query.OrderByDescending(t => (t as FlightTicket)!.DepartureTime) : query.OrderBy(t => (t as FlightTicket)!.DepartureTime),
            // "arrivaltime" => isOrderStateDesc ? query.OrderByDescending(t => (t as FlightTicket)!.ArrivalTime) : query.OrderBy(t => (t as FlightTicket)!.ArrivalTime),
            _ => isOrderStateDesc ? query.OrderByDescending(t => t.TicketCode) : query.OrderBy(t => t.TicketCode)
        };

        var skipNumber = (request.PageNumber - 1) * request.PageSize;

        var tickets = await query.Skip(skipNumber).Take(request.PageSize).ToListAsync(ct);

        var ticketsDtolist = tickets.Select(t => _mapper.Map(t)).ToList();

        return new GetAvailableTicketsResponse
        {
            AvailableTickets = ticketsDtolist,
            TotalTicketsCount = totalFilteredTicketsCount,
            CurrentPage = request.PageNumber,
            PageSize = request.PageSize
        };
    }
}
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
            if (request.DepartureStart.HasValue)
            {
                flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime >= request.DepartureStart);
            }

            if (request.DepartureEnd.HasValue)
            {
                flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime >= request.DepartureEnd);
            }

            // if (request.ArrivalStart.HasValue)
            // {
            //     flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime + ft.Duration >= request.ArrivalStart.Value);
            // }

            // if (request.ArrivalEnd.HasValue)
            // {
            //     flightTicketQuery = flightTicketQuery.Where(ft => ft.DepartureTime + ft.Duration <= request.ArrivalEnd.Value);
            // }

            if (request.ArrivalStart.HasValue)
            {
                flightTicketQuery = flightTicketQuery.Where(ft => ft.ArrivalTime >= request.ArrivalStart.Value);
            }

            if (request.ArrivalEnd.HasValue)
            {
                flightTicketQuery = flightTicketQuery.Where(ft => ft.ArrivalTime <= request.ArrivalEnd.Value);
            }

            if (!string.IsNullOrEmpty(request.Airline))
                flightTicketQuery = flightTicketQuery.Where(f => EF.Functions.ILike(f.Airline, request.Airline));

            if (!string.IsNullOrEmpty(request.SeatClass))
                flightTicketQuery = flightTicketQuery.Where(f => EF.Functions.ILike(f.SeatClass!, request.SeatClass));

            if (request.Amenities is { Count: > 0 })
                flightTicketQuery = flightTicketQuery.Where(f =>
                    request.Amenities.All(a => f.Amenities!.Contains(a))
                );

            query = flightTicketQuery;
        }

        var totalFilteredTicketsCount = await query.CountAsync();

        bool isOrderStateDesc = request.OrderState?.ToLower() == "desc";
        query = request.OrderBy?.ToLower() switch
        {
            "ticketcategory" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketCategory.TicketCategoryName) : query.OrderBy(t => t.TicketCategory.TicketCategoryName),
            "ticketname" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketName) : query.OrderBy(t => t.TicketName),
            "price" => isOrderStateDesc ? query.OrderByDescending(t => t.Price) : query.OrderBy(t => t.Price),
            "departuretime" => isOrderStateDesc ? query.OrderByDescending(t => (t as FlightTicket)!.DepartureTime) : query.OrderBy(t => (t as FlightTicket)!.DepartureTime),
            "arrivaltime" => isOrderStateDesc ? query.OrderByDescending(t => (t as FlightTicket)!.ArrivalTime) : query.OrderBy(t => (t as FlightTicket)!.ArrivalTime),
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
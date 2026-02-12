using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Net.Http.Headers;
using AccelokaSandy.Domain.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

public class GetAvailableTicketsHandler : IRequestHandler<GetAvailableTicketsQuery, GetAvailableTicketsResponse>
{
    private readonly AppDbContext _context;

    public GetAvailableTicketsHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<GetAvailableTicketsResponse> Handle(GetAvailableTicketsQuery request, CancellationToken ct)
    {
        var query = _context.Tickets.AsNoTracking().Include(t => t.TicketCategory).Where(t => t.Quota > 0).AsQueryable();

        if (!string.IsNullOrEmpty(request.TicketCategory))
        {
            query = query.Where(t => t.TicketCategory.TicketCategoryName.ToLower() == request.TicketCategory.ToLower());
        }
        if (!string.IsNullOrEmpty(request.TicketCode))
        {
            query = query.Where(t => t.TicketCode.ToLower() == request.TicketCode.ToLower());
        }
        if (!string.IsNullOrEmpty(request.TicketName))
        {
            query = query.Where(t => t.TicketName.ToLower().Contains(request.TicketName.ToLower()));
        }
        if (request.MaxPrice.HasValue)
        {
            query = query.Where(t => t.Price <= request.MaxPrice);
        }
        if (request.MinEventDate.HasValue)
        {
            query = query.Where(t => t.EventDate >= request.MinEventDate.Value);
        }
        if (request.MaxEventDate.HasValue)
        {
            query = query.Where(t => t.EventDate <= request.MaxEventDate.Value);
        }

        var totalFilteredTicketsCount = await query.CountAsync();

        bool isOrderStateDesc = request.OrderState?.ToLower() == "desc";
        query = request.OrderBy?.ToLower() switch
        {
            "categoryname" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketCategory.TicketCategoryName) : query.OrderBy(t => t.TicketCategory.TicketCategoryName),
            "ticketname" => isOrderStateDesc ? query.OrderByDescending(t => t.TicketName) : query.OrderBy(t => t.TicketName),
            "price" => isOrderStateDesc ? query.OrderByDescending(t => t.Price) : query.OrderBy(t => t.Price),
            "eventdate" => isOrderStateDesc ? query.OrderByDescending(t => t.EventDate) : query.OrderBy(t => t.EventDate),
            _ => isOrderStateDesc ? query.OrderByDescending(t => t.TicketCode) : query.OrderBy(t => t.TicketCode)
        };

        var skipNumber = (request.PageNumber - 1) * request.PageSize;

        var tickets = await query.Skip(skipNumber).Take(request.PageSize).Select(t =>
            new AvailableTicketDto(
                t.EventDate,
                t.TicketCategory.TicketCategoryName,
                t.TicketCode,
                t.TicketName,
                t.Quota,
                t.Price
            )).ToListAsync(ct);

        return new GetAvailableTicketsResponse
        {
            AvailableTickets = tickets,
            TotalTicketsCount = totalFilteredTicketsCount
        };
    }
}
using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Requests.Tickets;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Net.Http.Headers;
using AccelokaSandy.Domain.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

public class GetTicketsHandler : IRequestHandler<GetTicketsQuery, List<TicketDto>>
{
    private readonly AppDbContext _context;

    public GetTicketsHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<TicketDto>> Handle(GetTicketsQuery request, CancellationToken ct)
    {
        return await _context.Tickets.Select(t => new TicketDto(t.TicketCode, t.TicketName, t.TicketCategory, t.Quota, t.Price, t.EventDate)).ToListAsync(ct);
    }
}
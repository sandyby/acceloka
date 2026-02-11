using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Tickets.GetTicketByCode;
using Microsoft.EntityFrameworkCore;
using MediatR;
using AccelokaSandy.Application.Common.Exceptions;

public class GetTicketByCodeHandler : IRequestHandler<GetTicketByCodeQuery, GetTicketByCodeResponse>
{
    private readonly AppDbContext _context;

    public GetTicketByCodeHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<GetTicketByCodeResponse> Handle(GetTicketByCodeQuery request, CancellationToken ct)
    {
        var response = await _context.Tickets.AsNoTracking().Include(t => t.TicketCategory).Where(t => t.TicketCode == request.TicketCode).Select(t => new GetTicketByCodeResponse(
            t.EventDate,
            t.TicketCategory.TicketCategoryName,
            t.TicketCode,
            t.TicketName,
            t.Quota,
            t.Price
        )).FirstOrDefaultAsync();

        if (response is null)
        {
            throw new NotFoundException($"Ticket with the code '{request.TicketCode}' was not found!");
        }

        return response;
    }
}
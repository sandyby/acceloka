using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Tickets.GetTicketByCode;
using Microsoft.EntityFrameworkCore;
using MediatR;
using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Common.Mappings;

public class GetTicketByCodeHandler : IRequestHandler<GetTicketByCodeQuery, GetTicketByCodeResponse>
{
    private readonly AppDbContext _context;
    private readonly ITicketToDtoMapper _mapper;

    public GetTicketByCodeHandler(AppDbContext context, ITicketToDtoMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    public async Task<GetTicketByCodeResponse> Handle(GetTicketByCodeQuery request, CancellationToken ct)
    {
        var ticket = await _context.Tickets.Include(t => t.TicketCategory).FirstOrDefaultAsync(t => EF.Functions.ILike(t.TicketCode, request.TicketCode), ct);

        if (ticket == null)
        {
            throw new NotFoundException($"Ticket with the code '{request.TicketCode}' was not found!");
        }

        return new GetTicketByCodeResponse
        {
            Ticket = _mapper.Map(ticket)
        };
    }
}
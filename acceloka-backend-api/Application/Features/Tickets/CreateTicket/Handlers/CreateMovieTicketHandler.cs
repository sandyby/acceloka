using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateMovieTicketHandler : IRequestHandler<CreateMovieTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateMovieTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateMovieTicketCommand request, CancellationToken ct)
    {
        var categoryExists = await _context.TicketCategories.FirstOrDefaultAsync(c => c.Id == request.TicketCategoryId, ct);

        if (categoryExists == null)
        {
            throw new NotFoundException("category selected doesn't exist!");
        }

        var ticketCodeExists = await _context.Tickets.AnyAsync(t => EF.Functions.ILike(t.TicketCode, request.TicketCode), ct);

        if (ticketCodeExists)
        {
            throw new DuplicateValuesException($"The ticket with the code '{request.TicketCode}' already exist!");
        }

        MovieTicket movieTicket = new MovieTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            Cinema = request.Cinema,
            CinemaType = request.CinemaType,
            SeatSection = request.SeatSection,
            ScreeningTime = request.ScreeningTime,
            Duration = request.Duration,
        };
        _context.Tickets.Add(movieTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            movieTicket.TicketCode,
            categoryExists.TicketCategoryName,
            movieTicket.TicketName,
            movieTicket.Quota,
            movieTicket.Price
        );
    }
}
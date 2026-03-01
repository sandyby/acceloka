using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateHotelTicketHandler : IRequestHandler<CreateHotelTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateHotelTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateHotelTicketCommand request, CancellationToken ct)
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

        HotelTicket hotelTicket = new HotelTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            HotelName = request.HotelName,
            RoomType = request.RoomType,
            MinCheckInDate = request.MinCheckInDate,
            MaxCheckOutDate = request.MaxCheckOutDate,
            MaxOccupancy = request.MaxOccupancy,
            Amenities = request.Amenities
        };
        _context.Tickets.Add(hotelTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            hotelTicket.TicketCode,
            categoryExists.TicketCategoryName,
            hotelTicket.TicketName,
            hotelTicket.Quota,
            hotelTicket.Price
        );
    }
}
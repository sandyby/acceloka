using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Domain.Entities.Tickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateTrainTIcketHandler : IRequestHandler<CreateTrainTicketCommand, CreateTicketResponse>
{
    private readonly AppDbContext _context;
    public CreateTrainTIcketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateTicketResponse> Handle(CreateTrainTicketCommand request, CancellationToken ct)
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

        TrainTicket trainTicket = new TrainTicket
        {
            TicketCode = request.TicketCode,
            TicketName = request.TicketName,
            CategoryId = request.TicketCategoryId,
            Quota = request.Quota,
            Price = request.Price,
            TrainCode = request.TrainCode,
            TrainType = request.TrainType,
            SeatClass = request.SeatClass,
            DepartureStation = request.DepartureStation,
            ArrivalStation = request.ArrivalStation,
            DepartureTime = request.DepartureTime,
            Duration = request.Duration,
            TransitsCount = request.TransitsCount,
            Amenities = request.Amenities,
        };
        _context.Tickets.Add(trainTicket);
        await _context.SaveChangesAsync(ct);
        return new CreateTicketResponse(
            trainTicket.TicketCode,
            categoryExists.TicketCategoryName,
            trainTicket.TicketName,
            trainTicket.Quota,
            trainTicket.Price
        );
    }
}
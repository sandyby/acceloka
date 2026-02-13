using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Application.Features.BookedTickets.RevokeBookedTicket;
using AccelokaSandy.Infrastructure.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class RevokeBookedTicketHandler : IRequestHandler<RevokeBookedTicketCommand, RevokeBookedTicketResponse>
{
    private readonly AppDbContext _context;
    public RevokeBookedTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<RevokeBookedTicketResponse> Handle(RevokeBookedTicketCommand request, CancellationToken ct)
    {
        // var toBeRevokedBookedTicketExists = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory)
        //     .FirstOrDefaultAsync(bt => string.Equals(bt.Id, request.BookedTicketId, StringComparison.OrdinalIgnoreCase) && string.Equals(bt.BookedTicketCode, request.BookedTicketCode, StringComparison.OrdinalIgnoreCase), ct);

        var toBeRevokedBookedTicketExists = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory)
            .FirstOrDefaultAsync(bt => EF.Functions.ILike(bt.Id, request.BookedTicketId) && EF.Functions.ILike(bt.BookedTicketCode, request.BookedTicketCode), ct);

        /*
            quite unsure apakah seharusnya perlu handle case insensitive comparison, contohnya kayak di atas (BookedTicketCode & BookedTicketId)
        */

        /*
            sebenarnya juga bisa dilakukan validation untuk eventdate, apakah masih valid/eligible untuk direvoke (karena kalau sudah lewat, tentunya tidak bisa (?)), tapi karena di requirement tidak disebutkan, kalau sempat aja dipelajarin
        */

        if (toBeRevokedBookedTicketExists == null)
        {
            throw new NotFoundException($"The booked ticket to be revoked with the booked ticket ID {request.BookedTicketId} and booked ticket code {request.BookedTicketCode} was not found!");
        }

        var originalQuantityBooked = toBeRevokedBookedTicketExists.Quantity;

        if (request.Quantity > originalQuantityBooked)
        {
            throw new InvalidQuantityException($"The quantity to be revoked '{request.Quantity}' exceeds the original booked ticket quantity of '{originalQuantityBooked}'!");
        }
        else if (request.Quantity == originalQuantityBooked)
        {
            toBeRevokedBookedTicketExists.Quantity -= request.Quantity;
            _context.BookedTickets.Remove(toBeRevokedBookedTicketExists);
        }
        else
        {
            toBeRevokedBookedTicketExists.Quantity -= request.Quantity;
            _context.BookedTickets.Update(toBeRevokedBookedTicketExists);
        }
        await _context.SaveChangesAsync(ct);

        // ? seharusnya tidak perlu di update quotanya di table tickets (kalau berdasarkan soal dan kebutuhan feature tersebut skrg), tapi mungkin untuk belajar-belajar:

        // TODO: kalau sempat update quota di table tickets juga jika event date masih valid/eligible (?)

        var updatedBookedTicketsById = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory)
            .Where(bt => EF.Functions.ILike(bt.Id, request.BookedTicketId)).ToListAsync(ct);

        return new RevokeBookedTicketResponse(
            toBeRevokedBookedTicketExists.Id,
            updatedBookedTicketsById.Select(bt => new UpdatedBookedTicketDto(
                bt.BookedTicketCode,
                bt.Ticket.TicketName,
                bt.Ticket.TicketCategory.TicketCategoryName,
                bt.Quantity
            )).ToList()
        );
    }
}
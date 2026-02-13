using AccelokaSandy.Application.Common.Exceptions;
using AccelokaSandy.Infrastructure.Persistence;
using Application.Features.BookedTickets.EditBookedTicket;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class EditBookedTicketHandler : IRequestHandler<EditBookedTicketCommand, EditBookedTicketResponse>
{
    private readonly AppDbContext _context;
    public EditBookedTicketHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<EditBookedTicketResponse> Handle(EditBookedTicketCommand request, CancellationToken ct)
    {
        var toBeEditedBookedTicketsExist = _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory.TicketCategoryName).FirstOrDefaultAsync(bt => EF.Functions.ILike(bt.Id, request.BookedTicketId), ct);

        if (toBeEditedBookedTicketsExist == null)
        {
            throw new NotFoundException($"The booked ticket to be edited with ID '{request.BookedTicketId}' does not exist!");
        }

        throw new NotImplementedException();
    }
}
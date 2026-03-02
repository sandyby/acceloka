// using AccelokaSandy.Application.Common.Exceptions;
// using AccelokaSandy.Infrastructure.Persistence;
// using Application.Features.BookedTickets;
// using Application.Features.BookedTickets.EditBookedTicket;
// using FluentValidation.Results;
// using MediatR;
// using Microsoft.EntityFrameworkCore;

// public class EditBookedTicketHandler : IRequestHandler<EditBookedTicketCommand, EditBookedTicketResponse>
// {
//     private readonly AppDbContext _context;
//     public EditBookedTicketHandler(AppDbContext context)
//     {
//         this._context = context;
//     }
//     public async Task<EditBookedTicketResponse> Handle(EditBookedTicketCommand request, CancellationToken ct)
//     {
//         var toBeEditedBookedTicketsGroupIdExists = await _context.BookedTickets.AnyAsync(bt => bt.Id == request.BookedTicketId, ct);

//         if (!toBeEditedBookedTicketsGroupIdExists)
//         {
//             throw new NotFoundException($"The booked ticket with the ID '{request.BookedTicketId}' does not exist!");
//         }

//         var validToBeEditedBookedTickets = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory).Where(bt => bt.Id == request.BookedTicketId).ToDictionaryAsync(
//             bt => bt.BookedTicketCode.ToLowerInvariant(),
//             bt => bt,
//             ct);

//         if (!validToBeEditedBookedTickets.Any())
//         {
//             throw new NotFoundException($"No valid booked ticket codes were found for the booked ticket ID '{request.BookedTicketId}'!");
//         }

//         var updatedTickets = new List<UpdatedBookedTicketDto>();
//         var validationFailures = new List<ValidationFailure>();

//         foreach (var toBeEditedBookedTicket in request.ToBeEditedBookedTickets)
//         {
//             var ticketCode = toBeEditedBookedTicket.BookedTicketCode.ToLowerInvariant();


//             if (!validToBeEditedBookedTickets.TryGetValue(toBeEditedBookedTicket.BookedTicketCode.ToLowerInvariant(), out var existingBookedTicket))
//             {
//                 validationFailures.Add(new ValidationFailure("ToBeEditedBookedTickets.BookedTicketCode", $"The to be edited booked ticket with the code '{toBeEditedBookedTicket.BookedTicketCode}' does not exist in the booked ticket group '{request.BookedTicketId}'!"));
//                 continue;
//             }

//             var oldQuantity = existingBookedTicket.Quantity;
//             var newQuantity = toBeEditedBookedTicket.NewQuantity;
//             var quantityDiff = newQuantity - oldQuantity;

//             /*
//                 bagian ini agak tricky, karena rules yang ditetapkan dan outputnya menurut saya kurang jelas, apakah edit benar benar tok replace value, apakah bisa nambah/kurang? kalau memang harus menghandle case seperti bisa menambah/mengurangi qty ticket yg dibook, maka logic checknya berbeda, dan tidak hanya quantitydiff > ticket.quota saja (?)
//             */

//             if (quantityDiff == 0)
//             {
//                 updatedTickets.Add(new UpdatedBookedTicketDto(
//                     existingBookedTicket.BookedTicketCode,
//                     existingBookedTicket.Ticket.TicketName,
//                     existingBookedTicket.Ticket.TicketCategory.TicketCategoryName,
//                     existingBookedTicket.Quantity
//                 ));
//                 continue;
//             }

//             if (quantityDiff > existingBookedTicket.Ticket.Quota)
//             {
//                 if (existingBookedTicket.Ticket.Quota <= 0)
//                 {
//                     validationFailures.Add(new ValidationFailure("ToBeEditedBookedTickets.NewQuantity", $"The ticket with the code '{toBeEditedBookedTicket.BookedTicketCode}' is out of quota!"));
//                     continue;
//                 }
//                 validationFailures.Add(new ValidationFailure("ToBeEditedBookedTickets.NewQuantity", $"The new quantity '{toBeEditedBookedTicket.NewQuantity}' exceeds the remaining quota '{existingBookedTicket.Ticket.Quota}' for ticket code '{toBeEditedBookedTicket.BookedTicketCode}'!"));
//                 continue;
//             }

//             existingBookedTicket.Quantity = newQuantity;
//             existingBookedTicket.Ticket.Quota -= quantityDiff; // bs nambah/kurang

//             updatedTickets.Add(new UpdatedBookedTicketDto(
//                 existingBookedTicket.BookedTicketCode,
//                 existingBookedTicket.Ticket.TicketName,
//                 existingBookedTicket.Ticket.TicketCategory.TicketCategoryName,
//                 existingBookedTicket.Quantity
//             ));
//         }
//         if (validationFailures.Any())
//         {
//             throw new FluentValidation.ValidationException(validationFailures);
//         }

//         await _context.SaveChangesAsync(ct);

//         var updatedBookedTicketsById = await _context.BookedTickets.Include(bt => bt.Ticket).ThenInclude(t => t.TicketCategory)
//                     .Where(bt => bt.Id == request.BookedTicketId).ToListAsync(ct);

//         return new EditBookedTicketResponse
//         {
//             BookedTicketId = request.BookedTicketId,
//             UpdatedBookedTickets = updatedBookedTicketsById.Select(bt => new UpdatedBookedTicketDto(
//                 bt.BookedTicketCode,
//                 bt.Ticket.TicketName,
//                 bt.Ticket.TicketCategory.TicketCategoryName,
//                 bt.Quantity
//             )).ToList()
//         };
//     }
// }
// using AccelokaSandy.Application.Common.Exceptions;
// using AccelokaSandy.Application.Common.Mappings;
// using AccelokaSandy.Application.Features.Tickets.Dtos;
// using AccelokaSandy.Infrastructure.Persistence;
// using MediatR;
// using Microsoft.EntityFrameworkCore;

// public class GetBookingByIdHandler : IRequestHandler<GetBookingByIdQuery, GetBookingByIdResponse?>
// {
//     private readonly AppDbContext _context;
//     private readonly ITicketToDtoMapper _mapper;

//     public GetBookingByIdHandler(AppDbContext context, ITicketToDtoMapper mapper)
//     {
//         this._context = context;
//         this._mapper = mapper;
//     }

//     public async Task<GetBookingByIdResponse?> Handle(GetBookingByIdQuery request, CancellationToken ct)
//     {
//         var booking = await _context.Bookings.Include(b => b.BookedTickets).ThenInclude(bt => bt.Ticket).FirstOrDefaultAsync(b => b.Id == request.BookingId, ct);

//         if (booking == null)
//         {
//             throw new NotFoundException($"The booking with ID {request.BookingId} does not exist!");
//         }

//         var bookedTicketsDtoList = booking.BookedTickets.Select(bt => _mapper.Map(bt));
//     }
// }
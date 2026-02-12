using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;

public class GetBookedTicketsHandler : IRequestHandler<GetBookedTicketsQuery, GetBookedTicketsResponse>
{
    private readonly AppDbContext _context;
    public GetBookedTicketsHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<GetBookedTicketsResponse> Handle(GetBookedTicketsQuery request, CancellationToken ct)
    {
        // var categoryExists = await _context.TicketCategories.AnyAsync(tc => tc.TicketCategoryName == request.TicketCategoryName, ct);

        // if (categoryExists)
        // {
        //     throw new ValidationException($"The category with the name '{request.TicketCategoryName}' already exist!");
        // }

        // var ticketCategory = new TicketCategory
        // {
        //     TicketCategoryName = request.TicketCategoryName
        // };
        // _context.TicketCategories.Add(ticketCategory);
        // await _context.SaveChangesAsync(ct);
        // return new GetBookedTicketByCodeResponse(
        //     ticketCategory.Id,
        //     ticketCategory.TicketCategoryName
        //     );
        return new GetBookedTicketsResponse(
            "sample-id",
            "sample-category-name"
        );
    }
}
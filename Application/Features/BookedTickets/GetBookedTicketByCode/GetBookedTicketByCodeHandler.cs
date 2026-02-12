using AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketByCode;
using AccelokaSandy.Infrastructure.Persistence;
using MediatR;

public class GetBookedTicketByCodeHandler : IRequestHandler<GetBookedTicketByCodeQuery, GetBookedTicketByCodeResponse>
{
    private readonly AppDbContext _context;
    public GetBookedTicketByCodeHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<GetBookedTicketByCodeResponse> Handle(GetBookedTicketByCodeQuery request, CancellationToken ct)
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
        return new GetBookedTicketByCodeResponse(
            "sample-id",
            "sample-category-name"
        );
    }
}
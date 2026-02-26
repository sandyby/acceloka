using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Categories.GetAllCategories;
using Microsoft.EntityFrameworkCore;
using MediatR;

public class GetAllCategoriesHandler : IRequestHandler<GetAllCategoriesQuery, List<GetAllCategoriesResponse>>
{
    private readonly AppDbContext _context;

    public GetAllCategoriesHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<GetAllCategoriesResponse>> Handle(GetAllCategoriesQuery request, CancellationToken ct)
    {
        return await _context.TicketCategories.AsNoTracking().Select(tc =>
        new GetAllCategoriesResponse(
            tc.Id,
            tc.TicketCategoryName
        )).ToListAsync();
    }
}
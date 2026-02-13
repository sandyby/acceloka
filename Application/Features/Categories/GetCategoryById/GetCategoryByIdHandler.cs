using AccelokaSandy.Infrastructure.Persistence;
using AccelokaSandy.Application.Features.Tickets.GetCategoryById;
using Microsoft.EntityFrameworkCore;
using MediatR;
using AccelokaSandy.Application.Common.Exceptions;

public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdQuery, GetCategoryByIdResponse>
{
    private readonly AppDbContext _context;

    public GetCategoryByIdHandler(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<GetCategoryByIdResponse> Handle(GetCategoryByIdQuery request, CancellationToken ct)
    {
        var response = await _context.TicketCategories.AsNoTracking().Where(tc => EF.Functions.ILike(tc.Id, request.Id)).Select(tc => new GetCategoryByIdResponse(
            tc.Id,
            tc.TicketCategoryName
        )).FirstOrDefaultAsync();

        if (response == null)
        {
            throw new NotFoundException($"Category with the id '{request.Id}' was not found!");
        }

        return response;
    }
}
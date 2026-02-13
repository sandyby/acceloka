using AccelokaSandy.Application.Features.Categories.CreateCategory;
using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Infrastructure.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, CreateCategoryResponse>
{
    private readonly AppDbContext _context;
    public CreateCategoryHandler(AppDbContext context)
    {
        this._context = context;
    }
    public async Task<CreateCategoryResponse> Handle(CreateCategoryCommand request, CancellationToken ct)
    {
        var categoryExists = await _context.TicketCategories.AnyAsync(tc => EF.Functions.ILike(tc.TicketCategoryName, request.TicketCategoryName), ct);

        if (categoryExists)
        {
            throw new ValidationException($"The category with the name '{request.TicketCategoryName}' already exist!");
        }

        var ticketCategory = new TicketCategory
        {
            TicketCategoryName = request.TicketCategoryName
        };
        _context.TicketCategories.Add(ticketCategory);
        await _context.SaveChangesAsync(ct);
        return new CreateCategoryResponse(
            ticketCategory.Id,
            ticketCategory.TicketCategoryName
            );
    }
}
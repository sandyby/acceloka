using MediatR;

namespace AccelokaSandy.Application.Features.Categories.GetAllCategories;

public record GetAllCategoriesQuery() : IRequest<List<GetAllCategoriesResponse>>;
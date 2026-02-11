using MediatR;

namespace AccelokaSandy.Application.Features.Categories.CreateCategory;

public record CreateCategoryCommand(string TicketCategoryName) : IRequest<CreateCategoryResponse>;
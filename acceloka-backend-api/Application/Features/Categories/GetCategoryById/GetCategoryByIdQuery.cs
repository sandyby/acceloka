using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.GetCategoryById;

public record GetCategoryByIdQuery(
    string Id
    ) : IRequest<GetCategoryByIdResponse>;
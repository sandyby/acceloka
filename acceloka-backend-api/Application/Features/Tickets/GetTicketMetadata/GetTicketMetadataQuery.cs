using AccelokaSandy.Application.Features.Tickets.Dtos;
using MediatR;

public record GetTicketMetadataQuery(string TicketCategory)
    : IRequest<TicketMetadataDto>;
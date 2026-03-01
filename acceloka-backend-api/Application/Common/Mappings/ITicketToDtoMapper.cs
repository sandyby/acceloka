using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities;

namespace AccelokaSandy.Application.Common.Mappings;

public interface ITicketToDtoMapper
{
    ITicketDto Map(TicketBase ticket);
}
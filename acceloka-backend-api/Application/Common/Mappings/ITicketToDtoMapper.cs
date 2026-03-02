using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Application.Common.Mappings;

public interface ITicketToDtoMapper
{
    ITicketDto Map(TicketBase ticket);
    // ITicketDto Map(TicketBase ticket);
}
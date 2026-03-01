using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities;

namespace AccelokaSandy.Application.Common.Mappings;

public class TicketToDtoMapper : ITicketToDtoMapper
{
    public ITicketDto Map(TicketBase ticket)
    {
        if (ticket is FlightTicket ft)
        {
            return new FlightTicketDto
            {
                TicketCategory = ft.TicketCategory.TicketCategoryName,
                TicketCode = ft.TicketCode,
                TicketName = ft.TicketName,
                Quota = ft.Quota,
                Price = ft.Price,

                Airline = ft.Airline,
                DepartureTime = ft.DepartureTime,
                Duration = ft.Duration,
                DepartureAirport = ft.DepartureAirport,
                ArrivalAirport = ft.ArrivalAirport,
                SeatClass = ft.SeatClass,
                BaggageKg = ft.BaggageKg,
                TransitsCount = ft.TransitsCount,
                Amenities = ft.Amenities?.ToList() ?? new()
            };
        }

        return new TicketDto
        {
            TicketCategory = ticket.TicketCategory.TicketCategoryName,
            TicketCode = ticket.TicketCode,
            TicketName = ticket.TicketName,
            Quota = ticket.Quota,
            Price = ticket.Price
        };
    }
}
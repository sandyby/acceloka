using AccelokaSandy.Application.Features.Tickets.Dtos;
using AccelokaSandy.Domain.Entities.Tickets;

namespace AccelokaSandy.Application.Common.Mappings;

public class TicketToDtoMapper : ITicketToDtoMapper
{
    public ITicketDto Map(TicketBase ticket)
    {
        var baseDto = new BaseTicketDto
        {
            TicketCategory = ticket.TicketCategory?.TicketCategoryName ?? "unknown",
            TicketCode = ticket.TicketCode,
            TicketName = ticket.TicketName,
            Quota = ticket.Quota,
            Price = ticket.Price,
        };

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
                DepartureAirport = ft.DepartureAirport,
                ArrivalAirport = ft.ArrivalAirport,

                DepartureTime = ticket.DepartureTime ?? default,
                Duration = ticket.Duration ?? default,
                SeatClass = ticket.SeatClass ?? "Economy",
                BaggageKg = ft.BaggageKg,
                TransitsCount = ticket.TransitsCount ?? 0,
                Amenities = ft.Amenities?.ToList() ?? new()
            };
        }
        else if (ticket is HotelTicket ht)
        {
            return new HotelTicketDto
            {
                TicketCategory = ht.TicketCategory.TicketCategoryName,
                TicketCode = ht.TicketCode,
                TicketName = ht.TicketName,
                Quota = ht.Quota,
                Price = ht.Price,

                HotelName = ht.HotelName,
                RoomType = ht.RoomType,
                MinCheckInDate = ht.MinCheckInDate,
                MaxCheckOutDate = ht.MaxCheckOutDate,
                MaxOccupancy = ht.MaxOccupancy,
                Amenities = ht.Amenities?.ToList() ?? new()
            };
        }
        else if (ticket is ConcertTicket ct)
        {
            return new ConcertTicketDto
            {
                TicketCategory = ct.TicketCategory.TicketCategoryName,
                TicketCode = ct.TicketCode,
                TicketName = ct.TicketName,
                Quota = ct.Quota,
                Price = ct.Price,

                Venue = ct.Venue,
                Artist = ct.Artist,
                SeatSection = ct.SeatSection,
                ConcertDate = ct.ConcertDate,
                Duration = ticket.Duration ?? default,
                Packages = ct.Packages?.ToList() ?? new()
            };
        }
        else if (ticket is MovieTicket mt)
        {
            return new MovieTicketDto
            {
                TicketCategory = mt.TicketCategory.TicketCategoryName,
                TicketCode = mt.TicketCode,
                TicketName = mt.TicketName,
                Quota = mt.Quota,
                Price = mt.Price,

                Cinema = mt.Cinema,
                CinemaType = mt.CinemaType,
                SeatSection = mt.SeatSection,
                ScreeningTime = mt.ScreeningTime,
                Duration = ticket.Duration ?? default,
            };
        }
        else if (ticket is TrainTicket tt)
        {
            return new TrainTicketDto
            {
                TicketCategory = tt.TicketCategory.TicketCategoryName,
                TicketCode = tt.TicketCode,
                TicketName = tt.TicketName,
                Quota = tt.Quota,
                Price = tt.Price,

                TrainCode = tt.TrainCode,
                TrainType = tt.TrainType,
                DepartureStation = tt.DepartureStation,
                ArrivalStation = tt.ArrivalStation,
                SeatClass = ticket.SeatClass ?? "Economy",
                DepartureTime = ticket.DepartureTime ?? default,
                Duration = ticket.Duration ?? default,
                TransitsCount = ticket.TransitsCount ?? 0,
                Amenities = tt.Amenities?.ToList() ?? new()
            };
        }
        else if (ticket is BusTicket bt)
        {
            return new BusTicketDto
            {
                TicketCategory = bt.TicketCategory.TicketCategoryName,
                TicketCode = bt.TicketCode,
                TicketName = bt.TicketName,
                Quota = bt.Quota,
                Price = bt.Price,

                BusCode = bt.BusCode,
                BusType = bt.BusType,
                DepartureStop = bt.DepartureStop,
                ArrivalStop = bt.ArrivalStop,
                SeatClass = ticket.SeatClass ?? "Economy",
                DepartureTime = ticket.DepartureTime ?? default,
                Duration = ticket.Duration ?? default,
                TransitsCount = ticket.TransitsCount ?? 0,
                Amenities = bt.Amenities?.ToList() ?? new()
            };
        }
        else if (ticket is SeaTransportationTicket st)
        {
            return new SeaTransportationTicketDto
            {
                TicketCategory = st.TicketCategory.TicketCategoryName,
                TicketCode = st.TicketCode,
                TicketName = st.TicketName,
                Quota = st.Quota,
                Price = st.Price,

                TransportationType = st.TransportationType,
                Company = st.Company,
                DeparturePort = st.DeparturePort,
                ArrivalPort = st.ArrivalPort,
                SeatClass = ticket.SeatClass ?? "Basic",
                DepartureTime = ticket.DepartureTime ?? default,
                Duration = ticket.Duration ?? default,
                TransitsCount = ticket.TransitsCount ?? 0,
                Amenities = st.Amenities?.ToList() ?? new()
            };
        }

        return baseDto;
    }
}
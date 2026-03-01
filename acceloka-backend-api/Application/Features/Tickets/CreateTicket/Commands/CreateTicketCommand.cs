using MediatR;

namespace AccelokaSandy.Application.Features.Tickets.CreateTicket;

public record CreateTicketCommand(
    string TicketCode,
    string TicketCategoryName,
    string TicketName,
    int Quota,
    int Price,
    string TicketCategoryId
) : IRequest<CreateTicketResponse>;

// public record CreateFlightTicketRequest(
//     string TicketCode,
//     string TicketCategoryName,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string Airline,
//     DateTime DepartureTime,
//     TimeSpan Duration,
//     string DepartureAirport,
//     string ArrivalAirport,
//     string SeatClass,
//     int BaggageKg,
//     int TransitsCount,
//     List<string> Amenities
// );

// public record CreateHotelTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string HotelName,
//     string RoomType,
//     DateTime MinCheckInDate,
//     DateTime MaxCheckOutDate,
//     int maxOccupancy,
//     List<string> Amenities
// );

// public record CreateConcertTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string Venue,
//     string Artist,
//     string SeatSection,
//     TimeSpan Duration,
//     DateTime ConcertDate
// );

// public record CreateMovieTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string Cinema,
//     TimeSpan Duration,
//     string SeatSection,
//     DateTime ScreeningDate
// );

// public record CreateTrainTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string TrainCode,
//     string SeatClass,
//     string DepartureStation,
//     string ArrivalStation,
//     DateTime DepartureTime,
//     TimeSpan Duration,
//     int TransitsCount,
//     List<string> Amenities
// );

// public record CreateBusTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string BusCode,
//     string BusType,
//     string SeatClass,
//     string DepartureStop,
//     string ArrivalStop,
//     DateTime DepartureTime,
//     TimeSpan Duration,
//     int TransitsCount,
//     List<string> Amenities
// );

// public record CreateSeaTransportationTicketRequest(
//     string TicketCode,
//     string TicketCategoryId,
//     string TicketName,
//     int Quota,
//     int Price,
//     string TransportationType,
//     string Company,
//     string SeatClass,
//     string DeparturePort,
//     string ArrivalPort,
//     DateTime DepartureTime,
//     TimeSpan Duration,
//     int TransitsCount,
//     List<string> Amenities
// );
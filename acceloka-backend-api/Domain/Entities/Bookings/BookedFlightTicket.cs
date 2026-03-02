// using AccelokaSandy.Domain.Entities.Tickets;

// namespace AccelokaSandy.Domain.Entities.Bookings;

// public class BookedFlightTicket : BookedTicket
// {
//     public string Airline { get; private set; } = null!;
//     public DateTime DepartureTime { get; private set; }
//     public TimeSpan Duration { get; private set; }
//     public string DepartureAirport { get; private set; } = null!;
//     public string ArrivalAirport { get; private set; } = null!;
//     public string SeatClass { get; private set; } = null!;
//     public int BaggageKg { get; private set; }
//     public int TransitsCount { get; private set; }

//     public List<string> Amenities { get; private set; } = new();

//     protected BookedFlightTicket() { }

//     public BookedFlightTicket(
//         FlightTicket ticket,
//         int quantity,
//         List<string>? amenities = null)
//         : base(ticket, quantity)
//     {
//         Airline = ticket.Airline;
//         DepartureTime = ticket.DepartureTime;
//         Duration = ticket.Duration;
//         DepartureAirport = ticket.DepartureAirport;
//         ArrivalAirport = ticket.ArrivalAirport;
//         SeatClass = ticket.SeatClass;
//         BookingId
//         BaggageKg = ticket.BaggageKg;
//         TransitsCount = ticket.TransitsCount;
//         Amenities = amenities ?? new List<string>();
//     }
// }
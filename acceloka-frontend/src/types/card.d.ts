export interface ITicketBase {
  ticketCode: string;
  ticketName: string;
  ticketCategory: string;
  quota: number;
  price: number;
}

export interface IFlightTicket extends ITicketBase {
  ticketCategory: "flights";
  airline: string;
  departureTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
  seatClass: string;
  baggageKg: number;
  transitsCount: number;
  amenities?: string[];
}

export interface IHotelTicket extends ITicketBase {
  ticketCategory: "hotels";
  hotelName: string;
  roomType: string;
  minCheckInDate: string;
  maxCheckOutDate: string;
  maxOccupancy: number;
  amenities?: string[];
}

export interface IConcertTicket extends ITicketBase {
  ticketCategory: "concerts";
  venue: string;
  artist: string;
  seatSection: string;
  concertDate: string;
  duration: string;
  packages: string[];
}

export interface IMovieTicket extends ITicketBase {
  ticketCategory: "movies";
  cinema: string;
  cinemaType: string;
  duration: string;
  seatSection: string;
  screeningTime: string;
}

export interface ITrainTicket extends ITicketBase {
  ticketCategory: "trains";
  trainCode: string;
  trainType: string;
  seatClass: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  duration: string;
  transitsCount: number;
  amenities?: string[];
}

export interface IBusTicket extends ITicketBase {
  ticketCategory: "buses";
  busCode: string;
  busType: string;
  seatClass: string;
  departureStop: string;
  arrivalStop: string;
  departureTime: string;
  duration: string;
  transitsCount: number;
  amenities?: string[];
}

export interface ISeaTransportationTicket extends ITicketBase {
  ticketCategory: "sea-transportations";
  transportationType: string;
  company: string;
  seatClass: string;
  departurePort: string;
  arrivalPort: string;
  departureTime: string;
  duration: string;
  transitsCount: number;
  amenities?: string[];
}

export type AvailableTicketTypes =
  | FlightTicket
  | HotelTicket
  | ConcertTicket
  | MovieTicket
  | TrainTicket
  | BusTicket
  | SeaTransportationTicket;

import { ITicketBase } from "./card";

export interface GetAvailableTicketQueryResponse {
  availableTickets: ITicketBase[];
  totalTicketsCount: number;
  currentPage: number;
  pageSize: number;
}
export interface TicketMetadata {
  maxPrice: number;
  // fields: Record<string, object>;

  minDeparture?: string;
  maxDeparture?: string;
  minArrival?: string;
  maxArrival?: string;
  minCheckInDate?: string;
  maxCheckOutDate?: string;

  airlines?: string[];
  hotelNames?: string[];
  roomTypes?: string[];
  amenities?: string[];
  seatClasses?: string[];
  maxOccupancy?: number;

  // venues?: string[];
  // artists?: string[];
  // cinemas?: string[];

  // minDeparture?: string;
  // maxDeparture?: string;
  // minArrival?: string;
  // maxArrival?: string;
  // airlines: string[];
  // amenities: string[];
  // seatClasses: string[];
}

export interface TicketFilters {
  maxprice?: number;
  maxoccupancy?: number;
  mindeparture?: string;
  maxdeparture?: string;
  minarrival?: string;
  maxarrival?: string;
  mincheckin?: string;
  maxcheckout?: string;
  airlines?: string[];
  seatclasses?: string[];
  hotelnames?: string[];
  roomtypes?: string[];
  amenities?: string[];
}

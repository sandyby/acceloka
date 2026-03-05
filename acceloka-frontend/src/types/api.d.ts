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
  minConcertDate?: string;
  maxConcertDate?: string;

  airlines?: string[];
  hotelNames?: string[];
  venues?: string[];
  roomTypes?: string[];
  amenities?: string[];
  packages?: string[];
  seatClasses?: string[];
  seatSections?: string[];
  maxOccupancy?: number;
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
  minconcert?: string;
  maxconcert?: string;
  airlines?: string[];
  seatclasses?: string[];
  seatsections?: string[];
  hotelnames?: string[];
  venues?: string[];
  roomtypes?: string[];
  amenities?: string[];
  packages?: string[];
}

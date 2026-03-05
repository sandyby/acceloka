import { ITicketBase } from "./card";

export interface GetAvailableTicketQueryResponse {
  availableTickets: ITicketBase[];
  totalTicketsCount: number;
  currentPage: number;
  pageSize: number;
}
export interface TicketMetadata {
  maxPrice: number;
  minDeparture?: string;
  maxDeparture?: string;
  minArrival?: string;
  maxArrival?: string;
  minCheckInDate?: string;
  maxCheckOutDate?: string;
  minConcertDate?: string;
  maxConcertDate?: string;
  minScreeningTime?: string;
  maxScreeningTime?: string;
  maxDurationInMinutes?: int;
  direct?: boolean;
  directCount?: int;
  transitsCount?: int;
  airlines?: string[];
  hotelNames?: string[];
  venues?: string[];
  cinemas?: string[];
  types?: string[];
  amenities?: string[];
  packages?: string[];
  seatClasses?: string[];
  seatSections?: string[];
  maxOccupancy?: number;
  maxBaggageKg?: number;
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
  minscreening?: string;
  maxscreening?: string;
  maxduration?: int;
  baggagekg?: int;
  direct?: boolean;
  airlines?: string[];
  seatclasses?: string[];
  seatsections?: string[];
  hotelnames?: string[];
  venues?: string[];
  cinemas?: string[];
  types?: string[];
  amenities?: string[];
  packages?: string[];
}

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
  airlines: string[];
  amenities: string[];
  seatClasses: string[];
}

export interface TicketFilters {
  maxprice?: number;
  mindeparture?: string;
  maxdeparture?: string;
  minarrival?: string;
  maxarrival?: string;
  airlines?: string[];
  seatclasses?: string[];
  amenities?: string[];
}

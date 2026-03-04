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

interface TicketFilters {
  maxprice?: number;
  mindeparture?: string;
  maxdeparture?: string;
  airline?: string;
  seatclasses?: string[];
  amenities?: string[];
}

/*
DateTime EventDate,
string TicketCategory,
string TicketCode,
string TicketName,
int Quota,
int Price
*/

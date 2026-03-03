import { ITicketBase } from "./card";

export interface GetAvailableTicketQueryResponse {
  availableTickets: ITicketBase[];
  totalTicketsCount: number;
  currentPage: number;
  pageSize: number;
}
export interface TicketMetadata {
  maxPrice: number;
  earliestDeparture?: string;
  latestDeparture?: string;
  airlines: string[];
  amenities: string[];
  seatClasses: string[];
}

interface TicketFilters {
  maxPrice?: number;
  departureStart?: string;
  departureEnd?: string;
  airline?: string;
  seatClasses?: string[];
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

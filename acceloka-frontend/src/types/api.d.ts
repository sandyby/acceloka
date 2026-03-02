import { ITicketBase } from "./card";

export interface GetAvailableTicketQueryResponse {
  availableTickets: ITicketBase[];
  totalTicketsCount: number;
  currentPage: number;
  pageSize: number;
}

/*
DateTime EventDate,
string TicketCategory,
string TicketCode,
string TicketName,
int Quota,
int Price
*/

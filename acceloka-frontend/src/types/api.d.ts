export interface FlightTicket {
  eventDate: string;
  ticketCategory: string;
  ticketCode: string;
  ticketName: string;
  quota: number;
  price: number;
}

export interface FlightTicketsQueryResponse {
  availableTickets: FlightTicket[];
  totalTicketsCount: number;
}

/*
DateTime EventDate,
string TicketCategory,
string TicketCode,
string TicketName,
int Quota,
int Price
*/

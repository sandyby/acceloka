"use client";

import { IConcertTicket } from "@/types/card";
import StyledTypography from "../StyledTypography";


export default function StyledConcertTicketCard({ ticket }: { ticket: IConcertTicket }) {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-md h-64 border border-indigo-100 overflow-hidden">
      <div className="absolute top-4 right-4 text-3xl opacity-30">🎤</div>

      <div className="p-6 h-full flex flex-col">
        <StyledTypography variant="h5" fontWeight="bold" className="text-indigo-900">
          {ticket.ticketName}
        </StyledTypography>
        <StyledTypography variant="subtitle1" className="text-indigo-700 mt-1">
          {ticket.artist}
        </StyledTypography>

        <div className="mt-4 flex-grow">
          <div className="text-lg font-semibold text-indigo-800">
            {new Date(ticket.concertDate).toLocaleString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="text-gray-700 mt-1">{ticket.venue}</div>
          <div className="text-sm text-gray-600 mt-1">{ticket.duration}</div>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="text-sm text-gray-700">
            Section: <strong>{ticket.seatSection}</strong>
          </div>
          <StyledTypography variant="h6" fontWeight="bold" className="text-indigo-700">
            Rp {ticket.price.toLocaleString('id-ID')}
          </StyledTypography>
        </div>
      </div>
    </div>
  );
}
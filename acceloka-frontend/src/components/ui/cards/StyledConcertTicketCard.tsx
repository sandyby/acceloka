"use client";

import { IConcertTicket } from "@/types/card";
import StyledTypography from "../StyledTypography";
import { durationFormatter, formatDateTimeWithWords } from "@/lib/utils";


export default function StyledConcertTicketCard({ ticket }: { ticket: IConcertTicket }) {
  const { hours, minutes, seconds } = durationFormatter(ticket.duration);

  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-md h-64 border border-primary-200 overflow-hidden">
      {/* <div className="absolute top-4 right-4 text-3xl opacity-30">🎤</div> */}

      <div className="flex flex-col justify-between p-6 h-full">
        <div className="flex gap-x-4 justify-between">
          <div className="grow">
            <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-primary-500">
              {ticket.ticketName}
            </StyledTypography>
            <StyledTypography fontSizeInput={20} className="text-primary-500mt-1">
              {ticket.artist}
            </StyledTypography>
            <div className="flex justify-between mt-2">
              {ticket.packages?.length > 0 && (
                <div className="m-0 max-w-50">
                  <p className="font-bold text-sm text-secondary-900">Included Package(s)</p>
                  <div className="flex flex-wrap gap-1 mt-3 capitalize">
                    {
                      ticket.packages.map((amenity, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 border border-primary-500 text-primary-500  text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-end">
            <div className="text-xl  font-semibold text-secondary-900">
              {formatDateTimeWithWords(new Date(ticket.concertDate), { weekday: "long", "month": "long" })}
            </div>
            <div className="text-secondary-900 mt-0">{ticket.venue}</div>
            <div className="text-2xl font-bold text-primary-500 mt-0">{`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-lg text-secondary-900">
            Section: <strong>{ticket.seatSection}</strong>
          </div>
          <div className="flex items-end">
            <StyledTypography fontSizeInput={36} fontWeightInput="bold" className="text-primary-500">
              Rp {ticket.price.toLocaleString('id-ID')}
            </StyledTypography>
            <p className="text-secondary-900 text-2xl mb-1.5">/pax</p>
          </div>
        </div>
      </div>
    </div >
  );
}
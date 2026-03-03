"use client";

import { IConcertTicket } from "@/types/card";
import StyledTypography from "../StyledTypography";
import { durationFormatter, formatDateTimeWithWords } from "@/lib/utils";


export default function StyledConcertTicketCard({ ticket }: { ticket: IConcertTicket }) {
  const { hours, minutes, seconds } = durationFormatter(ticket.duration);

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden h-64 border border-gray-200 flex">
      <div className="w-[200px] h-full bg-accent-tertiary-900">
      </div>
      <div className="grid grid-cols-[1fr_auto] w-full h-full pt-1 pb-2 px-3">
        <div className="w-full col-span-2 flex flex-row justify-between">
          <div className="">
            <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
              {ticket.ticketName}
            </StyledTypography>
            <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
              {ticket.artist}
            </StyledTypography>
          </div>
          <div className="text-end">
            <StyledTypography fontWeightInput="bold" fontSizeInput={28}
              className="text-primary-600" sx={{ marginBottom: -1 }}>
              Rp {ticket.price.toLocaleString('id-ID')}
            </StyledTypography>
            <StyledTypography fontSizeInput={18} className="text-gray-500">
              /pax
            </StyledTypography>
          </div>
        </div>
        <div className="flex flex-row items-end justify-between items-start content-start">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <div className="mb-2 flex flex-col gap-y-0.5">
                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                  Section
                </StyledTypography>
                <div className="">
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                    {ticket.seatSection}
                  </span>
                </div>
              </div>
              <div className="mb-2 flex flex-col gap-y-0.5">
                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                  Packages
                </StyledTypography>
                <div className="flex flex-wrap gap-2 capitalize">
                  {ticket.packages?.map((amenity, idx) => (
                    <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500 text-xs rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto text-md text-accent-primary-900">
              Ticket Quota: {ticket.quota}
            </div>
          </div>
          <div className="text-end mt-auto">
            <div className="flex flex-col gap-y-1.5">
              <div className="text-sm text-secondary-900">
                <div className="">Venue</div>
                <div className="text-lg font-bold">
                  {ticket.venue}
                </div>
              </div>
              <div className="text-sm text-secondary-900">
                <div className="">Concert Date</div>
                <div className="text-lg font-bold">
                  {formatDateTimeWithWords(new Date(ticket.concertDate), { weekday: "long", month: "short" })}
                </div>
              </div>
              <div className="text-sm text-secondary-900">
                <div className="">Duration</div>
                <p className="text-primary-500 font-bold text-md">
                  {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
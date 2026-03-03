"use client";

import { IHotelTicket } from "@/types/card";
import StyledTypography from "../StyledTypography";
import { calculateDuration, formatDateTimeWithWords, generateRandomDays } from "@/lib/utils";
import { add, addDays } from "date-fns";

export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
    const tempMaxCheckOutDate = addDays(ticket.minCheckInDate, generateRandomDays(5)).toString();

    return (
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden h-64 border border-gray-200">

            <div className="grid grid-cols-[1fr_auto] h-full p-6 gap-6">
                <div className="flex flex-col justify-between">
                    <div className="">
                        <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
                            {ticket.hotelName}
                        </StyledTypography>

                        <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                {ticket.roomType}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 capitalize">
                            {ticket.amenities?.map((amenity, idx) => (
                                <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500  text-xs rounded-full">
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 text-md text-accent-primary-900">
                        Max. Occupancies: {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between text-right">
                    <div className="">
                        <StyledTypography fontWeightInput="bold" fontSizeInput={28}
                            className="text-primary-600" sx={{ marginBottom: -1 }}>
                            Rp {ticket.price.toLocaleString('id-ID')}
                        </StyledTypography>
                        <StyledTypography fontSizeInput={18} className="text-gray-500">
                            /night
                        </StyledTypography>
                        <div className="mt-2">
                            <p className="text-primary-500 text-md">{calculateDuration(ticket.minCheckInDate, tempMaxCheckOutDate)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-x-6">
                        <div className="text-sm text-secondary-900">
                            <div className="">Check-in from</div>
                            <div className="text-lg font-bold">
                                {formatDateTimeWithWords(new Date(ticket.minCheckInDate), { weekday: "long", month: "short" })}
                            </div>
                        </div><div className="text-sm text-secondary-900">
                            <div className="">Max. check-out until</div>
                            <div className="text-lg font-bold">
                                {formatDateTimeWithWords(new Date(tempMaxCheckOutDate), { weekday: "long", month: "short" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
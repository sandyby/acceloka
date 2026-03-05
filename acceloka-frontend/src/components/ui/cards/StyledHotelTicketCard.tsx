"use client";

import { IHotelTicket } from "@/types/card";
import StyledTypography from "@/components/ui/StyledTypography";
import { calculateDuration, formatDateTimeWithWords, generateRandomDays } from "@/lib/utils";
import { addDays } from "date-fns";
import { PersonRounded } from "@mui/icons-material";

export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
    const tempMaxCheckOutDate = addDays(ticket.minCheckInDate, generateRandomDays(5)).toString();

    return (
        <div className="relative bg-white rounded-2xl shadow-md h-max overflow-clip border border-gray-200 flex">
            <div className="w-[200px] h-full bg-accent-tertiary-900">
            </div>
            <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
                <div className="w-full col-span-2 flex flex-row justify-between">
                    <div className="">
                        <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
                            {ticket.hotelName}
                        </StyledTypography>
                    </div>
                    <div className="text-end">
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
                </div>
                <div className="flex flex-row items-end justify-between items-start content-start">
                    <div className="flex flex-col justify-between h-full">
                        <div className="">
                            <div className="mb-2 flex flex-col gap-y-0.5">
                                <div className="flex gap-x-8">
                                    <div className="mb-2 flex flex-col gap-y-0.5">
                                        <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                                            Room Type
                                        </StyledTypography>
                                        <div className="">
                                            <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                                {ticket.roomType}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-2 flex flex-col gap-y-0.5">
                                        <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                                            Max. Occupancies
                                        </StyledTypography>
                                        <div className="">
                                            <span className="inline-flex items-center ps-3 pe-4 py-1 border border-secondary-900 text-secondary-900 text-xs rounded-full">
                                                <PersonRounded sx={{ color: "var(--color-secondary-900)", marginRight: "4px", fontSize: "16px" }} />
                                                {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 flex flex-col gap-y-0.5">
                                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                                    Amenities
                                </StyledTypography>
                                <div className="flex flex-wrap gap-2 capitalize">
                                    {ticket.amenities?.map((amenity, idx) => (
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
                                <div className="">Check-in from</div>
                                <div className="text-lg font-bold">
                                    {formatDateTimeWithWords(new Date(ticket.minCheckInDate), { weekday: "long", month: "short" })}
                                </div>
                            </div><div className="text-sm text-secondary-900">
                                <div className="">Max. check-out until</div>
                                <div className="text-lg font-bold">
                                    {formatDateTimeWithWords(new Date(ticket.maxCheckOutDate), { weekday: "long", month: "short" })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
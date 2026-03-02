"use client";

import { IHotelTicket } from "@/types/card";
import StyledTypography from "../StyledTypography";

export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
    return (
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden h-64 border border-gray-200">
            {/* Hotel icon hint */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                🏨
            </div>

            <div className="grid grid-cols-2 h-full p-6 gap-6">
                {/* Left - Hotel & Room */}
                <div className="flex flex-col justify-between">
                    <div>
                        <StyledTypography variant="h6" fontWeight="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography variant="subtitle1" className="text-primary-600 mt-1">
                            {ticket.hotelName}
                        </StyledTypography>

                        <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                {ticket.roomType}
                            </span>
                        </div>

                        <div className="mt-4 text-sm text-gray-700">
                            Max: {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        Available until {new Date(ticket.maxCheckOutDate).toLocaleDateString('id-ID')}
                    </div>
                </div>

                {/* Right - Price & Dates */}
                <div className="flex flex-col items-end justify-between text-right">
                    <div>
                        <StyledTypography variant="h5" fontWeight="bold" className="text-primary-600">
                            Rp {ticket.price.toLocaleString('id-ID')}
                        </StyledTypography>
                        <StyledTypography variant="caption" className="text-gray-500">
                            per night
                        </StyledTypography>
                    </div>

                    <div className="text-sm">
                        <div>Check-in from</div>
                        <div className="font-medium">
                            {new Date(ticket.minCheckInDate).toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
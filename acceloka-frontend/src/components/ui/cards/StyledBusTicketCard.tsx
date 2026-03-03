"use client";
import StyledTypography from '@/components/ui/StyledTypography';
import { calculateArrivalTime, formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import { IBusTicket } from '@/types/card';

export default function StyledBusTicketCard({ ticket }: { ticket: IBusTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    return (
        <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-md overflow-hidden h-60 border border-amber-200">
            <div className="absolute inset-y-0 right-1/3 w-px bg-amber-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                    🚌
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                    🛣️
                </div>
            </div>

            <div className="grid grid-cols-[3fr_1fr_3fr] h-full p-5 gap-4">
                <div className="flex flex-col justify-between">
                    <div>
                        <StyledTypography variant="h6" fontWeight="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography variant="subtitle2" className="text-amber-700 mt-1">
                            {ticket.busCode} • {ticket.busType}
                        </StyledTypography>

                        <div className="flex flex-wrap gap-2 mt-3 capitalize">
                            <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                {ticket.ticketCategory}
                            </span>
                            <span className="px-3 py-1 bg-amber-600 text-white text-xs rounded-full">
                                {ticket.seatClass}
                            </span>
                            {ticket.transitsCount === 0 && (
                                <span className="px-3 py-1 bg-dark-green-900 text-white text-xs rounded-full">
                                    {ticket.transitsCount > 0 ? `${ticket.transitsCount} transits` : "Direct"}
                                </span>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3 capitalize">
                                {ticket.amenities?.map((amenity, idx) => (
                                    <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500  text-xs rounded-full">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        Quota left: <strong>{ticket.quota}</strong>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <StyledTypography variant="h5" fontWeight="bold" className="text-primary-600">
                        Rp {ticket.price.toLocaleString('id-ID')}
                    </StyledTypography>
                    <StyledTypography variant="caption" className="text-gray-500">
                        /pax
                    </StyledTypography>
                </div>

                <div className="flex flex-col justify-between text-right">
                    <div>
                        <div className="text-lg font-semibold text-secondary-900">
                            {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
                        </div>
                        <div className="text-sm text-gray-600">
                            {ticket.departureStop} → {ticket.arrivalStop}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                        </div>
                        <div className="text-lg font-semibold text-secondary-900">
                            {calculateArrivalTime(ticket.departureTime, ticket.duration)}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        {ticket.transitsCount > 0 && `${ticket.transitsCount} transit${ticket.transitsCount > 1 ? 's' : ''}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
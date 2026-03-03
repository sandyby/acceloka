"use client";
import StyledTypography from '@/components/ui/StyledTypography';
import { formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import { IMovieTicket } from '@/types/card'; // adjust import path to your types

export default function StyledMovieTicketCard({ ticket }: { ticket: IMovieTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    return (
        <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-md overflow-hidden h-60 border border-red-200">
            <div className="absolute inset-y-0 right-1/3 w-px bg-red-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
                    🎬
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
                    🍿
                </div>
            </div>

            <div className="grid grid-cols-[3fr_1fr_3fr] h-full p-5 gap-4">
                <div className="flex flex-col justify-between">
                    <div>
                        <StyledTypography variant="h6" fontWeight="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography variant="subtitle2" className="text-red-700 mt-1">
                            {ticket.cinema} • {ticket.cinemaType}
                        </StyledTypography>

                        <div className="flex flex-wrap gap-2 mt-3 capitalize">
                            <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                {ticket.ticketCategory}
                            </span>
                            <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                                {ticket.seatSection}
                            </span>
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
                        /ticket
                    </StyledTypography>
                </div>

                <div className="flex flex-col justify-between text-right">
                    <div>
                        <div className="text-lg font-semibold text-secondary-900">
                            {formatDateTimeWithWords(new Date(ticket.screeningTime), {weekday: "short", month: "long", hour12: false})}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            Duration: {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                        </div>
                    </div>

                    <div className="text-sm text-red-700">
                        Cinema: {ticket.cinema}
                    </div>
                </div>
            </div>
        </div>
    );
}
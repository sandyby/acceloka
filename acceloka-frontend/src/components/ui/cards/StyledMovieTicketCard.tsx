"use client";
import StyledTypography from '@/components/ui/StyledTypography';
import { formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import { IMovieTicket } from '@/types/card';

export default function StyledMovieTicketCard({ ticket }: { ticket: IMovieTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    return (
        <div className="relative bg-white rounded-2xl shadow-md h-max border overflow-clip border-gray-200 flex">
            <div className="w-[200px] h-full bg-accent-tertiary-900">
            </div>
            <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
                <div className="w-full col-span-2 flex flex-row justify-between">
                    <div className="">
                        <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
                            {ticket.cinema}
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
                                    Cinema Type
                                </StyledTypography>
                                <div className="mb-2">
                                    <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                        {ticket.cinemaType}
                                    </span>
                                </div>
                                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                                    Seat Section
                                </StyledTypography>
                                <div className="">
                                    <span className="inline-flex px-3 py-1 border border-secondary-900 text-secondary-900 text-xs rounded-full">
                                        {ticket.seatSection}
                                    </span>
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
                                <div className="">Screening Time</div>
                                <div className="text-lg font-bold">
                                    {formatDateTimeWithWords(new Date(ticket.screeningTime), { weekday: "long", month: "short" })}
                                </div>
                            </div><div className="text-sm text-secondary-900">
                                <div className="">Duration</div>
                                <div className="text-primary-500 font-bold text-md">
                                    {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
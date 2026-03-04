"use client";
import StyledTypography from '@/components/ui/StyledTypography';
import { calculateArrivalTime, formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import { ITrainTicket } from '@/types/card';
import { KeyboardDoubleArrowRightSharp, TrainRounded } from "@mui/icons-material";

export default function StyledITrainTicketCard({ ticket }: { ticket: ITrainTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    return (

        <div className="relative bg-white rounded-2xl shadow-md h-max border border-gray-200">
            <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
                <div className="w-full col-span-2 flex flex-row justify-between">
                    <div className="w-max">
                        <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <div className="flex gap-x-2">
                            <div className="rounded-full py-0 px-1.25 text-center bg-primary-500">
                                <TrainRounded sx={{ fontSize: 18, color: "var(--color-white-900)" }} />
                            </div>
                            <StyledTypography fontSizeInput={18} fontWeightInput='bold' className="text-primary-600 mt-1">
                                {ticket.trainCode}
                            </StyledTypography>
                            <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
                                {ticket.trainType}
                            </StyledTypography>
                        </div>
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
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col justify-between h-full">
                        <div className="">
                            <div className="mb-2 flex flex-col gap-y-0.5">
                                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                                    Seat Class
                                </StyledTypography>
                                <div className="">
                                    <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                                        {ticket.seatClass}
                                    </span>
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
                    <div className="my-auto">
                        <div className="flex w-max">
                            <div className="flex items-center text-center">
                                <div className="max-w-40 mx-2">
                                    <p className="text-sm mb-1 text-accent-primary-900">Departure Time</p>
                                    <div className="text-sm font-semibold w-[70%] mx-auto text-secondary-900">
                                        {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col items-center max-w-full">
                                <div className="text-md text-accent-primary-900 font-semibold -mb-2">
                                    {ticket.transitsCount > 0 ? `${ticket.transitsCount} transit(s)` : "Direct"}
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <div className="w-30 text-center wrap-break-word">
                                        <p className="text-2xl font-bold text-secondary-900">
                                            {ticket.departureStation}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <div className="flex gap-x-[-20px]">
                                            <KeyboardDoubleArrowRightSharp color="primary" sx={{ fontSize: 64 }} />
                                        </div>
                                    </div>
                                    <div className="w-30 text-center wrap-break-word">
                                        <p className="text-2xl font-bold text-secondary-900">
                                            {ticket.arrivalStation}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-md text-accent-primary-900 -mt-2">
                                    {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                                </div>
                            </div>
                            <div className="flex items-center text-center">
                                <div className="max-w-40 mx-2">
                                    <p className="text-sm mb-1 text-accent-primary-900">Arrival Time</p>
                                    <div className="text-sm font-semibold w-[70%] mx-auto text-secondary-900">
                                        {calculateArrivalTime(ticket.departureTime, ticket.duration)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
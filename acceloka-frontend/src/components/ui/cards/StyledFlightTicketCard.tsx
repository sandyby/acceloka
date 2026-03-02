"use client";

import StyledTypography from '@/components/ui/StyledTypography';
import { calculateArrivalTime, dateTimeFormatter, durationFormatter } from '@/lib/utils';
import { IFlightTicket } from '@/types/card';

export default function StyledFlightTicketCard({ ticket }: { ticket: IFlightTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    return (
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden h-64 border border-gray-200">
            <div className="absolute inset-y-0 right-1/3 w-px bg-gray-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    ✈️
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    🛬
                </div>
            </div>

            <div className="grid grid-cols-[3fr_1fr_3fr] h-full p-5 gap-4">
                <div className="flex flex-col justify-between">
                    <div>
                        <StyledTypography variant="h6" fontWeight="bold" className="text-secondary-900">
                            {ticket.ticketName}
                        </StyledTypography>
                        <StyledTypography variant="subtitle2" className="text-secondary-700 mt-1">
                            {ticket.airline} • {ticket.seatClass}
                        </StyledTypography>

                        <div className="flex flex-wrap gap-2 mt-3 capitalize">
                            <span className="px-3 py-1 bg-primary-500 text-white  text-xs rounded-full">
                                {ticket.ticketCategory}
                            </span>
                            {ticket.transitsCount === 0 && (
                                <span className="px-3 py-1 bg-dark-green-900 text-white text-xs rounded-full">
                                    Direct
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 capitalize">
                            {ticket.amenities?.map((amenity, idx) => (
                                <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500  text-xs rounded-full">
                                    {amenity}
                                </span>
                            ))}
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
                            {dateTimeFormatter(new Date(ticket.departureTime))}
                        </div>
                        <div className="text-sm text-gray-600">
                            {ticket.departureAirport} → {ticket.arrivalAirport}
                        </div>
                        <div className="text-lg font-semibold text-secondary-900">
                            {calculateArrivalTime(ticket.departureTime, ticket.duration)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        Baggage: {ticket.baggageKg} kg
                    </div>
                </div>
            </div>
        </div>
    );
}

// "use client";

// import StyledTicketCardStructure from './StyledTicketCardStructure';
// import StyledTypography from '@/components/ui/StyledTypography';
// import { IFlightTicket } from '@/types/card';

// const StyledFlightTicketCard = ({ ticket }: { ticket: IFlightTicket }) => {
//     return (
//         <div className="relative inset-0 bg-white-900 w-full h-60 rounded-[16px] mask-[linear-gradient(white,white)] mask-no-repeat mask-exclude [-webkit-mask-composite:destination-out] py-2 flex">
//             <div className="absolute w-12 h-full absolute right-1/4 top-0">
//                 <span className="absolute w-12 h-12 rounded-full bg-secondary-900 -top-1/10 mx-auto">
//                 </span>
//                 <span className="absolute w-12 h-12 rounded-full bg-secondary-900 -bottom-1/10 mx-auto">
//                 </span>
//                 <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full border-2 border-dashed border-secondary-900 mx-auto"></div>
//             </div>
//             <div className='w-[calc(75%-68px)] mx-2.5 flex-none flex-wrap wrap-break-word'>
//                 <StyledTypography fontSizeInput={20} fontWeightInput="bold" width={"fit-content"} sx={{ textTransform: "capitalize", maxWidth: "420px" }}>
//                     {ticket.ticketName}
//                 </StyledTypography>
//                 <div className='w-fit max-w-105 h-fit my-1 flex flex-row flex-wrap gap-x-1.25 gap-y-0.5'>
//                     <div className='h-fit px-2.5 py-0.5 bg-primary-500 rounded-2xl'>
//                         <StyledTypography fontSizeInput={12} width={"fit-content"} sx={{ textTransform: "capitalize", color: "var(--color-white-900)" }}>
//                             {ticket.ticketCategory}
//                         </StyledTypography>
//                     </div>
//                     <div className='h-fit px-2.5 py-0.5 bg-dark-green-900 rounded-2xl'>
//                         <StyledTypography fontSizeInput={12} width={"fit-content"} sx={{ textTransform: "capitalize", color: "var(--color-white-900)" }}>
//                             Raya Sale
//                         </StyledTypography>
//                     </div>
//                     <div className='h-fit px-2.5 py-0.5 border border-primary-500 rounded-2xl'>
//                         <StyledTypography fontSizeInput={12} width={"fit-content"} sx={{ textTransform: "capitalize", color: "var(--color-primary-500)" }}>
//                             Popular Pick
//                         </StyledTypography>
//                     </div>
//                     <div className='h-fit px-2.5 py-0.5 bg-red-500 rounded-2xl'>
//                         <StyledTypography fontSizeInput={12} width={"fit-content"} sx={{ textTransform: "capitalize", color: "var(--color-white-900)" }}>
//                             Newcomer Sale
//                         </StyledTypography>
//                     </div>
//                 </div>
//                 <StyledTypography width={"fit-content"} sx={{ textTransform: "capitalize" }}>
//                     {ticket.quota}
//                 </StyledTypography>
//                 <StyledTypography width={"fit-content"} sx={{ textTransform: "capitalize" }}>
//                     {ticket.price}
//                 </StyledTypography>
//                 <StyledTypography width={"fit-content"} sx={{ textTransform: "capitalize" }}>
//                     {ticket.eventDate}
//                 </StyledTypography>
//             </div>
//             <div className='w-12 flex-none'>

//             </div>
//             <div className='flex-1 w-0 flex-wrap wrap-break-word mx-2.5'>
//                 <p className='text-secondary-900'>ahsdhashdaahsdhashdaahsdhashda</p>
//                 <p className='text-secondary-900'>ahsdhashdaahsdhashda</p>
//                 <p className='text-secondary-900'>ahsdhashda</p>
//             </div>
//         </div>
//     )
// }

// export default StyledFlightTicketCard;
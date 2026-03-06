"use client";

import { useState } from 'react';
import { IBusTicket } from '@/types/card';
import { calculateArrivalTime, formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import StyledTypography from '@/components/ui/StyledTypography';
import {
    DirectionsBusRounded,
    KeyboardDoubleArrowRightSharp,
    FlashOnRounded,
    AddShoppingCartRounded,
    CheckCircleRounded,
    LocationOnRounded
} from '@mui/icons-material';
import { Button } from "@mui/material";
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledBusTicketCard({ ticket }: { ticket: IBusTicket }) {
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);
    const { hours, minutes } = durationFormatter(ticket.duration);

    const handleAddToCart = () => {
        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip h-full flex flex-col md:flex-row hover:border-primary-300 transition-colors">
            <div className="flex-[2] p-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary-500 rounded-lg text-white shadow-sm">
                        <DirectionsBusRounded fontSize="small" />
                    </div>
                    <div>
                        <StyledTypography fontSizeInput={18} fontWeightInput="bold" className="text-secondary-900 leading-tight">
                            {ticket.ticketName}
                        </StyledTypography>
                        <div className="flex gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            <span>{ticket.busCode}</span>
                            <span>•</span>
                            <span className="text-primary-600">{ticket.busType}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Departure</p>
                        <p className="text-xl font-black text-secondary-900 leading-none">{ticket.departureStop}</p>
                        <p className="text-sm font-bold text-primary-600 mt-1">
                            {formatDateTimeWithWords(new Date(ticket.departureTime))}
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-6">
                        <p className="text-[10px] font-bold text-gray-400 mb-1">{hours}h {minutes}m</p>
                        <div className="flex items-center text-primary-200">
                            <div className="w-12 h-[2px] bg-current" />
                            <KeyboardDoubleArrowRightSharp sx={{ fontSize: 24 }} className="text-primary-500" />
                            <div className="w-12 h-[2px] bg-current" />
                        </div>
                        <p className="text-[10px] font-bold text-accent-primary-900 mt-1">
                            {ticket.transitsCount > 0 ? `${ticket.transitsCount} Stop(s)` : "Direct"}
                        </p>
                    </div>

                    <div className="flex-1 text-end">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Arrival</p>
                        <p className="text-xl font-black text-secondary-900 leading-none">{ticket.arrivalStop}</p>
                        <p className="text-sm font-bold text-primary-600 mt-1">
                            {calculateArrivalTime(ticket.departureTime, ticket.duration)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-bold text-secondary-700 bg-secondary-50 px-3 py-1 rounded-full border border-secondary-100">
                        {ticket.seatClass}
                    </span>
                    <div className="flex gap-2">
                        {ticket.amenities?.slice(0, 3).map((a, i) => (
                            <span key={i} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">{a}</span>
                        ))}
                    </div>
                    {ticket.amenities && ticket.amenities?.length > 3 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                        {ticket.amenities?.length - 3}+
                    </span>)}
                </div>
            </div>

            <div className="flex-1 bg-slate-50 p-5 flex flex-col max-w-65 justify-center border-t md:border-t-0 md:border-l border-gray-100">
                <div className="mb-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Price per seat</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-primary-600">Rp</span>
                        <StyledTypography fontWeightInput="bold" fontSizeInput={28} className="text-primary-600 leading-none">
                            {ticket.price.toLocaleString('id-ID')}
                        </StyledTypography>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2">
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<FlashOnRounded />}
                        sx={{
                            bgcolor: 'var(--color-primary-500)',
                            borderRadius: '12px',
                            py: 1.2,
                            textTransform: 'none',
                            fontWeight: '900',
                            fontSize: '1rem',
                            '&:hover': { bgcolor: 'var(--color-primary-600)' }
                        }}
                    >
                        Book Now
                    </Button>

                    <Button
                        fullWidth
                        onClick={handleAddToCart}
                        variant={isTicketAddedToBookingsCart ? "contained" : "outlined"}
                        sx={{
                            borderRadius: '12px',
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderColor: 'var(--color-primary-500)',
                            bgcolor: isTicketAddedToBookingsCart ? '#10b981' : 'transparent',
                            color: isTicketAddedToBookingsCart ? 'white' : 'var(--color-primary-500)',
                            '&:hover': { borderColor: 'var(--color-primary-600)', bgcolor: isTicketAddedToBookingsCart ? '#059669' : 'rgba(var(--color-primary-500-rgb), 0.04)' }
                        }}
                    >
                        {isTicketAddedToBookingsCart ? <CheckCircleRounded /> : <AddShoppingCartRounded />}
                    </Button>
                </div>
                <p className="text-[11px] text-center text-gray-400 mt-4 font-bold">Only {ticket.quota} seats left!</p>
            </div>
        </div>
    );
}
// "use client";
// import StyledTypography from '@/components/ui/StyledTypography';
// import { calculateArrivalTime, formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
// import { IBusTicket } from '@/types/card';
// import { DirectionsBusRounded, KeyboardDoubleArrowRightSharp } from '@mui/icons-material';

// export default function StyledBusTicketCard({ ticket }: { ticket: IBusTicket }) {
//     const { hours, minutes, seconds } = durationFormatter(ticket.duration);

//     return (
//         <div className="relative bg-white rounded-2xl shadow-md h-max border border-gray-200">
//             <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
//                 <div className="w-full col-span-2 flex flex-row justify-between">
//                     <div className="w-max">
//                         <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
//                             {ticket.ticketName}
//                         </StyledTypography>
//                         <div className="flex gap-x-2">
//                             <div className="rounded-full py-0 px-1.25 text-center bg-primary-500">
//                                 <DirectionsBusRounded sx={{ fontSize: 18, color: "var(--color-white-900)" }} />
//                             </div>
//                             <StyledTypography fontSizeInput={18} fontWeightInput='bold' className="text-primary-600 mt-1">
//                                 {ticket.busCode}
//                             </StyledTypography>
//                             <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
//                                 {ticket.busType}
//                             </StyledTypography>
//                         </div>
//                     </div>
//                     <div className="text-end">
//                         <StyledTypography fontWeightInput="bold" fontSizeInput={28}
//                             className="text-primary-600" sx={{ marginBottom: -1 }}>
//                             Rp {ticket.price.toLocaleString('id-ID')}
//                         </StyledTypography>
//                         <StyledTypography fontSizeInput={18} className="text-gray-500">
//                             /pax
//                         </StyledTypography>
//                     </div>
//                 </div>
//                 <div className="flex flex-row justify-between ">
//                     <div className="flex flex-col justify-between h-full">
//                         <div className="">
//                             <div className="mb-2 flex flex-col gap-y-0.5">
//                                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                     Seat Class
//                                 </StyledTypography>
//                                 <div className="">
//                                     <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
//                                         {ticket.seatClass}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="mb-2 flex flex-col gap-y-0.5">
//                                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                     Amenities
//                                 </StyledTypography>
//                                 <div className="flex flex-wrap gap-2 capitalize">
//                                     {ticket.amenities?.map((amenity, idx) => (
//                                         <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500 text-xs rounded-full">
//                                             {amenity}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-auto text-md text-accent-primary-900">
//                             Ticket Quota: {ticket.quota}
//                         </div>
//                     </div>
//                     <div className="my-auto">
//                         <div className="flex w-max">
//                             <div className="flex items-center text-center">
//                                 <div className="max-w-40 mx-2">
//                                     <p className="text-sm mb-1 text-accent-primary-900">Departure Time</p>
//                                     <div className="text-sm font-semibold w-[70%] mx-auto text-secondary-900">
//                                         {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="flex flex-col items-center max-w-full">
//                                 <div className="text-md text-accent-primary-900 font-semibold -mb-2">
//                                     {ticket.transitsCount > 0 ? `${ticket.transitsCount} transit(s)` : "Direct"}
//                                 </div>
//                                 <div className="flex gap-x-2 items-center">
//                                     <div className="w-35 text-center wrap-break-word">
//                                         <p className="text-lg font-bold text-secondary-900">
//                                             {ticket.departureStop}
//                                         </p>
//                                     </div>
//                                     <div className="flex flex-col text-center">
//                                         <div className="flex gap-x-[-20px]">
//                                             <KeyboardDoubleArrowRightSharp color="primary" sx={{ fontSize: 64 }} />
//                                         </div>
//                                     </div>
//                                     <div className="w-35 text-center wrap-break-word">
//                                         <p className="text-lg font-bold text-secondary-900">
//                                             {ticket.arrivalStop}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="text-md text-accent-primary-900 -mt-2">
//                                     {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
//                                 </div>
//                             </div>
//                             <div className="flex items-center text-center">
//                                 <div className="max-w-40 mx-2">
//                                     <p className="text-sm mb-1 text-accent-primary-900">Arrival Time</p>
//                                     <div className="text-sm font-semibold w-[70%] mx-auto text-secondary-900">
//                                         {calculateArrivalTime(ticket.departureTime, ticket.duration)}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
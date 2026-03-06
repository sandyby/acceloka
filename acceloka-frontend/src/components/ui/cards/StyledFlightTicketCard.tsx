"use client";

import StyledTypography from '@/components/ui/StyledTypography';
import useBookingsCart from '@/hooks/useBookingsCart';
import { calculateArrivalTime, durationFormatter, formatDateTimeWithWords } from '@/lib/utils';
import { IFlightTicket } from '@/types/card';
import { KeyboardDoubleArrowRightSharp, LuggageRounded, AddShoppingCartRounded, FlashOnRounded, CheckCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function StyledFlightTicketCard({ ticket }: { ticket: IFlightTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);
    const arrivalTime = calculateArrivalTime(ticket.departureTime, ticket.duration);
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);

    const handleAddToCart = () => {
        if (isTicketAddedToBookingsCart) {
            return;
        }

        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        console.log("Added to cart:", ticket.ticketCode);

        setTimeout(() => {
            setIsTicketAddedToBookingsCart(false);
        }, (2000));
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md border overflow-clip border-gray-200 hover:border-primary-300 transition-colors h-fit">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] w-full">
                <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-y-4">
                    <div className="flex justify-between items-start gap-x-4">
                        <div className="min-w-0 flex-1"> {/* // ? min-w-0 prevents text overflow from breaking flex */}
                            <StyledTypography fontWeightInput="bold" className="text-secondary-900 truncate" sx={{ fontSize: "22px" }}>
                                {ticket.ticketName}
                            </StyledTypography>
                            <StyledTypography fontSizeInput={16} className="text-primary-600 truncate">
                                {ticket.airline}
                            </StyledTypography>
                        </div>
                        <div className="flex gap-x-2">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {ticket.seatClass}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">Departure</p>
                            <p className="text-2xl font-black text-secondary-900">{ticket.departureAirport}</p>
                            <p className="text-xs text-gray-600 font-medium">
                                {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
                            </p>
                        </div>

                        <div className="flex flex-col items-center flex-1 px-4">
                            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-tighter">
                                {ticket.transitsCount > 0 ? `${ticket.transitsCount} Transit` : "Direct"}
                            </p>
                            <KeyboardDoubleArrowRightSharp className="text-primary-300" sx={{ fontSize: 40 }} />
                            <p className="text-[10px] text-gray-500 font-mono">
                                {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">Arrival</p>
                            <p className="text-2xl font-black text-secondary-900">{ticket.arrivalAirport}</p>
                            <p className="text-xs text-gray-600 font-medium">{arrivalTime}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Tooltip title="Max Baggage">
                            <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-[11px] font-bold text-gray-700">
                                <LuggageRounded sx={{ fontSize: 14, mr: 0.5 }} />
                                {ticket.baggageKg}kg
                            </div>
                        </Tooltip>
                        {ticket.amenities?.slice(0, 2).map((amenity, idx) => (
                            <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                                {amenity}
                            </span>
                        ))}
                        {ticket.amenities && ticket.amenities?.length > 2 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                            {ticket.amenities?.length - 2}+
                        </span>)}
                    </div>
                </div>

                <div className="p-5 flex flex-col justify-center items-center bg-gray-50/50 gap-y-3">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase">Price per person</p>
                        <StyledTypography fontWeightInput="bold" sx={{ fontSize: "26px" }} className="text-primary-600">
                            Rp {ticket.price.toLocaleString('id-ID')}
                        </StyledTypography>
                        <p className={`text-[11px] font-bold mt-1 ${ticket.quota < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                            {ticket.quota} seats remaining
                        </p>
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<FlashOnRounded />}
                            sx={{ bgcolor: 'var(--color-primary-500)', borderRadius: '12px', fontWeight: 'bold', py: 1 }}
                        >
                            Book Now
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleAddToCart}
                            variant={isTicketAddedToBookingsCart ? "contained" : "outlined"}
                            className="overflow-hidden relative"
                            sx={{
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                py: 1,
                                transition: 'all 0.3s ease',
                                borderColor: isTicketAddedToBookingsCart ? '#10b981' : 'var(--color-primary-500)',
                                bgcolor: isTicketAddedToBookingsCart ? '#10b981' : 'transparent',
                                color: isTicketAddedToBookingsCart ? 'white' : 'var(--color-primary-500)',
                                '&:hover': {
                                    bgcolor: isTicketAddedToBookingsCart ? '#059669' : 'rgba(var(--color-primary-500-rgb), 0.04)',
                                    borderColor: isTicketAddedToBookingsCart ? '#059669' : 'var(--color-primary-500)',
                                }
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {isTicketAddedToBookingsCart ? (
                                    <motion.div
                                        key="added"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircleRounded fontSize="small" />
                                        Added!
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="add"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <AddShoppingCartRounded fontSize="small" />
                                        Add to Cart
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// "use client";

// import StyledTypography from '@/components/ui/StyledTypography';
// import { calculateArrivalTime, durationFormatter, formatDateTimeWithWords } from '@/lib/utils';
// import { IFlightTicket } from '@/types/card';
// import { KeyboardDoubleArrowRightSharp, LuggageRounded } from '@mui/icons-material';
// import { color } from 'framer-motion';

// export default function StyledFlightTicketCard({ ticket }: { ticket: IFlightTicket }) {
//     const { hours, minutes, seconds } = durationFormatter(ticket.duration);

//     return (
//         <div className="relative bg-white rounded-2xl shadow-md h-max border border-gray-200">
//             <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
//                 <div className="w-full col-span-2 flex flex-row justify-between">
//                     <div className="">
//                         <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
//                             {ticket.ticketName}
//                         </StyledTypography>
//                         <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
//                             {ticket.airline}
//                         </StyledTypography>
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
//                 <div className="flex flex-row items-end justify-between items-start content-start">
//                     <div className="flex flex-col justify-between h-full">
//                         <div className="">
//                             <div className="flex gap-x-8">
//                                 <div className="mb-2 flex flex-col gap-y-0.5">
//                                     <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                         Seat Class
//                                     </StyledTypography>
//                                     <div className="">
//                                         <span className="inline-flex ps-3 pe-4 py-1 bg-primary-500 text-white text-xs rounded-full">
//                                             {ticket.seatClass}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="mb-2 flex flex-col gap-y-0.5">
//                                     <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                         Max. Baggage Weight
//                                     </StyledTypography>
//                                     <div className="">
//                                         <span className="inline-flex items-center ps-3 pe-4 py-1 bg-primary-500 text-white text-xs rounded-full">
//                                             <LuggageRounded sx={{ color: "var(--color-white-900)", marginRight: "4px", fontSize: "16px" }} />
//                                             {ticket.baggageKg} kg
//                                         </span>
//                                     </div>
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
//                         <div className="flex w-[max]">
//                             <div className="flex items-center text-center w-[140px]">
//                                 <div className="mx-2 w-max">
//                                     <p className="text-sm mb-1 text-accent-primary-900">Departure Time</p>
//                                     <div className="text-sm font-semibold w-[70%] mx-auto text-secondary-900">
//                                         {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="flex flex-col items-center">
//                                 <div className="text-md text-accent-primary-900 font-semibold -mb-2">
//                                     {ticket.transitsCount > 0 ? `${ticket.transitsCount} transit(s)` : "Direct"}
//                                 </div>
//                                 <div className="flex gap-x-2 items-center">
//                                     <p className="w-30 text-center text-4xl font-bold text-secondary-900">
//                                         {ticket.departureAirport}
//                                     </p>
//                                     <div className="flex flex-col text-center">
//                                         <div className="flex gap-x-[-20px]">
//                                             <KeyboardDoubleArrowRightSharp color="primary" sx={{ fontSize: 64 }} />
//                                         </div>
//                                     </div>
//                                     <p className="w-30  text-center text-4xl font-bold text-secondary-900">
//                                         {ticket.arrivalAirport}
//                                     </p>
//                                 </div>
//                                 <div className="text-md text-accent-primary-900 -mt-2">
//                                     {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
//                                 </div>
//                             </div>
//                             <div className="flex items-center text-center w-[140px]">
//                                 <div className="mx-2">
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
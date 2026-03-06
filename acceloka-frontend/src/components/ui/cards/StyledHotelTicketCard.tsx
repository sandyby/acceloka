"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IHotelTicket } from "@/types/card";
import StyledTypography from "@/components/ui/StyledTypography";
import { calculateDuration, formatDateTimeWithWords } from "@/lib/utils";
import { PersonRounded, HotelRounded, AddShoppingCartRounded, CheckCircleRounded, FlashOnRounded, CalendarMonthRounded } from "@mui/icons-material";
import { Button, Tooltip, Divider } from "@mui/material";
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);

    // Duration calculation
    const duration = calculateDuration(ticket.minCheckInDate, ticket.maxCheckOutDate);

    const handleAddToCart = () => {
        if (isTicketAddedToBookingsCart) return;
        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip hover:border-primary-300 transition-colors flex flex-col md:flex-row h-full">

            <div className="w-full md:w-[240px] h-[200px] md:h-auto bg-accent-tertiary-900 flex items-center justify-center relative">
                <HotelRounded sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)' }} />
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-secondary-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        {ticket.roomType}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-5 flex flex-col gap-y-3 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="min-w-0">
                    <StyledTypography fontWeightInput="bold" className="text-secondary-900 truncate" sx={{ fontSize: "22px" }}>
                        {ticket.ticketName}
                    </StyledTypography>
                    <StyledTypography fontSizeInput={16} className="text-primary-600 truncate">
                        {ticket.hotelName}
                    </StyledTypography>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">
                            <CalendarMonthRounded sx={{ fontSize: 12 }} /> Check-In
                        </p>
                        <p className="text-sm font-bold text-secondary-900">
                            {formatDateTimeWithWords(new Date(ticket.minCheckInDate), { weekday: "short", month: "short" })}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Check-Out</p>
                        <p className="text-sm font-bold text-secondary-900">
                            {formatDateTimeWithWords(new Date(ticket.maxCheckOutDate), { weekday: "short", month: "short" })}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-secondary-50 text-secondary-900 text-[11px] font-bold rounded-full border border-secondary-100">
                        <PersonRounded sx={{ fontSize: 14, mr: 0.5 }} />
                        Up to {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
                    </span>
                    {ticket.amenities?.slice(0, 2).map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                            {amenity}
                        </span>
                    ))}
                    {ticket.amenities && ticket.amenities?.length > 2 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                        {ticket.amenities?.length - 2}+
                    </span>)}
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <p className={`text-[12px] font-bold ${ticket.quota < 5 ? 'text-red-500' : 'text-accent-primary-900'}`}>
                        Remaining: {ticket.quota} rooms
                    </p>
                    <p className="text-xs font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded">
                        {duration}
                    </p>
                </div>
            </div>

            <div className="w-full md:w-[220px] p-5 flex flex-col justify-center items-center bg-gray-50/50 gap-y-3">
                <div className="text-center">
                    <p className="text-xs text-gray-400 font-bold uppercase">Price / night</p>
                    <StyledTypography fontWeightInput="bold" sx={{ fontSize: "26px" }} className="text-primary-600">
                        Rp {ticket.price.toLocaleString('id-ID')}
                    </StyledTypography>
                    <p className="text-[10px] text-gray-500 italic mt-1">Excl. taxes & fees</p>
                </div>

                <div className="w-full flex flex-col gap-y-2 mt-2">
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<FlashOnRounded />}
                        sx={{ bgcolor: 'var(--color-primary-500)', borderRadius: '12px', fontWeight: 'bold', textTransform: 'none' }}
                    >
                        Book Now
                    </Button>

                    <Button
                        fullWidth
                        onClick={handleAddToCart}
                        variant={isTicketAddedToBookingsCart ? "contained" : "outlined"}
                        sx={{
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            borderColor: isTicketAddedToBookingsCart ? '#10b981' : 'var(--color-primary-500)',
                            bgcolor: isTicketAddedToBookingsCart ? '#10b981' : 'transparent',
                            color: isTicketAddedToBookingsCart ? 'white' : 'var(--color-primary-500)',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isTicketAddedToBookingsCart ? (
                                <motion.div key="added" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-1">
                                    <CheckCircleRounded fontSize="small" /> Added
                                </motion.div>
                            ) : (
                                <motion.div key="add" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center gap-1">
                                    <AddShoppingCartRounded fontSize="small" /> Add to Cart
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </div>
        </div>
    );
}

// "use client";

// import { IHotelTicket } from "@/types/card";
// import StyledTypography from "@/components/ui/StyledTypography";
// import { calculateDuration, formatDateTimeWithWords, generateRandomDays } from "@/lib/utils";
// import { addDays } from "date-fns";
// import { PersonRounded } from "@mui/icons-material";

// export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
//     const tempMaxCheckOutDate = addDays(ticket.minCheckInDate, generateRandomDays(5)).toString();

//     return (
//         <div className="relative bg-white rounded-2xl shadow-md h-max overflow-clip border border-gray-200 flex">
//             <div className="w-[200px] h-full bg-accent-tertiary-900">
//             </div>
//             <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
//                 <div className="w-full col-span-2 flex flex-row justify-between">
//                     <div className="">
//                         <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
//                             {ticket.ticketName}
//                         </StyledTypography>
//                         <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
//                             {ticket.hotelName}
//                         </StyledTypography>
//                     </div>
//                     <div className="text-end">
//                         <StyledTypography fontWeightInput="bold" fontSizeInput={28}
//                             className="text-primary-600" sx={{ marginBottom: -1 }}>
//                             Rp {ticket.price.toLocaleString('id-ID')}
//                         </StyledTypography>
//                         <StyledTypography fontSizeInput={18} className="text-gray-500">
//                             /night
//                         </StyledTypography>
//                         <div className="mt-2">
//                             <p className="text-primary-500 text-md">{calculateDuration(ticket.minCheckInDate, tempMaxCheckOutDate)}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex flex-row items-end justify-between items-start content-start">
//                     <div className="flex flex-col justify-between h-full">
//                         <div className="">
//                             <div className="mb-2 flex flex-col gap-y-0.5">
//                                 <div className="flex gap-x-8">
//                                     <div className="mb-2 flex flex-col gap-y-0.5">
//                                         <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                             Room Type
//                                         </StyledTypography>
//                                         <div className="">
//                                             <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
//                                                 {ticket.roomType}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className="mb-2 flex flex-col gap-y-0.5">
//                                         <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                             Max. Occupancies
//                                         </StyledTypography>
//                                         <div className="">
//                                             <span className="inline-flex items-center ps-3 pe-4 py-1 border border-secondary-900 text-secondary-900 text-xs rounded-full">
//                                                 <PersonRounded sx={{ color: "var(--color-secondary-900)", marginRight: "4px", fontSize: "16px" }} />
//                                                 {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
//                                             </span>
//                                         </div>
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
//                     <div className="text-end mt-auto">
//                         <div className="flex flex-col gap-y-1.5">
//                             <div className="text-sm text-secondary-900">
//                                 <div className="">Check-in from</div>
//                                 <div className="text-lg font-bold">
//                                     {formatDateTimeWithWords(new Date(ticket.minCheckInDate), { weekday: "long", month: "short" })}
//                                 </div>
//                             </div><div className="text-sm text-secondary-900">
//                                 <div className="">Max. check-out until</div>
//                                 <div className="text-lg font-bold">
//                                     {formatDateTimeWithWords(new Date(ticket.maxCheckOutDate), { weekday: "long", month: "short" })}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
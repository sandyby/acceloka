"use client";

import { useState } from 'react';
import { IMovieTicket } from '@/types/card';
import { formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import StyledTypography from '@/components/ui/StyledTypography';
import {
    TheatersRounded,
    ConfirmationNumberRounded,
    LocationOnRounded,
    AccessTimeFilledRounded,
    AddShoppingCartRounded,
    CheckCircleRounded,
    FlashOnRounded,
    ChairRounded
} from '@mui/icons-material';
import { Button, Chip } from "@mui/material";
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledMovieTicketCard({ ticket }: { ticket: IMovieTicket }) {
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);
    const { hours, minutes } = durationFormatter(ticket.duration);

    const handleAddToCart = () => {
        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip h-full flex flex-col md:flex-row transition-all hover:shadow-lg">

            <div className="md:w-40 bg-accent-tertiary-900 flex flex-col items-center justify-center p-4 text-white relative">
                <div className="absolute top-0 bottom-0 left-2 flex flex-col justify-around py-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-3 h-4 bg-accent-quarternary-900 rounded-sm" />
                    ))}
                </div>

                <TheatersRounded sx={{ fontSize: 40, mb: 1, color: 'var(--color-primary-400)' }} />
                <div className="text-center z-10">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Format</p>
                    <p className="text-xl font-black italic text-primary-400">{ticket.cinemaType}</p>
                </div>

                <div className="absolute top-0 bottom-0 right-2 flex flex-col justify-around py-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-3 h-4 bg-accent-quarternary-900 rounded-sm" />
                    ))}
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between gap-y-4">
                <div>
                    <div className="flex justify-between items-start">
                        <StyledTypography fontWeightInput="bold" sx={{ fontSize: "26px" }} className="text-secondary-900 leading-tight uppercase tracking-tight">
                            {ticket.ticketName}
                        </StyledTypography>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-primary-600">
                        <LocationOnRounded sx={{ fontSize: 18 }} />
                        <span className="font-bold text-lg">{ticket.cinema}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Screening Time</p>
                        <div className="flex items-center gap-2">
                            <AccessTimeFilledRounded sx={{ fontSize: 16 }} className="text-secondary-400" />
                            <span className="text-sm font-bold text-secondary-800">
                                {formatDateTimeWithWords(new Date(ticket.screeningTime), { weekday: 'short', month: 'short' })}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Details</p>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600">{hours}h {minutes}m</span>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-1">
                                <ChairRounded sx={{ fontSize: 16 }} className="text-secondary-400" />
                                <span className="text-sm font-bold text-secondary-800">{ticket.seatSection}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-900 text-[10px] font-black rounded-md uppercase">
                        Reserved Seating
                    </span>
                    <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-md uppercase border border-primary-100">
                        E-Ticket Ready
                    </span>
                </div>
            </div>

            <div className="md:w-60 p-6 bg-gray-50 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100">
                <div className="text-center mb-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-primary-600">Rp</span>
                        <StyledTypography fontWeightInput="bold" fontSizeInput={32} className="text-primary-600 leading-none">
                            {ticket.price.toLocaleString('id-ID')}
                        </StyledTypography>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">including tax</p>
                </div>

                <div className="w-full flex flex-col gap-y-2">
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

                <div className="mt-4 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-[11px] text-red-600 font-bold uppercase tracking-tighter">
                        {ticket.quota} Seats Left in Section {ticket.seatSection}
                    </p>
                </div>
            </div>
        </div>
    );
}
// "use client";
// import StyledTypography from '@/components/ui/StyledTypography';
// import { formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
// import { IMovieTicket } from '@/types/card';

// export default function StyledMovieTicketCard({ ticket }: { ticket: IMovieTicket }) {
//     const { hours, minutes, seconds } = durationFormatter(ticket.duration);

//     return (
//         <div className="relative bg-white rounded-2xl shadow-md h-max border overflow-clip border-gray-200 flex">
//             <div className="w-[200px] h-full bg-accent-tertiary-900">
//             </div>
//             <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
//                 <div className="w-full col-span-2 flex flex-row justify-between">
//                     <div className="">
//                         <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
//                             {ticket.ticketName}
//                         </StyledTypography>
//                         <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
//                             {ticket.cinema}
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
//                             <div className="mb-2 flex flex-col gap-y-0.5">
//                                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                     Cinema Type
//                                 </StyledTypography>
//                                 <div className="mb-2">
//                                     <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
//                                         {ticket.cinemaType}
//                                     </span>
//                                 </div>
//                                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                                     Seat Section
//                                 </StyledTypography>
//                                 <div className="">
//                                     <span className="inline-flex px-3 py-1 border border-secondary-900 text-secondary-900 text-xs rounded-full">
//                                         {ticket.seatSection}
//                                     </span>
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
//                                 <div className="">Screening Time</div>
//                                 <div className="text-lg font-bold">
//                                     {formatDateTimeWithWords(new Date(ticket.screeningTime), { weekday: "long", month: "short" })}
//                                 </div>
//                             </div><div className="text-sm text-secondary-900">
//                                 <div className="">Duration</div>
//                                 <div className="text-primary-500 font-bold text-md">
//                                     {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IHotelTicket } from "@/types/card";
import StyledTypography from "@/components/ui/StyledTypography";
import { calculateDuration, formatDateTimeWithWords, capitalizeEachWord } from "@/lib/utils";
import { PersonRounded, HotelRounded, AddShoppingCartRounded, CheckCircleRounded, LibraryBooksRounded, FlashOnRounded, CalendarMonthRounded } from "@mui/icons-material";
import { Button, Tooltip, Divider } from "@mui/material";
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledHotelTicketCard({ ticket }: { ticket: IHotelTicket }) {
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);

    const duration = calculateDuration(ticket.minCheckInDate, ticket.maxCheckOutDate);

    const handleAddToCart = () => {
        if (isTicketAddedToBookingsCart) return;
        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip hover:border-primary-300 transition-colors flex flex-col h-fit md:flex-row">
            <div className="w-full md:w-[240px] min-h-[200px] md:h-auto bg-accent-quarternary-900 flex items-center justify-center relative flex-shrink-0">
                <HotelRounded sx={{
                    fontSize: 60,
                    color: 'rgba(var(--color-accent-secondary-900-rgb) / 0.4)'
                }} />
                <div className="absolute top-3 left-3 flex-shrink-0">
                    <Tooltip title="Room Type" arrow placement='top' slotProps={{
                        tooltip: {
                            sx: {
                                bgcolor: "var(--color-primary-500)",
                                color: "var(--color-white-900)",
                                fontWeight: "bold",
                                fontSize: "12px",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                "& .MuiTooltip-arrow": {
                                    color: "var(--color-primary-500)",
                                },
                            },
                        },
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        }
                    }}
                    >
                        <span className="bg-white-900 backdrop-blur-sm text-primary-500 px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-x-1 whitespace-nowrap">
                            <HotelRounded sx={{ fontSize: 16 }} className="text-primary-500" />
                            {ticket.roomType}
                        </span>
                    </Tooltip>
                </div>
            </div>

            <div className="flex-1 p-5 flex flex-col gap-y-3 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
                <div className="min-w-0">
                    <StyledTypography fontWeightInput="bold" title={ticket.ticketName} className="text-secondary-900 truncate block w-full" sx={{ fontSize: "22px" }}>
                        {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWWWWWWWW */}
                        {ticket.ticketName}
                    </StyledTypography>
                    <StyledTypography fontSizeInput={16} title={ticket.hotelName} className="text-secondary-900 truncate block w-full">
                        {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWWWWWWWW */}
                        {ticket.hotelName}
                    </StyledTypography>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-gray-50 p-3 rounded-xl min-w-0">
                    <div className='min-w-0'>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1 whitespace-nowrap">
                            <CalendarMonthRounded sx={{ fontSize: 12 }} /> Check-In
                        </p>
                        <p className="text-sm font-bold text-secondary-900 whitespace-nowrap">
                            {formatDateTimeWithWords(new Date(ticket.minCheckInDate), { weekday: "short", month: "short" })}
                        </p>
                    </div>
                    <div className='min-w-0'>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1 whitespace-nowrap">
                            <CalendarMonthRounded sx={{ fontSize: 12 }} /> Check-Out
                        </p>
                        <p className="text-sm font-bold text-secondary-900 whitespace-nowrap">
                            {formatDateTimeWithWords(new Date(ticket.maxCheckOutDate), { weekday: "short", month: "short" })}
                        </p>
                    </div>
                    <div className="col-span-2 mt-1">
                        <p className="inline-block text-xs font-medium text-primary-500 bg-primary-50 px-2 py-1 rounded-lg">
                            {duration}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Tooltip title="Max. Occupancy" arrow placement='bottom' slotProps={{
                        tooltip: {
                            sx: {
                                bgcolor: "var(--color-primary-500)",
                                color: "var(--color-white-900)",
                                fontWeight: "bold",
                                fontSize: "12px",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                "& .MuiTooltip-arrow": {
                                    color: "var(--color-primary-500)",
                                },
                            },
                        },
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        }
                    }}
                    >
                        <span className="inline-flex items-center px-3 py-1 bg-secondary-50 text-secondary-900 text-[11px] font-bold rounded-full border border-secondary-100 whitespace-nowrap">
                            <PersonRounded sx={{ fontSize: 14, mr: 0.5 }} />
                            Up to {ticket.maxOccupancy} {ticket.maxOccupancy > 1 ? 'guests' : 'guest'}
                        </span>
                    </Tooltip>
                    {ticket.amenities?.slice(0, 2).map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                            {amenity}
                        </span>
                    ))}
                    {ticket.amenities && ticket.amenities?.length > 2 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize" title={ticket.amenities.slice(2, ticket.amenities.length).map(capitalizeEachWord).join(", ").toString()}>
                        {ticket.amenities?.length - 2}+
                    </span>)}
                </div>
            </div>

            <div className="w-full md:w-[220px] p-5 flex flex-col justify-center items-center bg-gray-50/50 gap-y-3 flex-shrink-0">
                <div className="text-center w-full">
                    <p className="text-xs text-gray-400 font-bold uppercase">
                        Price per stay
                    </p>
                    <StyledTypography fontWeightInput='bold' title={`Rp ${(ticket.price).toLocaleString('id-ID')}`} sx={{ fontSize: "24px", color: "var(--color-secondary-900)" }} className="truncate block w-full">
                        Rp {ticket.price.toLocaleString('id-ID')}
                        {/* Rp 999.999.999.999 */}
                    </StyledTypography>
                    <p className={`text-[12px] font-bold mt-1 ${ticket.quota < 5 ? 'text-red-500' : 'text-primary-500'}`}>
                        {ticket.quota} rooms available
                    </p>
                </div>

                <div className="w-full flex flex-col gap-y-2">
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={isTicketAddedToBookingsCart}
                        startIcon={<LibraryBooksRounded />}
                        sx={{
                            bgcolor: 'var(--color-primary-500)',
                            borderRadius: '8px',
                            height: "40px",
                            fontWeight: 'bold',
                            py: 1
                        }}
                    >
                        Book Now
                    </Button>
                    <Button
                        fullWidth
                        onClick={handleAddToCart}
                        variant={isTicketAddedToBookingsCart ? "contained" : "outlined"}
                        className="overflow-hidden relative"
                        sx={{
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            height: "40px",
                            py: 1,
                            transition: 'all 0.3s ease',
                            borderColor: isTicketAddedToBookingsCart ? 'var(--color-dark-green-900)' : 'var(--color-primary-500)',
                            bgcolor: isTicketAddedToBookingsCart ? 'var(--color-dark-green-900)' : 'transparent',
                            color: isTicketAddedToBookingsCart ? 'white' : 'var(--color-primary-500)',
                            '&:hover': {
                                bgcolor: isTicketAddedToBookingsCart ? 'var(--color-dark-green-900)' : 'rgba(var(--color-primary-500-rgb) / 0.05)',
                                borderColor: isTicketAddedToBookingsCart ? 'var(--color-dark-green-900)' : 'var(--color-primary-700)',
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
                                    initial={{ y: 20, opacity: 1 }}
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
    );
}
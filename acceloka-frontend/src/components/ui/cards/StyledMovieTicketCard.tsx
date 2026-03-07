"use client";

import { useState } from 'react';
import { IMovieTicket } from '@/types/card';
import { formatDateTimeWithWords, durationFormatter } from '@/lib/utils';
import StyledTypography from '@/components/ui/StyledTypography';
import {
    TheatersRounded,
    ConfirmationNumberRounded,
    LocationOnRounded,
    LibraryBooksRounded,
    AccessTimeFilledRounded,
    AddShoppingCartRounded,
    CheckCircleRounded,
    FlashOnRounded,
    ChairRounded,
    TimerRounded
} from '@mui/icons-material';
import { AnimatePresence, motion } from "framer-motion";
import { Button, Tooltip } from "@mui/material";
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
            <div className="w-full md:w-50 bg-accent-quarternary-900 flex flex-col items-center justify-center p-4 relative flex-shrink-0">
                <TheatersRounded sx={{ fontSize: 48, color: 'rgba(var(--color-accent-secondary-900-rgb) / 0.4)' }} />
                <div className="absolute top-3 left-3 flex-shrink-0">
                    <Tooltip title="Cinema Type" arrow placement='top' slotProps={{
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
                            <TheatersRounded sx={{ fontSize: 16 }} className="text-primary-500" />
                            {ticket.cinemaType}
                        </span>
                    </Tooltip>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between gap-y-4 min-w-0">
                <div className="min-w-0">
                    <StyledTypography fontWeightInput="bold" title={ticket.ticketName} className="text-secondary-900 truncate block w-full" sx={{ fontSize: "24px" }}>
                        {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWWWWWWWW */}
                        {ticket.ticketName}
                    </StyledTypography>
                    <div className="flex bg-primary-50 ps-2 pe-3 py-1 mt-1 rounded-3xl w-fit max-w-full items-center gap-x-1 text-sm text-primary-500 min-w-0">
                        <LocationOnRounded sx={{ fontSize: 18, flexShrink: 0 }} />
                        <span className="font-semibold truncate block capitalize" title={ticket.cinema}>
                            {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWW WWWWWW */}
                            {ticket.cinema}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 min-w-0">
                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            Screening Time
                        </p>
                        <div className="flex items-center gap-x-1">
                            <AccessTimeFilledRounded sx={{ fontSize: 16, flexShrink: 0 }} className="text-primary-500" />
                            <span className="text-sm font-bold text-secondary-800 whitespace-nowrap">
                                {formatDateTimeWithWords(new Date(ticket.screeningTime), { weekday: 'short', month: 'short' })}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            Details
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-x-1 min-w-0">
                                <TimerRounded sx={{ fontSize: 16, flexShrink: 0 }} className="text-primary-500" />
                                <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">{hours}h {minutes}m</span>
                            </div>
                            <span className="text-gray-300 flex-shrink-0">|</span>
                            <div className="flex items-center gap-x-1 min-w-0">
                                <ChairRounded sx={{ fontSize: 16, flexShrink: 0 }} className="text-primary-500" />
                                <span className="text-sm font-bold text-secondary-800 truncate">{ticket.seatSection}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-60 p-6 bg-gray-50 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100 flex-shrink-0">
                <div className="text-center mb-4 w-full">
                    <p className="text-xs text-gray-400 font-bold uppercase">Price per person</p>
                    <StyledTypography fontWeightInput='bold' title={`Rp ${(ticket.price).toLocaleString('id-ID')}`} sx={{ fontSize: "24px", color: "var(--color-secondary-900)" }} className="truncate block w-full">
                        Rp {ticket.price.toLocaleString('id-ID')}
                        {/* Rp 999.999.999.999 */}
                    </StyledTypography>
                    <p className={`text-[12px] font-bold mt-1 ${ticket.quota < 5 ? 'text-red-500' : 'text-primary-500'}`}>
                        {ticket.quota} seats remaining
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
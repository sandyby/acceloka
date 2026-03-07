"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ITrainTicket } from "@/types/card";
import { calculateArrivalTime, formatDateTimeWithWords, durationFormatter, capitalizeEachWord } from '@/lib/utils';
import { TrainRounded, KeyboardDoubleArrowRightSharp, EastRounded, LibraryBooksRounded, FlashOnRounded, AddShoppingCartRounded, CheckCircleRounded, LocalActivityRounded, AirlineSeatReclineNormalRounded } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import StyledTypography from '@/components/ui/StyledTypography';
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledTrainTicketCard({ ticket }: { ticket: ITrainTicket }) {
    const { triggerAddedToCartEffect } = useBookingsCart();
    const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);

    const handleAddToCart = () => {
        setIsTicketAddedToBookingsCart(true);
        triggerAddedToCartEffect();
        setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip h-full flex flex-col md:flex-row group">
            <div className="flex-2 p-5 min-w-0 overflow-hidden">
                <div className="flex items-center gap-3 mb-4 min-w-0">
                    <div className="p-2 bg-primary-500 rounded-lg text-white flex-shrink-0">
                        <TrainRounded fontSize="small" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex gap-x-2 items-center">
                            <Tooltip title="Train Type" arrow placement='top' slotProps={{
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
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tight flex-shrink-0">
                                    {ticket.trainType}
                                </p>
                            </Tooltip>

                            <Tooltip title={`Train Code: ${ticket.trainCode}`} arrow placement='top' slotProps={{
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
                                <div className="text-primary-500 text-[14px] font-semibold flex min-w-0">
                                    <span>(</span>
                                    <span className="truncate">
                                        {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWW WWWWWWW WW */}
                                        {ticket.trainCode}
                                    </span>
                                    <span>)</span>
                                </div>
                            </Tooltip>
                        </div>

                        <div className="w-full">
                            <StyledTypography
                                fontSizeInput={18}
                                fontWeightInput="bold"
                                className="text-secondary-900 truncate block w-full"
                            >
                                {/* WWWWWWWWWWWWWWW WWWWWWWWW WWWWWWWWWWWWWWWWWWWWW */}
                                {ticket.ticketName}
                            </StyledTypography>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 min-w-0">
                    <div className="text-center w-70 min-w-0">
                        <p className="text-[11px] text-accent-primary-900 uppercase font-bold">
                            Departure
                        </p>
                        <p title={ticket.departureStation} className="text-xl font-black text-secondary-900 line-clamp-2 leading-[1.2] max-h-[2.4em] break-all">
                            {/* WWWWWWWWWWWWWWWWW WWW WWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWW */}
                            {ticket.departureStation}
                        </p>
                        <p className="text-sm text-primary-500 font-medium mt-1">
                            {formatDateTimeWithWords(new Date(ticket.departureTime))}
                        </p>
                    </div>

                    <div className="flex flex-col items-center flex-shrink-0 px-2">
                        <p className="text-[12px] font-bold text-primary-500 uppercase">
                            {ticket.transitsCount > 0 ? `${ticket.transitsCount} ${ticket.transitsCount > 1 ? `Transits` : `Transit`}` : "Direct"}
                        </p>
                        <KeyboardDoubleArrowRightSharp className="text-primary-500" sx={{
                            fontSize: 48
                        }} />
                        <p className="text-[11px] text-accent-primary-900 font-semibold">
                            {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                        </p>
                    </div>

                    <div className="text-center w-70 min-w-0">
                        <p className="text-[11px] text-accent-primary-900 uppercase font-bold">
                            Arrival
                        </p>
                        <p title={ticket.arrivalStation} className="text-xl font-black text-secondary-900 line-clamp-2 leading-[1.2] max-h-[2.4em] break-all">
                            {ticket.arrivalStation}
                        </p>
                        <p className="text-sm text-primary-500 font-medium mt-1">
                            {calculateArrivalTime(ticket.departureTime, ticket.duration)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <Tooltip title="Seat Section" arrow placement='top' slotProps={{
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
                        <span className="text-xs font-bold text-secondary-700 bg-secondary-50 px-3 py-1 rounded-full border border-secondary-100 flex items-center gap-x-1">
                            <AirlineSeatReclineNormalRounded sx={{ fontSize: 16 }} />
                            {ticket.seatClass} Class
                        </span>
                    </Tooltip>
                    <div className="flex gap-2">
                        {ticket.amenities?.slice(0, 3).map((a, i) => (
                            <span key={i} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">{a}</span>
                        ))}
                    </div>
                    {ticket.amenities && ticket.amenities?.length > 3 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize" title={ticket.amenities.slice(3, ticket.amenities.length).map(capitalizeEachWord).join(", ").toString()}>
                        {ticket.amenities?.length - 3}+
                    </span>)}
                </div>
            </div>

            <div className="w--full md:flex-shrink-0 md:w-60 p-6 bg-gray-50 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100">
                <div className="text-center mb-4">
                    <p className="text-xs text-gray-400 font-bold uppercase">Price per pax</p>
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
        </div >
    );
}
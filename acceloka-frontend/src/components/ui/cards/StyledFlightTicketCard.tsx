"use client";

import StyledTypography from '@/components/ui/StyledTypography';
import useBookingsCart from '@/hooks/useBookingsCart';
import { calculateArrivalTime, capitalizeEachWord, durationFormatter, formatDateTimeWithWords } from '@/lib/utils';
import { IFlightTicket } from '@/types/card';
import { KeyboardDoubleArrowRightSharp, LuggageRounded, AddShoppingCartRounded, FlashOnRounded, CheckCircleRounded, MenuBook, LibraryBooksRounded, FlightClassRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function StyledFlightTicketCard({ ticket }: { ticket: IFlightTicket }) {
    const { hours, minutes, seconds } = durationFormatter(ticket.duration);
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
                <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-y-4 min-w-0">
                    <div className="flex justify-between items-start gap-x-4">
                        <div className="min-w-0 flex-1"> {/* // ? min-w-0 prevents text overflow from breaking flex */}
                            <StyledTypography fontWeightInput="bold" className="text-secondary-900 truncate w-full block" sx={{ fontSize: "22px" }} title={ticket.ticketName}>
                                {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWWWWWWWW */}
                                {ticket.ticketName}
                            </StyledTypography>
                            <div className="flex gap-x-3 mt-2 flex-nowrap items-center min-w-0">
                                <div className='rounded-full min-w-10 min-h-10 flex-shrink-0 bg-accent-quarternary-900'>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <StyledTypography fontSizeInput={16} className="text-secondary-900 truncate block" title={ticket.airline}>
                                        {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWW WWWWWW */}
                                        {ticket.airline}
                                    </StyledTypography>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Tooltip title="Seat Class" arrow placement='bottom' slotProps={{
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
                                <span className="bg-primary-50 text-primary-500 px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-x-1 whitespace-nowrap">
                                    <FlightClassRounded sx={{ fontSize: 16 }} className="text-primary-500" />
                                    {ticket.seatClass}
                                </span>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl gap-x-2 min-w-0">
                        <div className="text-center min-w-0 flex-1">
                            <p className="text-[11px] text-accent-primary-900 uppercase font-bold">
                                Departure
                            </p>
                            <p className="text-3xl mb-0.5 font-black truncate text-secondary-900 w-full" title={ticket.departureAirport}>
                                {ticket.departureAirport}
                            </p>
                            <p className="text-sm text-primary-500 font-medium whitespace-nowrap">
                                {formatDateTimeWithWords(new Date(ticket.departureTime), { weekday: "short", month: "short" })}
                            </p>
                        </div>

                        <div className="flex flex-col items-center flex-shrink-0 px-2">
                            <p className="text-[12px] font-bold text-primary-500 uppercase whitespace-nowrap">
                                {ticket.transitsCount > 0 ? `${ticket.transitsCount} ${ticket.transitsCount > 1 ? `Transits` : `Transit`}` : "Direct"}
                            </p>
                            <KeyboardDoubleArrowRightSharp className="text-primary-500" sx={{
                                fontSize: 48
                            }} />
                            <p className="text-[11px] text-accent-primary-900 font-semibold whitespace-nowrap">
                                {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
                            </p>
                        </div>

                        <div className="text-center min-w-0 flex-1">
                            <p className="text-[11px] text-accent-primary-900 uppercase font-bold">Arrival</p>
                            <p className="text-3xl  mb-0. font-black w-full truncate text-secondary-900" title={ticket.arrivalAirport}>
                                {ticket.arrivalAirport}</p>
                            <p className="text-sm text-primary-500 font-medium whitespace-nowrap">{calculateArrivalTime(ticket.departureTime, ticket.duration)}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Tooltip title="Max. Baggage" arrow placement='top' slotProps={{
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
                            <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-[11px] font-bold text-gray-700">
                                <LuggageRounded sx={{ fontSize: 14, mr: 0.5 }} />
                                {ticket.baggageKg}kg
                            </div>
                        </Tooltip>
                        {ticket.amenities?.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
                                {amenity}
                            </span>
                        ))}
                        {ticket.amenities && ticket.amenities?.length > 3 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize" title={ticket.amenities.slice(3, ticket.amenities.length).map(capitalizeEachWord).join(", ").toString()}>
                            {ticket.amenities?.length - 3}+
                        </span>)}
                    </div>
                </div>

                <div className="p-5 flex flex-col justify-center items-center bg-gray-50/50 gap-y-3">
                    <div className="text-center">
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
        </div >
    );
}
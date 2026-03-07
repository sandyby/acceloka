"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IConcertTicket } from "@/types/card";
import StyledTypography from "@/components/ui/StyledTypography";
import { capitalizeEachWord, durationFormatter, formatDateTimeWithWords } from "@/lib/utils";
import { MusicNoteRounded, LocationOnRounded, AddShoppingCartRounded, CheckCircleRounded, TimerRounded, LibraryBooksRounded, EventSeatRounded } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import useBookingsCart from '@/hooks/useBookingsCart';

export default function StyledConcertTicketCard({ ticket }: { ticket: IConcertTicket }) {
  const { triggerAddedToCartEffect } = useBookingsCart();
  const [isTicketAddedToBookingsCart, setIsTicketAddedToBookingsCart] = useState(false);
  const { hours, minutes } = durationFormatter(ticket.duration);

  const handleAddToCart = () => {
    setIsTicketAddedToBookingsCart(true);
    triggerAddedToCartEffect();
    setTimeout(() => setIsTicketAddedToBookingsCart(false), 2000);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-clip h-full flex flex-col md:flex-row">
      <div className="w-full md:w-48 bg-accent-quarternary-900 flex flex-col items-center justify-center p-4 relative flex-shrink-0">
        <MusicNoteRounded sx={{ fontSize: 48, color: 'rgba(var(--color-accent-secondary-900-rgb) / 0.4)' }} />
        <div className="absolute top-3 left-3 flex-shrink-0">
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
            <span className="bg-white-900 backdrop-blur-sm text-primary-500 px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-x-1 whitespace-nowrap">
              <EventSeatRounded sx={{ fontSize: 16 }} className="text-primary-500" />
              {ticket.seatSection}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-y-3 min-w-0">
        <div className='min-w-0'>
          <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900 truncate block w-full" title={ticket.ticketName}>
            {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWW WWWWWWWWWWWWWWWWW */}
            {ticket.ticketName}
          </StyledTypography>
          <StyledTypography fontSizeInput={18} className="text-secondary-900 truncate block w-full" title={ticket.artist}>
            {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWW WWWWWW */}
            {ticket.artist}
          </StyledTypography>
        </div>

        <div className="flex flex-col gap-y-1 text-gray-600 min-w-0">
          <div className="flex bg-primary-50 ps-2 pe-3 py-1 rounded-3xl w-fit max-w-full items-center gap-x-1 text-sm min-w-0">
            <LocationOnRounded sx={{ fontSize: 18, flexShrink: 0 }} className="text-primary-500" />
            <span className="font-semibold truncate block capitalize" title={ticket.venue}>
              {/* WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWW WWWWWW */}
              {ticket.venue}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium mt-1 whitespace-nowrap">
            {formatDateTimeWithWords(new Date(ticket.concertDate), { weekday: "long", month: "short" })}
            <span className="flex items-center  gap-x-1 text-primary-500 flex-shrink-0">
              <TimerRounded sx={{ fontSize: "18px" }} /> {hours}h {minutes}m</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {ticket.packages?.slice(0, 3).map((pkg, idx) => (
            <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize whitespace-nowrap">
              {pkg}
            </span>
          ))}
          {ticket.packages && ticket.packages?.length > 3 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize" title={ticket.packages.slice(3, ticket.packages.length).map(capitalizeEachWord).join(", ").toString()}>
            {ticket.packages?.length - 3}+
          </span>)}
        </div>
      </div>

      <div className="md:w-56 p-5 bg-gray-50 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100 flex-shrink-0">
        <div className="text-center mb-4 w-full">
          <p className="text-xs text-gray-400 font-bold uppercase">Price per pax</p>
          <StyledTypography fontWeightInput='bold' title={`Rp ${(ticket.price).toLocaleString('id-ID')}`} sx={{ fontSize: "24px", color: "var(--color-secondary-900)" }} className="truncate block w-full">
            Rp {ticket.price.toLocaleString('id-ID')}
            {/* Rp 999.999.999.999 */}
          </StyledTypography>
          <p className={`text-[12px] font-bold mt-1 whitespace-nowrap ${ticket.quota < 5 ? 'text-red-500' : 'text-primary-500'}`}>
            {ticket.quota} tickets remaining
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
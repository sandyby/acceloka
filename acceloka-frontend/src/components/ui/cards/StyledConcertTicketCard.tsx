"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IConcertTicket } from "@/types/card";
import StyledTypography from "@/components/ui/StyledTypography";
import { durationFormatter, formatDateTimeWithWords } from "@/lib/utils";
import { MusicNoteRounded, LocationOnRounded, ConfirmationNumberRounded, FlashOnRounded, AddShoppingCartRounded, CheckCircleRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
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
      <div className="md:w-48 bg-accent-tertiary-900 flex flex-col items-center justify-center p-4 text-accent-primary-900 relative">
        <MusicNoteRounded sx={{ fontSize: 40, opacity: 0.5 }} />
        <div className="mt-4 text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Section</p>
          <p className="text-lg font-black">{ticket.seatSection}</p>
        </div>
        {/* Decorative notches */}
        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
      </div>

      <div className="flex-1 p-5 flex flex-col gap-y-3">
        <div>
          <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900 leading-tight">
            {ticket.ticketName}
          </StyledTypography>
          <StyledTypography fontSizeInput={18} className="text-primary-600 font-medium">
            {ticket.artist}
          </StyledTypography>
        </div>

        <div className="flex flex-col gap-y-1 text-gray-600">
          <div className="flex items-center gap-2 text-sm">
            <LocationOnRounded sx={{ fontSize: 16 }} className="text-primary-400" />
            <span className="font-semibold">{ticket.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            {formatDateTimeWithWords(new Date(ticket.concertDate), { weekday: "long", month: "short" })}
            <span className="text-gray-300">|</span>
            <span>{hours}h {minutes}m</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {ticket.packages?.slice(0, 2).map((pkg, idx) => (
            <span key={idx} className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
              {pkg}
            </span>
          ))}
          {ticket.packages && ticket.packages?.length > 2 && (<span className="px-3 py-1 border border-gray-200 text-gray-500 text-[11px] rounded-full capitalize">
            {ticket.packages?.length - 2}+
          </span>)}
        </div>
      </div>

      <div className="md:w-56 p-5 bg-gray-50 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100">
        <div className="text-center mb-4">
          <StyledTypography fontWeightInput="bold" sx={{ fontSize: "26px" }} className="text-primary-600">
            Rp {ticket.price.toLocaleString('id-ID')}
          </StyledTypography>
          <p className="text-xs text-gray-500 font-medium">per pax</p>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Button fullWidth variant="contained" startIcon={<FlashOnRounded />} sx={{ bgcolor: 'var(--color-primary-500)', borderRadius: '12px', textTransform: 'none', fontWeight: 'bold' }}>
            Book Now
          </Button>
          <Button fullWidth onClick={handleAddToCart} variant={isTicketAddedToBookingsCart ? "contained" : "outlined"} sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 'bold', borderColor: 'var(--color-primary-500)', bgcolor: isTicketAddedToBookingsCart ? '#10b981' : 'transparent', color: isTicketAddedToBookingsCart ? 'white' : 'var(--color-primary-500)' }}>
            {isTicketAddedToBookingsCart ? <CheckCircleRounded /> : <AddShoppingCartRounded />}
          </Button>
        </div>
        <p className="text-[12px] text-red-500 font-bold mt-3 animate-pulse">Only {ticket.quota} tickets left!</p>
      </div>
    </div >
  );
}

// "use client";

// import { IConcertTicket } from "@/types/card";
// import StyledTypography from "@/components/ui/StyledTypography";
// import { durationFormatter, formatDateTimeWithWords } from "@/lib/utils";


// export default function StyledConcertTicketCard({ ticket }: { ticket: IConcertTicket }) {
//   const { hours, minutes, seconds } = durationFormatter(ticket.duration);

//   return (
//     <div className="relative bg-white rounded-2xl shadow-md h-max border overflow-clip border-gray-200 flex">
//       <div className="w-[200px] h-full bg-accent-tertiary-900">
//       </div>
//       <div className="grid grid-cols-[1fr_auto] w-full h-full py-2 px-3">
//         <div className="w-full col-span-2 flex flex-row justify-between">
//           <div className="">
//             <StyledTypography fontSizeInput={24} fontWeightInput="bold" className="text-secondary-900">
//               {ticket.ticketName}
//             </StyledTypography>
//             <StyledTypography fontSizeInput={18} className="text-primary-600 mt-1">
//               {ticket.artist}
//             </StyledTypography>
//           </div>
//           <div className="text-end">
//             <StyledTypography fontWeightInput="bold" fontSizeInput={28}
//               className="text-primary-600" sx={{ marginBottom: -1 }}>
//               Rp {ticket.price.toLocaleString('id-ID')}
//             </StyledTypography>
//             <StyledTypography fontSizeInput={18} className="text-gray-500">
//               /pax
//             </StyledTypography>
//           </div>
//         </div>
//         <div className="flex flex-row items-end justify-between items-start content-start">
//           <div className="flex flex-col justify-between h-full">
//             <div className="">
//               <div className="mb-2 flex flex-col gap-y-0.5">
//                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                   Section
//                 </StyledTypography>
//                 <div className="">
//                   <span className="inline-flex px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
//                     {ticket.seatSection}
//                   </span>
//                 </div>
//               </div>
//               <div className="mb-2 flex flex-col gap-y-0.5">
//                 <StyledTypography fontSizeInput={16} fontWeightInput="bold">
//                   Packages
//                 </StyledTypography>
//                 <div className="flex flex-wrap gap-2 capitalize">
//                   {ticket.packages?.map((amenity, idx) => (
//                     <span key={idx} className="px-3 py-1 border border-primary-500 text-primary-500 text-xs rounded-full">
//                       {amenity}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="mt-auto text-md text-accent-primary-900">
//               Ticket Quota: {ticket.quota}
//             </div>
//           </div>
//           <div className="text-end mt-auto">
//             <div className="flex flex-col gap-y-1.5">
//               <div className="text-sm text-secondary-900">
//                 <div className="">Venue</div>
//                 <div className="text-lg font-bold">
//                   {ticket.venue}
//                 </div>
//               </div>
//               <div className="text-sm text-secondary-900">
//                 <div className="">Concert Date</div>
//                 <div className="text-lg font-bold">
//                   {formatDateTimeWithWords(new Date(ticket.concertDate), { weekday: "long", month: "short" })}
//                 </div>
//               </div>
//               <div className="text-sm text-secondary-900">
//                 <div className="">Duration</div>
//                 <p className="text-primary-500 font-bold text-md">
//                   {`${hours}h ${seconds > 0 ? minutes + 1 : minutes}m`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// }
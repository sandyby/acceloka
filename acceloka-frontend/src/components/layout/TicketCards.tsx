"use client";

import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";
import { useTicketsData } from "@/contexts/TicketsDataContext";
import StyledTypography from "../ui/StyledTypography";
import StyledTicketCardsSkeleton from "../ui/skeletons/StyledTicketCardsSkeleton";

export default function TicketCards() {
    const { data, isFetching } = useTicketsData();

    if (!data) return null;

    return (
        <section className="flex flex-col gap-y-2">
            {data.availableTickets.length === 0 && (<div>
                <StyledTypography fontSizeInput={18} colorInput="accent" fontWeightInput="normal" sx={{ textTransform: "capitalize" }}>
                    No tickets are on sale right now!☹️
                </StyledTypography>
            </div>)}
            {data.availableTickets.length > 0 && (data.availableTickets.map((ticket) => (
                <StyledFlightTicketCard key={ticket.ticketCode} ticket={ticket} />
            )))}
        </section>
    );
}
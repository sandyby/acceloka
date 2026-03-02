"use client";

import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";
import { useTicketsData } from "@/contexts/TicketsDataContext";
import StyledTypography from "../ui/StyledTypography";
import StyledTicketCardsSkeleton from "../ui/skeletons/StyledTicketCardsSkeleton";
import { AvailableTicketTypes } from "@/types/card";

export default function TicketCards() {
    const { data, isFetching } = useTicketsData();

    if (isFetching) {
        return <StyledTicketCardsSkeleton totalCards={2} />
    }

    return (
        <section className="flex flex-col gap-y-3">
            {(!data || data.availableTickets.length === 0) && (<div>
                <StyledTypography fontSizeInput={18} colorInput="accent" fontWeightInput="normal" sx={{ textTransform: "capitalize" }}>
                    No tickets are on sale right now!☹️
                </StyledTypography>
            </div>)}
            {data && data.availableTickets.length > 0 && (data.availableTickets.map((ticket: AvailableTicketTypes) => (
                <StyledFlightTicketCard key={ticket.ticketCode} ticket={ticket} />
            )))}
        </section>
    );
}

// TODO: some day coba handle kalo user ke unexisting page (page melebihi total pages)
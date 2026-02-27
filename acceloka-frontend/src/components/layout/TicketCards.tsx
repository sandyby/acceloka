"use client";

import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";

export default function TicketCards() {
    return (
        <section className="flex flex-col gap-y-2">
            <StyledFlightTicketCard ticket="Jakarta - Singapore" />
            <StyledFlightTicketCard ticket="Jakarta - Batam" />
            <StyledFlightTicketCard ticket="Jakarta - Beijing" />
            <StyledFlightTicketCard ticket="Jakarta - Pontianak" />
            <StyledFlightTicketCard ticket="Jakarta - Singkawan" />
            <StyledFlightTicketCard ticket="Jakarta - Denpasar" />
            <StyledFlightTicketCard ticket="Bali - Singapore" />
            <StyledFlightTicketCard ticket="Dubai - Denpasar" />
            <StyledFlightTicketCard ticket="Surabaya - Makassar" />
        </section>
    )
}
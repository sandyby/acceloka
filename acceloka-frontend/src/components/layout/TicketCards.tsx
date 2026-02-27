"use client";

import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";
import { FlightTicketsQueryResponse } from "@/types/api";
import StyledTypography from "../ui/StyledTypography";

export default function TicketCards({ data }: { data: FlightTicketsQueryResponse | undefined }) {
    return (
        <section className="flex flex-col gap-y-2">
            {data !== undefined && data.totalTicketsCount > 0 && data.availableTickets.map((ticket) => (
                <StyledFlightTicketCard
                    key={ticket.ticketCode}
                    ticket={ticket}
                />
            ))}
            {(data === undefined || data?.totalTicketsCount <= 0 && (
                <div>
                    <StyledTypography fontSizeInput={18} colorInput="accent" fontWeightInput="normal" sx={{ textTransform: "capitalize" }}>
                        No tickets are on sale right now!☹️
                    </StyledTypography>
                </div>
            ))}
        </section>
    );
}
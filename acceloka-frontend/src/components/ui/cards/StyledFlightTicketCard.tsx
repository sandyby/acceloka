"use client";

import StyledTicketCardStructure from './StyledTicketCardStructure';
import StyledTypography from '@/components/ui/StyledTypography';
import { FlightTicket } from '@/types/api';

const StyledFlightTicketCard = ({ ticket }: { ticket: FlightTicket }) => {
    return (
        <StyledTicketCardStructure heightInput={164}>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket.ticketName}
            </StyledTypography>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket.ticketCategory}
            </StyledTypography>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket.quota}
            </StyledTypography>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket.price}
            </StyledTypography>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket.eventDate}
            </StyledTypography>
        </StyledTicketCardStructure>
    )
}

export default StyledFlightTicketCard;
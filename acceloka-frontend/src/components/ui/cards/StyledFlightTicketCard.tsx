"use client";
import StyledTicketCardStructure from './StyledTicketCardStructure';
import StyledTypography from '@/components/ui/StyledTypography';

const StyledFlightTicketCard = ({ ticket }: { ticket: string }) => {
    return (
        <StyledTicketCardStructure heightInput={242}>
            <StyledTypography sx={{ textTransform: "capitalize" }}>
                {ticket}
            </StyledTypography>
        </StyledTicketCardStructure>
    )
}

export default StyledFlightTicketCard;
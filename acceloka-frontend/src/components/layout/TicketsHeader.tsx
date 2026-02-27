"use client";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useContext } from "react";
import ActiveCategoryContext from "@/contexts/ActiveCategoryContext";
import StyledTypography from "@/components/ui/StyledTypography";

const TicketsHeader = () => {
    const { activeCategory } = useContext(ActiveCategoryContext);
    const headerTitle = activeCategory || "Available Tickets";

    return (
        <>
            <div className="gap-y-1.5">
                <StyledTypography fontSizeInput={48} colorInput="white" fontWeightInput="bold" sx={{ textTransform: "capitalize" }} >
                    {headerTitle}
                </StyledTypography>
                <div className="flex items-center gap-x-2.5 ps-1.25 py-2.5 pe-2.5">
                    <AirplaneTicketIcon width={24} color="primary" />
                    <StyledTypography fontSizeInput={20} colorInput="white" fontWeightInput="normal">
                        <span className="font-bold">12.398</span>{` tickets found`}
                    </StyledTypography>
                </div>
            </div >
        </>
    );
}

export default TicketsHeader
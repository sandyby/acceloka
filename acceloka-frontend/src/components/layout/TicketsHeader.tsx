"use client";

import { useContext } from "react";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import StyledTypography from "@/components/ui/StyledTypography";
import StyledTicketCountDisplay from "../ui/headers/StyledTicketCountDisplay";
import { getIconCategoryMapping } from "@/lib/utils";
import { useTicketsData } from "@/contexts/TicketsDataContext";

const TicketsHeader = () => {
    const { data } = useTicketsData();
    const { activeCategory } = useContext(ActiveCategoryContext);

    return (
        <>
            <div className="gap-y-1.5">
                <StyledTypography fontSizeInput={36} colorInput="white" fontWeightInput="bold" sx={{ textTransform: "capitalize" }} >
                    {activeCategory}
                </StyledTypography>
                <div className="flex items-center gap-x-2 pt-1.5 pb-2.5">
                    {getIconCategoryMapping(activeCategory, "36px", { color: "primary" })}
                    <StyledTicketCountDisplay count={data?.totalTicketsCount} />
                </div>
            </div >
        </>
    );
}

export default TicketsHeader
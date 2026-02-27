"use client";

import { useContext } from "react";
import ActiveCategoryContext from "@/contexts/ActiveCategoryContext";
import StyledTypography from "@/components/ui/StyledTypography";
import StyledTicketCountDisplay from "../ui/headers/StyledTicketCountDisplay";
import { useQuery } from "@tanstack/react-query";
import { fetchTicketsByCategory } from "@/lib/api";
import { getIconCategoryMapping } from "@/lib/utils";

const TicketsHeader = () => {
    const { activeCategory } = useContext(ActiveCategoryContext);

    const { data: totalTicketsCount, isFetching } = useQuery({
        queryKey: ["tickets", activeCategory],
        queryFn: () => fetchTicketsByCategory(activeCategory),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.totalTicketsCount,
    });

    const mappedIcon = getIconCategoryMapping(activeCategory, "36px",
        {
            color: "primary",
        });

    return (
        <>
            <div className="gap-y-1.5">
                <StyledTypography fontSizeInput={36} colorInput="white" fontWeightInput="bold" sx={{ textTransform: "capitalize" }} >
                    {activeCategory || "Available Tickets"}
                </StyledTypography>
                <div className="flex items-center gap-x-2 pt-1.5 pb-2.5">
                    {mappedIcon}
                    <StyledTicketCountDisplay count={totalTicketsCount} />
                </div>
            </div >
        </>
    );
}

export default TicketsHeader
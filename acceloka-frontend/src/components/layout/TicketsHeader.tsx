"use client";

import { useContext } from "react";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import StyledTypography from "@/components/ui/StyledTypography";
import StyledTicketCountDisplay from "@/components/ui/headers/StyledTicketCountDisplay";
import StyledSingleRowSkeleton from "@/components/ui/skeletons/StyledSingleRowSkeleton";
import StyledTicketHeaderSkeleton from "@/components/ui/skeletons/StyledTicketHeaderSkeleton";
import { iconCategoryMapper } from "@/lib/utils";
import useTicketsData from "@/hooks/useTicketsData";
import Sorts from "@/components/layout/Sorts";

const TicketsHeader = () => {
    const { data, isFetching, isError, validationError } = useTicketsData();
    const { activeCategory } = useContext(ActiveCategoryContext);

    return (
        <>
            {(!isError && !validationError && (isFetching || !data)) && (
                <StyledTicketHeaderSkeleton />
            )}
            {!isFetching && validationError && (
                <>
                    <StyledTypography fontSizeInput={36} fontWeightInput="bold" sx={{ color: 'var(--color-red-500)' }} >
                        Invalid Filter(s)
                    </StyledTypography>
                    <div className="flex gap-x-1.5 overflow-x-scroll">
                        <p className="grow-0 shrink-0 text-red-600 px-4 py-2 bg-white-900 rounded-3xl w-fit">
                            {validationError.issues[0]?.message || "Invalid filters are applied, please change them!"}
                        </p>
                    </div>
                </>
            )}
            {!isFetching && !isError && !validationError && data && (
                <div className="flex gap-x-4">
                    <div className="gap-y-1.5">
                        <StyledTypography fontSizeInput={36} colorInput="white" fontWeightInput="bold" sx={{ textTransform: "capitalize" }} >
                            {activeCategory}
                        </StyledTypography>
                        <div className="flex items-center gap-x-2 pt-1.5 pb-2.5">
                            {iconCategoryMapper(activeCategory, "36px", { color: "primary" })}
                            <StyledTicketCountDisplay count={data?.totalTicketsCount} />
                        </div>
                    </div>
                    {/* // TODO: add sortings di sini! */}
                    {/* <div>
                        <Sorts />
                    </div> */}
                </div>
            )}
        </>
    );
}

export default TicketsHeader
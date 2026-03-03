"use client";

import TicketsHeader from "./TicketsHeader";
import { Suspense, useContext } from "react";
import TicketCards from "./TicketCards";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import { useSearchParams } from "next/navigation";
import StyledTicketContentsSkeleton from "../ui/skeletons/StyledTicketContentsSkeleton";
import { TicketsDataProvider } from "@/contexts/TicketsDataContext";
import TicketsPagination from "./TicketsPagination";

export default function TicketContents() {
    const { activeCategory } = useContext(ActiveCategoryContext);
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;

    return (
        <Suspense fallback={<StyledTicketContentsSkeleton />}>
            <div id="header-wrapper" className="items-start w-full">
                <TicketsHeader />
            </div>
            <div id="cards" className="max-h-96 overflow-y-scroll no-scroll">
                <TicketCards />
            </div>

            <div id="pagination" className="">
                <TicketsPagination />
            </div>
        </Suspense >
    )
}

/*
{data !== undefined && data.totalTicketsCount > 0 && (<div
                    id="pagination"
                    className=""
                >
                    <StyledPagination
                        count={totalPageCount}
                        page={pageNumber}
                        onChange={handleOnPageChange}
                        shape="rounded"
                        size="medium"
                        color="primary"
                        disabled={isFetching || data.totalTicketsCount === 0}
                        sx={{
                            bgcolor: "var(--color-white-900)",
                            px: 1.5,
                            py: 1,
                        }}
                        renderItem={(item) => {

                            if (item.type === "previous") {
                                return (
                                    <>
                                        <PaginationItem
                                            {...item}
                                            type="first"
                                            aria-label="Go to first page"
                                            onClick={() => handleOnPageChange(null, 1)}
                                            slots={{ previous: KeyboardDoubleArrowLeftRounded }}
                                        />
                                        <PaginationItem {...item} />
                                    </>
                                );
                            }

                            if (item.type === "next") {
                                return (
                                    <>
                                        <PaginationItem {...item} />
                                        <PaginationItem
                                            {...item}
                                            type="last"
                                            aria-label="Go to last page"
                                            onClick={() => handleOnPageChange(null, totalPageCount)}
                                            slots={{ next: KeyboardDoubleArrowRightRounded }}
                                        />
                                    </>
                                );
                            }

                            return <PaginationItem {...item} />;
                        }}
                    />
                </div>)}

*/
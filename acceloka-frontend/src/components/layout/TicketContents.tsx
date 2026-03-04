"use client";

import TicketsHeader from "./TicketsHeader";
import { Suspense, useEffect } from "react";
import TicketCards from "./TicketCards";
import { useSearchParams } from "next/navigation";
import StyledTicketContentsSkeleton from "@/components/ui/skeletons/StyledTicketContentsSkeleton";
import TicketsPagination from "./TicketsPagination";

export default function TicketContents() {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        const cardsDiv = document.getElementById("cards");
        if (cardsDiv) {
            cardsDiv.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [page]);

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
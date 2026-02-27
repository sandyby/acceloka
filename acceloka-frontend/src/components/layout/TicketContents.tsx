"use client";

import TicketsHeader from "./TicketsHeader";
import { useContext } from "react";
import TicketCards from "./TicketCards";
import ActiveCategoryContext from "@/contexts/ActiveCategoryContext";
import { FlightTicketsQueryResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { fetchTicketsByCategory } from "@/lib/api";

export default function TicketContents() {
    const { activeCategory } = useContext(ActiveCategoryContext);

    const { data } = useQuery<FlightTicketsQueryResponse>({
        queryKey: ["tickets", activeCategory],
        queryFn: () => fetchTicketsByCategory(activeCategory),
        suspense: true,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <>
            <div id="header-wrapper" className="items-start w-full">
                <TicketsHeader />
            </div>
            <div id="cards" className="max-h-96 overflow-y-scroll no-scroll">
                <TicketCards data={data} />
            </div>
            {data !== undefined && data.totalTicketsCount > 0 && (<div
                id="pagination"
                className="mx-auto w-[404px] bg-emerald-100"
            >

            </div>)}
        </>
    )
}
import { fetchTicketsByCategory } from "@/lib/api";
import { FlightTicketsQueryResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext } from 'react';

interface TicketsDataContextType {
    data: FlightTicketsQueryResponse | undefined,
    isFetching: boolean,
    pageNumber: number,
}

const TicketsDataContext = createContext<TicketsDataContextType | null>(null);

export function TicketsDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page") ?? 1);
    const activeCategory = searchParams.get("category") ?? "all";

    const { data, isFetching } = useQuery({
        queryKey: ["tickets", { activeCategory, pageNumber }],
        queryFn: () => fetchTicketsByCategory(activeCategory, pageNumber),
        suspense: true,
        useErrorBoundary: true,
        staleTime: 1000 * 60 * 5
    });

    return (
        <TicketsDataContext.Provider value={{ data, isFetching, pageNumber }}>
            {children}
        </TicketsDataContext.Provider>
    )
}

export const useTicketsData = () => {
    const context = useContext(TicketsDataContext);
    if (!context) throw new Error("useTicketsData must be used inside the provider!");
    return context;
}
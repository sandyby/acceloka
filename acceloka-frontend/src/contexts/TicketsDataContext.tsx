import { fetchTicketsByCategory } from "@/lib/api";
import { GetAvailableTicketQueryResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext } from 'react';

interface TicketsDataContextType {
    data: GetAvailableTicketQueryResponse | undefined,
    isFetching: boolean,
}

const TicketsDataContext = createContext<TicketsDataContextType | null>(null);

export function TicketsDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pagesize") ?? 2);
    const activeCategory = searchParams.get("category") ?? "all";

    const { data, isFetching } = useQuery({
        queryKey: ["tickets", { activeCategory, pageNumber }],
        queryFn: () => fetchTicketsByCategory(activeCategory, pageNumber, pageSize),
        suspense: true,
        useErrorBoundary: true,
        staleTime: 1000 * 60 * 5
    });

    return (
        <TicketsDataContext.Provider value={{ data, isFetching }}>
            {children}
        </TicketsDataContext.Provider>
    )
}

export const useTicketsData = () => {
    const context = useContext(TicketsDataContext);
    if (!context) throw new Error("useTicketsData must be used inside the provider!");
    return context;
}
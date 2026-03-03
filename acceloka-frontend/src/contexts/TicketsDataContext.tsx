"use client";

import { fetchTicketsByCategory } from "@/lib/api";
import { GetAvailableTicketQueryResponse, TicketFilters } from "@/types/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface TicketsDataContextType {
    data: GetAvailableTicketQueryResponse | undefined,
    isFetching: boolean,
    isError: boolean,
    refetch: () => Promise<UseQueryResult<GetAvailableTicketQueryResponse, unknown>>;
}

const TicketsDataContext = createContext<TicketsDataContextType | null>(null);

export function TicketsDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pagesize") ?? 2);
    const activeCategory = searchParams.get("category") ?? "flights";

    // const maxPriceStr = searchParams.get("maxprice");
    // const departureStart = searchParams.get("departurestart");
    // const departureEnd = searchParams.get("departureend");
    // const airline = searchParams.get("airline");

    // const filters = useMemo<TicketFilters>(() => {
    //     const maxPriceStr = searchParams.get("maxprice");
    //     return {
    //         maxPrice: maxPriceStr ? Number(maxPriceStr) : undefined,
    //         departureStart: searchParams.get("departurestart") ?? undefined,
    //         departureEnd: searchParams.get("departureend") ?? undefined,
    //         airline: searchParams.get("airline") ?? undefined,
    //     };
    // }, [searchParams]);

    const filters = useMemo(() => ({
        maxPrice: searchParams.get("maxprice")
            ? Number(searchParams.get("maxprice"))
            : undefined,
        airline: searchParams.get("airline") ?? undefined,
        departureStart: searchParams.get("departurestart") ?? undefined,
        departureEnd: searchParams.get("departureend") ?? undefined,
    }), [searchParams]);

    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["tickets", activeCategory, pageNumber, pageSize, JSON.stringify(filters)],
        queryFn: () => fetchTicketsByCategory(activeCategory, pageNumber, pageSize, filters),
        suspense: false,
        useErrorBoundary: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        retryDelay: 1000,
    });

    return (
        <TicketsDataContext.Provider value={{ data, isFetching, isError, refetch }}>
            {children}
        </TicketsDataContext.Provider>
    )
}

export const useTicketsData = () => {
    const context = useContext(TicketsDataContext);
    if (!context) throw new Error("useTicketsData must be used inside the provider!");
    return context;
}
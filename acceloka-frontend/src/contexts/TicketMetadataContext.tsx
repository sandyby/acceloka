"use client";

import { fetchTicketMetadataByCategory } from "@/lib/api";
import { TicketMetadata } from '@/types/api';
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";

interface TicketMetadataContextType {
    data: TicketMetadata | undefined,
    isFetching: boolean,
    isError: boolean,
    refetch: () => Promise<UseQueryResult<TicketMetadata, unknown>>;
}

type TicketMetadataContextValue = Pick<UseQueryResult<TicketMetadata, unknown>, 'data' | 'isFetching' | 'isError' | 'error' | 'refetch'>;

export const TicketMetadataContext = createContext<TicketMetadataContextValue | null>(null);

export function TicketMetadataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category") ?? "flights";

    const queryResult = useQuery({
        queryKey: ["ticket-metadata", activeCategory],
        queryFn: () => fetchTicketMetadataByCategory(activeCategory),
        suspense: false,
        useErrorBoundary: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        retryDelay: 1000,
    });

    return (
        <TicketMetadataContext.Provider value={queryResult}>
            {children}
        </TicketMetadataContext.Provider>
    );
}
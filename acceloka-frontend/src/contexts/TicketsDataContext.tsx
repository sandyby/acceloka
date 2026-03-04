"use client";

import { fetchTicketsByCategory } from "@/lib/api";
import { GetAvailableTicketQueryResponse, TicketFilters } from "@/types/api";
import { FilterSharp } from "@mui/icons-material";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { FilterSchema, FilterType } from "@/lib/filters-schema";

interface TicketsDataContextType {
    data: GetAvailableTicketQueryResponse | undefined,
    isFetching: boolean,
    isError: boolean,
    refetch: () => Promise<UseQueryResult<GetAvailableTicketQueryResponse, unknown>>;
    validationError?: z.ZodError;
}

const TicketsDataContext = createContext<TicketsDataContextType | null>(null);

export function TicketsDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pagesize") ?? 2);
    const activeCategory = searchParams.get("category") ?? "flights";

    const { filters, validationError } = useMemo(() => {
        try {
            const rawFilters = {
                maxprice: searchParams.get("maxprice"),
                airline: searchParams.get("airline"),
                mindeparture: searchParams.get("mindeparture"),
                maxdeparture: searchParams.get("maxdeparture"),
            };
            const parsed = FilterSchema.parse(rawFilters);
            return { filters: parsed, validationError: undefined };
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.error("dbg filter validation error: ", err.issues);
                return { filters: undefined, validationError: err };
            }
            console.error("dbg unexpected/unhandled error: ", err);
            return { filters: undefined, validationError: undefined };
        }
    }, [searchParams]);

    console.log(
        `ticketsdatacontext dbg, activecategory: ${activeCategory}, filters: ${filters
            ? `${filters.airline}, ${filters.maxprice}, ${filters.mindeparture}, ${filters.maxdeparture}`
            : 'undefined (validation failed)'
        }`
    );

    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["tickets", activeCategory, pageNumber, pageSize, JSON.stringify(filters)],
        queryFn: () => {
            if (validationError) {
                throw new Error(`Invalid filters: ${validationError}`);
            }
            console.log("fetchticketsbycategory dbg: ", { activeCategory, pageNumber, pageSize, filters });
            return fetchTicketsByCategory(activeCategory, pageNumber, pageSize, filters as FilterType);
        }
        ,
        enabled: !validationError,
        onSuccess: () => console.log("fetchticketsbycategory success"),
        onError: (err) => console.error("fetchticketsbycategory error: ", err),
        suspense: false,
        useErrorBoundary: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        retryDelay: 1000,
    });

    return (
        <TicketsDataContext.Provider value={{ data, isFetching, isError, refetch, validationError }}>
            {children}
        </TicketsDataContext.Provider>
    )
}

export const useTicketsData = () => {
    const context = useContext(TicketsDataContext);
    if (!context) throw new Error("useTicketsData must be used inside the provider!");
    return context;
}
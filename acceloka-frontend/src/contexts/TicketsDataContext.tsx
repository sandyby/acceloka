"use client";

import { fetchTicketsByCategory } from "@/lib/api";
import { GetAvailableTicketQueryResponse } from "@/types/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { createContext, ReactNode, useMemo } from 'react';
import { FilterSchema, FilterType } from "@/lib/filters-schema";

interface TicketsDataContextType {
    data: GetAvailableTicketQueryResponse | undefined,
    isFetching: boolean,
    isError: boolean,
    refetch: () => Promise<UseQueryResult<GetAvailableTicketQueryResponse, unknown>>;
    validationError?: z.ZodError;
}

export const TicketsDataContext = createContext<TicketsDataContextType | null>(null);

export function TicketsDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pagesize") ?? 2);
    const activeCategory = searchParams.get("category") ?? "flights";

    const { filters, validationError } = useMemo(() => {
        try {
            const rawFilters = {
                maxprice: searchParams.get("maxprice"),
                maxoccupancy: searchParams.get("maxoccupancy"),
                baggagekg: searchParams.get("baggagekg"),
                airlines: searchParams.getAll("airlines"),
                seatclasses: searchParams.getAll("seatclasses"),
                seatsections: searchParams.getAll("seatsections"),
                hotelnames: searchParams.getAll("hotels"),
                venues: searchParams.getAll("venues"),
                cinemas: searchParams.getAll("cinemas"),
                types: searchParams.getAll("types"),
                amenities: searchParams.getAll("amenities"),
                packages: searchParams.getAll("packages"),
                mindeparture: searchParams.get("mindeparture"),
                maxdeparture: searchParams.get("maxdeparture"),
                minarrival: searchParams.get("minarrival"),
                maxarrival: searchParams.get("maxarrival"),
                mincheckin: searchParams.get("mincheckin"),
                maxcheckout: searchParams.get("maxcheckout"),
                minconcert: searchParams.get("minconcert"),
                maxconcert: searchParams.get("maxconcert"),
                minscreening: searchParams.get("minscreening"),
                maxscreening: searchParams.get("maxscreening"),
                maxduration: searchParams.get("maxduration"),
                direct: searchParams.get("direct"),
            };
            const parsed = FilterSchema.parse(rawFilters);
            return { filters: parsed, validationError: undefined };
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.log("dbg filter validation error: ", err.issues);
                return { filters: undefined, validationError: err };
            }
            console.error("dbg unexpected/unhandled error: ", err);
            return { filters: undefined, validationError: undefined };
        }
    }, [searchParams]);

    console.log(
        `ticketsdatacontext dbg, activecategory: ${activeCategory}, filters: ${filters
            ? `
            airlines: ${filters.airlines},
            seatclasses: ${filters.seatclasses},
            seatsections: ${filters.seatsections},
            hotelnames: ${filters.hotelnames},
            venues: ${filters.venues},
            cinemas: ${filters.cinemas},
            types: ${filters.types},
            amenities: ${filters.amenities},
            packages: ${filters.packages},
            maxprice: ${filters.maxprice},
            maxoccupancy: ${filters.maxoccupancy},
            mindeparture: ${filters.mindeparture},
            maxdeparture: ${filters.maxdeparture},
            minarrival: ${filters.minarrival},
            maxarrival: ${filters.maxarrival}
            mincheckin: ${filters.mincheckin},
            maxcheckout: ${filters.maxcheckout}
            minconcert: ${filters.minconcert},
            maxconcert: ${filters.maxconcert}
            minscreening: ${filters.minscreening}
            maxscreening: ${filters.maxscreening},
            maxduration: ${filters.maxduration},
            baggagekg: ${filters.baggagekg},
            direct: ${filters.direct},
            ` : 'undefined (validation failed)'
        } `
    );

    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["tickets", activeCategory, pageNumber, pageSize, JSON.stringify(filters)],
        queryFn: () => {
            if (validationError) {
                throw new Error(`Invalid filters: ${validationError} `);
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
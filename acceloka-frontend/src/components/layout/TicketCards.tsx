"use client";

import { useTicketsData } from "@/contexts/TicketsDataContext";
import StyledTypography from "@/components/ui/StyledTypography";
import StyledTicketCardsSkeleton from "@/components/ui/skeletons/StyledTicketCardsSkeleton";
import { AvailableTicketTypes } from "@/types/card";
import { ticketCardMapper } from "@/lib/utils";

export default function TicketCards() {
    const { data, isFetching, isError, refetch, validationError } = useTicketsData();

    return (
        <section className="flex flex-col gap-y-3 h-full">
            {isFetching && !data && <StyledTicketCardsSkeleton totalCards={3} />}
            {
                !isFetching && isError && (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
                        <StyledTypography fontSizeInput={20} sx={{ color: 'var(--color-red-500)' }} fontWeightInput="bold">
                            {`Oops! Something went wrong while fetching tickets`}
                        </StyledTypography>
                        <StyledTypography fontSizeInput={14} sx={{ marginBottom: 2, color: 'var(--color-accent-secondary-900)' }} className="mt-2 mb-6">
                            {"The server might be down or taking too long. Please try again later!"}
                        </StyledTypography>

                        <button
                            onClick={() => refetch()}
                            className="px-4 py-1.5 bg-primary-500 text-lg text-white rounded-lg hover:bg-primary-600 transition"
                        >
                            Reload Tickets
                        </button>

                        <p className="mt-4 text-sm text-accent-secondary-900">
                            or refresh the page if the problem continues
                        </p>
                    </div>
                )
            }
            {
                data && data.availableTickets.length > 0 && (data.availableTickets.map((ticket: AvailableTicketTypes, idx) => (
                    ticketCardMapper(ticket, idx)
                )))
            }
            {
                (!isFetching && !isError && !validationError && (!data || data.availableTickets.length === 0)) && (<div>
                    <StyledTypography fontSizeInput={18} colorInput="accent" fontWeightInput="normal" sx={{ textTransform: "capitalize" }}>
                        No tickets are on sale right now!☹️
                    </StyledTypography>
                </div>)
            }
        </section >
    );
}

// TODO: some day coba handle kalo user ke unexisting page (page melebihi total pages)
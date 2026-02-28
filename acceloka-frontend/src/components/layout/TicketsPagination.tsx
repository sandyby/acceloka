"use client";

import StyledPagination from "@/components/ui/StyledPagination";
import { useTicketsData } from "@/contexts/TicketsDataContext";
import { KeyboardDoubleArrowLeftRounded, KeyboardDoubleArrowRightRounded } from "@mui/icons-material";
import { PaginationItem } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function TicketsPagination() {
    const { data, pageNumber } = useTicketsData();
    const searchParams = useSearchParams();
    const router = useRouter();

    if (!data) return null;

    const totalPages = Math.ceil(data.totalTicketsCount / 2);

    if (totalPages < 1) return null;

    const changePage = (_: unknown, newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(newPage));
        router.replace(`?${newParams.toString()}`);
    };

    return (
        <StyledPagination
            count={totalPages}
            page={pageNumber}
            onChange={changePage}
            shape="rounded"
            size="medium"
            color="primary"
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
                                onClick={() => changePage(null, 1)}
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
                                onClick={() => changePage(null, totalPages)}
                                slots={{ next: KeyboardDoubleArrowRightRounded }}
                            />
                        </>
                    );
                }

                return <PaginationItem {...item} />;
            }}
        />
    );
}
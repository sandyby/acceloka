"use client";

import { Skeleton } from '@mui/material';

export default function StyledTicketCardsSkeleton({ totalCards = 2, height = "200px" }: { totalCards: number, height: number | string }) {
    const totalRows: number[] = Array.from({ length: totalCards });
    return (
        <section className="flex flex-col gap-y-2">
            {totalRows.map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rounded"
                    animation="wave"
                    height={height}
                    sx={{ borderRadius: 4, bgcolor: 'var(--color-white-900)' }}
                />
            ))}
        </section>
    );
}
"use client";

import { Skeleton } from '@mui/material';

export default function StyledTicketCardsSkeleton({ totalCards = 2 }: { totalCards: number}) {
    const totalRows: number[] = Array.from({ length: totalCards });
    return (
        <section className="flex flex-col gap-y-2">
            {totalRows.map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rounded"
                    animation="wave"
                    height={"160px"}
                    sx={{ borderRadius: 4, bgcolor: 'var(--color-secondary-800)' }}
                />
            ))}
        </section>
    );
}
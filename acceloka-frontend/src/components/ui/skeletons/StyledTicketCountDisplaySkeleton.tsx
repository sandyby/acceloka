"use client";

import { Skeleton } from '@mui/material';

export default function StyledTicketCountDisplaySkeleton({ height = "48px" }: { height: number | string }) {
    return (
        <section className="flex flex-col gap-y-2">
            <Skeleton
                variant="text"
                animation="wave"
                height={height}
                width={"40px"}
                sx={{ borderRadius: 2, bgcolor: 'var(--color-white-900)' }}
            />
        </section>
    );
}
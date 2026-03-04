"use client";

import { Skeleton } from '@mui/material';

export default function StyledTicketHeaderSkeleton() {
    return (
        <section className="flex flex-col gap-y-2">
            <Skeleton
                variant="rounded"
                animation="wave"
                width={"200px"}
                height={"56px"}
                sx={{ borderRadius: 4, bgcolor: 'var(--color-secondary-800)' }}
            />
            <Skeleton
                variant="rounded"
                animation="wave"
                width={"300px"}
                height={"48px"}
                sx={{ borderRadius: 4, bgcolor: 'var(--color-secondary-800)' }}
            />
        </section>
    );
}
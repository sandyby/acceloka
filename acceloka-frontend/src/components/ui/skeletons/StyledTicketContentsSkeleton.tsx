"use client";

import { Skeleton } from '@mui/material';

export default function StyledTicketContentsSkeleton() {
    return (
        <div className={`grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-y-2 h-full h-full`}>
            <Skeleton variant='rounded' animation="wave" sx={{ height: "54px", width: "150px", borderRadius: 2, bgcolor: 'var(--color-secondary-800)' }} />
            <Skeleton variant='rounded' animation="wave" sx={{ height: "52px", width: "200px", borderRadius: 2, bgcolor: 'var(--color-secondary-800)', marginBottom: 1.5 }} />
            <Skeleton
                variant="rounded"
                animation="wave"
                height={"160px"}
                sx={{ borderRadius: 4, bgcolor: 'var(--color-secondary-800)' }}
            />
            <Skeleton
                variant="rounded"
                animation="wave"
                height={"160px"}
                sx={{ borderRadius: 4, bgcolor: 'var(--color-secondary-800)' }}
            />
            <Skeleton
                variant="rounded"
                animation="wave"
                height={"40px"}
                width={"480px"}
                sx={{ borderRadius: 8, bgcolor: 'var(--color-secondary-800)', marginX: "auto", marginTop: 1.5 }}
            />
        </div>
    );
}
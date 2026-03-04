"use client";

import { Skeleton } from '@mui/material';

export default function StyledFiltersSkeleton() {
    return (
        <div className="rounded-3xl row-span-3 h-100 overflow-y-auto">
            <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height="100%"
                sx={{ borderRadius: "24px", bgcolor: 'var(--color-secondary-800)' }}
            />
        </div>
    );
}
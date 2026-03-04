"use client";

import { Skeleton } from '@mui/material';

export default function StyledSingleRowSkeleton({ height = "48px", width = "80px" }: { height?: number | string, width?: number | string }) {
    return (
        <Skeleton
            variant="text"
            animation="wave"
            height={height}
            width={width}
            sx={{ borderRadius: 1.25, bgcolor: 'var(--color-white-900)' }}
        />
    );
}
import React from 'react'
import StyledTypography from '../ui/StyledTypography'

export default function Sorts() {
    return (
        <div>
            <StyledTypography fontSizeInput={18} fontWeightInput="bold" sx={{ color: "var(--color-white-900)" }} >
                Sort By
            </StyledTypography>
        </div>
    )
}
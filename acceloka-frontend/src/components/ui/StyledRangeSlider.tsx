import { Slider, SliderValueLabelProps, Tooltip } from "@mui/material";
import { styled } from '@mui/system';

export function StyledSliderLabel(props: SliderValueLabelProps) {
    const { children, value } = props;
    return (
        <Tooltip enterTouchDelay={0} placement="bottom" title={value}>
            {children}
        </Tooltip>
    );
}

export const MaxPriceSlider = styled(Slider)({
    color: 'var(--color-primary-500)',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'var(--color-white-900)',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: 'var(--color-primary-500)',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});
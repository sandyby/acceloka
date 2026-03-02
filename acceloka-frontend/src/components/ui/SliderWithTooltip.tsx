"use client";

import React, { useState, useRef, useEffect } from "react";

interface SliderWithTooltipProps {
    min?: number;
    max?: number;
    step?: number;
    initialValue?: number;
    onChange?: (value: number) => void;
}

const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({
    min = 0,
    max = 100,
    step = 1,
    initialValue = 50,
    onChange,
}) => {
    const [value, setValue] = useState<number>(initialValue);
    const [tooltipPos, setTooltipPos] = useState<number>(0);
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            const percent = (value - min) / (max - min);
            const sliderWidth = slider.offsetWidth;
            setTooltipPos(percent * sliderWidth);
        }
    }, [value, min, max]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <div style={{ position: "relative", width: "300px", padding: "40px 0" }}>
            <div
                style={{
                    position: "absolute",
                    left: tooltipPos,
                    transform: "translateX(-50%)",
                    bottom: "30px",
                    background: "#333",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                }}
            >
                {value}
            </div>

            <input
                ref={sliderRef}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default SliderWithTooltip;
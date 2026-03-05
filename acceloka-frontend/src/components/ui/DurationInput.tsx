"use client";

import { Add, Remove } from "@mui/icons-material";
import StyledTypography from "./StyledTypography";

interface DurationInputProps {
    label: string;
    value: string | undefined;
    maxDuration?: string;
    onChange: (newValue: string) => void;
}

export default function DurationInput({ label, value, maxDuration = "99:59", onChange }: DurationInputProps) {
    const getParts = (val: string | undefined) => {
        if (!val || !val.includes(":")) return [0, 0];
        const parts = val.split(":").map(Number);
        return [isNaN(parts[0]) ? 0 : parts[0], isNaN(parts[1]) ? 0 : parts[1]];
    };

    // const [hours, minutes] = value ? value.split(":").map(Number) : [0, 0];
    // const [maxH, maxM] = maxDuration.split(":").map(Number);

    const [hours, minutes] = getParts(value)
    const [maxH, maxM] = getParts(maxDuration);

    const updateDuration = (h: number, m: number) => {
        let finalH = Math.min(Math.max(0, h), maxH);
        let finalM = Math.min(Math.max(0, m), 59);

        if (finalH === maxH && finalM > maxM) {
            finalM = maxM;
        }

        onChange(`${finalH.toString().padStart(2, "0")}:${finalM.toString().padStart(2, "0")}`);
    };

    const handleInputChange = (type: 'h' | 'm', rawVal: string) => {
        const num = parseInt(rawVal.replace(/\D/g, "")) || 0;
        if (type === 'h') updateDuration(num, minutes);
        else updateDuration(hours, num);
    };

    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className="flex justify-between items-end">
                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                    {label}
                </StyledTypography>
                <span className="text-[14px] text-white-900 bg-primary-500 py-1 px-3 rounded-full">
                    Max: {maxDuration.split(":")[0].toString()}h {maxDuration.split(":")[1].toString()}m
                </span>
            </div>

            <div className="flex items-center justify-around bg-white border border-accent-tertiary-900 pt-4 px-3 pb-3 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary-500 transition-all">

                <div className="flex flex-col items-center gap-y-1 max-w-100">
                    <button
                        type="button"
                        onClick={() => updateDuration(hours + 1, minutes)}
                        className="px-1.5 py-0.75 hover:bg-primary-500 hover:text-white-900 rounded-4xl bg-gray-100 text-primary-500 transition-colors"
                    >
                        <Add sx={{ fontSize: "18px" }} />
                    </button>

                    <input
                        type="text"
                        inputMode="numeric"
                        value={hours.toString().padStart(2, "0")}
                        onChange={(e) => handleInputChange('h', e.target.value)}
                        className="w-10 text-2xl text-center text-primary-500 font-bold focus:outline-none bg-transparent"
                    />

                    <button
                        type="button"
                        onClick={() => updateDuration(hours - 1, minutes)}
                        className="px-1.5 py-0.75 hover:bg-primary-500 hover:text-white-900 rounded-4xl bg-gray-100 text-primary-500 transition-colors"
                    >
                        <Remove sx={{ fontSize: "18px" }} />
                    </button>
                    <span className="text-[10px] font-black text-accent-primary-900 mt-1.5 text-center tracking-widest uppercase">Hours</span>
                </div>

                <span className="text-3xl font-bol text-accent-primary-900 mb-6">:</span>

                <div className="flex flex-col items-center gap-y-1">
                    <button
                        type="button"
                        onClick={() => updateDuration(hours, minutes + 5)}
                        className="px-1.5 py-0.75 hover:bg-primary-500 hover:text-white-900 rounded-4xl bg-gray-100 text-primary-500 transition-colors"
                    >
                        <Add sx={{ fontSize: "18px" }} />
                    </button>

                    <input
                        type="text"
                        inputMode="numeric"
                        value={minutes.toString().padStart(2, "0")}
                        onChange={(e) => handleInputChange('m', e.target.value)}
                        className="w-10 text-2xl text-center text-primary-500 font-bold focus:outline-none bg-transparent"
                    />

                    <button
                        type="button"
                        onClick={() => updateDuration(hours, minutes - 5)}
                        className="px-1.5 py-0.75 hover:bg-primary-500 hover:text-white-900 rounded-4xl bg-gray-100 text-primary-500 transition-colors"
                    >
                        <Remove sx={{ fontSize: "18px" }} />
                    </button>
                    <span className="text-[10px] font-black text-accent-primary-900 tracking-widest uppercase">Mins</span>
                </div>
            </div>
        </div>
    );
}
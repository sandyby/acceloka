"use client";

import StyledTypography from "./StyledTypography";

interface OptionItem {
    label: string,
    val: boolean | undefined
}

interface ButtonGroupProps {
    label: string;
    value: boolean | undefined; // true = Direct, false = Transits, undefined = Both
    onChange: (newValue: boolean | undefined) => void;
    options: [OptionItem, OptionItem, OptionItem]
}

export default function ButtonGroup({ label, value, onChange, options }: ButtonGroupProps) {
    const activeIndex = Math.max(0, options.findIndex((opt) => opt.val === value));

    return (
        <div className="flex flex-col gap-y-2 w-full">
            <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                {label}
            </StyledTypography>
            <div className="relative flex p-1 gap-x-1 bg-accent-tertiary-50 border border-accent-tertiary-900 rounded-4xl overflow-hidden">
                <div
                    className="absolute top-1 bottom-1 left-1 rounded-4xl bg-primary-500 shadow-sm transition-transform duration-300 ease-in-out"
                    style={{
                        width: "calc(33.33% - 2.66px)",
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                />
                {options.map((opt) => {
                    const isActive = value === opt.val;

                    return (
                        <button
                            key={opt.label}
                            type="button"
                            onClick={() => onChange(opt.val)}
                            className={`relative z-10 flex-1 py-1.5 text-sm font-semibold transition-colors duration-250 rounded-4xl ${isActive ? "text-white" : "text-primary-500 hover:bg-primary-50 hover:cursor-pointer"
                                }`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div >
    );
}
"use client";

import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import StyledTypography from "@/components/ui/StyledTypography";

interface MultiCheckboxGroupProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (newSelected: string[]) => void;
}

export default function MultiCheckboxGroup({
    label,
    options,
    selected,
    onChange,
}: MultiCheckboxGroupProps) {
    const handleToggle = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    return (
        <div className="mb-4">
            <StyledTypography fontSizeInput={16} fontWeightInput="bold" className="mb-2">
                {label}
            </StyledTypography>
            <FormGroup className="ms-3">
                {options.map(option => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                checked={selected.includes(option)}
                                onChange={() => handleToggle(option)}
                                size="small"
                            />
                        }
                        label={option}
                        sx={{ color: "var(--color-secondary-900)", textTransform: "capitalize" }}
                    />
                ))}
            </FormGroup>
        </div>
    );
}
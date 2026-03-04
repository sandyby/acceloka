"use client";

import { Autocomplete, Checkbox, Chip, Popper, TextField } from "@mui/material";
import StyledTypography from "@/components/ui/StyledTypography";
import { DeleteOutline, DeleteRounded } from "@mui/icons-material";

interface MultiSelectDropdownProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (newSelected: string[]) => void;
}

export default function MultiSelectDropdown({
    label,
    options,
    selected,
    onChange,
}: MultiSelectDropdownProps) {
    const handleSelectAll = () => onChange([...options]);
    const handleClearAll = () => onChange([]);

    return (
        <div className="mb-4 w-[95%] flex flex-col gap-y-2">
            <StyledTypography fontSizeInput={16} fontWeightInput="bold" className="mb-2 flex items-center justify-between">
                {label}
                <span className="flex gap-2">
                    <button
                        onClick={handleSelectAll}
                        className="text-primary-500 text-xs hover:underline cursor-pointer"
                    >
                        Select All
                    </button>
                    <button
                        onClick={handleClearAll}
                        className="text-primary-500 text-xs hover:underline cursor-pointer"
                    >
                        Clear All
                    </button>
                </span>
            </StyledTypography>

            <Autocomplete
                multiple
                options={options}
                value={selected}
                onChange={(_, newValue) => onChange(newValue)}
                renderInput={(params) => (
                    <div className="flex flex-col gap-1">
                        <TextField
                            {...params}
                            placeholder=""
                            variant="outlined"
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    backgroundColor: "var(--color-white-900)",
                                },
                            }}
                        />
                    </div>
                )}
                renderValue={(value, getFilteredTagProps) =>
                    value.map((option, index) => {
                        const { onDelete, key, ...filteredTagProps } = getFilteredTagProps({ index });

                        return (
                            <Chip
                                label={option}
                                deleteIcon={<DeleteRounded fontSize="small" />}
                                onDelete={onDelete}
                                key={key}
                                size="small"
                                sx={{
                                    fontSize: "12px",
                                    height: "24px",
                                    padding: "0 8px",
                                    margin: "4px 6px 4px 0",
                                    borderRadius: "12px",
                                    backgroundColor: "var(--color-primary-500)",
                                    color: "var(--color-white-900)",
                                    "& .MuiChip-label": {
                                        paddingRight: "8px",
                                        paddingLeft: "4px",
                                    },
                                    "& .MuiChip-deleteIcon": {
                                        marginRight: "0x",
                                        color: "var(--color-white-900)",
                                        "&:hover": {
                                            color: "var(--color-red-500)",
                                        },
                                    },
                                }}
                                {...filteredTagProps}
                            />
                        )
                    })
                }
                renderOption={(props, option) => {
                    // ! due to react 19, passing key directly as ...props isn't allowed, need to destructure
                    const { key, ...restOfTheProps } = props;

                    return (
                        <li key={key} {...restOfTheProps} className="hover:bg-primary-50 text-primary-500">
                            <Checkbox
                                checked={selected.includes(option)}
                                size="small"
                                sx={{ mr: 1 }}
                            />
                            {option}
                        </li>)
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            maxHeight: "200px",
                            bgcolor: 'var(--color-white-900)',
                            overflow: "auto",
                            "& .MuiAutocomplete-option": {
                                backgroundColor: "white",
                                color: "var(--color-primary-500)",
                                "&:hover": {
                                    backgroundColor: "var(--color-primary-50)",
                                },
                            },
                        },
                    }
                }}
                slots={{
                    popper: (props) => (
                        <Popper
                            {...props}
                            sx={{
                                "& .MuiPaper-root": {
                                    bgcolor: "var(--color-white-900)",
                                    border: "1px solid var(--color-accent-tertiary-900)",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                    mt: 1,
                                    overflow: "hidden",
                                },
                                "& .MuiAutocomplete-noOptions": {
                                    color: "var(--color-accent-primary-900)",
                                    padding: "16px",
                                    textAlign: "start",
                                    fontSize: "14px",
                                },
                            }}
                        />
                    ),
                }}
                sx={{
                    width: "100%",
                    "& .MuiAutocomplete-popupIndicator": {
                        color: "var(--color-primary-500)",
                    },
                    "& .MuiAutocomplete-tag": {
                        margin: "3px 2px 3px 0",
                    },
                }}
            />
        </div>
    );
}
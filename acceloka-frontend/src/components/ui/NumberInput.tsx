import { UIInputBaseProps } from "@/types/ui";
import StyledTypography from "./StyledTypography";

export default function NumberInput({ label, value, onChange, placeholder }: UIInputBaseProps) {
    return (
        <div className="flex flex-col gap-y-2">
            <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                {label}
            </StyledTypography>
            <input
                type="number"
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                className="border border-accent-tertiary-900 px-4 py-2 rounded-3xl w-full text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            />
        </div>
    );
}
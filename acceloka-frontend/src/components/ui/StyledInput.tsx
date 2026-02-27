import { UIStates } from "@/types/ui";
import { Input } from "@mui/material";
import { styled } from "@mui/system";
import { ReactNode } from "react";

const StyledInput = styled(Input, {
  shouldForwardProp: (prop) => prop !== "stateInput" && prop !== "iconInput",
})<{ stateInput?: UIStates; iconInput?: ReactNode }>(
  ({ stateInput = "default" }) => ({
    color:
      stateInput === "disabled"
        ? "var(--color-accent-quarternary)"
        : "var(--color-secondary-900)",
  }),
);

export default StyledInput;
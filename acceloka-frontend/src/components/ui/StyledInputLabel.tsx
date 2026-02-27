import { UIFontWeights, UIStates } from "@/types/ui";
import {InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputLabel = styled(InputLabel, {
  shouldForwardProp: (prop) =>
    prop !== "stateInput" && prop !== "fontWeightInput",
})<{ fontWeightInput?: UIFontWeights; stateInput?: UIStates }>(
  ({ fontWeightInput = "normal", stateInput = "default" }) => ({
    color:
      stateInput === "active"
        ? "var(--color-primary-500)"
        : "var(--color-secondary-900)",
    fontWeight: fontWeightInput === "bold" ? "bold" : "normal",
    fontSize: 18,
  }),
);

export default StyledInputLabel
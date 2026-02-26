"use client";

import { UIFontWeights, UIStates } from "@/types/ui";
import { FormGroup, Icon, IconProps, Input, InputAdornment, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { styled } from "@mui/system";
import { ReactNode } from "react";

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

const Filters = () => {
  return (
    <div className="">
      <FormGroup>
        <StyledInputLabel stateInput="active" fontWeightInput="normal">
          Event Date
        </StyledInputLabel>
        <StyledInput stateInput="default" startAdornment={
          <InputAdornment position="start">
            <CalendarMonthIcon/>
            </InputAdornment>
          } />
      </FormGroup>
    </div>
  );
};

export default Filters;

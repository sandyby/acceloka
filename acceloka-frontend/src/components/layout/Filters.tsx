"use client";

import { FormGroup, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StyledInput from "@/components/ui/StyledInput";
import StyledInputLabel from "@/components/ui/StyledInputLabel";

const Filters = () => {
  return (
    <div className="">
      <FormGroup>
        <StyledInputLabel stateInput="active" fontWeightInput="normal">
          Event Date
        </StyledInputLabel>
        <StyledInput stateInput="default" startAdornment={
          <InputAdornment position="start">
            <CalendarMonthIcon />
          </InputAdornment>
        } />
      </FormGroup>
    </div>
  );
};

export default Filters;

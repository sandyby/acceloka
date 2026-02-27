"use client";

import { Card } from "@mui/material";
import { styled } from "@mui/system";

const StyledTicketCardStructure = styled(Card, {
  shouldForwardProp: (prop) => prop !== "widthInput" && prop !== "heightInput"
})<{ widthInput?: number | "auto", heightInput?: number | "auto" }>(({ widthInput = "auto", heightInput = "auto" }) => ({
  padding: "20px",
  borderRadius: "16px",
  boxSizing: "border-box",
  border: "2px solid var(--color-primary-500)",
  backgroundColor: "var(--color-white-900)",
  display: "flex",
  flexDirection: "column",
  width: widthInput,
  height: heightInput
}));
export default StyledTicketCardStructure;
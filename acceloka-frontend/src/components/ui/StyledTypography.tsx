import { UIFontWeights, UITypographyColors, UITypographySizes } from "@/types/ui";
import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const StyledTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "fontWeightInput" && prop !== "colorInput" && prop !== "fontSizeInput"
})<{ fontSizeInput?: UITypographySizes, fontWeightInput?: UIFontWeights, colorInput?: UITypographyColors }>(({ fontSizeInput = 24, fontWeightInput = "normal", colorInput = "secondary" }) => ({
    color: colorInput === "primary" ? "var(--color-primary-500)" : colorInput === "secondary" ? "var(--color-secondary-900)" : "var([--color-white-900])",
    fontWeight: fontWeightInput === "bold" ? "bold" : "normal",
    fontSize: fontSizeInput
}));

export default StyledTypography;
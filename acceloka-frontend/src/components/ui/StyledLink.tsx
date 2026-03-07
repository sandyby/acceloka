import { styled } from "@mui/system";
import { Link } from "@mui/material";

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  position: "relative",
  padding: "8px 16px",
  cursor: active ? "default" : "pointer",
  textWrap: "nowrap",
  textDecoration: "none",
  borderRadius: "42px",
  color: active ? "var(--color-white-900)" : "var(--color-secondary-900)",
  zIndex: 1,
  fontSize: 18,
  ...(active
    ? {}
    : {
      ":hover": {
        backgroundColor: "var(--color-primary-500)",
        color: "var(--color-white-900)",
      },
    }),
}));

export default StyledLink;

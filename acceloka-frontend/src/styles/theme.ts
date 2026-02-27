"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { notoSans } from "@/fonts/font";

const accelokaTheme = createTheme({
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: notoSans.style.fontFamily,
          backgroundColor: "var(--color-secondary-900)",
          color: "var(--color-white-900)",
        },
        "*": {
          boxSizing: "border-box",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0091EE",
    },
    secondary: {
      main: "#011C2F",
    },
    background: {
      default: "#f2f2f7",
      paper: "#011C2F",
    },
    success: {
      main: "#045c1a",
    },
    error: {
      main: "#ec3a3e",
    },
  },
});

export default responsiveFontSizes(accelokaTheme);

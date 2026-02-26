import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import accelokaTheme from "@/styles/theme";
import { centuryGothic, notoSans } from "@/fonts/font";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Acceloka",
  description: "Your Plans, Accelerated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.className} ${centuryGothic.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={accelokaTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

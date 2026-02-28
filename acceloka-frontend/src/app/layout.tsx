import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import accelokaTheme from "@/styles/theme";
import { centuryGothic, notoSans } from "@/fonts/font";
import "@/styles/globals.css";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ActiveCategoryContextProvider from "@/contexts/ActiveCategoryContext";

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
      className={`${notoSans.className} ${centuryGothic.className} no-scroll`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={accelokaTheme}>
            <CssBaseline />
            <ReactQueryClientProvider>
              <ActiveCategoryContextProvider>
                {children}
              </ActiveCategoryContextProvider>
            </ReactQueryClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

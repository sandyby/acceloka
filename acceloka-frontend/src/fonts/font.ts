import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";

export const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const centuryGothic = localFont({
  src:"../fonts/CenturyGothic.ttf",
  variable: "--font-century-gothic"
})
import type { Metadata } from "next";
import './globals.css';

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

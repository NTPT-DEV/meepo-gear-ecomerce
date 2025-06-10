import type { Metadata } from "next";
import "./globals.css";
import {SessionProvider} from "next-auth/react";

export const metadata: Metadata = {
  title: "Meepo Gear",
  description: "Demo Fullstack Eccomerce Meepo Gear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className="mx-auto  min-h-screen" >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

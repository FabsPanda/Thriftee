import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/navigation/nav";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "THRIFTEE",
  description: "Thriftee-Desc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('px-6 md:px-12 max-w-7xl mx-auto', `${inter.className}`)}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}

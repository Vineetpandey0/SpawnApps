
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNavbar from "@/components/builder/GlobalNavbar";
import Footer from "@/components/builder/Footer";
import LenisScroll from "@/components/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Builder",
  description: "Generated Apps with just a prompt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GlobalNavbar />
      <body className="min-h-full flex flex-col">
        <LenisScroll />
        {children}
      </body>
      <Footer />
    </html>
  );
}

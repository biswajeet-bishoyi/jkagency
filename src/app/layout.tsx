import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "JK Agency | Engineering Excellence",
  description: "High-quality Audio-Visual systems, HVAC solutions, and integrated infrastructure for enterprises and public institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-blue-500/30`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

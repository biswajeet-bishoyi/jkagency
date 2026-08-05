import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "JK Agency | Engineering Excellence in AV, HVAC & Infrastructure",
  description: "Premier infrastructure integration partner. Delivering high-quality Audio-Visual systems, HVAC solutions, electrical engineering, and interior execution for enterprises and public institutions across India.",
  keywords: ["JK Agency", "Audio Visual", "HVAC", "System Integration", "Smart Classroom", "Video Wall", "India"],
  openGraph: {
    title: "JK Agency | Engineering Excellence",
    description: "Premier infrastructure integration partner for enterprises.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Agency",
    description: "Engineering Excellence in AV & HVAC",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

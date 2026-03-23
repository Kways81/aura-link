import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuraOverlay from "@/components/AuraOverlay";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aura Link - The Future of Wearable Technology",
  description: "Advanced neural interface technology seamlessly integrated into your daily life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <AuraOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
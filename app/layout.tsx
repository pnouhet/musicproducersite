import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import StickyPlayer from "@/components/audio/StickyPlayer";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Producer",
  description: "Best modern music samples in 2026",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}>
        <SidebarProvider>
          <Sidebar/>
          <Navbar/>
          <main className="min-h-screen md:pl-64 pt-16 transition-all duration-300">
            {children}
          </main>
          <StickyPlayer />
        </SidebarProvider>
      </body>
    </html>
  );
}

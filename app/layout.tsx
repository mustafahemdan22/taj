import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "Taj Scarf — Luxury Scarves & Accessories",
  description: "Explore the finest handcrafted luxury scarves, wraps, and accessories at Taj Scarf.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppProviders>
          <Navbar/>
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

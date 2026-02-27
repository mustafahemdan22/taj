import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProviders } from "@/providers/AppProviders";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Taj Scarf — Luxury Scarves & Handcrafted Accessories",
    template: "%s | Taj Scarf",
  },
  description: "Exquisite handcrafted scarves and luxury accessories. Discover the elegance of Taj Scarf's exclusive collections made from the world's finest fabrics.",
  keywords: ["luxury scarves", "handcrafted accessories", "silk scarves", "cashmere wraps", "premium fashion Egypt"],
  openGraph: {
    title: "Taj Scarf — Luxury Scarves & Accessories",
    description: "Explore the finest handcrafted luxury scarves at Taj Scarf.",
    url: "https://tajscarf.com",
    siteName: "Taj Scarf",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taj Scarf — Luxury Scarves & Accessories",
    description: "Exquisite handcrafted scarves and luxury accessories.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning={true} className="font-sans antialiased">
        <AppProviders>
          <Navbar/>
          <main>
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

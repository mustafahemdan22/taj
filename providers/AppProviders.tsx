"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageProvider";
import { ReviewProvider } from "@/contexts/ReviewProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { WishlistProvider } from "@/contexts/WishlistProvider";
import { OrderProvider } from "@/contexts/OrderProvider";
import { Toaster } from "sonner";
import { store } from "@/store";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  if (typeof window !== "undefined") {
    console.error("NEXT_PUBLIC_CONVEX_URL is not defined. Please check your environment variables.");
  }
}

const convex = new ConvexReactClient(
  convexUrl || "https://missing-url.convex.cloud"
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <Provider store={store}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <WishlistProvider>
                  <OrderProvider>
                    <ReviewProvider>
                      {children}
                      <Toaster position="top-center" />
                    </ReviewProvider>
                  </OrderProvider>
                </WishlistProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Provider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

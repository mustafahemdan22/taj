'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '@/types';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    const savedWishlist = window.localStorage.getItem("taj-wishlist");
    if (!savedWishlist) return [];
    try {
      return JSON.parse(savedWishlist);
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      window.localStorage.removeItem("taj-wishlist");
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("taj-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ استخدم useCallback للدوال
  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.find(item => item._id === product._id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  }, []);

  const clearWishlist = useCallback(( ) => {
    setWishlist([]);
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item._id === productId);
  }, [wishlist]); // ✅ يعتمد على wishlist

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item._id === product._id)) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  }, []); // ✅ مش محتاج dependencies لأن بيستخدم prev

  // ✅ دلوقتي كل الـ dependencies موجودة
  const value = useMemo<WishlistContextType>(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
  }), [wishlist, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist, toggleWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

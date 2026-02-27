"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../../components/ProductCard";
import { useLanguage } from "../../../contexts/LanguageProvider";
import { FiArrowLeft, FiFilter } from "react-icons/fi";
import Link from "next/link";
import { SortOption } from "@/types/index";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Product } from "@/types";
import { getCategoryName, getCategoryData } from "../../../utils/translations";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const { language, isRTL } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RATING);
  
  const categoryId = typeof params.category === 'string' ? params.category : '';

  // Convex queries
  const allProducts = useQuery(api.functions.products.getProducts);
  const productsByCategory = useQuery(
    api.functions.products.getProductsByCategory, 
    categoryId ? { category: categoryId } : ("skip" as const)
  );

  // ✅ FIXED: Memoize categoryProducts separately
  const categoryProducts = useMemo(() => {
    return productsByCategory || 
      (allProducts?.filter((p: Product) => p.category === categoryId) || []);
  }, [productsByCategory, allProducts, categoryId]);

  // ✅ FIXED: All hooks must be called before any early returns (Rules of Hooks)
  const categoryInfo = useMemo(() => {
    return {
      name: getCategoryName(categoryId, language),
      nameEn: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
      icon: ""
    };
  }, [categoryId, language]);

  const sortedProducts = useMemo(() => {
    const filtered = [...categoryProducts];

    switch (sortBy) {
      case SortOption.PRICE_LOW:
        filtered.sort((a: Product, b: Product) => (a.price || 0) - (b.price || 0));
        break;
      case SortOption.PRICE_HIGH:
        filtered.sort((a: Product, b: Product) => (b.price || 0) - (a.price || 0));
        break;
      case SortOption.RATING:
        filtered.sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0));
        break;
      case SortOption.NEWEST:
        filtered.sort((a: Product, b: Product) => (b._id ?? b.id ?? "").localeCompare(a._id ?? a.id ?? ""));
        break;
      default:
        break;
    }
    return filtered;
  }, [categoryProducts, sortBy]);

  const sortOptions = [
    { id: SortOption.RATING, labelAr: "الأعلى تقييماً", labelEn: "Top Rated", icon: "" },
    { id: SortOption.PRICE_LOW, labelAr: "الأقل سعراً", labelEn: "Price: Low to High", icon: "" },
    { id: SortOption.PRICE_HIGH, labelAr: "الأعلى سعراً", labelEn: "Price: High to Low", icon: "" },
    { id: SortOption.NEWEST, labelAr: "الأحدث", labelEn: "Newest", icon: "" },
  ];

  const categoryName = language === "ar" ? categoryInfo.name : categoryInfo.nameEn;

  // Loading state — must come AFTER all hooks
  if (allProducts === undefined || productsByCategory === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-64 mb-4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 animate-pulse shadow-lg">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categoryProducts.length === 0) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 py-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200/50 dark:border-gray-700/50"
        >
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors flex items-center gap-1 font-medium">
            {language === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors flex items-center gap-1 font-medium">
            {language === "ar" ? "المجموعات" : "Collections"}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-bold bg-gradient-to-r from-zinc-800 to-zinc-900 bg-clip-text">
            {categoryName}
          </span>
        </motion.nav>

        {/* Header */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="relative overflow-hidden p-8 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-full md:w-64 aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src={getCategoryData(categoryId).image}
                alt={categoryName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-zinc-800 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent mb-4 leading-tight">
                {categoryName}
              </h1>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }} 
                className="text-2xl text-gray-600 dark:text-gray-300 font-semibold"
              >
                {language === "ar" ? `${categoryProducts.length} منتجات متاحة` : `${categoryProducts.length} premium products available`}
              </motion.p>
            </div>
            <Link 
              href="/categories" 
              className="flex items-center px-6 py-4 bg-zinc-800 text-white rounded-2xl dark:bg-white dark:text-zinc-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-xl font-bold border border-zinc-700/50"
            >
              {isRTL ? (
                <>
                  {language === "ar" ? "جميع المجموعات" : "All Collections"}
                  <FiArrowLeft className="w-6 h-6 ml-2 transition-transform duration-300 rotate-180" />
                </>
              ) : (
                <>
                  <FiArrowLeft className="w-6 h-6 mr-2 transition-transform duration-300" />
                  {language === "ar" ? "جميع المجموعات" : "All Collections"}
                </>
              )}
            </Link>
          </div>

          {/* Sorting Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-wrap items-center gap-6 m-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-2xl"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FiFilter className="w-4 h-4" /> {language === "ar" ? "ترتيب حسب:" : "Sort by:"}
            </span>
            {sortOptions.map(option => (
              <motion.button 
                key={option.id} 
                onClick={() => setSortBy(option.id)} 
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  sortBy === option.id 
                    ? "bg-gradient-to-r from-zinc-600 to-zinc-700 text-white shadow-lg shadow-zinc-500/25 hover:shadow-xl" 
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md"
                }`} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <span>{option.icon}</span>
                <span>{language === "ar" ? option.labelAr : option.labelEn}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        {/* Products Grid */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 ${sortedProducts.length === 0 ? "min-h-[400px]" : ""}`}>
            {sortedProducts.map((product: Product, index: number) => (
              <motion.div 
                key={(product._id ?? product.id ?? index)} 
                initial={{ opacity: 0, y: 40, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.6, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

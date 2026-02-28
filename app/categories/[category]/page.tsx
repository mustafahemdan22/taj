"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "../../../components/ProductCard";
import { useLanguage } from "../../../contexts/LanguageProvider";
import { getCategoryName } from "@/convex/translations";
import Link from "next/link";
import { FiArrowLeft, FiFilter, FiSearch } from "react-icons/fi";
import { useState, useMemo } from "react";
import { Product } from "@/types";
import { getCategoryHeroImage } from "../../../utils/categoryConfig";
import Image from "next/image";

const CategoryDetailPage = () => {
  const params = useParams();
  const { language, isRTL } = useLanguage();
  const categoryId = typeof params.category === "string" ? params.category : "";

  const [searchQuery, setSearchQuery] = useState("");

  const products = useQuery(api.functions.products.getProductsByCategory, {
    category: categoryId,
  });

  const categoryName = useMemo(() => {
    return getCategoryName(categoryId, language);
  }, [categoryId, language]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase().trim();
    return products.filter((p: Product) =>
      p.name.toLowerCase().includes(query) ||
      (p.nameEn?.toLowerCase() || "").includes(query) ||
      (p.description?.toLowerCase() || "").includes(query) ||
      (p.descriptionEn?.toLowerCase() || "").includes(query)
    );
  }, [products, searchQuery]);

  if (products === undefined) {
    return (
      <div className="min-h-screen bg-[#D1D5DC] dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#D1D5DC] dark:bg-gray-900 py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl group"
        >
          <Image
            src={getCategoryHeroImage(categoryId)}
            alt={categoryName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className={`absolute bottom-0 ${isRTL ? "right-0" : "left-0"} p-8 md:p-12 w-full`}>
            <Link
              href="/categories"
              className="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors mb-4 group/link"
            >
              <FiArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"} group-hover/link:-translate-x-1 transition-transform`} />
              {language === "ar" ? "العودة للفئات" : "Back to Categories"}
            </Link>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <h1 className="text-4xl md:text-7xl font-black text-white capitalize drop-shadow-lg">
                {categoryName}
              </h1>
            </motion.div>
            
            <p className="text-white/80 mt-4 text-lg md:text-xl max-w-2xl font-light">
              {language === "ar"
                ? `اكتشف مجموعتنا المختارة من ${categoryName} الفاخرة`
                : `Explore our curated selection of premium ${categoryName} scarves`}
            </p>
          </div>
        </motion.div>

        {/* Search Bar & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="h-12 w-1 bg-zinc-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "المنتجات المتاحة" : "Available Products"}
            </h2>
          </div>
{/* 
          <div className="relative w-full md:w-96">
            <FiSearch className={`absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 ${isRTL ? "right-4" : "left-4"}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "ar" ? "ابحث عن منتج..." : "Search products..."}
              className={`w-full py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/10 focus:border-zinc-500 transition-all outline-none ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
            />
          </div> */}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: Product, index: number) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700"
          >
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiFilter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === "ar" ? "لم يتم العثور على منتجات" : "No products found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "ar"
                ? "حاول تغيير خيارات البحث الخاصة بك"
                : "Try adjusting your search criteria"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;

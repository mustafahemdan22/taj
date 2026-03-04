"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "../contexts/LanguageProvider";
import { getOptimizedCloudinaryUrl } from "@/utils/productImage";

type Category = {
  _id: string;
  slug: string;
  name: string;
  nameEn: string;
  heroImagePublicId: string;
};

const CategoryGrid = () => {
  const { language } = useLanguage();
  const categories = useQuery(api.functions.categories.listCategories, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
    >
      {(categories || []).map((category: Category) => {
        const name = language === "ar" ? category.name : category.nameEn;
        return (
          <motion.div
            key={category._id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500"
          >
            <Link href={`/categories/${category.slug}`}>
              <div className="absolute inset-0">
                <Image
                  src={getOptimizedCloudinaryUrl(category.heroImagePublicId, 1200)}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl md:text-2xl font-black text-white text-center transform group-hover:scale-105 transition-transform duration-300">
                    {name}
                  </h3>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="h-1 bg-white mt-2 rounded-full mx-auto max-w-[40px] origin-center transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CategoryGrid;

'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageProvider';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import FeaturesSection from '../components/FeaturesSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';


export default function Page() {
  const { language } = useLanguage();


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section */}
      <section className="py-16 bg-[#D1D5DC] dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'مجموعاتنا الحصرية' : 'Our Exclusive Collections'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اكتشف تشكيلتنا المتنوعة من الأوشحة الفاخرة'
                : 'Discover our curated range of luxury scarves'}
            </p>
          </motion.div>
          <CategoryGrid />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'ar' ? 'أناقة تستحق الاكتشاف' : 'Elegance Worth Discovering'}
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'انضم لعالم تاج سكارف واكتشف مجموعة حصرية من الأوشحة الفاخرة المصنوعة يدوياً'
                : 'Join the world of Taj Scarf and explore an exclusive collection of handcrafted luxury scarves'}
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center px-10 py-5 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-zinc-100 transition-all duration-300 shadow-xl hover:shadow-white/20 transform hover:-translate-y-1 text-lg"
            >
              <FiShoppingBag className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3" />
              {language === 'ar' ? 'استكشف المجموعة' : 'Explore the Collection'}
            </Link>
          </motion.div>
        </div>
         

      </section>
    </div>
  );
}


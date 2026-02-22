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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
      <section className="py-16 bg-gradient-to-r from-zinc-800 to-zinc-950">
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
              className="inline-flex items-center px-8 py-4 bg-white text-zinc-800 font-semibold rounded-lg hover:bg-zinc-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <FiShoppingBag className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              {language === 'ar' ? 'استكشف المجموعة' : 'Explore the Collection'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


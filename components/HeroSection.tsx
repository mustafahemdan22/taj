"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiShoppingBag, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageProvider";
import style from "./HeroSection.module.css";
import Image from "next/image";
import { useRef } from "react";
const HeroSection = () => {
  const { language, isRTL } = useLanguage();
  const ref = useRef(null);

  return (
    <section ref={ref} className={style.hero}>
      <div className={style.lear}>

      <div className={`${style.heroContent} relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`${isRTL ? "lg:order-2" : ""}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {language === "ar" ? (
                <>
                  مرحباً بك في <span className={style.span}>تاج سكارف</span>
                </>
              ) : (
                <>
                  Welcome to <span className={style.span}>Taj Scarf</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-zinc-300 leading-relaxed"
            >
              {language === "ar"
                ? "اكتشف مجموعتنا الحصرية من الأوشحة الفاخرة المصنوعة يدوياً من أرقى الأقمشة العالمية"
                : "Discover our exclusive collection of handcrafted luxury scarves made from the world's finest fabrics"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-zinc-800 font-semibold rounded-lg hover:bg-zinc-100 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
              >
                <FiShoppingBag className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === "ar" ? "تسوق الآن" : "Explore Collection"}
                {isRTL ? (
                  <FiArrowLeft className="w-5 h-5 ml-2" />
                ) : (
                  <FiArrowRight className="w-5 h-5 ml-2" />
                )}
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-zinc-800 transition-all duration-200"
              >
                {language === "ar" ? "قصتنا" : "Our Story"}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${isRTL ? "lg:order-1" : ""}`}
          >
            <div className="relative">
              <motion.div
                animate={{ y: [-1, 15, -1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 mx-auto  "
              >
                <div className="fixed inset-0 -z-20">
                 <h1>jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</h1>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;

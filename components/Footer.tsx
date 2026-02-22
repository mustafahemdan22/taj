"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiArrowUp,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageProvider";

import React from 'react';



const Footer = () => {
  const { language } = useLanguage();

  const quickLinks = [
    { href: "/", text: language === "ar" ? "الرئيسية" : "Home" },
    { href: "/about", text: language === "ar" ? "قصتنا" : "Our Story" },
    { href: "/blog", text: language === "ar" ? "المدونة" : "Journal" },
    { href: "/contact", text: language === "ar" ? "تواصل معنا" : "Contact" },
    { href: "/categories", text: language === "ar" ? "المجموعات" : "Collections" },
  ];

  const categories = [
    {
      href: "/categories/cashmere",
      text: language === "ar" ? "كشمير" : "Cashmere",
    },
    {
      href: "/categories/silk",
      text: language === "ar" ? "حرير" : "Silk",
    },
    {
      href: "/categories/wool",
      text: language === "ar" ? "صوف" : "Wool",
    },
    {
      href: "/categories/pashmina",
      text: language === "ar" ? "باشمينا" : "Pashmina",
    },
    {
      href: "/categories/designer",
      text: language === "ar" ? "تصميمات حصرية" : "Designer",
    },
    {
      href: "/categories/limited",
      text: language === "ar" ? "إصدار محدود" : "Limited Edition",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧣</span>
              </div>
              <span className="text-xl font-bold">
                {language === "ar" ? "تاج سكارف" : "Taj Scarf"}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {language === "ar"
                ? "وجهتك المثالية للأوشحة الفاخرة — تصاميم حصرية مصنوعة يدوياً من أرقى الأقمشة العالمية"
                : "Your destination for luxury scarves — exclusive handcrafted designs from the world's finest fabrics"}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "ar" ? "فيسبوك" : "Facebook"}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FiFacebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "ar" ? "واتساب" : "WhatsApp"}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaWhatsapp className="w-5 h-5 text-zinc-500" />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {language === "ar" ? "المجموعات" : "Collections"}
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {category.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {language === "ar" ? "تواصل معنا" : "Contact"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FiMapPin className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <span className="text-gray-400">
                  {language === "ar"
                    ? "القاهرة، مصر"
                    : "Cairo, Egypt"}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FiPhone className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <span className="text-gray-400">+20 100 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <FiMail className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <span className="text-gray-400">hello@tajscarf.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            {language === "ar"
              ? "© 2025 تاج سكارف. جميع الحقوق محفوظة."
              : "© 2025 Taj Scarf. All rights reserved."}
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 rtl:space-x-reverse text-zinc-500 hover:text-zinc-400 transition-colors duration-200"
          >
            <span>{language === "ar" ? "العودة للأعلى" : "Back to Top"}</span>
            <FiArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

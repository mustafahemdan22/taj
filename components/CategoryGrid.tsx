'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiCoffee, 
  FiStar, 
  FiPackage, 
  FiDroplet, 
  FiShoppingBag, 
} from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageProvider';

const CategoryGrid = () => {
  const { language, isRTL } = useLanguage();

  const categories = [
    {
      id: 'cashmere',
      name: language === 'ar' ? 'كشمير' : 'Cashmere',
      icon: FiStar,
      emoji: '🧣',
      href: '/categories/cashmere',
      color: 'from-zinc-600 to-zinc-800',
      description: language === 'ar' ? 'أوشحة كشمير فاخرة بنعومة استثنائية' : 'Luxurious cashmere scarves with exceptional softness'
    },
    {
      id: 'silk',
      name: language === 'ar' ? 'حرير' : 'Silk',
      icon: FiDroplet,
      emoji: '✨',
      href: '/categories/silk',
      color: 'from-gray-500 to-gray-700',
      description: language === 'ar' ? 'أوشحة حرير بلمسة أنيقة ومتألقة' : 'Elegant silk scarves with a radiant finish'
    },
    {
      id: 'wool',
      name: language === 'ar' ? 'صوف' : 'Wool',
      icon: FiPackage,
      emoji: '🐑',
      href: '/categories/wool',
      color: 'from-stone-500 to-stone-700',
      description: language === 'ar' ? 'أوشحة صوف دافئة للمواسم الباردة' : 'Warm wool scarves for the cold seasons'
    },
    {
      id: 'pashmina',
      name: language === 'ar' ? 'باشمينا' : 'Pashmina',
      icon: FiCoffee,
      emoji: '💎',
      href: '/categories/pashmina',
      color: 'from-neutral-500 to-neutral-700',
      description: language === 'ar' ? 'باشمينا أصلية بجودة لا مثيل لها' : 'Authentic pashmina of unmatched quality'
    },
    {
      id: 'designer',
      name: language === 'ar' ? 'تصميمات حصرية' : 'Designer',
      icon: FiShoppingBag,
      emoji: '🎨',
      href: '/categories/designer',
      color: 'from-zinc-700 to-zinc-900',
      description: language === 'ar' ? 'تصاميم محدودة من أبرز المصممين' : 'Limited designs from renowned artisans'
    },
    {
      id: 'seasonal',
      name: language === 'ar' ? 'مجموعة الموسم' : 'Seasonal',
      emoji: '🌿',
      href: '/categories/seasonal',
      color: 'from-gray-600 to-gray-800',
      description: language === 'ar' ? 'مجموعة مختارة لكل موسم' : 'Curated collection for every season'
    }
  ];

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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={category.href}>
            <div className="relative text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-6 ">
                {/* Icon with Emoji */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon ? (
                    <category.icon className="w-8 h-8 text-white" />
                  ) : (
                    <span className="text-3xl ">{category.emoji}</span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Arrow */}
                <div className={`flex items-center text-zinc-600 dark:text-zinc-400 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-300`}>
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'اكتشف المزيد' : 'Discover'}
                  </span>
                  {isRTL ? (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryGrid;

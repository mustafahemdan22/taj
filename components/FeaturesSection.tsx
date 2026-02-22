'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiClock, FiHeart } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageProvider';

const FeaturesSection = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: FiShield,
      title: language === 'ar' ? 'مواد فاخرة' : 'Premium Materials',
      description: language === 'ar' 
        ? 'أرقى أنواع الكشمير والحرير والصوف من مصادر عالمية موثوقة' 
        : 'The finest cashmere, silk, and wool sourced from trusted global origins'
    },
    {
      icon: FiHeart,
      title: language === 'ar' ? 'صناعة يدوية' : 'Artisan Craftsmanship',
      description: language === 'ar' 
        ? 'كل قطعة مصنوعة يدوياً بعناية فائقة من حرفيين مهرة' 
        : 'Each piece is meticulously handcrafted by skilled artisans'
    },
    {
      icon: FiTruck,
      title: language === 'ar' ? 'شحن عالمي' : 'Worldwide Delivery',
      description: language === 'ar' 
        ? 'توصيل مجاني لجميع الطلبات مع تغليف فاخر مميز' 
        : 'Complimentary shipping on all orders with luxury gift packaging'
    },
    {
      icon: FiClock,
      title: language === 'ar' ? 'خدمة شخصية' : 'Concierge Service',
      description: language === 'ar' 
        ? 'فريق متخصص لمساعدتك في اختيار القطعة المثالية' 
        : 'A dedicated team to help you select the perfect piece'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'لماذا تاج سكارف؟' : 'Why Taj Scarf?'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نلتزم بتقديم أرقى تجربة تسوق لعملائنا المميزين' 
              : 'We are devoted to delivering the finest experience for our distinguished clientele'
            }
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-zinc-700 dark:text-zinc-400 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

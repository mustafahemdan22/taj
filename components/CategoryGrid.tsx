import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageProvider';
import { getCategoryData } from '../utils/translations';
import Image from "next/image";

const CategoryGrid = () => {
  const { language, isRTL } = useLanguage();

  const categories = [
    { id: 'cashmere', name: language === 'ar' ? 'كشمير' : 'Cashmere' },
    { id: 'silk', name: language === 'ar' ? 'حرير' : 'Silk' },
    { id: 'wool', name: language === 'ar' ? 'صوف' : 'Wool' },
    { id: 'pashmina', name: language === 'ar' ? 'باشمينا' : 'Pashmina' },
    { id: 'cotton', name: language === 'ar' ? 'قطن' : 'Cotton' },
    { id: 'acrylic', name: language === 'ar' ? 'أكريليك' : 'Acrylic' }
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
    >
      {categories.map((category) => {
        const categoryData = getCategoryData(category.id);
        return (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500"
          >
            <Link href={`/categories/${category.id}`}>
              <div className="absolute inset-0">
                <Image
                  src={categoryData.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl md:text-2xl font-black text-white text-center transform group-hover:scale-105 transition-transform duration-300">
                    {category.name}
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

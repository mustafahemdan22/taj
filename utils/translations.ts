// d:/New folder/new/standard/utils/translations.ts

export const categoryTranslations: Record<string, { ar: string; en: string; image: string }> = {
    all: { ar: 'الكل', en: 'All Products', image: '/images/all.png' },
    cashmere: { ar: 'كشمير', en: 'Cashmere', image: '/images/cashmere.png' },
    silk: { ar: 'حرير', en: 'Silk', image: '/images/silk.png' },
    wool: { ar: 'صوف', en: 'Wool', image: '/images/wool.png' },
    pashmina: { ar: 'باشمينا', en: 'Pashmina', image: '/images/pashmina.png' },
    cotton: { ar: 'قطن', en: 'Cotton', image: '/images/cotton.png' },
    acrylic: { ar: 'أكريليك', en: 'Acrylic', image: '/images/voal_scarf_printed.jpg' },
    infinity: { ar: 'إنفينيتي', en: 'Infinity', image: '/images/smoky-hijab-scarf-1new.jpg' },
    chiffon: { ar: 'شيفون', en: 'Chiffon', image: '/images/green-scarf-chiffon-1.jpg' },
};

export const getCategoryData = (category: string) => {
    return categoryTranslations[category.toLowerCase()] || { ar: category, en: category, image: '/images/placeholder.jpg' };
};

export const getCategoryName = (category: string, language: 'ar' | 'en') => {
    const trans = categoryTranslations[category.toLowerCase()];
    if (trans) {
        return language === 'ar' ? trans.ar : trans.en;
    }
    // Fallback to capitalized category if no translation exists
    return category.charAt(0).toUpperCase() + category.slice(1);
};

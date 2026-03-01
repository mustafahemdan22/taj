// convex/translations.ts
import { categoryHeroImages } from "./constants";

const fallbackImage = "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772210680/taj-scarf/static/all.png";

export const categoryTranslations: Record<string, { ar: string; en: string; image: string }> = {
    all: { ar: 'الكل', en: 'All Products', image: fallbackImage },
    cashmere: { ar: 'كشمير', en: 'Cashmere', image: categoryHeroImages.cashmere || fallbackImage },
    silk: { ar: 'حرير', en: 'Silk', image: categoryHeroImages.silk || fallbackImage },
    wool: { ar: 'صوف', en: 'Wool', image: categoryHeroImages.wool || fallbackImage },
    pashmina: { ar: 'باشمينا', en: 'Pashmina', image: categoryHeroImages.pashmina || fallbackImage },
    cotton: { ar: 'قطن', en: 'Cotton', image: categoryHeroImages.cotton || fallbackImage },
    acrylic: { ar: 'أكريليك', en: 'Acrylic', image: categoryHeroImages.acrylic || fallbackImage },
    infinity: { ar: 'إنفينيتي', en: 'Infinity', image: categoryHeroImages.infinity || fallbackImage },
    chiffon: { ar: 'شيفون', en: 'Chiffon', image: categoryHeroImages.chiffon || fallbackImage },
};
export const getCategoryData = (category: string) => {
    const key = category.toLowerCase();
    const trans = categoryTranslations[key];
    return {
        ar: trans?.ar || category,
        en: trans?.en || category,
        image: trans?.image || fallbackImage,
    };
};

export const getCategoryName = (category: string, language: 'ar' | 'en') => {
    const trans = categoryTranslations[category.toLowerCase()];
    if (trans) {
        return language === 'ar' ? trans.ar : trans.en;
    }
    // Fallback to capitalized category if no translation exists
    return category.charAt(0).toUpperCase() + category.slice(1);
};

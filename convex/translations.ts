// convex/translations.ts
import { categoryHeroImages } from "./constants";


export const categoryTranslations: Record<string, { ar: string; en: string; image: string }> = {
    cashmere: { ar: 'كشمير', en: 'Cashmere', image: categoryHeroImages.cashmere || "taj-scarf/categories/all/header" },
    silk: { ar: 'حرير', en: 'Silk', image: categoryHeroImages.silk || "taj-scarf/categories/all/header" },
    wool: { ar: 'صوف', en: 'Wool', image: categoryHeroImages.wool || "taj-scarf/categories/all/header" },
    pashmina: { ar: 'باشمينا', en: 'Pashmina', image: categoryHeroImages.pashmina || "taj-scarf/categories/all/header" },
    cotton: { ar: 'قطن', en: 'Cotton', image: categoryHeroImages.cotton || "taj-scarf/categories/all/header" },
    acrylic: { ar: 'أكريليك', en: 'Acrylic', image: categoryHeroImages.acrylic || "taj-scarf/categories/all/header" },
    infinity: { ar: 'إنفينيتي', en: 'Infinity', image: categoryHeroImages.infinity || "taj-scarf/categories/all/header" },
    chiffon: { ar: 'شيفون', en: 'Chiffon', image: categoryHeroImages.chiffon || "taj-scarf/categories/all/header" },
    viscose: { ar: 'فيسكوز', en: 'Viscose', image: categoryHeroImages.viscose || "taj-scarf/categories/all/header" },
};
export const getCategoryData = (category: string) => {
    const key = category.toLowerCase();
    const trans = categoryTranslations[key];
    return {
        ar: trans?.ar || category,
        en: trans?.en || category,
        image: trans?.image || "taj-scarf/categories/all/header",
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

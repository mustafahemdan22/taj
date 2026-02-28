export const categoryHeroImages: Record<string, string> = {
    cashmere: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208885/taj-scarf/categories/ezgvlzh2rlkqxrvpxlxq.jpg",
    silk: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208899/taj-scarf/categories/dbafx44riu7rcuu3ypee.jpg",
    wool: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208908/taj-scarf/categories/btcwy2uagp5tdfunpg6y.jpg",
    pashmina: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208920/taj-scarf/categories/umsijpsfzbgunxi14sjm.jpg",
    cotton: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208933/taj-scarf/categories/hzfq5jbmcsvdnoai6jny.jpg",
    acrylic: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208943/taj-scarf/categories/ges5uvwoawzlfmbmhhey.jpg",
    infinity: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208946/taj-scarf/categories/e55j2rxeatqagtn0igri.jpg",
    chiffon: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772208958/taj-scarf/categories/fymrqlaat0m7ccaa7gqd.jpg",
};

// export const categoryEmojis: Record<string, string> = {
//     cashmere: "🧣",
//     silk: "✨",
//     wool: "🧶",
//     pashmina: "💎",
//     cotton: "☁️",
//     acrylic: "🌟",
//     infinity: "♾️",
//     chiffon: "🌬️",
// };

export const getCategoryHeroImage = (category: string): string => {
    return categoryHeroImages[category] || "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772210680/taj-scarf/static/all.png";
};

// export const getCategoryEmoji = (category: string): string => {
//     return categoryEmojis[category] || "🧣";
// };

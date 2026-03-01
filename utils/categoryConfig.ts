export const categoryHeroImages: Record<string, string> = {
    cashmere: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261039/taj-scarf/categories/cashmere/header.jpg",
    silk: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261045/taj-scarf/categories/silk/header.jpg",
    wool: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261076/taj-scarf/categories/wool/header.png",
    pashmina: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261085/taj-scarf/categories/pashmina/header.jpg",
    cotton: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772328764/taj-scarf/categories/cotton/header.png",
    acrylic: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261108/taj-scarf/categories/acrylic/header.jpg",
    infinity: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261115/taj-scarf/categories/infinity/header.jpg",
    chiffon: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261144/taj-scarf/categories/chiffon/header.jpg",
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

// Bump this version string when you update category hero images in Cloudinary
// (while keeping the same file name/public ID). This changes the URL and forces
// the browser/CDN to fetch the new image, avoiding unnecessary updates on every reload.
export const CATEGORY_IMAGE_VERSION = "2";

/**
 * Returns the correct Cloudinary image URL for a given category.
 * If the category ID does not exist, it returns a fallback image.
 * 
 * It automatically appends a version query parameter to ensure compatibility 
 * with Next.js <Image> caching and Cloudinary updates.
 */
export const getCategoryHeroImage = (category: string): string => {
    const rawUrl = categoryHeroImages[category] || "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772210680/taj-scarf/static/all.png";
    const url = new URL(rawUrl);
    url.searchParams.set("v", CATEGORY_IMAGE_VERSION);
    return url.toString();
};

// export const getCategoryEmoji = (category: string): string => {
//     return categoryEmojis[category] || "🧣";
// };

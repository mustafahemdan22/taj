import { mutation } from "../_generated/server";
import { categoryHeroImages } from "../constants";
import { getCategoryName } from "../translations";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) {
      return "Products already seeded.";
    }

    const categories = [
      "cashmere",
      "silk",
      "wool",
      "pashmina",
      "cotton",
      "acrylic",
      "infinity",
      "chiffon",
    ];

    const styles = ["Classic", "Modern", "Handcrafted", "Elegant", "Vintage", "Urban", "Royal", "Signature", "Bohemian", "Minimalist"];
    const patterns = ["Solid", "Geometric", "Floral", "Striped", "Embroidery", "Abstract", "Paisley", "Checkered"];
    const qualities = ["Premium", "Pure", "Artisan", "Luxury", "Soft Touch", "Fine", "Exquisite"];

    for (const category of categories) {
      for (let i = 1; i <= 20; i++) {
        const style = styles[i % styles.length];
        const pattern = patterns[(i + 2) % patterns.length];
        const quality = qualities[(i + 5) % qualities.length];

        const nameEn = `${quality} ${style} ${category.charAt(0).toUpperCase() + category.slice(1)} Scarf`;
        const nameAr = `${getCategoryName(category, "ar")} ${style} فاخر`;

        await ctx.db.insert("products", {
          name: nameAr,
          nameEn: nameEn,
          price: 150 + Math.floor(Math.random() * 350),
          image: `https://loremflickr.com/600/800/scarf,fashion?lock=${Math.floor(Math.random() * 1000)}`, // Varying high-quality placeholder
          images: [],
          category,
          description: `وشاح ${getCategoryName(category, "ar")} عالي الجودة بتصميم ${pattern} فريد. مثالي لجميع المناسبات ويوفر لمسة من الأناقة لمظهرك.`,
          descriptionEn: `This ${quality} ${category} scarf features a beautiful ${pattern} pattern. Hand-picked for its exceptional softness and durability, it's the perfect accessory to elevate your style.`,
          brand: "Taj Scarf",
          stock: 15 + Math.floor(Math.random() * 20),
          unit: "Piece",
          rating: 4 + (Math.random() > 0.5 ? 1 : 0),
          reviews: 5 + Math.floor(Math.random() * 45),
        });
      }
    }

    return "Seeding completed successfully.";
  },
});
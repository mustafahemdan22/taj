import { mutation } from "../_generated/server";

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

    // Map categories to existing images in public/images/
    const categoryImages: Record<string, string> = {
      cashmere: "/images/cashmere.png",
      silk: "/images/silk.png",
      wool: "/images/wool.png",
      pashmina: "/images/pashmina.png",
      cotton: "/images/cotton.png",
      acrylic: "/images/all.png",
      infinity: "/images/all.png",
      chiffon: "/images/all.png",
    };

    for (const category of categories) {
      for (let i = 1; i <= 20; i++) {
        await ctx.db.insert("products", {
          name: `${category} scarf ${i}`,
          nameEn: `${category} scarf ${i}`,
          price: 200 + i * 10,
          image: categoryImages[category] || "/images/all.png",
          category,
          description: `Premium ${category} scarf #${i}`,
          descriptionEn: `Premium ${category} scarf #${i}`,
          brand: "Taj Scarf",
          stock: 10 + i,
          unit: "Piece",
          rating: 4,
          reviews: Math.floor(Math.random() * 50),
        });
      }
    }

    return "Seeding completed successfully.";
  },
});
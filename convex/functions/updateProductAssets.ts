import { mutation } from "../_generated/server";

export const fixExistingImages = mutation({
  args: {},
  handler: async (ctx) => {
    const allProducts = await ctx.db.query("products").collect();
    let updatedCount = 0;

    const categoryGroups: Record<string, any[]> = {};

    for (const product of allProducts) {
      if (!categoryGroups[product.category]) {
        categoryGroups[product.category] = [];
      }
      categoryGroups[product.category].push(product);
    }

    for (const [category, products] of Object.entries(categoryGroups)) {

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const imageNum = (i % 5) + 1;

        const selectedId =
          `taj-scarf/categories/${category}/products/${imageNum}`;

        await ctx.db.patch(product._id, {
          images: [selectedId],
        });

        updatedCount++;
      }
    }

    return `Successfully reassigned ${updatedCount} products to their own category images.`;
  },
});
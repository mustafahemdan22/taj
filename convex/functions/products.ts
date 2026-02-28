import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { categoryHeroImages } from "../constants";

// إضافة منتج واحد
export const createProduct = mutation({
  args: {
    name: v.string(),
    nameEn: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    description: v.string(),
    descriptionEn: v.string(),
    brand: v.string(),
    stock: v.number(),
    unit: v.string(),
    rating: v.number(),
    reviews: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter(q => q.eq(q.field("category"), args.category))
      .collect();
  },
});

// Update product image(s) with Cloudinary URLs
export const updateProductImage = mutation({
  args: {
    productId: v.id("products"),
    image: v.string(),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const updateData: any = { image: args.image };
    if (args.images) {
      updateData.images = args.images;
    }
    await ctx.db.patch(args.productId, updateData);
    return { success: true };
  },
});

// One-time fix: ensure all products have clear image fields if they only had category placeholders
export const fixAllProductImages = mutation({
  args: {},
  handler: async (ctx) => {
    const allProducts = await ctx.db.query("products").collect();
    let updated = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];

      // If image is a path to category images or common local placeholders, clear it
      if (product.image.includes('/categories/') || product.image.includes('/images/all.png')) {
        await ctx.db.patch(product._id, {
          image: "", // Use empty string to trigger frontend placeholder
          images: []
        });
        updated++;
      }
    }

    return `Fixed ${updated} products by removing category-specific placeholders from their image fields.`;
  },
});

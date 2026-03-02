import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Add a single product
export const createProduct = mutation({
  args: {
    name: v.string(),
    nameEn: v.string(),
    price: v.number(),
    images: v.array(v.string()),
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

export const getProductById = query({
  args: { productId: v.string() },
  handler: async ({ db }, args) => {
    if (!args.productId) return null;
    try {
      const id = db.normalizeId("products", args.productId);
      if (!id) return null;
      return await db.get(id);
    } catch {
      return null;
    }
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

// Update product image(s) with Cloudinary IDs
export const updateProductImage = mutation({
  args: {
    productId: v.id("products"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, {
      images: args.images
    });
    return { success: true };
  },
});

/**
 * Migration: Normalize all products to use ONLY the images array.
 * Cleans up legacy 'image' field and ensures public IDs include correct paths.
 */
export const migrateToStrictCloudinary = mutation({
  args: {},
  handler: async (ctx) => {
    const allProducts = await ctx.db.query("products").collect();
    let updated = 0;

    for (const product of allProducts) {
      const legacyImage = (product as any).image;
      let finalImages = product.images || [];

      // If we have a legacy image not in the array, add it to the front
      if (legacyImage && !finalImages.includes(legacyImage)) {
        finalImages = [legacyImage, ...finalImages];
      }

      // Filter out empty or placeholder strings
      finalImages = finalImages.filter(img =>
        img &&
        !img.includes('coming-soon')
      );

      // Normalize paths: ensure public_id includes the correct category folder
      // e.g., if it's just "1", convert to "taj-scarf/categories/[category]/products/1"
      finalImages = finalImages.map(img => {
        if (img.startsWith('http') || img.includes('/')) return img;
        // It's a flat ID, prepend the standard path
        return `taj-scarf/categories/${product.category}/products/${img}`;
      });

      // Remove duplicates
      finalImages = [...new Set(finalImages)];

      // Always update to ensure 'image' field is removed by patch (schema update will handle the rest)
      const patchData: any = { images: finalImages };
      // We set legacy image to undefined if it exists just to be safe during the transition
      if (legacyImage !== undefined) {
        patchData.image = undefined;
      }

      await ctx.db.patch(product._id, patchData);
      updated++;
    }

    return `Successfully migrated ${updated} products to strict Cloudinary architecture.`;
  },
});

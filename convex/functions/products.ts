import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

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

// One-time fix: update all product images to use real files from /public/images/categories/
export const fixAllProductImages = mutation({
  args: {},
  handler: async (ctx) => {
    // Pool of real images in /public/images/categories/
    const imagePool = [
      "/images/categories/OIP.jpeg",
      "/images/categories/OIP (1).jpeg",
      "/images/categories/OIP (2).jpeg",
      "/images/categories/OIP (3).jpeg",
      "/images/categories/OIP (4).jpeg",
      "/images/categories/OIP (5).jpeg",
      "/images/categories/OIP (6).jpeg",
      "/images/categories/OIP (7).jpeg",
      "/images/categories/OIP (8).jpeg",
      "/images/categories/OIP (9).jpeg",
      "/images/categories/OIP (10).jpeg",
      "/images/categories/OIP (11).jpeg",
      "/images/categories/OIP (12).jpeg",
      "/images/categories/OIP (13).jpeg",
      "/images/categories/OIP (14).jpeg",
      "/images/categories/Black-Crepe-Shayla-Hijab-600x600.jpg",
      "/images/categories/bb8ec105-367f-487a-adab-8b4dd1a63522.jpg",
      "/images/categories/ce40cb388feff703e5edbb8d92c7b89e.jpg",
      "/images/categories/buanajayaa98-islam-7445970_1920.jpg",
      "/images/categories/90388d56edd9a77ed91bf5fd6dcfae89.jpg",
      "/images/categories/smoky-hijab-scarf-1new.jpg",
      "/images/categories/voal_scarf_printed.jpg",
      "/images/categories/green-scarf-chiffon-1.jpg",
      "/images/categories/cotton.jpg",
      "/images/categories/hero.jpg",
    ];

    // Category-specific hero images
    const categoryHero: Record<string, string> = {
      cashmere: "/images/categories/cashmere.png",
      silk: "/images/categories/silk.png",
      wool: "/images/categories/wool.png",
      pashmina: "/images/categories/pashmina.png",
      cotton: "/images/categories/cotton.png",
      acrylic: "/images/categories/voal_scarf_printed.jpg",
      infinity: "/images/categories/smoky-hijab-scarf-1new.jpg",
      chiffon: "/images/categories/green-scarf-chiffon-1.jpg",
    };

    const allProducts = await ctx.db.query("products").collect();
    let updated = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      // Pick an image: cycle through the pool
      const img = imagePool[i % imagePool.length];
      await ctx.db.patch(product._id, { image: img });
      updated++;
    }

    return `Updated ${updated} products with real image paths.`;
  },
});


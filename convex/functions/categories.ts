import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    // Prefer stable ordering if sortOrder exists; otherwise return as stored.
    const all = await ctx.db.query("categories").collect();
    return all.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },
});

export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    if (!slug) return null;
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const createCategory = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    nameEn: v.string(),
    heroImagePublicId: v.string(),
    description: v.optional(v.string()),
    descriptionEn: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    if (!slug) throw new Error("slug is required");

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) throw new Error(`Category "${slug}" already exists`);

    return await ctx.db.insert("categories", { ...args, slug });
  },
});

export const deleteCategoryBySlug = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase();
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!existing) return { deleted: false };

    await ctx.db.delete(existing._id);
    return { deleted: true };
  },
});


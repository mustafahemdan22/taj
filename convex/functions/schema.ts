import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    password: v.string(),
  }).index("by_email", ["email"]),  // Array here, not string

  images: defineTable({
    storageId: v.string(),
    title: v.string(),
    uploadedBy: v.string(),
  }).index("by_uploadedBy", ["uploadedBy"]),

  // ✅ أضف ده
  products: defineTable({
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
    images: v.optional(v.array(v.string())),
  }).index("by_category", ["category"]),
});
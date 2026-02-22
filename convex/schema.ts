import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        password: v.string(),
    }).index("by_email", ["email"]),
    images: defineTable({
        storageId: v.string(),
        title: v.string(),
        uploadedBy: v.string(),
    }).index("by_uploadedBy", ["uploadedBy"]),
});

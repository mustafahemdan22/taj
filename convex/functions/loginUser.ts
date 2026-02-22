import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const loginUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async ({ db }, args) => {
    const existing = await db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existing || existing.password !== args.password) {
      return { success: false, message: "Invalid credentials" };
    }

    return {
      success: true,
      userId: existing._id,
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
    };
  },
});

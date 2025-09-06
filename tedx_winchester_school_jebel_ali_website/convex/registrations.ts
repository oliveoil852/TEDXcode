import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    school: v.optional(v.string()),
    grade: v.optional(v.string()),
    dietaryRequirements: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already registered
    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existing) {
      throw new Error("This email is already registered for the event.");
    }
    
    return await ctx.db.insert("registrations", {
      ...args,
      registeredAt: Date.now(),
    });
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    const registrations = await ctx.db.query("registrations").collect();
    return registrations.length;
  },
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const speakers = await ctx.db
      .query("speakers")
      .withIndex("by_order")
      .collect();
    
    return Promise.all(
      speakers.map(async (speaker) => ({
        ...speaker,
        imageUrl: speaker.imageId ? await ctx.storage.getUrl(speaker.imageId) : null,
      }))
    );
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    talkTitle: v.string(),
    talkDescription: v.string(),
    order: v.number(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("speakers", args);
  },
});

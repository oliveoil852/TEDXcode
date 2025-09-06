import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  speakers: defineTable({
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    imageId: v.optional(v.id("_storage")),
    talkTitle: v.string(),
    talkDescription: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),
  
  registrations: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    school: v.optional(v.string()),
    grade: v.optional(v.string()),
    dietaryRequirements: v.optional(v.string()),
    registeredAt: v.number(),
  }).index("by_email", ["email"]),
  
  eventInfo: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  ...authTables,

  notes: defineTable({
    title: v.string(),
    content: v.string(),


    userId: v.id("users"),

    createdAt: v.number(),
  })
  .index("byUser", ["userId"]),
});
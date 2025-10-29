import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// creating notes 
export const createNote = mutation({
    args: {
        title: v.string(),
        content: v.string(),
    },

    handler: async (ctx, args) => {
        // get auth 
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }

        const noteId = await ctx.db.insert("notes", {
            title: args.title,
            content: args.content,
            userId,
            createdAt: Date.now(),
        })

        return noteId;
    }
})

export const getNotesByUser = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if(!userId) return [];

        return await ctx.db
                        .query("notes")
                        .withIndex("byUser", (q) => q.eq("userId", userId))
                        .order("desc")
                        .collect();
    }
})

export const getNoteById = query({
    args: {
        id: v.id("notes") },
        handler: async (ctx, args) => {
            return await ctx.db.get(args.id);
        }
    }
);

export const deleteNoteById = mutation({
    args: { id: v.id("notes")},
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

export const deleteAllNotes = mutation({
   
    handler: async(ctx) => {
        const userId = await getAuthUserId(ctx);
        if(!userId) {
            throw new Error("Not authenticated");
        }

        // query all notes by user
        const userNotes = await ctx.db
            .query("notes") 
            .withIndex("byUser", (q) => q.eq("userId", userId))
            .collect();

        for(const note of userNotes){
            await ctx.db.delete(note._id);
        }

        return {deleteCount: userNotes.length};
    }
})
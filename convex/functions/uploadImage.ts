import { action, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { api, internal } from "../_generated/api";

/**
 * Uploads multiple images to Convex storage and associates them with a product.
 * This is an action because storage.store is only available in actions.
 */
export const uploadProductImages = action({
    args: {
        productId: v.id("products"),
        images: v.array(v.bytes()),
    },
    handler: async (ctx, args) => {
        const imageUrls: string[] = [];

        // Store each image in Convex storage and get its URL
        for (const imageData of args.images) {
            // storage.store expects a Blob or ArrayBuffer
            // We convert the bytes to a Blob
            const blob = new Blob([imageData]);
            const storageId = await ctx.storage.store(blob);
            const url = await ctx.storage.getUrl(storageId);
            if (url) {
                imageUrls.push(url);
            }
        }

        // Update the product with the new list of image URLs via internal mutation
        await ctx.runMutation((internal as any).functions.uploadImage.updateProductImageUrls, {
            productId: args.productId,
            images: imageUrls
        });

        return { productId: args.productId, images: imageUrls };
    },
});

/**
 * Internal mutation to update product images.
 * Actions cannot write to the database directly.
 */
export const updateProductImageUrls = internalMutation({
    args: {
        productId: v.id("products"),
        images: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.productId, {
            images: args.images
        });
    }
});

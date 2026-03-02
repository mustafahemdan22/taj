import { mutation } from "../_generated/server";
import { premiumProductData } from "../productData";

export const updateProductMetadata = mutation({
    args: {},
    handler: async (ctx) => {
        const allProducts = await ctx.db.query("products").collect();
        let updatedCount = 0;

        for (const product of allProducts) {
            const category = product.category;
            const images = product.images || [];

            if (images.length === 0) continue;

            // Extract index from image path: taj-scarf/categories/cashmere/products/5
            const firstImage = images[0];
            const match = firstImage.match(/\/products\/(\d+)$/);

            if (!match) {
                console.log(`Could not find index for product ${product.nameEn} with image ${firstImage}`);
                continue;
            }

            const indexValue = parseInt(match[1], 10);
            const dataIndex = indexValue - 1; // 1-indexed to 0-indexed

            const categoryData = premiumProductData[category];
            if (!categoryData || !categoryData[dataIndex]) {
                console.log(`No metadata found for category ${category} at index ${dataIndex}`);
                continue;
            }

            const metadata = categoryData[dataIndex];

            await ctx.db.patch(product._id, {
                name: metadata.nameAr,
                nameEn: metadata.nameEn,
                description: metadata.descriptionAr,
                descriptionEn: metadata.descriptionEn,
            });

            updatedCount++;
        }

        return `Successfully updated metadata for ${updatedCount} products with premium content.`;
    },
});

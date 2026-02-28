import { Product } from "@/types";

const CLOUDINARY_CLOUD_NAME = 'dfq1xxerr';

/**
 * Dynamically generates an optimized Cloudinary URL for a given publicId.
 */
export function getOptimizedCloudinaryUrl(publicId: string, width = 600): string {
    if (!publicId) return "";

    // If it's already a full URL, just optimize it
    if (publicId.startsWith('http')) {
        return optimizeCloudinaryUrl(publicId);
    }

    // Otherwise, treat it as a public_id and build the optimized URL
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_auto,f_auto/${publicId}`;
}

/**
 * Resolves the best available image URL for a product.
 * Priority: product.image → first of product.images.
 */
export function getProductImageUrl(product: Product): string {
    const raw =
        product?.image ||
        (product?.images && product.images.length > 0 ? product.images[0] : null);

    if (!raw) return "";

    return getOptimizedCloudinaryUrl(raw);
}

/**
 * Resolves all available image URLs for a product.
 */
export function getProductImages(product: any): string[] {
    const rawImages: string[] = [];

    if (product?.images && product.images.length > 0) {
        rawImages.push(...product.images);
    } else if (product?.image) {
        rawImages.push(product.image);
    }

    if (rawImages.length === 0) {
        return [];
    }

    return rawImages.map(img => getOptimizedCloudinaryUrl(img));
}

/**
 * Applies Cloudinary auto-format and auto-quality transformations to a full URL.
 * If the URL is not from Cloudinary, returns it unchanged.
 */
function optimizeCloudinaryUrl(url: string): string {
    if (!url || !url.includes('cloudinary.com')) return url;

    // Check if it already has transformations
    if (url.includes('/upload/')) {
        // If it doesn't already have f_auto or q_auto, insert them
        if (!url.includes('f_auto') && !url.includes('q_auto')) {
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
    }

    return url;
}

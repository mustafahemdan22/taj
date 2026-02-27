/**
 * Resolves the best available image URL for a product.
 * Priority: product.image → first of product.images → placeholder.
 * Applies Cloudinary optimizations if the URL is from Cloudinary.
 */
export function getProductImageUrl(product: any): string {
    const raw =
        product?.image ||
        (product?.images && product.images.length > 0 ? product.images[0] : null) ||
        '/images/all.png';

    return optimizeCloudinaryUrl(raw);
}

/**
 * Returns all available images for a product (for galleries).
 */
export function getProductImages(product: any): string[] {
    const images: string[] = [];

    if (product?.images && product.images.length > 0) {
        images.push(...product.images);
    } else if (product?.image) {
        images.push(product.image);
    }

    if (images.length === 0) {
        images.push('/images/all.png');
    }

    return images.map(optimizeCloudinaryUrl);
}

/**
 * Applies Cloudinary auto-format and auto-quality transformations.
 * If the URL is not from Cloudinary, returns it unchanged.
 */
function optimizeCloudinaryUrl(url: string): string {
    if (!url || !url.includes('res.cloudinary.com')) {
        return url;
    }

    // Insert f_auto,q_auto after /upload/ if not already present
    if (url.includes('/upload/') && !url.includes('f_auto')) {
        return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    return url;
}

import { Product } from "../types/index";

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dfq1xxerr";
 


/**
 * Dynamically generates an optimized Cloudinary URL for a given public_id.
 * Final shape (required):
 * https://res.cloudinary.com/<cloud_name>/image/upload/f_auto,q_auto,w_<width>/<public_id>
 */
export function getOptimizedCloudinaryUrl(
  publicId: string,
  width = 800
): string {
  if (!publicId) return "";

  if (!CLOUDINARY_CLOUD_NAME) {
    console.error(
      "[Cloudinary] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set or is empty cannot build URL."
    );
    return "";
  }

  // Architecture guard: we expect only public_id values here.
  // If a full URL slips through, log it and return as‑is so it is visible in the console.
  if (publicId.startsWith("http")) {
    console.warn(
      "[AUDIT] Expected Cloudinary public_id but received full URL. Verify Convex stores only public_id.",
      publicId
    );
    return publicId;
  }

  const cleanId = publicId.startsWith("/") ? publicId.slice(1) : publicId;
  const finalUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${cleanId}`;

  console.log("[AUDIT] Cloudinary public_id:", publicId);
  console.log("[AUDIT] Generated Cloudinary URL:", finalUrl);

  return finalUrl;
}

/**
 * Resolves the best available image URL for a product.
 * Priority: first of product.images.
 */
export function getProductImageUrl(product: Product): string {
  const raw =
    product?.images && product.images.length > 0 ? product.images[0] : null;

  if (!raw) return "";

  console.log("[AUDIT] product.images[0]:", raw);
  return getOptimizedCloudinaryUrl(raw);
}

/**
 * Resolves all available image URLs for a product.
 */
export function getProductImages(product: Product | null | undefined): string[] {
  if (!product) return [];
  const rawImages: string[] = product.images || [];

  if (rawImages.length === 0) {
    return [];
  }

  return rawImages.map((img) => getOptimizedCloudinaryUrl(img));
}

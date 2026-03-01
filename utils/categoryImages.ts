export type ProductItem = {
    image: string;
    title: string;
    subtitle?: string;
    price?: string;
    badge?: string;
};

export type CategoryAssets = {
    header: string;
    products: ProductItem[];
};

export const categoriesImages: Record<string, CategoryAssets> = {
    cashmere: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261039/taj-scarf/categories/cashmere/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261040/taj-scarf/categories/cashmere/products/1.jpg",
                title: "Classic Cashmere Wrap",
                subtitle: "100% Pure Cashmere",
                price: "$120.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261041/taj-scarf/categories/cashmere/products/2.jpg",
                title: "Elegant Cashmere Scarf",
                subtitle: "Ultra-soft feel",
                price: "$110.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261042/taj-scarf/categories/cashmere/products/3.jpg",
                title: "Minimalist Cashmere",
                subtitle: "Everyday luxury",
                price: "$130.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261042/taj-scarf/categories/cashmere/products/4.jpg",
                title: "Cashmere Blanket Scarf",
                subtitle: "Oversized comfort",
                price: "$145.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261043/taj-scarf/categories/cashmere/products/5.jpg",
                title: "Premium Cashmere Shawl",
                subtitle: "Evening elegance",
                price: "$150.00"
            }
        ]
    },
    silk: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261045/taj-scarf/categories/silk/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261055/taj-scarf/categories/silk/products/1.webp",
                title: "Pure Silk Square",
                subtitle: "Hand-rolled edges",
                price: "$90.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261058/taj-scarf/categories/silk/products/2.jpg",
                title: "Printed Silk Scarf",
                subtitle: "Floral motifs",
                price: "$95.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261059/taj-scarf/categories/silk/products/3.jpg",
                title: "Silk Chiffon Regular",
                subtitle: "Lightweight breathability",
                price: "$85.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261060/taj-scarf/categories/silk/products/4.jpg",
                title: "Silk Wrap",
                subtitle: "Smooth & lustrous",
                price: "$105.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261061/taj-scarf/categories/silk/products/5.jpg",
                title: "Oversized Silk Shawl",
                subtitle: "Dramatic draping",
                price: "$115.00"
            }
        ]
    },
    wool: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261076/taj-scarf/categories/wool/header.png",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261078/taj-scarf/categories/wool/products/1.jpg",
                title: "Merino Wool Blend",
                subtitle: "Warmth without weight",
                price: "$75.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261079/taj-scarf/categories/wool/products/2.jpg",
                title: "Chunky Knit Wool",
                subtitle: "Winter essential",
                price: "$80.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261080/taj-scarf/categories/wool/products/3.jpg",
                title: "Classic Plaid Wool",
                subtitle: "Timeless pattern",
                price: "$85.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261081/taj-scarf/categories/wool/products/4.jpg",
                title: "Fringed Wool Scarf",
                subtitle: "Casual styling",
                price: "$70.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261083/taj-scarf/categories/wool/products/5.jpg",
                title: "Luxury Wool Shawl",
                subtitle: "Finely woven",
                price: "$95.00"
            }
        ]
    },
    pashmina: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261085/taj-scarf/categories/pashmina/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261087/taj-scarf/categories/pashmina/products/1.jpg",
                title: "Authentic Pashmina",
                subtitle: "Hand-spun luxury",
                price: "$150.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261088/taj-scarf/categories/pashmina/products/2.jpg",
                title: "Embroidered Pashmina",
                subtitle: "Artisan craftsmanship",
                price: "$180.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261089/taj-scarf/categories/pashmina/products/3.jpg",
                title: "Solid Pashmina Wrap",
                subtitle: "Versatile elegance",
                price: "$140.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261090/taj-scarf/categories/pashmina/products/4.jpg",
                title: "Reversible Pashmina",
                subtitle: "Two looks in one",
                price: "$165.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261091/taj-scarf/categories/pashmina/products/5.jpg",
                title: "Bridal Pashmina",
                subtitle: "Delicate and sheer",
                price: "$195.00"
            }
        ]
    },
    cotton: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772328764/taj-scarf/categories/cotton/header.png",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261092/taj-scarf/categories/cotton/products/1.jpg",
                title: "Everyday Cotton",
                subtitle: "Breathable comfort",
                price: "$35.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261093/taj-scarf/categories/cotton/products/2.jpg",
                title: "Printed Cotton Square",
                subtitle: "Vibrant colors",
                price: "$40.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261094/taj-scarf/categories/cotton/products/3.jpg",
                title: "Lightweight Cotton Wrap",
                subtitle: "Summer essential",
                price: "$30.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261095/taj-scarf/categories/cotton/products/4.jpg",
                title: "Textured Cotton Scarf",
                subtitle: "Crinkle finish",
                price: "$38.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261096/taj-scarf/categories/cotton/products/5.jpg",
                title: "Organic Cotton Blend",
                subtitle: "Eco-friendly",
                price: "$45.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261105/taj-scarf/categories/cotton/products/cotton-2.png",
                title: "Premium Cotton Jersey",
                subtitle: "Stretch comfort",
                price: "$42.00"
            }
        ]
    },
    acrylic: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261108/taj-scarf/categories/acrylic/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261109/taj-scarf/categories/acrylic/products/1.jpg",
                title: "Soft Acrylic Knit",
                subtitle: "Everyday warmth",
                price: "$25.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261111/taj-scarf/categories/acrylic/products/2.jpg",
                title: "Chunky Acrylic Scarf",
                subtitle: "Bold texture",
                price: "$28.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261112/taj-scarf/categories/acrylic/products/3.jpg",
                title: "Patterned Acrylic",
                subtitle: "Fun & colorful",
                price: "$30.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261113/taj-scarf/categories/acrylic/products/4.jpg",
                title: "Tasseled Acrylic Wrap",
                subtitle: "Boho style",
                price: "$32.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261114/taj-scarf/categories/acrylic/products/5.jpg",
                title: "Oversized Acrylic Shawl",
                subtitle: "Cozy layering",
                price: "$35.00"
            }
        ]
    },
    infinity: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261115/taj-scarf/categories/infinity/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261126/taj-scarf/categories/infinity/products/1.jpg",
                title: "Classic Infinity Loop",
                subtitle: "Effortless styling",
                price: "$45.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261127/taj-scarf/categories/infinity/products/2.jpg",
                title: "Ribbed Infinity Scarf",
                subtitle: "Textured warmth",
                price: "$48.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261128/taj-scarf/categories/infinity/products/3.jpg",
                title: "Lightweight Infinity",
                subtitle: "All-season wear",
                price: "$40.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261130/taj-scarf/categories/infinity/products/4.jpg",
                title: "Cable Knit Infinity",
                subtitle: "Winter ready",
                price: "$50.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261130/taj-scarf/categories/infinity/products/5.jpg",
                title: "Two-Tone Infinity",
                subtitle: "Contrast design",
                price: "$55.00"
            }
        ]
    },
    chiffon: {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261144/taj-scarf/categories/chiffon/header.jpg",
        products: [
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261149/taj-scarf/categories/chiffon/products/1.jpg",
                title: "Sheer Chiffon Wrap",
                subtitle: "Delicate drape",
                price: "$28.00",
                badge: "Best Seller"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261150/taj-scarf/categories/chiffon/products/2.jpg",
                title: "Floral Chiffon Scarf",
                subtitle: "Romantic pattern",
                price: "$32.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261150/taj-scarf/categories/chiffon/products/3.jpg",
                title: "Ombre Chiffon",
                subtitle: "Gradient transition",
                price: "$35.00",
                badge: "New"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261151/taj-scarf/categories/chiffon/products/4.jpg",
                title: "Pleated Chiffon",
                subtitle: "Structured volume",
                price: "$38.00"
            },
            {
                image: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772261153/taj-scarf/categories/chiffon/products/5.jpg",
                title: "Evening Chiffon Shawl",
                subtitle: "Special occasion",
                price: "$45.00"
            }
        ]
    }
};

/**
 * Helper to get images for a specific category.
 * Provides fallback defaults if the category slug is unmapped.
 */
export function getCategoryAssets(slug: string): CategoryAssets {
    const normalizedSlug = slug.toLowerCase();

    if (categoriesImages[normalizedSlug]) {
        return categoriesImages[normalizedSlug];
    }

    // Fallback defaults for unmapped categories
    return {
        header: "https://res.cloudinary.com/dfq1xxerr/image/upload/v1772210680/taj-scarf/static/all.png",
        products: []
    };
}

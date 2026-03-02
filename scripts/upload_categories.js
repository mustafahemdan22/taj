import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const categories = ["cashmere", "silk", "wool", "pashmina", "cotton", "acrylic", "infinity", "chiffon", "viscose"];
const baseDir = path.join(process.cwd(), 'public', 'categories');

async function uploadCategories() {
    const results = {
        headers: {},
        products: {}
    };

    for (const cat of categories) {
        console.log(`Uploading assets for category: ${cat}`);
        const catDir = path.join(baseDir, cat);

        // 1. Upload Header
        const headerPath = path.join(catDir, 'header.png');
        if (fs.existsSync(headerPath)) {
            console.log(`  Uploading header for ${cat}...`);
            const res = await cloudinary.uploader.upload(headerPath, {
                folder: `taj-scarf/categories/${cat}`,
                public_id: 'header',
                overwrite: true,
                resource_type: 'image'
            });
            results.headers[cat] = res.secure_url;
        }

        // 2. Upload Product Images
        const imagesDir = path.join(catDir, 'images');
        if (fs.existsSync(imagesDir)) {
            results.products[cat] = [];
            const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));
            for (const file of files) {
                console.log(`  Uploading product image ${file} for ${cat}...`);
                const res = await cloudinary.uploader.upload(path.join(imagesDir, file), {
                    folder: `taj-scarf/categories/${cat}/products`,
                    public_id: path.parse(file).name,
                    overwrite: true,
                    resource_type: 'image'
                });
                results.products[cat].push(res.secure_url);
            }
        }
    }

    console.log('\n--- UPLOAD COMPLETE ---');
    console.log('Final mapping for categoryConfig.ts:');
    console.log(JSON.stringify(results.headers, null, 2));

    // Write results to a temp file for reference
    fs.writeFileSync(path.join(process.cwd(), 'scripts', 'upload_results.json'), JSON.stringify(results, null, 2));
}

uploadCategories().catch(console.error);

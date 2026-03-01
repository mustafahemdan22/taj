const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadCottonHero() {
    const filePath = path.join(process.cwd(), 'public', 'categories', 'cotton', 'header.png');

    if (!fs.existsSync(filePath)) {
        console.error(`Missing file: ${filePath}`);
        return;
    }

    console.log(`Uploading ${filePath} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'taj-scarf/categories/cotton',
        public_id: 'header',  // Always use the same public ID
        overwrite: true,
        invalidate: true
    });

    console.log('Upload result:', JSON.stringify({
        public_id: result.public_id,
        secure_url: result.secure_url,
        version: result.version
    }, null, 2));
}

uploadCottonHero().catch(console.error);

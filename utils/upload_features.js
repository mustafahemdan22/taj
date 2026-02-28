const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const staticImages = [
    "freepik__women-wearing-black-and-tan-head-scarves__64173.png"
];

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

async function uploadStatic() {
    const mapping = {};
    for (const filename of staticImages) {
        const filePath = path.join(IMAGES_DIR, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`Missing: ${filename}`);
            continue;
        }
        console.log(`Uploading ${filename}...`);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'taj-scarf/static',
            use_filename: true,
            unique_filename: false,
        });
        mapping[filename] = result.secure_url;
    }
    console.log('Mapping:', JSON.stringify(mapping, null, 2));
}

uploadStatic().catch(console.error);

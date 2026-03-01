const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CATEGORIES_DIR = path.join(process.cwd(), 'public', 'categories');

async function uploadAllCategories() {
  const categories = fs.readdirSync(CATEGORIES_DIR);

  const finalMapping = {};

  for (const category of categories) {
    const imagesDir = path.join(CATEGORIES_DIR, category, 'images');

    if (!fs.existsSync(imagesDir)) {
      console.warn(`No images folder for ${category}`);
      continue;
    }

    const files = fs
      .readdirSync(imagesDir)
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
      });

    finalMapping[category] = [];

    for (const file of files) {
      const filePath = path.join(imagesDir, file);

      console.log(`Uploading ${category}/${file}...`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: `taj-scarf/categories/${category}`,
        use_filename: true,
        unique_filename: false,
      });

      finalMapping[category].push(result.secure_url);
    }
  }

  console.log('\n✅ FINAL MAPPING:\n');
  console.log(JSON.stringify(finalMapping, null, 2));
}

uploadAllCategories().catch(console.error);
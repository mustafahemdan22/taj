const fs = require('fs');
const path = require('path');
const https = require('https');

const categories = ["cashmere", "silk", "wool", "pashmina", "cotton", "acrylic", "infinity", "chiffon"];
const baseDir = path.join(process.cwd(), 'public', 'categories');

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                const nextUrl = new URL(response.headers.location, url).href;
                downloadImage(nextUrl, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        });
        request.on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fixEmptyFiles() {
    for (const cat of categories) {
        console.log(`Checking category: ${cat}`);
        const catDir = path.join(baseDir, cat);
        const imagesDir = path.join(catDir, 'images');

        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

        // Check Header
        const headerDest = path.join(catDir, 'header.png');
        if (!fs.existsSync(headerDest) || fs.statSync(headerDest).size === 0) {
            console.log(`  Downloading header for ${cat}...`);
            await downloadImage(`https://loremflickr.com/1200/400/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000)}`, headerDest);
            await delay(300);
        }

        // Check Product Images
        for (let i = 1; i <= 5; i++) {
            const imgDest = path.join(imagesDir, `${i}.png`);
            if (!fs.existsSync(imgDest) || fs.statSync(imgDest).size === 0) {
                console.log(`  Downloading image ${i} for ${cat}...`);
                await downloadImage(`https://loremflickr.com/600/800/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000 + i)}`, imgDest);
                await delay(300);
            }
        }
    }
    console.log('Fix complete!');
}

fixEmptyFiles().catch(console.error);

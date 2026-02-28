const fs = require('fs');
const path = require('path');
const https = require('https');

const categories = ["cashmere", "silk", "wool", "pashmina", "cotton", "acrylic", "infinity", "chiffon"];
const baseDir = path.join(__dirname, '..', 'public', 'categories');

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

async function populate() {
    for (const cat of categories) {
        console.log(`Processing category: ${cat}`);

        // Header image
        const headerDest = path.join(baseDir, cat, 'header.png');
        if (!fs.existsSync(headerDest)) {
            console.log(`  Downloading header for ${cat}...`);
            await downloadImage(`https://loremflickr.com/1200/400/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000)}`, headerDest);
            await delay(500);
        }

        // Product images
        const imagesDir = path.join(baseDir, cat, 'images');
        for (let i = 1; i <= 20; i++) {
            const imgDest = path.join(imagesDir, `${i}.png`);
            if (!fs.existsSync(imgDest)) {
                console.log(`  Downloading image ${i} for ${cat}...`);
                await downloadImage(`https://loremflickr.com/600/800/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000)}`, imgDest);
                await delay(500); // To avoid rate limiting
            }
        }
    }
    console.log('Population complete!');
}

populate().catch(console.error);

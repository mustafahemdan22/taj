const fs = require('fs');
const path = require('path');
const https = require('https');

const categories = ["cashmere", "silk", "wool", "pashmina", "cotton", "acrylic", "infinity", "chiffon"];
const srcDir = path.join(__dirname, '..', 'public', 'images');
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

async function organize() {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

    const files = fs.existsSync(srcDir) ? fs.readdirSync(srcDir) : [];

    for (const cat of categories) {
        console.log(`Organizing category: ${cat}`);
        const catDir = path.join(baseDir, cat);
        const imagesDir = path.join(catDir, 'images');

        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

        // 1. Category Header
        const headerDest = path.join(catDir, 'header.png');
        if (!fs.existsSync(headerDest)) {
            // Find a suitable header from existing files
            const possibleHeader = files.find(f => f.toLowerCase().includes(cat) && !f.includes(' - Copy') && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')));
            if (possibleHeader) {
                console.log(`  Moving ${possibleHeader} to header.png`);
                fs.copyFileSync(path.join(srcDir, possibleHeader), headerDest);
            } else {
                console.log(`  Downloading header for ${cat}...`);
                await downloadImage(`https://loremflickr.com/1200/400/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000)}`, headerDest);
                await delay(300);
            }
        }

        // 2. Product Images (1-5.png)
        for (let i = 1; i <= 5; i++) {
            const imgDest = path.join(imagesDir, `${i}.png`);
            if (fs.existsSync(imgDest)) continue;

            // Try to find a product image
            const possibleImg = files.find(f =>
                f.toLowerCase().includes(cat) &&
                !f.includes('header') &&
                !f.includes(' - Copy') &&
                !f.includes(cat + '.') && // avoid header-like ones
                (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp'))
            );

            if (possibleImg) {
                console.log(`  Moving ${possibleImg} to matches/${i}.png`);
                fs.copyFileSync(path.join(srcDir, possibleImg), imgDest);
                // Remove from list so it's not reused
                const idx = files.indexOf(possibleImg);
                if (idx > -1) files.splice(idx, 1);
            } else {
                // Try OIP/generic
                const generic = files.find(f => (f.startsWith('OIP') || f.includes('Black-Crepe')) && !f.includes(' - Copy'));
                if (generic) {
                    console.log(`  Moving generic ${generic} to matches/${i}.png`);
                    fs.copyFileSync(path.join(srcDir, generic), imgDest);
                    const idx = files.indexOf(generic);
                    if (idx > -1) files.splice(idx, 1);
                } else {
                    console.log(`  Downloading image ${i} for ${cat}...`);
                    await downloadImage(`https://loremflickr.com/600/800/scarf,fashion,${cat}?lock=${Math.floor(Math.random() * 1000 + i)}`, imgDest);
                    await delay(300);
                }
            }
        }
    }
    console.log('Reorganization and population complete!');
}

organize().catch(console.error);

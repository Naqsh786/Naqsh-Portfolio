const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const images = [
  '12006.png',
  'events.png',
  'profile.png',
  'profile1.jpg',
  'profile_premium.png',
  'hotel.png'
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img}, file not found.`);
      continue;
    }

    const { name } = path.parse(img);
    const isLcp = name === '12006';
    const maxWidth = isLcp ? 600 : 800;
    
    // Generate WebP
    console.log(`Optimizing ${img} to WebP (max ${maxWidth}px)...`);
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(publicDir, `${name}.webp`));

    // Generate AVIF
    console.log(`Optimizing ${img} to AVIF (max ${maxWidth}px)...`);
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .avif({ quality: 60 })
      .toFile(path.join(publicDir, `${name}.avif`));

    console.log(`Done with ${img}`);
  }
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});

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
    
    // Generate WebP
    console.log(`Optimizing ${img} to WebP...`);
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, `${name}.webp`));

    // Generate AVIF
    console.log(`Optimizing ${img} to AVIF...`);
    await sharp(inputPath)
      .avif({ quality: 65 })
      .toFile(path.join(publicDir, `${name}.avif`));

    // Also compress the original if it's large (overwrite or create -opt version)
    // For now, let's just keep the original and use the modern formats in code.
    console.log(`Done with ${img}`);
  }
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});

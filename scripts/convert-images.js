/**
 * Converts specific PNG assets to WebP to help "Serve images in next-gen formats".
 * Requires "sharp" (already in dependencies).
 * Safe to run multiple times; skips conversion if target exists and is newer.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

const targets = [
  // Footer backgrounds used on small screens
  'footer.png',
  'footer-light.png',
  'footer-small.png',
  'footer-small-light.png',
  // Home decorative frames
  'home/frame-3-light.png',
  'home/frame-3.png',
];

function statOrNull(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

async function convertPngToWebp(pngPath, webpPath) {
  const src = statOrNull(pngPath);
  if (!src) {
    console.log(`[convert-images] Source not found, skipping: ${pngPath}`);
    return;
  }
  const dst = statOrNull(webpPath);
  if (dst && dst.mtimeMs >= src.mtimeMs) {
    console.log(`[convert-images] Up-to-date: ${path.basename(webpPath)}`);
    return;
  }

  await sharp(pngPath).webp({ quality: 80 }).toFile(webpPath);

  const srcSize = fs.statSync(pngPath).size;
  const dstSize = fs.statSync(webpPath).size;
  const saved = (((srcSize - dstSize) / srcSize) * 100).toFixed(1);
  console.log(
    `[convert-images] ${path.basename(pngPath)} -> ${path.basename(webpPath)} (${(
      srcSize / 1024
    ).toFixed(1)}KB -> ${(dstSize / 1024).toFixed(1)}KB, saved ${saved}%)`,
  );
}

async function convertPngToAvif(pngPath, avifPath) {
  const src = statOrNull(pngPath);
  if (!src) {
    console.log(`[convert-images] Source not found, skipping: ${pngPath}`);
    return;
  }
  const dst = statOrNull(avifPath);
  if (dst && dst.mtimeMs >= src.mtimeMs) {
    console.log(`[convert-images] Up-to-date: ${path.basename(avifPath)}`);
    return;
  }

  await sharp(pngPath).avif({ quality: 60 }).toFile(avifPath);

  const srcSize = fs.statSync(pngPath).size;
  const dstSize = fs.statSync(avifPath).size;
  const saved = (((srcSize - dstSize) / srcSize) * 100).toFixed(1);
  console.log(
    `[convert-images] ${path.basename(pngPath)} -> ${path.basename(avifPath)} (${(
      srcSize / 1024
    ).toFixed(1)}KB -> ${(dstSize / 1024).toFixed(1)}KB, saved ${saved}%)`,
  );
}

(async () => {
  try {
    for (const file of targets) {
      const pngPath = path.join(ASSETS_DIR, file);
      const webpPath = path.join(ASSETS_DIR, file.replace(/\.png$/i, '.webp'));
      const avifPath = path.join(ASSETS_DIR, file.replace(/\.png$/i, '.avif'));
      await convertPngToWebp(pngPath, webpPath);
      await convertPngToAvif(pngPath, avifPath);
    }
  } catch (e) {
    console.error('[convert-images] Error:', e);
    process.exitCode = 1;
  }
})();

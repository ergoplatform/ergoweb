// Generate AVIF and WebP versions of decorative images using sharp
const fs = require('fs');
const path = require('path');

async function ensureSharp() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('sharp');
  } catch (e) {
    console.error('sharp is not installed. Install with: npm i -D sharp');
    process.exit(1);
  }
}

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function outPath(input, ext) {
  const dir = path.dirname(input);
  const base = path.basename(input, path.extname(input));
  return path.join(dir, `${base}.${ext}`);
}

async function convertOne(sharp, input) {
  if (!exists(input)) {
    console.warn(`Input not found: ${input} (skipping)`);
    return;
  }

  const targets = [
    { output: outPath(input, 'avif'), type: 'avif' },
    { output: outPath(input, 'webp'), type: 'webp' },
  ];

  for (const { output, type } of targets) {
    try {
      if (type === 'avif') {
        await sharp(input)
          .avif({
            quality: 60, // balanced quality/size
            effort: 4, // encoding effort (0-9), 4 is a good compromise
          })
          .toFile(output);
      } else if (type === 'webp') {
        await sharp(input)
          .webp({
            quality: 80,
            effort: 4,
          })
          .toFile(output);
      }
      console.log(`Created: ${output}`);
    } catch (err) {
      console.error(`Failed to create ${output}:`, err.message);
      process.exitCode = 1;
    }
  }
}

async function run() {
  const sharp = await ensureSharp();

  // Homepage decorative frames and footer background (desktop)
  const inputs = [
    path.resolve('public/assets/home/frame-3-light.png'),
    path.resolve('public/assets/home/frame-3.png'),
    path.resolve('public/assets/home/frame-4-light.png'),
    path.resolve('public/assets/home/frame-4.png'),
    path.resolve('public/assets/home/frame-5-light.png'),
    path.resolve('public/assets/home/frame-5.png'),
    path.resolve('public/assets/footer-light.png'),
    path.resolve('public/assets/footer.png'),
    // Uncomment if you want to optimize smaller/mobile footer images as well:
    // path.resolve('public/assets/footer-small-light.png'),
    // path.resolve('public/assets/footer-small.png'),
  ];

  for (const input of inputs) {
    // Only attempt conversion if the PNG source exists
    if (exists(input)) {
      // Skip if both AVIF and WebP already exist
      const avifOut = outPath(input, 'avif');
      const webpOut = outPath(input, 'webp');
      if (exists(avifOut) && exists(webpOut)) {
        console.log(`Already optimized: ${input}`);
        continue;
      }
      await convertOne(sharp, input);
    } else {
      console.warn(`Missing source (skip): ${input}`);
    }
  }
}

run();

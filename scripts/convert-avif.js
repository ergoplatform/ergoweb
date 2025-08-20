// Generate AVIF versions of decorative frames using sharp
const fs = require('fs');
const path = require('path');

async function run() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('sharp is not installed. Install with: npm i -D sharp');
    process.exit(1);
  }

  const targets = [
    {
      input: path.resolve('public/assets/home/frame-3-light.png'),
      output: path.resolve('public/assets/home/frame-3-light.avif'),
    },
    {
      input: path.resolve('public/assets/home/frame-3.png'),
      output: path.resolve('public/assets/home/frame-3.avif'),
    },
  ];

  for (const { input, output } of targets) {
    if (!fs.existsSync(input)) {
      console.warn(`Input not found: ${input} (skipping)`);
      continue;
    }
    try {
      await sharp(input)
        .avif({
          quality: 60, // balanced quality/size
          effort: 4, // encoding effort (0-9), 4 is a good compromise
        })
        .toFile(output);
      console.log(`Created: ${output}`);
    } catch (err) {
      console.error(`Failed to create ${output}:`, err.message);
      process.exitCode = 1;
    }
  }
}

run();

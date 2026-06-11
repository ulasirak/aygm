import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input  = path.join(__dirname, '../public/aygm-logo-behance.jpg');
const output = path.join(__dirname, '../public/aygm-logo-transparent.png');

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const px = new Uint8Array(data);

for (let i = 0; i < px.length; i += 4) {
  const r = px[i], g = px[i + 1], b = px[i + 2];
  if (r > 200 && g > 200 && b > 200) {
    // near-white: make transparent, smooth edges
    const w = Math.min(r, g, b) / 255;
    px[i + 3] = Math.round(Math.max(0, 1 - w) * 4 * 255);
    if (px[i + 3] > 255) px[i + 3] = 255;
  }
}

await sharp(Buffer.from(px), { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(output);

console.log('Saved:', output);

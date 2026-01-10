/**
 * Generate simple placeholder PNG icons for the extension
 * These are simple colored circles with a "W" letter
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(__dirname, '../icons');

// Ensure icons directory exists
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

// Simple PNG creation using raw bytes
// Creates a solid color square with transparency

function createPNG(size) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const width = size;
  const height = size;
  const bitDepth = 8;
  const colorType = 6; // RGBA
  const compressionMethod = 0;
  const filterMethod = 0;
  const interlaceMethod = 0;
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(bitDepth, 8);
  ihdrData.writeUInt8(colorType, 9);
  ihdrData.writeUInt8(compressionMethod, 10);
  ihdrData.writeUInt8(filterMethod, 11);
  ihdrData.writeUInt8(interlaceMethod, 12);
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // Create image data - a simple gradient circle
  const rawData = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (Math.min(width, height) / 2) - 1;
  
  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte for each row
    for (let x = 0; x < width; x++) {
      const dx = x - centerX + 0.5;
      const dy = y - centerY + 0.5;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= radius) {
        // Inside circle - teal/emerald color (#0D9488)
        rawData.push(13);   // R
        rawData.push(148);  // G
        rawData.push(136);  // B
        rawData.push(255);  // A
      } else {
        // Outside circle - transparent
        rawData.push(0);
        rawData.push(0);
        rawData.push(0);
        rawData.push(0);
      }
    }
  }
  
  // Compress the data using zlib deflate
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });
  
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);
  
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 implementation
function crc32(buffer) {
  let crc = 0xFFFFFFFF;
  
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc >>>= 1;
      }
    }
  }
  
  return crc ^ 0xFFFFFFFF;
}

// Generate icons at different sizes
const sizes = [16, 32, 48, 128];

for (const size of sizes) {
  const png = createPNG(size);
  const filename = resolve(iconsDir, `icon-${size}.png`);
  writeFileSync(filename, png);
  console.log(`Created ${filename}`);
}

console.log('Icon generation complete!');


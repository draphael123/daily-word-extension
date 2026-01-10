/**
 * Generate a distinctive Daily Word logo
 * Design: Stylized open book with a glowing "W" and sparkle
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(__dirname, '../icons');

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

// Colors
const COLORS = {
  teal: { r: 13, g: 148, b: 136 },      // Primary teal #0d9488
  tealDark: { r: 15, g: 118, b: 110 },  // Darker teal #0f766e
  tealLight: { r: 45, g: 212, b: 191 }, // Light teal #2dd4bf
  gold: { r: 251, g: 191, b: 36 },      // Accent gold #fbbf24
  white: { r: 255, g: 255, b: 255 },
  cream: { r: 254, g: 249, b: 231 },    // Warm cream
};

function createPNG(size) {
  const width = size;
  const height = size;
  
  // Create raw RGBA pixel data
  const rawData = [];
  const center = size / 2;
  const scale = size / 128; // Scale factor based on 128px base

  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte for each row
    for (let x = 0; x < width; x++) {
      const pixel = getPixelColor(x, y, size, center, scale);
      rawData.push(pixel.r, pixel.g, pixel.b, pixel.a);
    }
  }

  return encodePNG(width, height, rawData);
}

function getPixelColor(x, y, size, center, scale) {
  // Normalize coordinates to -1 to 1 range
  const nx = (x - center) / center;
  const ny = (y - center) / center;
  
  // Background: Rounded square with gradient
  const cornerRadius = 0.3;
  const squareSize = 0.85;
  
  // Calculate distance from rounded square edge
  const ax = Math.abs(nx);
  const ay = Math.abs(ny);
  
  let inSquare = false;
  if (ax <= squareSize && ay <= squareSize) {
    // Check corners
    const cornerX = squareSize - cornerRadius;
    const cornerY = squareSize - cornerRadius;
    
    if (ax > cornerX && ay > cornerY) {
      // In corner region - check circle
      const dx = ax - cornerX;
      const dy = ay - cornerY;
      inSquare = (dx * dx + dy * dy) <= cornerRadius * cornerRadius;
    } else {
      inSquare = true;
    }
  }
  
  if (!inSquare) {
    return { r: 0, g: 0, b: 0, a: 0 }; // Transparent
  }
  
  // Gradient background (teal gradient from top-left to bottom-right)
  const gradientT = (nx + ny + 2) / 4;
  const bgColor = lerpColor(COLORS.teal, COLORS.tealDark, gradientT * 0.5);
  
  // Draw book shape
  const bookResult = drawBook(nx, ny, scale);
  if (bookResult.hit) {
    return { ...bookResult.color, a: 255 };
  }
  
  // Draw "W" letter
  const wResult = drawW(nx, ny, scale);
  if (wResult.hit) {
    return { ...wResult.color, a: 255 };
  }
  
  // Draw sparkle/star
  const sparkleResult = drawSparkle(nx, ny, scale);
  if (sparkleResult.hit) {
    return { ...sparkleResult.color, a: 255 };
  }
  
  // Add subtle shine effect at top
  const shine = Math.max(0, 1 - (ny + 0.5) * 2) * 0.15;
  const finalColor = lerpColor(bgColor, COLORS.white, shine);
  
  return { ...finalColor, a: 255 };
}

function drawBook(nx, ny, scale) {
  // Open book at bottom of icon
  const bookY = 0.25; // Center Y of book
  const bookWidth = 0.55;
  const bookHeight = 0.35;
  const pageThickness = 0.03;
  
  // Left page
  const leftPageX = -bookWidth / 2 + 0.05;
  const inLeftPage = nx >= leftPageX && nx <= 0 - 0.02 &&
                     ny >= bookY - bookHeight/2 && ny <= bookY + bookHeight/2;
  
  // Right page  
  const rightPageX = bookWidth / 2 - 0.05;
  const inRightPage = nx <= rightPageX && nx >= 0 + 0.02 &&
                      ny >= bookY - bookHeight/2 && ny <= bookY + bookHeight/2;
  
  // Book spine (center line)
  const inSpine = Math.abs(nx) <= 0.03 && 
                  ny >= bookY - bookHeight/2 && ny <= bookY + bookHeight/2;
  
  // Page curl effect on edges
  if (inSpine) {
    return { hit: true, color: COLORS.tealDark };
  }
  
  if (inLeftPage || inRightPage) {
    // Add line texture for pages
    const lineSpacing = 0.08;
    const lineY = (ny - (bookY - bookHeight/2)) % lineSpacing;
    const isLine = lineY < 0.015 && ny > bookY - bookHeight/2 + 0.05;
    
    if (isLine) {
      return { hit: true, color: lerpColor(COLORS.cream, COLORS.tealLight, 0.3) };
    }
    return { hit: true, color: COLORS.cream };
  }
  
  return { hit: false };
}

function drawW(nx, ny, scale) {
  // Large "W" in upper portion
  const wCenterY = -0.2;
  const wWidth = 0.5;
  const wHeight = 0.4;
  const strokeWidth = 0.08;
  
  // W shape: 4 diagonal lines forming W
  const wy = ny - wCenterY;
  
  if (wy < -wHeight/2 || wy > wHeight/2) {
    return { hit: false };
  }
  
  // Normalize y within W bounds
  const normalizedY = (wy + wHeight/2) / wHeight; // 0 at top, 1 at bottom
  
  // Left outer stroke: starts at top-left, goes to bottom-middle-left
  const leftOuter = -wWidth/2 + normalizedY * (wWidth/4);
  
  // Left inner stroke: starts at top-left-center, goes to center
  const leftInner = -wWidth/4 + normalizedY * (wWidth/4);
  
  // Right inner stroke: starts at top-right-center, goes to center  
  const rightInner = wWidth/4 - normalizedY * (wWidth/4);
  
  // Right outer stroke: starts at top-right, goes to bottom-middle-right
  const rightOuter = wWidth/2 - normalizedY * (wWidth/4);
  
  // Check if point is on any stroke
  const onLeftOuter = Math.abs(nx - leftOuter) < strokeWidth/2;
  const onLeftInner = Math.abs(nx - leftInner) < strokeWidth/2;
  const onRightInner = Math.abs(nx - rightInner) < strokeWidth/2;
  const onRightOuter = Math.abs(nx - rightOuter) < strokeWidth/2;
  
  if (onLeftOuter || onLeftInner || onRightInner || onRightOuter) {
    // Gradient on the W
    const wGradient = (nx + wWidth/2) / wWidth;
    return { hit: true, color: lerpColor(COLORS.white, COLORS.tealLight, wGradient * 0.3) };
  }
  
  return { hit: false };
}

function drawSparkle(nx, ny, scale) {
  // Small sparkle/star in top-right
  const sparkleX = 0.45;
  const sparkleY = -0.45;
  const sparkleSize = 0.12;
  
  const dx = nx - sparkleX;
  const dy = ny - sparkleY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Four-pointed star shape
  const angle = Math.atan2(dy, dx);
  const starDist = sparkleSize * (0.3 + 0.7 * Math.pow(Math.abs(Math.cos(2 * angle)), 2));
  
  if (dist < starDist) {
    const brightness = 1 - dist / starDist;
    return { hit: true, color: lerpColor(COLORS.gold, COLORS.white, brightness * 0.5) };
  }
  
  // Small secondary sparkles
  const sparkles = [
    { x: 0.55, y: -0.35, size: 0.04 },
    { x: 0.35, y: -0.55, size: 0.03 },
  ];
  
  for (const s of sparkles) {
    const sdx = nx - s.x;
    const sdy = ny - s.y;
    const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
    if (sdist < s.size) {
      return { hit: true, color: COLORS.gold };
    }
  }
  
  return { hit: false };
}

function lerpColor(c1, c2, t) {
  t = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

function encodePNG(width, height, rawData) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);  // bit depth
  ihdrData.writeUInt8(6, 9);  // color type (RGBA)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // Compress image data
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

// Generate icons
const sizes = [16, 32, 48, 128];

console.log('Generating Daily Word logo icons...');

for (const size of sizes) {
  const png = createPNG(size);
  const filename = resolve(iconsDir, `icon-${size}.png`);
  writeFileSync(filename, png);
  console.log(`✓ Created ${filename} (${size}x${size})`);
}

console.log('\nLogo generation complete! 🎨');


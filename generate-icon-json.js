/* eslint-disable no-console */
/**
 * Generate a JSON map of icons based on SVG filenames.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const iconsDir = path.join(projectRoot, 'src', 'assets', 'icons');
const outPath = path.join(projectRoot, 'src', 'assets', 'icons', 'icon-map.json');

if (!fs.existsSync(iconsDir)) {
  throw new Error(`Icons folder not found: ${iconsDir}`);
}

const iconNames = Array.from(
  new Set(
    fs
      .readdirSync(iconsDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => path.basename(file, '.svg')),
  ),
).sort();

if (iconNames.length === 0) {
  console.error('No icons found to include in the JSON output.');
  process.exit(1);
}

const result = iconNames.map((icon) => {
  const value = icon.trim();
  return { name: value };
});

fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`);

console.log(`Created icon JSON with ${iconNames.length} entries at ${outPath}`);

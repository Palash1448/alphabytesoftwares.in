import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const files = [
  { src: 'vercel.json', dest: 'dist/vercel.json' },
  { src: '.htaccess', dest: 'dist/.htaccess' }
];

console.log('📋 Copying configuration files to dist...');

files.forEach(({ src, dest }) => {
  try {
    // Ensure destination directory exists
    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    copyFileSync(src, dest);
    console.log(`✅ Copied ${src} → ${dest}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${src}:`, error.message);
  }
});

console.log('🎉 Configuration files copied successfully!');
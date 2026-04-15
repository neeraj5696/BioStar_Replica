const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔨 Building AsteriskNode Speaker Controller System...');

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

console.log('🚀 Creating executable...');
try {
  execSync('npx pkg -t node18-win-x64 server.js -o dist/AsteriskMain.exe --compress GZip', { stdio: 'inherit' });
} catch {
  execSync('npx pkg -t node16-win-x64 server.js -o dist/AsteriskMain.exe --compress GZip', { stdio: 'inherit' });
}

console.log('📄 Copying configuration files...');

// Copy .env file - CRITICAL for executable to run
if (fs.existsSync('.env')) {
  fs.copyFileSync('.env', 'dist/.env');
  console.log('✓ Copied .env');
} else {
  console.warn('⚠ WARNING: .env file not found! The executable may fail.');
}

if (fs.existsSync('frontend')) {
  // recursive: true ensures all subfolders and files are copied
  fs.cpSync('frontend', 'dist/frontend', { recursive: true });
  console.log('✓ Copied frontend folder');
} else {
  console.warn('⚠ WARNING: frontend folder not found!');
}






console.log('✅ Build complete!');

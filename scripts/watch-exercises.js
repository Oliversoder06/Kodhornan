
const fs = require('fs');
const path = require('path');

const EXERCISE_DIRS = [
  path.join(__dirname, '../shared/exercises/core'),
  path.join(__dirname, '../shared/exercises/generated'),
];

function generateIndex(dir) {
  console.log(`Scanning ${dir} for exercises...`);
  
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  const exports = files
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => {
        const basename = path.basename(file, '.ts');
        return `export { exercise as ${basename} } from "./${basename}";`;
    });

  const content = exports.join('\n') + '\n';
  const indexPath = path.join(dir, 'index.ts');
  
  const currentContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  
  if (content !== currentContent) {
    fs.writeFileSync(indexPath, content);
    console.log(`Updated ${indexPath}`);
  }
}

// Initial generation
EXERCISE_DIRS.forEach(generateIndex);

// Watch logic (simple polling or fs.watch)
if (process.argv.includes('--watch')) {
  console.log('Watching for exercise changes...');
  
  EXERCISE_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    // Recursive: false, only watch distinct files in the folder
    fs.watch(dir, (eventType, filename) => {
      if (filename && filename.endsWith('.ts') && filename !== 'index.ts') {
        // Debounce slightly if needed, but synchronous is fine for small scale
        generateIndex(dir);
      }
    });
  });
  
  // Keep process alive
  setInterval(() => {}, 1000 * 60 * 60);
}

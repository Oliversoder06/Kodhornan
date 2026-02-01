
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

  // Recursive function to find all TS files (excluding index.ts)
  function findExercises(currentDir, relativePath = "") {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      let results = [];

      for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          const entryRelativePath = path.join(relativePath, entry.name);

          if (entry.isDirectory()) {
              results = results.concat(findExercises(fullPath, entryRelativePath));
          } else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
              results.push(entryRelativePath);
          }
      }
      return results;
  }

  const exerciseFiles = findExercises(dir);
  
  const exports = exerciseFiles
    .map(file => {
        // file is relative path from dir, e.g. "lesson1/lesson1_easy_1.ts"
        // normalize path separators to forward slashes for imports
        const importPath = "./" + file.replace(/\\/g, '/').replace('.ts', '');
        const basename = path.basename(file, '.ts');
        return `export { exercise as ${basename} } from "${importPath}";`;
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

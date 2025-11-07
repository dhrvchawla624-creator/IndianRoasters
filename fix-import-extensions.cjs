const fs = require('fs');
const path = require('path');

function updateImportsInFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // regex: import ... from './bar' to import ... from './bar.js'
  // works for both code and type-only imports!
  const updated = code.replace(
    /from\s+(['"])(\.{1,2}\/[a-zA-Z0-9_\-\/]+)(?<!\.js|\.json|\.css|\.ts)\1/g,
    (match, quote, impPath) => {
      // Don't touch external or already-extensioned imports
      if (impPath.endsWith('.js') || impPath.endsWith('.json') || impPath.endsWith('.css')) return match;
      return `from ${quote}${impPath}.js${quote}`;
    }
  );
  if (updated !== code) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) walkDir(dirPath, callback);
    else if (/\.(ts|tsx|js|mjs)$/.test(f)) callback(path.join(dir, f));
  });
}

// Run the script on all .ts/.tsx/.js files in the repo!
walkDir(process.cwd(), updateImportsInFile);

console.log('Import path patching complete!');

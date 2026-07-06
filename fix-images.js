const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Remove data-nimg={1} or data-nimg="..."
  content = content.replace(/\s+data-nimg=\{?\d+\}?/g, '');
  content = content.replace(/\s+data-nimg="[^"]*"/g, '');
  
  // Remove decoding="async"
  content = content.replace(/\s+decoding="[^"]*"/g, '');

  // Remove srcSet="..."
  content = content.replace(/\s+srcSet="[^"]*"/g, '');
  
  // Remove draggable="false" (optional, but it was in the error message)
  content = content.replace(/\s+draggable="false"/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(componentsDir);
console.log('Done!');

const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\naqsh\\Aptech\\Naqsh Portfolio\\FrontEnd\\src';
const tailwindConfigPath = 'd:\\naqsh\\Aptech\\Naqsh Portfolio\\FrontEnd\\tailwind.config.js';

const replacements = [
  { regex: /neon-red/g, replacement: 'neon-primary' },
  { regex: /neon-crimson/g, replacement: 'neon-secondary' },
  { regex: /rgba\(\s*255\s*,\s*0\s*,\s*60\s*/g, replacement: 'rgba(139, 92, 246' }, // #ff003c -> #8b5cf6 (neon.primary rgb)
  { regex: /rgba\(\s*153\s*,\s*0\s*,\s*36\s*/g, replacement: 'rgba(59, 130, 246' }, // #990024 -> #3b82f6 (neon.secondary rgb)
  { regex: /#ff003c/gi, replacement: '#8b5cf6' },
  { regex: /#990024/gi, replacement: '#3b82f6' },
  // dark colors
  { regex: /#050001/gi, replacement: '#050814' },
  { regex: /#0f0003/gi, replacement: '#0b1120' },
  { regex: /#1a0005/gi, replacement: '#111827' },
  { regex: /#180006/gi, replacement: '#0a0e1a' },
  { regex: /#080002/gi, replacement: '#04060d' },
  { regex: /#33000b/gi, replacement: '#151e32' },
  { regex: /#110004/gi, replacement: '#080c16' },
];

const replaceInFile = (filePath) => {
  let originalContent = fs.readFileSync(filePath, 'utf-8');
  let content = originalContent;
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

const walkDir = (currentDir) => {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(jsx?|tsx?|css)$/.test(file)) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(srcDir);
replaceInFile(tailwindConfigPath);

console.log('Replacement complete.');

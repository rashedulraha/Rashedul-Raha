const fs = require('fs');
const path = require('path');

const dir = '/Users/rashedulraha/Developer/rashedul/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // backgrounds
  { regex: /\bbg-black\/[0-9]+\b/g, replace: 'bg-accent/50' },
  { regex: /\bbg-black\b(?!\/)/g, replace: 'bg-primary' },
  { regex: /\bbg-white\/[0-9]+\b/g, replace: 'bg-accent/50' },
  { regex: /\bbg-white\b(?!\/)/g, replace: 'bg-card' },
  { regex: /\bbg-zinc-[0-9]+\b/g, replace: 'bg-muted' },
  { regex: /\bbg-gray-[0-9]+\b/g, replace: 'bg-muted' },
  
  // text
  { regex: /\btext-black\/[0-9]+\b/g, replace: 'text-muted-foreground' },
  { regex: /\btext-black\b(?!\/)/g, replace: 'text-foreground' },
  { regex: /\btext-white\/[0-9]+\b/g, replace: 'text-muted-foreground' },
  { regex: /\btext-white\b(?!\/)/g, replace: 'text-foreground' },
  { regex: /\btext-zinc-[0-9]+\b/g, replace: 'text-muted-foreground' },
  { regex: /\btext-gray-[0-9]+\b/g, replace: 'text-muted-foreground' },
  { regex: /\btext-neutral-[89]00\b/g, replace: 'text-foreground' },
  { regex: /\btext-neutral-[456]00\b/g, replace: 'text-muted-foreground' },
  
  // borders
  { regex: /\bborder-black\/[0-9]+\b/g, replace: 'border-border' },
  { regex: /\bborder-black\b(?!\/)/g, replace: 'border-border' },
  { regex: /\bborder-white\/[0-9]+\b/g, replace: 'border-border' },
  { regex: /\bborder-white\b(?!\/)/g, replace: 'border-border' },
  { regex: /\bborder-zinc-[0-9]+\b/g, replace: 'border-border' },
  { regex: /\bborder-gray-[0-9]+\b/g, replace: 'border-border' },
  
  // specific dark mode overrides we want to remove
  { regex: /\bdark:bg-white(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:bg-black(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:bg-card(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:text-white(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:text-black(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:text-neutral-[0-9]+\b/g, replace: '' },
  { regex: /\bdark:border-white(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:border-black(?:\/[0-9]+)?\b/g, replace: '' },
  { regex: /\bdark:border-neutral-[0-9]+\b/g, replace: '' },
  
  // hover states
  { regex: /\bhover:bg-white(?:\/[0-9]+)?\b/g, replace: 'hover:bg-accent' },
  { regex: /\bhover:bg-black(?:\/[0-9]+)?\b/g, replace: 'hover:bg-accent' },
  { regex: /\bhover:text-white(?:\/[0-9]+)?\b/g, replace: 'hover:text-primary-foreground' },
  { regex: /\bhover:text-black(?:\/[0-9]+)?\b/g, replace: 'hover:text-primary-foreground' },
  
  // custom cases seen
  { regex: /bg-\[#[0-9a-fA-F]+\](?:\/[0-9]+)?/g, replace: 'bg-muted' },
  { regex: /text-\[#[0-9a-fA-F]+\](?:\/[0-9]+)?/g, replace: 'text-foreground' },
  { regex: /border-\[#[0-9a-fA-F]+\](?:\/[0-9]+)?/g, replace: 'border-border' },
  { regex: /before:bg-white/g, replace: 'before:bg-foreground' },
  { regex: /fill-white/g, replace: 'fill-primary-foreground' }
];

for (const file of files) {
  if (['ThemeToggle.tsx', 'ThemeProvider.tsx'].includes(file)) continue;
  if (file.startsWith('ui')) continue; // Skip ui components
  
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  let modified = false;
  for (const { regex, replace } of replacements) {
    if (regex.test(content)) {
      content = content.replace(regex, replace);
      modified = true;
    }
  }
  
  // Do NOT mess with spacing! Double spaces in classNames are perfectly fine and safe.
  if (modified) {
    fs.writeFileSync(filepath, content);
  }
}

console.log('Done cleaning colors.');

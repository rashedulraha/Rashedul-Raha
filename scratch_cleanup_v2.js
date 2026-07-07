const fs = require('fs');
const path = require('path');

const dir = '/Users/rashedulraha/Developer/rashedul/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

// We only replace exact words with \b to avoid breaking random text.
// We also use lookahead to ensure we don't match values with opacity (e.g. bg-black/10) unless explicitly targeting them.
// Wait, we DO want to replace bg-black/10, etc, based on the previous task.
// The user asked to remove hardcoded colors and replace them with semantic theming.
// Let's do it carefully.

const replacements = [
  // backgrounds
  { regex: /\bbg-black\/[0-9]+\b/g, replace: 'bg-accent' },
  { regex: /\bbg-black\b(?!\/)/g, replace: 'bg-primary' },
  { regex: /\bbg-white\/[0-9]+\b/g, replace: 'bg-accent' },
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
  { regex: /\bdark:bg-card(?:\/[0-9]+)?\b/g, replace: '' }, // we'll use normal bg-card
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
];

for (const file of files) {
  if (['ThemeToggle.tsx', 'ThemeProvider.tsx'].includes(file)) continue;
  
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }
  
  // Clean up multiple spaces inside classNames that were left by replacing with empty string
  // Only within class="..." or className="..."
  content = content.replace(/class(?:Name)?="([^"]+)"/g, (match, p1) => {
    return match.replace(p1, p1.replace(/\s+/g, ' ').trim());
  });
  
  fs.writeFileSync(filepath, content);
}
console.log('Done');

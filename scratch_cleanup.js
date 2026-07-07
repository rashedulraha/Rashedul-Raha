const fs = require('fs');
const path = require('path');

const dir = '/Users/rashedulraha/Developer/rashedul/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /bg-white(?!\/[0-9]+)/g, replace: 'bg-card' },
  { regex: /bg-black(?!\/[0-9]+)/g, replace: 'bg-card' },
  { regex: /text-black(?!\/[0-9]+)/g, replace: 'text-foreground' },
  { regex: /text-white(?!\/[0-9]+)/g, replace: 'text-foreground' },
  { regex: /text-neutral-[89]00(?!\/[0-9]+)/g, replace: 'text-foreground' },
  { regex: /dark:bg-white(?:\/[0-9]+)?/g, replace: '' },
  { regex: /dark:bg-black(?:\/[0-9]+)?/g, replace: '' },
  { regex: /dark:text-white(?:\/[0-9]+)?/g, replace: '' },
  { regex: /dark:text-black(?:\/[0-9]+)?/g, replace: '' },
  { regex: /before:bg-card/g, replace: 'before:bg-foreground' }
];

for (const file of files) {
  if (['Navbar.tsx', 'Hero.tsx', 'SearchModal.tsx', 'Features.tsx', 'Testimonials.tsx', 'Contact.tsx'].includes(file)) continue;
  
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  let modified = false;
  for (const { regex, replace } of replacements) {
    if (regex.test(content)) {
      content = content.replace(regex, replace);
      modified = true;
    }
  }
  
  if (modified) {
    // clean up any double spaces left by removing dark: classes without removing newlines
    content = content.replace(/ \s+/g, ' ');
    fs.writeFileSync(filepath, content);
  }
}
console.log('Done');

const fs = require('fs');

const footerEn = {
  "desc1": "A full-stack developer, freelancer & problem solver.",
  "desc2": "Thanks for checking out my site!",
  "generalTitle": "General",
  "general": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "blog": "Blog"
  },
  "specificsTitle": "Specifics",
  "specifics": {
    "guestbook": "Guest Book",
    "bucketList": "Bucket List",
    "uses": "Uses",
    "attribution": "Attribution"
  },
  "moreTitle": "More",
  "more": {
    "bookCall": "Book a Call",
    "links": "Links",
    "rss": "RSS",
    "privacy": "Privacy",
    "terms": "Terms"
  },
  "allRights": "All rights reserved",
  "privacy": "Privacy",
  "terms": "Terms",
  "sitemap": "Sitemap",
  "builtWith": "Built with Next.js"
};

const footerBn = {
  "desc1": "একজন ফুল-স্ট্যাক ডেভেলপার, ফ্রিল্যান্সার এবং প্রবলেম সলভার।",
  "desc2": "আমার সাইট ঘুরে দেখার জন্য ধন্যবাদ!",
  "generalTitle": "সাধারণ",
  "general": {
    "home": "হোম",
    "about": "সম্পর্কে",
    "projects": "প্রজেক্টসমূহ",
    "blog": "ব্লগ"
  },
  "specificsTitle": "বিশেষ বিষয়",
  "specifics": {
    "guestbook": "গেস্টবুক",
    "bucketList": "বাকেট লিস্ট",
    "uses": "টুলস",
    "attribution": "অ্যাট্রিবিউশন"
  },
  "moreTitle": "আরও",
  "more": {
    "bookCall": "কল বুক করুন",
    "links": "লিঙ্কস",
    "rss": "আরএসএস",
    "privacy": "প্রাইভেসি",
    "terms": "শর্তাবলী"
  },
  "allRights": "সর্বস্বত্ব সংরক্ষিত",
  "privacy": "প্রাইভেসি",
  "terms": "শর্তাবলী",
  "sitemap": "সাইটম্যাপ",
  "builtWith": "Next.js দিয়ে তৈরি"
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Footer = lang === 'bn' ? footerBn : footerEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Footer injected!');

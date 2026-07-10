const fs = require('fs');

const contactEn = {
  "rotatingBadge": "OPEN TO WORK · OPEN TO WORK · ",
  "concept": "FROM CONCEPT TO ",
  "creation": "CREATION",
  "makeIt": "LET'S MAKE IT ",
  "happen": "HAPPEN!",
  "getInTouch": "Get In Touch",
  "availableFor": "I'm available for ",
  "fullTime": "full-time roles",
  "and": " & ",
  "freelance": "freelance projects",
  "dot": ".",
  "desc1": "I thrive on crafting dynamic web applications, and",
  "desc2": "delivering seamless user experiences.",
  "tags": ["React", "Next.js", "TypeScript", "Tailwind"]
};

const contactBn = {
  "rotatingBadge": "কাজের জন্য উন্মুক্ত · কাজের জন্য উন্মুক্ত · ",
  "concept": "ধারণা থেকে ",
  "creation": "বাস্তবায়ন",
  "makeIt": "চলুন একসাথে ",
  "happen": "কাজ করি!",
  "getInTouch": "যোগাযোগ করুন",
  "availableFor": "আমি ",
  "fullTime": "ফুল-টাইম চাকরি",
  "and": " এবং ",
  "freelance": "ফ্রিল্যান্স প্রজেক্টের",
  "dot": " জন্য উন্মুক্ত।",
  "desc1": "ডাইনামিক ওয়েব অ্যাপ্লিকেশন তৈরি করতে আমি দারুণ উপভোগ করি, এবং",
  "desc2": "ইউজারদের একটি স্মুথ অভিজ্ঞতা দেওয়াই আমার লক্ষ্য।",
  "tags": ["React", "Next.js", "TypeScript", "Tailwind"]
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Contact = lang === 'bn' ? contactBn : contactEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Contact injected!');

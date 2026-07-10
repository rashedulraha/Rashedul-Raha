const fs = require('fs');

const expEn = {
  "badge": "Explore My Site",
  "titlePrefix": "Explore, experiment ",
  "titleHighlight": "&& say hello",
  "cards": {
    "uses": {
      "title": "Uses",
      "description": "Check out my favorite tools"
    },
    "about": {
      "title": "Behind The Code",
      "description": "Journey, skills & experience"
    },
    "guestbook": {
      "title": "Guestbook",
      "description": "Let me know you were here"
    }
  }
};

const expBn = {
  "badge": "আমার সাইট ঘুরে দেখুন",
  "titlePrefix": "ঘুরে দেখুন, এক্সপেরিমেন্ট করুন ",
  "titleHighlight": "&& হ্যালো বলুন",
  "cards": {
    "uses": {
      "title": "টুলস",
      "description": "আমার প্রিয় টুলসগুলো দেখুন"
    },
    "about": {
      "title": "কোডের পেছনের গল্প",
      "description": "আমার যাত্রা, দক্ষতা এবং অভিজ্ঞতা"
    },
    "guestbook": {
      "title": "গেস্টবুক",
      "description": "আমাকে জানান যে আপনি এসেছিলেন"
    }
  }
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Explore = lang === 'bn' ? expBn : expEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Explore injected!');

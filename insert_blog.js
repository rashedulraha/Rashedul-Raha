const fs = require('fs');

const blogEn = {
  "badge": "FROM THE DESK",
  "titlePrefix": "Thoughts & ",
  "titleHighlight": "writings",
  "readArticle": "Read article",
  "readMore": "Read more posts",
  "posts": {
    "post1": {
      "title": "How to Optimise a Next.js Web App",
      "description": "Practical techniques to fix your Next.js Lighthouse score — bundle analysis, caching strategies, React Compiler, and the next.config flags nobody talks about.",
      "category": "Performance",
      "readTime": "15 min read",
      "date": "Apr 14, 2026"
    },
    "post2": {
      "title": "Every Tool in My Terminal-First Dev Setup",
      "description": "Neovim, Wezterm, Tmux, and the rest — what survived two years of daily use and why I picked each one over the obvious alternatives.",
      "category": "Tools",
      "readTime": "12 min read",
      "date": "Oct 19, 2025"
    },
    "post3": {
      "title": "Build a Blog with Next.js and MDX from Scratch",
      "description": "File-based content, zero database, full control. A complete walkthrough of building a statically-generated blog with Next.js, MDX, and gray-matter.",
      "category": "Tutorial",
      "readTime": "11 min read",
      "date": "Mar 12, 2025"
    }
  }
};

const blogBn = {
  "badge": "ডেস্ক থেকে",
  "titlePrefix": "চিন্তা ও ",
  "titleHighlight": "লেখালিখি",
  "readArticle": "আর্টিকেল পড়ুন",
  "readMore": "আরো পোস্ট পড়ুন",
  "posts": {
    "post1": {
      "title": "কিভাবে একটি Next.js ওয়েব অ্যাপ অপ্টিমাইজ করবেন",
      "description": "আপনার Next.js লাইটহাউস স্কোর ঠিক করার ব্যবহারিক কৌশল — বান্ডেল অ্যানালাইসিস, ক্যাশিং স্ট্র্যাটেজি, রিয়েক্ট কম্পাইলার এবং next.config এর এমন কিছু ফ্ল্যাগ যা নিয়ে কেউ কথা বলে না।",
      "category": "পারফরম্যান্স",
      "readTime": "১৫ মিনিট পাঠ",
      "date": "এপ্রিল ১৪, ২০২৬"
    },
    "post2": {
      "title": "আমার টার্মিনাল-ফার্স্ট ডেভ সেটআপের প্রতিটি টুল",
      "description": "নিওভিম, ওয়েজটার্ম, টি-মাক্স এবং বাকি সব — প্রতিদিনের ব্যবহারে দুই বছর ধরে যেগুলো টিকে আছে এবং কেন আমি এগুলো বেছে নিয়েছি।",
      "category": "টুলস",
      "readTime": "১২ মিনিট পাঠ",
      "date": "অক্টোবর ১৯, ২০২৫"
    },
    "post3": {
      "title": "শুরু থেকে Next.js এবং MDX দিয়ে ব্লগ তৈরি করুন",
      "description": "ফাইল-ভিত্তিক কনটেন্ট, কোনো ডেটাবেস নেই, সম্পূর্ণ নিয়ন্ত্রণ। Next.js, MDX এবং gray-matter ব্যবহার করে স্ট্যাটিক ব্লগ তৈরির সম্পূর্ণ নির্দেশিকা।",
      "category": "টিউটোরিয়াল",
      "readTime": "১১ মিনিট পাঠ",
      "date": "মার্চ ১২, ২০২৫"
    }
  }
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Blog = lang === 'bn' ? blogBn : blogEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Blog injected!');

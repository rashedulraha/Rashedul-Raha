const fs = require('fs');

const workEn = {
  "badge": "Portfolio",
  "titlePrefix": "Featured ",
  "titleHighlight": "Projects",
  "description": "Scroll to explore some of my recent work and technical achievements.",
  "viewAll": "View all projects",
  "more": "more",
  "viewLive": "View Live",
  "code": "Code",
  "projects": {
    "keythm": {
      "title": "Keythm",
      "subtitle": "Typing Test Reimagined",
      "description": "Keychron meets typing test — every key has its own sound, every stat tracked",
      "badge": "Q2 2026",
      "type": "Web App",
      "stats": "4,367 checks",
      "features0": "Per-key mechanical audio via Web Audio API",
      "features1": "Four modes with live WPM & accuracy tracking",
      "features2": "Statistical anti-cheat with 13 checks",
      "features3": "Offline-first PWA with Serwist precaching"
    },
    "nextdemy": {
      "title": "Nextdemy",
      "subtitle": "Learning Platform",
      "description": "A monorepo-powered learning platform with real payments, real auth, and real content delivery",
      "badge": "Q4 2024",
      "type": "Web App",
      "stats": "1,200+ learners",
      "features0": "Monorepo with Turborepo for scalable code",
      "features1": "Real payment processing with Razorpay",
      "features2": "JWT authentication with session management",
      "features3": "Optimized content delivery & caching"
    },
    "venture-den": {
      "title": "VentureDen",
      "subtitle": "AI Pitch Platform",
      "description": "Where founders pitch ideas, get instant AI feedback, and get discovered by investors",
      "badge": "Q1 2025",
      "type": "Web App",
      "stats": "500+ pitches",
      "features0": "AI-powered pitch analysis with instant feedback",
      "features1": "Investor discovery & matching algorithm",
      "features2": "Sanity CMS for content management",
      "features3": "Real-time analytics & engagement tracking"
    },
    "finote": {
      "title": "Finote",
      "subtitle": "Finance Tracker",
      "description": "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health",
      "badge": "Q4 2025",
      "type": "Mobile App",
      "stats": "10K+ downloads",
      "features0": "React Native with Expo framework",
      "features1": "Wallet organization & expense tracking",
      "features2": "Financial health analytics with charts",
      "features3": "Optimized media with Cloudinary"
    },
    "star-forge": {
      "title": "StarForge",
      "subtitle": "AI SaaS Landing",
      "description": "A sleek AI SaaS landing page with a user-friendly design that enhances engagement.",
      "badge": "Q1 2024",
      "type": "Web App",
      "stats": "3x conversion",
      "features0": "Modern AI SaaS landing page design",
      "features1": "Parallax scrolling & smooth animations",
      "features2": "Optimized performance with Vercel",
      "features3": "User-friendly Tailwind CSS interface"
    }
  }
};

const workBn = {
  "badge": "পোর্টফোলিও",
  "titlePrefix": "নির্বাচিত ",
  "titleHighlight": "প্রজেক্টসমূহ",
  "description": "আমার সাম্প্রতিক কিছু কাজ এবং টেকনিক্যাল অর্জন দেখতে স্ক্রল করুন।",
  "viewAll": "সব প্রজেক্ট দেখুন",
  "more": "আরো",
  "viewLive": "লাইভ দেখুন",
  "code": "কোড",
  "projects": {
    "keythm": {
      "title": "Keythm",
      "subtitle": "টাইপিং টেস্ট রিইমাজিনড",
      "description": "কিক্রন এবং টাইপিং টেস্টের মিলন — প্রতিটি কিতে নিজস্ব সাউন্ড, প্রতিটি স্ট্যাট ট্র্যাক করা হয়",
      "badge": "কিউ২ ২০২৬",
      "type": "ওয়েব অ্যাপ",
      "stats": "৪,৩৬৭ চেকস",
      "features0": "Web Audio API এর মাধ্যমে প্রতি-কিতে মেকানিক্যাল অডিও",
      "features1": "লাইভ WPM এবং অ্যাকুরেসি ট্র্যাকিং সহ চারটি মোড",
      "features2": "১৩টি চেকের মাধ্যমে স্ট্যাটিস্টিক্যাল অ্যান্টি-চিট",
      "features3": "Serwist প্রিক্যাশিং সহ অফলাইন-ফার্স্ট PWA"
    },
    "nextdemy": {
      "title": "Nextdemy",
      "subtitle": "লার্নিং প্ল্যাটফর্ম",
      "description": "রিয়েল পেমেন্ট, রিয়েল অথেনটিকেশন এবং রিয়েল কন্টেন্ট ডেলিভারি সহ একটি মনরেপো-চালিত লার্নিং প্ল্যাটফর্ম",
      "badge": "কিউ৪ ২০২৪",
      "type": "ওয়েব অ্যাপ",
      "stats": "১,২০০+ শিক্ষার্থী",
      "features0": "স্কেলেবল কোডের জন্য Turborepo সহ মনরেপো",
      "features1": "Razorpay এর মাধ্যমে রিয়েল পেমেন্ট প্রসেসিং",
      "features2": "সেশন ম্যানেজমেন্ট সহ JWT অথেনটিকেশন",
      "features3": "অপ্টিমাইজড কন্টেন্ট ডেলিভারি এবং ক্যাশিং"
    },
    "venture-den": {
      "title": "VentureDen",
      "subtitle": "এআই পিচ প্ল্যাটফর্ম",
      "description": "যেখানে ফাউন্ডাররা তাদের আইডিয়া পিচ করেন, তাৎক্ষণিক এআই ফিডব্যাক পান এবং বিনিয়োগকারীদের দ্বারা আবিষ্কৃত হন",
      "badge": "কিউ১ ২০২৫",
      "type": "ওয়েব অ্যাপ",
      "stats": "৫০০+ পিচ",
      "features0": "তাত্ক্ষণিক ফিডব্যাক সহ এআই-চালিত পিচ বিশ্লেষণ",
      "features1": "বিনিয়োগকারী আবিষ্কার এবং ম্যাচিং অ্যালগরিদম",
      "features2": "কন্টেন্ট ম্যানেজমেন্টের জন্য Sanity CMS",
      "features3": "রিয়েল-টাইম অ্যানালিটিক্স এবং এঙ্গেজমেন্ট ট্র্যাকিং"
    },
    "finote": {
      "title": "Finote",
      "subtitle": "ফাইন্যান্স ট্র্যাকার",
      "description": "ডিজিটাল ওয়ালেট গুছিয়ে রাখা এবং অর্থনৈতিক অবস্থার বিশ্লেষণের জন্য একটি সহজ মোবাইল অ্যাপ",
      "badge": "কিউ৪ ২০২৫",
      "type": "মোবাইল অ্যাপ",
      "stats": "১০ হাজার+ ডাউনলোড",
      "features0": "Expo ফ্রেমওয়ার্কের সাথে React Native",
      "features1": "ওয়ালেট অর্গানাইজেশন এবং খরচ ট্র্যাকিং",
      "features2": "চার্টের মাধ্যমে ফাইন্যান্সিয়াল হেলথ অ্যানালিটিক্স",
      "features3": "Cloudinary এর সাথে অপ্টিমাইজড মিডিয়া"
    },
    "star-forge": {
      "title": "StarForge",
      "subtitle": "এআই সাস ল্যান্ডিং",
      "description": "সুন্দর এবং ইউজার-ফ্রেন্ডলি ডিজাইনের একটি আধুনিক এআই সাস ল্যান্ডিং পেজ যা এঙ্গেজমেন্ট বাড়ায়।",
      "badge": "কিউ১ ২০২৪",
      "type": "ওয়েব অ্যাপ",
      "stats": "৩গুণ কনভার্সন",
      "features0": "আধুনিক এআই সাস ল্যান্ডিং পেজ ডিজাইন",
      "features1": "প্যারালাক্স স্ক্রলিং এবং স্মুথ অ্যানিমেশন",
      "features2": "Vercel এর সাথে অপ্টিমাইজড পারফরম্যান্স",
      "features3": "ইউজার-ফ্রেন্ডলি Tailwind CSS ইন্টারফেস"
    }
  }
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Work = lang === 'bn' ? workBn : workEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Work injected!');

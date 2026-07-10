const fs = require('fs');

const testEn = {
  "badge": "Client Love",
  "titlePrefix": "Don't just take ",
  "titleHighlight": "my word",
  "titleSuffix": " for it.",
  "description": "Here’s what founders, marketers, and creative directors have to say about working together.",
  "items": {
    "item1": {
      "title": "We went from Figma to production in 11 days",
      "message": "We'd been sitting on designs for two months because our last dev kept pushing timelines. Aayush had a staging link in 4 days and we were live in 11. The site loads in under a second and our bounce rate dropped 35% the first week. Wish we'd found him sooner.",
      "name": "Marcus T.",
      "role": "Marketing Director, SaaS startup"
    },
    "item2": {
      "title": "Finally a developer who actually listens",
      "message": "I'm not technical at all, and past devs made me feel stupid for asking questions. Aayush sent Loom walkthroughs after every milestone so I always knew exactly where things stood. When I changed my mind about the checkout flow halfway through, he didn't push back — just adjusted and shipped it better than what I originally asked for.",
      "name": "Lauren K.",
      "role": "Founder, DTC skincare brand"
    },
    "item3": {
      "title": "Our Core Web Vitals went from red to green overnight",
      "message": "We hired Aayush to rebuild our marketing site on Next.js. The old WordPress site was scoring 38 on PageSpeed. His build scores 97. He set up the CMS integration so our content team can publish without touching code. Solid architecture, clean codebase — the kind of work I'd expect from a senior engineer.",
      "name": "Daniel R.",
      "role": "CTO, fintech startup"
    },
    "item4": {
      "title": "He caught problems we didn't even know we had",
      "message": "We hired him to redesign our product pages. During the build he noticed our image pipeline was serving uncompressed files and our mobile nav was broken on Safari. Fixed both without being asked. That's the kind of developer you want — someone who cares about the whole product, not just their ticket.",
      "name": "James L.",
      "role": "Co-founder, e-commerce brand"
    },
    "item5": {
      "title": "He turned our messy brief into something beautiful",
      "message": "We gave Aayush a mood board and some rough wireframes — honestly, they were half-baked. He came back with a prototype that was cleaner and more thoughtful than what we'd imagined. The animations feel intentional, the typography is perfect, and three clients have asked us who built it.",
      "name": "Sofia M.",
      "role": "Creative Director, branding agency"
    },
    "item6": {
      "title": "We've shipped 4 projects together now",
      "message": "First project was a simple landing page. Then he rebuilt our client portal, added a blog with headless CMS, and just finished an analytics dashboard. Every project is ahead of schedule. He's basically our dev team at this point. If you're a small agency that needs a reliable build partner, stop looking.",
      "name": "Ryan H.",
      "role": "Founder, B2B agency"
    }
  }
};

const testBn = {
  "badge": "ক্লায়েন্টদের ভালোবাসা",
  "titlePrefix": "শুধু ",
  "titleHighlight": "আমার কথায়",
  "titleSuffix": " বিশ্বাস করবেন না।",
  "description": "আমার সাথে কাজ করার বিষয়ে ফাউন্ডার, মার্কেটার এবং ক্রিয়েটিভ ডিরেক্টররা কী বলেন তা এখানে দেওয়া হলো।",
  "items": {
    "item1": {
      "title": "আমরা ফিগমা থেকে প্রোডাকশনে গিয়েছি মাত্র ১১ দিনে",
      "message": "আগের ডেভেলপারের কারণে আমরা দুই মাস ধরে শুধু ডিজাইনেই আটকে ছিলাম। আয়ুশ ৪ দিনে স্টেজিং লিংক দেয় এবং ১১ দিনের মাথায় সাইট লাইভ করে দেয়। সাইট এক সেকেন্ডের কম সময়ে লোড হয় এবং প্রথম সপ্তাহে বাউন্স রেট ৩৫% কমে গেছে। ইশ! যদি তাকে আরও আগে পেতাম।",
      "name": "মার্কাস টি.",
      "role": "মার্কেটিং ডিরেক্টর, সাস স্টার্টআপ"
    },
    "item2": {
      "title": "অবশেষে এমন একজন ডেভেলপার পেলাম যে আসলেই কথা শোনে",
      "message": "আমি টেকনিক্যাল মানুষ নই, আর আগের ডেভেলপাররা প্রশ্ন করলে আমাকে বোকা ভাবত। আয়ুশ প্রতিটি মাইলফলকের পর ভিডিও পাঠাত, তাই আমি সবসময় জানতাম কাজ কতদূর হলো। কাজ অর্ধেক হওয়ার পর যখন আমি চেকআউটের ডিজাইন বদলাতে চাইলাম, সে কোনো আপত্তি করেনি—বরং আমি যা চেয়েছিলাম তার চেয়েও ভালো কিছু তৈরি করে দিয়েছে।",
      "name": "লরেন কে.",
      "role": "ফাউন্ডার, স্কিনকেয়ার ব্র্যান্ড"
    },
    "item3": {
      "title": "আমাদের কোর ওয়েব ভাইটাল রাতারাতি লাল থেকে সবুজ হয়ে গেছে",
      "message": "আমরা আমাদের মার্কেটিং সাইট Next.js-এ নতুন করে বানানোর জন্য আয়ুশকে নিয়েছিলাম। পুরনো ওয়ার্ডপ্রেস সাইট পেজস্পিডে ৩৮ পেত, আর তার বানানো সাইট পায় ৯৭। সে সিএমএস এমনভাবে সেট করেছে যে আমাদের কনটেন্ট টিম কোড না ধরেই লেখা পাবলিশ করতে পারে। দুর্দান্ত আর্কিটেকচার, ক্লিন কোডবেস—একজন সিনিয়র ইঞ্জিনিয়ারের কাছে ঠিক যেমনটা আশা করা যায়।",
      "name": "ড্যানিয়েল আর.",
      "role": "সিটিও, ফিনটেক স্টার্টআপ"
    },
    "item4": {
      "title": "সে এমন সমস্যা ধরেছে যা আমরা জানতামই না",
      "message": "আমরা তাকে আমাদের প্রোডাক্ট পেজ রিডিজাইন করার জন্য নিয়েছিলাম। কাজ করার সময় সে খেয়াল করে যে আমাদের ছবিগুলো অপ্টিমাইজড নয় এবং সাফারিতে মোবাইল মেনু ভাঙা। সে না জিজ্ঞেস করেই দুটোই ঠিক করে দিয়েছে। এমনই ডেভেলপার দরকার—যে শুধু নিজের কাজ নয়, পুরো প্রজেক্ট নিয়ে ভাবে।",
      "name": "জেমস এল.",
      "role": "কো-ফাউন্ডার, ই-কমার্স ব্র্যান্ড"
    },
    "item5": {
      "title": "সে আমাদের এলোমেলো আইডিয়াকে দারুণ কিছুতে রূপ দিয়েছে",
      "message": "আমরা তাকে কিছু সাধারণ আইডিয়া আর রাফ স্কেচ দিয়েছিলাম—সত্যি বলতে, সেগুলো খুব একটা গোছানো ছিলভান ছিল না। সে এমন একটি প্রোটোটাইপ বানাল যা আমাদের ভাবনার চেয়েও সুন্দর আর পরিপাটি ছিল। এর অ্যানিমেশনগুলো দারুণ, টাইপোগ্রাফি নিখুঁত, আর তিনজন ক্লায়েন্ট ইতোমধ্যে জিজ্ঞেস করেছে এটা কে বানিয়েছে।",
      "name": "সোফিয়া এম.",
      "role": "ক্রিয়েটিভ ডিরেক্টর, ব্র্যান্ডিং এজেন্সি"
    },
    "item6": {
      "title": "আমরা একসাথে ইতোমধ্যে ৪টি প্রজেক্ট শেষ করেছি",
      "message": "প্রথম প্রজেক্ট ছিল একটা সাধারণ ল্যান্ডিং পেজ। তারপর সে আমাদের ক্লায়েন্ট পোর্টাল বানাল, হেডলেস সিএমএস দিয়ে ব্লগ যুক্ত করল, আর এইমাত্র অ্যানালিটিক্স ড্যাশবোর্ড শেষ করল। প্রতিটি প্রজেক্টই সময়ের আগে জমা দিয়েছে। সে এখন মূলত আমাদের ডেভ টিম। যদি আপনার ছোট এজেন্সির জন্য একজন নির্ভরযোগ্য পার্টনার দরকার হয়, তবে আর খোঁজার দরকার নেই।",
      "name": "রায়ান এইচ.",
      "role": "ফাউন্ডার, বিটুবি এজেন্সি"
    }
  }
};

const files = ['en', 'bn', 'ja', 'es', 'de', 'fr', 'it'];
files.forEach(lang => {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.Testimonials = lang === 'bn' ? testBn : testEn;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
});
console.log('Testimonials injected!');

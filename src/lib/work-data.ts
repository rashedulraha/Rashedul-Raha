export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  type: string;
  stats: string;
  features: string[];
  tags: string[];
  links: {
    live: string;
    github: string;
  };
};

export const projects: Project[] = [
  {
    id: "keythm",
    title: "Keythm",
    subtitle: "Typing Test Reimagined",
    description:
      "Keychron meets typing test — every key has its own sound, every stat tracked",
    image: "/images/image.png",
    badge: "Q2 2026",
    type: "Web App",
    stats: "4,367 checks",
    features: [
      "Per-key mechanical audio via Web Audio API",
      "Four modes with live WPM & accuracy tracking",
      "Statistical anti-cheat with 13 checks",
      "Offline-first PWA with Serwist precaching",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Drizzle ORM",
      "Motion.dev",
    ],
    links: {
      live: "https://keythm.dev",
      github: "https://github.com/username/keythm",
    },
  },
  {
    id: "nextdemy",
    title: "Nextdemy",
    subtitle: "Learning Platform",
    description:
      "A monorepo-powered learning platform with real payments, real auth, and real content delivery",
    image: "/images/image_4.jpg",
    badge: "Q4 2024",
    type: "Web App",
    stats: "1,200+ learners",
    features: [
      "Monorepo with Turborepo for scalable code",
      "Real payment processing with Razorpay",
      "JWT authentication with session management",
      "Optimized content delivery & caching",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Shadcn UI",
    ],
    links: {
      live: "https://nextdemy.dev",
      github: "https://github.com/username/nextdemy",
    },
  },
  {
    id: "venture-den",
    title: "VentureDen",
    subtitle: "AI Pitch Platform",
    description:
      "Where founders pitch ideas, get instant AI feedback, and get discovered by investors",
    image: "/images/image_5.jpg",
    badge: "Q1 2025",
    type: "Web App",
    stats: "500+ pitches",
    features: [
      "AI-powered pitch analysis with instant feedback",
      "Investor discovery & matching algorithm",
      "Sanity CMS for content management",
      "Real-time analytics & engagement tracking",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Sanity CMS",
      "Tailwind CSS",
      "Motion.dev",
    ],
    links: {
      live: "https://ventureden.dev",
      github: "https://github.com/username/ventureden",
    },
  },
  {
    id: "finote",
    title: "Finote",
    subtitle: "Finance Tracker",
    description:
      "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health",
    image: "/images/image_3.png",
    badge: "Q4 2025",
    type: "Mobile App",
    stats: "10K+ downloads",
    features: [
      "React Native with Expo framework",
      "Wallet organization & expense tracking",
      "Financial health analytics with charts",
      "Optimized media with Cloudinary",
    ],
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Zod",
      "Zustand",
    ],
    links: {
      live: "https://finote.app",
      github: "https://github.com/username/finote",
    },
  },
  {
    id: "star-forge",
    title: "StarForge",
    subtitle: "AI SaaS Landing",
    description:
      "A sleek AI SaaS landing page with a user-friendly design that enhances engagement.",
    image: "/images/image_7.jpg",
    badge: "Q1 2024",
    type: "Web App",
    stats: "3x conversion",
    features: [
      "Modern AI SaaS landing page design",
      "Parallax scrolling & smooth animations",
      "Optimized performance with Vercel",
      "User-friendly Tailwind CSS interface",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    links: {
      live: "https://starforge.dev",
      github: "https://github.com/username/starforge",
    },
  },
];

export type BlogPost = {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Optimise a Next.js Web App",
    slug: "how-to-optimise-a-nextjs-web-app",
    description:
      "Practical techniques to fix your Next.js Lighthouse score — bundle analysis, caching strategies, React Compiler, and the next.config flags nobody talks about.",
    image: "/images/image_17.jpg",
    date: "Apr 14, 2026",
    readTime: "15 min read",
    category: "Performance",
  },
  {
    id: 2,
    title: "Every Tool in My Terminal-First Dev Setup",
    slug: "terminal-first-dev-setup",
    description:
      "Neovim, Wezterm, Tmux, and the rest — what survived two years of daily use and why I picked each one over the obvious alternatives.",
    image: "/images/image_18.jpg",
    date: "Oct 19, 2025",
    readTime: "12 min read",
    category: "Tools",
  },
  {
    id: 3,
    title: "Build a Blog with Next.js and MDX from Scratch",
    slug: "build-a-blog-with-nextjs-and-mdx",
    description:
      "File-based content, zero database, full control. A complete walkthrough of building a statically-generated blog with Next.js, MDX, and gray-matter.",
    image: "/images/image_1.webp",
    date: "Mar 12, 2025",
    readTime: "11 min read",
    category: "Tutorial",
  },
];

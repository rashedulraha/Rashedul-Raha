import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/_sanidhyy",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description: "Full-stack e-commerce with payment integration",
    image: "/projects/project-1.png",
    link: "https://example.com",
    github: "https://github.com/username/project",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    longDescription:
      "A complete e-commerce solution with user authentication, product management, shopping cart, and secure payment processing using Stripe. Built with modern technologies for optimal performance.",
    features: [
      "User authentication with JWT",
      "Product filtering and search",
      "Shopping cart with localStorage",
      "Stripe payment integration",
      "Order management system",
      "Admin dashboard",
    ],
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Stripe API",
      "Tailwind CSS",
    ],
    duration: "2024",
    role: "Full-Stack Developer",
  },
  {
    title: "Real-Time Chat App",
    slug: "real-time-chat-app",
    description: "WebSocket-based messaging platform",
    image: "/projects/project-2.png",
    link: "https://example.com",
    github: "https://github.com/username/project",
    tags: ["React", "Socket.io", "Express", "Redis"],
    longDescription:
      "A real-time messaging application with WebSocket integration, supporting group chats, file sharing, and message history. Optimized for performance with Redis caching.",
    features: [
      "Real-time messaging with WebSocket",
      "Group chat functionality",
      "File and image sharing",
      "Message history and search",
      "Online status indicators",
      "Typing indicators",
    ],
    technologies: [
      "React.js",
      "Socket.io",
      "Express.js",
      "Redis",
      "MongoDB",
      "AWS S3",
    ],
    duration: "2024",
    role: "Full-Stack Developer",
  },
  {
    title: "DevOps Dashboard",
    slug: "dev-ops-dashboard",
    description: "Monitoring and deployment automation",
    image: "/projects/project-3.png",
    link: "https://example.com",
    github: "https://github.com/username/project",
    tags: ["Docker", "GitHub Actions", "AWS", "Prometheus"],
    longDescription:
      "A comprehensive DevOps dashboard for monitoring infrastructure, managing deployments, and tracking application performance. Integrated with CI/CD pipelines for automated workflows.",
    features: [
      "Infrastructure monitoring",
      "Automated CI/CD pipelines",
      "Performance metrics tracking",
      "Alert notifications",
      "Deployment management",
      "Log aggregation",
    ],
    technologies: [
      "Docker",
      "GitHub Actions",
      "AWS",
      "Prometheus",
      "Grafana",
      "Node.js",
    ],
    duration: "2023",
    role: "DevOps Engineer",
  },
];
export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/_sanidhyy",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Experience",
    link: "#experience",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};

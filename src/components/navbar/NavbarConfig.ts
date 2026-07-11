import {
  Home,
  User,
  Briefcase,
  PenLine,
  MessageSquare,
  ListTodo,
  Award,
  Link as LinkIcon,
  Laptop,
  CreditCard,
} from "lucide-react";
import { Variants } from "framer-motion";

export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: PenLine },
];

export const moreCards = [
  {
    id: "guestbook",
    href: "/guestbook",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    icon: MessageSquare,
  },
  {
    id: "bucketList",
    href: "/bucket-list",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    icon: ListTodo,
  },
];

export const moreLinks = [
  {
    id: "certificates",
    href: "/certificates",
    icon: Award,
  },
  {
    id: "links",
    href: "/links",
    icon: LinkIcon,
  },
  {
    id: "uses",
    href: "/uses",
    icon: Laptop,
  },
  {
    id: "attribution",
    href: "/attribution",
    icon: CreditCard,
  },
];

export const dropdownVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
      opacity: { duration: 0.4, delay: 0.2 },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const, delay: 0.15 },
      opacity: { duration: 0.5, delay: 0.35 },
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.94,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1] as const,
      staggerChildren: 0.08,
      type: "spring",
      stiffness: 180,
      damping: 22,
    },
  },
};

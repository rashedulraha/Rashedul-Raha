import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Code2,
  Rocket,
  Sparkles,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { achievements } from "./Data/quickViewData";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    let index = 0;
    const currentTitle = title;

    setDisplayedTitle("");
    setIsTyping(true);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < currentTitle.length) {
          setDisplayedTitle((prev) => prev + currentTitle.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timeout);
  }, [title]);

  const rotatingWords = ["Developer", "Architect", "Creator", "Innovator"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/rashedulraha", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rashedulraha/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:rashedulraha.bd@gmail.com", label: "Email" },
    { icon: Twitter, href: "https://x.com/rashedulraha", label: "Twitter" },
  ];

  const scrollToNext = () => {
    const nextSection = document.getElementById("tech-stack");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-foreground/5"
      onMouseMove={handleMouseMove}>
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-foreground/3 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      {/* Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,var(--foreground)_0.5px,transparent_0.5px)] [background-size:32px_32px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.08), transparent 50%)`,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-foreground/60" />
            <span className="text-xs text-muted-foreground tracking-wide">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Rotating Word Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <Code2 className="w-3.5 h-3.5 text-foreground/60" />
            <span className="text-xs text-muted-foreground">I am a</span>
            <motion.span
              key={activeWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-semibold text-foreground/80">
              {rotatingWords[activeWord]}
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8">
            <div className="inline-flex items-center gap-2 bg-foreground/5 px-4 py-2 rounded-lg border border-foreground/10 backdrop-blur-sm">
              <Terminal className="h-4 w-4 text-foreground/60" />
              <code className="text-sm sm:text-base text-foreground/80 font-mono">
                {displayedTitle}
                <span
                  className={`w-0.5 h-4 bg-foreground/60 ml-0.5 ${isTyping ? "animate-pulse" : "opacity-0"}`}
                />
              </code>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center p-4 rounded-xl bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300">
                <item.icon className={`h-5 w-5 ${item.color} mx-auto mb-2`} />
                <div className="text-xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons with Enhanced Backgrounds */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA Button with Gradient */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-foreground via-foreground/70 to-foreground/40 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <Button
                size="lg"
                className="relative rounded-full px-8 h-12 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/20 hover:shadow-xl hover:shadow-foreground/30 transition-all duration-300 group">
                <span className="flex items-center gap-2">
                  Let's Connect
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            {/* Secondary CTA Button with Border Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-sm font-medium border-2 border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group"
                onClick={scrollToNext}>
                <span className="flex items-center gap-2">
                  Explore Work
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links with Glass Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Find me on
              </span>
              <div className="w-px h-4 bg-foreground/10" />
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-full hover:bg-foreground/10 transition-all duration-300">
                  <social.icon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNext}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-mono">
                Scroll
              </span>
              <ArrowDown className="w-3 h-3 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

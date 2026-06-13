import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
  Download,
  MapPin,
  Coffee,
  Zap,
  Briefcase,
  Award,
  Users,
  Globe,
  Star,
  Code,
  Cpu,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { achievements } from "./Data/quickViewData";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

/* ─── Premium Interactive Components ─────────────────────────────────────────── */

function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      {...props}>
      {children}
    </motion.button>
  );
}

function FloatingShape({ delay = 0, duration = 20, className = "" }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function AnimatedCounter({ value, label, icon: Icon, color }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-card rounded-2xl p-6 text-center border border-border shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">{count}+</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ───────────────────────────────────────── */

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  /* Scroll progress - NO OPACITY FADE */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  /* Mouse 3D Effect */
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateXValue = (mouseY / (rect.height / 2)) * 8;
    const rotateYValue = (mouseX / (rect.width / 2)) * 8;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  /* Typewriter effect */
  useEffect(() => {
    let i = 0;
    setDisplayedTitle("");
    setIsTypingComplete(false);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < title.length) {
          setDisplayedTitle((prev) => prev + title[i]);
          i++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 45);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [title]);

  /* Rotating roles */
  const roles = [
    {
      title: "Full Stack Developer",
      icon: Code2,
      description: "Building end-to-end solutions",
    },
    {
      title: "UI/UX Architect",
      icon: Layers,
      description: "Creating seamless experiences",
    },
    {
      title: "Tech Lead",
      icon: Users,
      description: "Leading innovation teams",
    },
    {
      title: "Problem Solver",
      icon: Cpu,
      description: "Solving complex challenges",
    },
  ];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRoleIdx((prev) => (prev + 1) % roles.length),
      3000,
    );
    return () => clearInterval(interval);
  }, [roles.length]);

  /* Testimonials data */
  const testimonials = [
    {
      text: "One of the most talented developers I've worked with",
      author: "Tech Lead @ Google",
      rating: 5,
    },
    {
      text: "Exceptional problem-solving skills and clean code",
      author: "CTO @ Startup",
      rating: 5,
    },
    {
      text: "Delivered complex features ahead of schedule",
      author: "Product Manager",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const featuredSkills = [
    { name: "React", icon: Code, level: "Expert" },
    { name: "Next.js", icon: Rocket, level: "Advanced" },
    { name: "TypeScript", icon: Terminal, level: "Expert" },
    { name: "Node.js", icon: Globe, level: "Advanced" },
    { name: "Tailwind", icon: Sparkles, level: "Expert" },
    { name: "PostgreSQL", icon: Database, level: "Advanced" },
  ];

  const socials = [
    {
      Icon: Github,
      href: "https://github.com/rashedulraha",
      label: "GitHub",
      color: "hover:text-[#333]",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/rashedulraha/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]",
    },
    {
      Icon: Twitter,
      href: "https://x.com/rashedulraha",
      label: "Twitter",
      color: "hover:text-[#1DA1F2]",
    },
    {
      Icon: Mail,
      href: "mailto:rashedulraha.bd@gmail.com",
      label: "Email",
      color: "hover:text-[#EA4335]",
    },
  ];

  const scrollToNext = () => {
    const nextSection =
      document.getElementById("tech-stack") ||
      document.querySelector("section:not(.hero)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ position: "relative", zIndex: 1 }}>
      {/* Premium Animated Background - NO OPACITY CHANGE */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)
            `,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Shapes */}
        <FloatingShape
          delay={0}
          duration={25}
          className="top-20 right-20 w-32 h-32 border border-primary/20 rounded-full"
        />
        <FloatingShape
          delay={2}
          duration={20}
          className="bottom-32 left-20 w-24 h-24 border border-secondary/20 rounded-2xl"
        />
        <FloatingShape
          delay={1}
          duration={30}
          className="top-1/3 left-1/4 w-16 h-16 border border-accent/20 rounded-lg"
        />
      </div>

      {/* Main Content with Scroll Transform - NO OPACITY */}
      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          y,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMouseMove}
        className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Layout for Premium Feel */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Main Content */}
              <div className="text-center lg:text-left">
                {/* Premium Status Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    Available for opportunities
                  </span>
                  <div className="w-px h-4 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    ⭐ Top Rated
                  </span>
                </motion.div>

                {/* Rotating Role Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-50 animate-pulse" />
                    <Code2 className="w-5 h-5 text-primary relative z-10" />
                  </div>
                  <span className="text-sm text-foreground/80">I am a</span>
                  <div
                    className="relative h-7 overflow-hidden"
                    style={{ minWidth: 200 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={roleIdx}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col absolute left-0">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = roles[roleIdx].icon;
                            return <Icon className="w-4 h-4 text-secondary" />;
                          })()}
                          <span className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {roles[roleIdx].title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {roles[roleIdx].description}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                  <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                    {name}
                  </span>
                </motion.h1>

                {/* Title with Typewriter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-6">
                  <div className="inline-flex lg:inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary/5 backdrop-blur-sm border border-secondary/20 shadow-md">
                    <Terminal className="w-5 h-5 text-primary" />
                    <code className="text-base sm:text-lg text-foreground font-mono font-medium">
                      {displayedTitle}
                      {!isTypingComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle rounded-full"
                        />
                      )}
                    </code>
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base text-muted-foreground mb-8 leading-relaxed">
                  {bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <MagneticButton>
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base gap-2 shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Let's Connect
                      <MessageCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </MagneticButton>

                  <MagneticButton>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-6 text-base gap-2 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                      onClick={scrollToNext}>
                      <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Explore Work
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </MagneticButton>

                  <MagneticButton>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="rounded-full px-7 py-6 text-base gap-2 hover:bg-secondary/10 transition-all duration-300 group">
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      Resume
                    </Button>
                  </MagneticButton>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-sm text-muted-foreground">
                    Follow me:
                  </span>
                  {socials.map(({ Icon, href, label, color }, idx) => (
                    <motion.a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 group ${color}`}>
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-current transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Right Column - Premium Features Grid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6">
                {/* Skills Grid */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Core Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {featuredSkills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/5 border border-border hover:border-primary/30 transition-all duration-300 group">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Rotator */}
                <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-6 border border-primary/20 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      What people say
                    </h3>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3">
                      <p className="text-base text-muted-foreground italic">
                        "{testimonials[activeTestimonial].text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {testimonials[activeTestimonial].author}
                        </span>
                        <div className="flex gap-1">
                          {[
                            ...Array(testimonials[activeTestimonial].rating),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeTestimonial === idx
                            ? "w-6 bg-primary"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-4 border border-border shadow-lg text-center">
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      50+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Projects Completed
                    </div>
                  </div>
                  <div className="bg-card rounded-2xl p-4 border border-border shadow-lg text-center">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">4+</div>
                    <div className="text-xs text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                </div>

                {/* Fun Fact */}
                <div className="flex items-center gap-3 px-5 py-3 bg-card rounded-full border border-border shadow-md">
                  <Coffee className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Fueled by chai ☕ & clean code 💻
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 3.34 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 3.34 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

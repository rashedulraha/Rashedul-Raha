import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Trophy, CheckCircle2 } from "lucide-react";
import Responsive from "../Responsive/Responsive";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const AboutQuickView = () => {
  return (
    <Responsive>
      <div className="mb-10">
        {/* Heading size increased for better visibility */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
          About & Education
        </h1>
        {/* Subtitle size increased */}
        <p className="text-base text-muted-foreground max-w-2xl">
          My learning journey and the foundations that shaped my technical
          skills.
        </p>
      </div>
      {/* Bio */}
      <motion.div
        className="space-y-4 leading-relaxed"
        variants={itemVariants}
        initial="hidden"
        animate="visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-muted/40 rounded-xl border">
          {/* Text color changed to foreground/85 for better contrast */}
          <p className="text-base text-foreground/85">
            I'm{" "}
            <span className="text-foreground font-semibold">
              Rashedul Islam
            </span>
            , a{" "}
            <span className="text-primary font-semibold">
              Full-Stack Developer and AI/RAG enthusiast
            </span>{" "}
            based in Bangladesh. I build modern, scalable, and production-ready
            web applications using TypeScript, JavaScript, Python, C++, and Go.
          </p>

          <div className="space-y-5 md:space-y-10 p-5 bg-muted/40 rounded-xl border">
            <div>
              {/* Heading size increased from text-xs to text-sm */}
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                Training & Education
              </p>
              {/* Body text size increased to text-base and contrast improved */}
              <p className="text-base mb-3 text-foreground/85">
                Completed structured training where I built a strong foundation
                in{" "}
                <span className="text-foreground font-medium">
                  web development, software engineering, and core computer
                  science concepts
                </span>
                .
              </p>
              {/* List text size increased to text-base */}
              <ul className="space-y-2 text-base">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">
                    Programming Hero
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Level 1 & 2
                  </Badge>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Phitron</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-primary" />
                Key Achievement
              </p>
              <p className="text-base text-foreground/85">
                Solved{" "}
                <span className="text-primary font-bold text-lg">
                  500+ DSA problems
                </span>
                , strengthening problem-solving and system thinking abilities
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-muted/40 rounded-xl border space-y-4">
          <p className="text-base text-foreground/85">
            I enjoy working across both frontend and backend—building clean,
            responsive user interfaces and designing efficient, scalable backend
            systems and APIs. I am particularly interested in{" "}
            <span className="text-foreground font-semibold">
              Rag system design, backend architecture, and real-world software
              scalability
            </span>
            .
          </p>

          <p className="text-base text-foreground/85">
            Alongside full-stack development, I explore{" "}
            <span className="text-primary font-semibold">
              AI integrations and RAG-based systems
            </span>
            , focusing on building smarter and more intelligent applications.
          </p>

          {/* What I Bring to the Table */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              What I Bring to the Table
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground/85">
                  <span className="text-foreground font-medium">
                    Clean Code:
                  </span>{" "}
                  Writing maintainable, scalable, and well-documented code.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm sm:text-base text-foreground/85">
                  <span className="text-foreground font-medium">
                    Collaboration:
                  </span>{" "}
                  Thriving in agile teams, code reviews, and shared goals.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm sm:text-base text-foreground/85">
                  <span className="text-foreground font-medium">
                    Impact-Driven:
                  </span>{" "}
                  Translating complex business needs into technical solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-xl"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}>
          {/* Text size increased to text-base and contrast improved */}
          <p className="text-base flex items-start gap-2 text-foreground/90">
            <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span>
              I'm continuously learning, building projects, and improving my
              engineering skills with the goal of becoming a{" "}
              <span className="text-foreground font-semibold">
                strong software engineer
              </span>{" "}
              who can design and develop impactful systems.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </Responsive>
  );
};

export default AboutQuickView;

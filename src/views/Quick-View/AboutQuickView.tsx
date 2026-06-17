import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Trophy } from "lucide-react";
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
      {/* Bio */}
      <motion.div
        className="space-y-4 text-muted-foreground leading-relaxed"
        variants={itemVariants}>
        <p className="text-base">
          I'm{" "}
          <span className="text-foreground font-semibold">Rashedul Islam</span>,
          a{" "}
          <span className="text-primary font-semibold">
            Full-Stack Developer and AI/RAG enthusiast
          </span>{" "}
          based in Bangladesh. I build modern, scalable, and production-ready
          web applications using TypeScript, JavaScript, Python, C++, and Go.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-muted/40 rounded-xl border">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary" />
              Training & Education
            </p>
            <p className="text-sm mb-3 text-muted-foreground">
              Completed structured training where I built a strong foundation in{" "}
              <span className="text-foreground font-medium">
                web development, software engineering, and core computer science
                concepts
              </span>
              .
            </p>
            <ul className="space-y-2 text-sm">
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
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-primary" />
              Key Achievement
            </p>
            <p className="text-sm">
              Solved{" "}
              <span className="text-primary font-bold text-base">
                500+ DSA problems
              </span>
              , strengthening problem-solving and system thinking abilities
            </p>
          </div>
        </div>

        <p className="text-base">
          I enjoy working across both frontend and backend—building clean,
          responsive user interfaces and designing efficient, scalable backend
          systems and APIs. I am particularly interested in{" "}
          <span className="text-foreground font-semibold">
            system design, backend architecture, and real-world software
            scalability
          </span>
          .
        </p>

        <p className="text-base">
          Alongside full-stack development, I explore{" "}
          <span className="text-primary font-semibold">
            AI integrations and RAG-based systems
          </span>
          , focusing on building smarter and more intelligent applications.
        </p>

        <motion.div
          className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-xl"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}>
          <p className="text-sm flex items-start gap-2">
            <Rocket className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
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

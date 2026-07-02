"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FormState {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/rashedul",
      label: "GitHub",
      color: "hover:text-text-primary hover:border-text-primary/30",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/rashedul",
      label: "LinkedIn",
      color: "hover:text-blue-500 hover:border-blue-500/30",
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com/rashedul",
      label: "Twitter",
      color: "hover:text-accent-cyan hover:border-accent-cyan/30",
    },
  ];

  return (
    <section id="contact" className="relative w-full py-20 overflow-hidden">
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-accent-purple uppercase mb-3 block">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              Touch
            </span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed">
            Let&apos;s connect and build something spectacular together.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Direct info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/80 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                <h3 className="text-xl font-bold text-text-primary tracking-tight">
                  Let&apos;s discuss a project!
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed font-light">
                I am always open to discussing new software development
                projects, collaboration opportunities, infrastructure audits, or
                DevOps pipeline setups. Drop a message or reach out via email!
              </p>

              {/* Direct Info Items */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <Mail className="w-4 h-4 text-accent-purple shrink-0" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                    Available for new projects
                  </p>
                  <p className="text-[10px] text-text-secondary font-mono">
                    Response time: ~24 hours
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-border-subtle">
                <p className="text-xs text-text-secondary font-mono uppercase tracking-wider mb-3">
                  Connect with me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary ${social.color} hover:bg-bg-surface/80 transition-all duration-300 hover:scale-105`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle">
              <p className="text-xs text-text-secondary font-mono">
                © {new Date().getFullYear()} Md Rashedul Islam. MIT License.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/80 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-purple/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
              >
                <div className="relative">
                  <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
                  <div className="absolute inset-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-text-secondary max-w-sm">
                  Thank you for reaching out. I will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-border-subtle bg-bg-surface text-sm text-text-secondary hover:bg-bg-surface/80 hover:text-text-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono text-text-secondary uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={status === "sending"}
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-surface text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-purple/50 focus:bg-bg-surface/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono text-text-secondary uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={status === "sending"}
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-surface text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-purple/50 focus:bg-bg-surface/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                      htmlFor="message"
                      className="text-xs font-mono text-text-secondary uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                    disabled={status === "sending"}
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-surface text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-purple/50 focus:bg-bg-surface/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <p className="text-xs font-mono text-red-500 dark:text-red-400 font-semibold">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold text-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 overflow-hidden cursor-pointer hover:scale-105 active:scale-95"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-text-secondary/60 font-mono">
                  * Your information is secure and will never be shared with third parties.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

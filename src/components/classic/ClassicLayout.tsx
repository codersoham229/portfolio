"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Sparkles, 
  Compass, 
  Code, 
  ArrowUpRight, 
  GraduationCap, 
  Award,
  ChevronDown
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui/animated-button";
import { portfolioData } from "@/data/portfolioData";
import { playClickSound, playSuccessSound } from "@/utils/audio";

interface ClassicLayoutProps {
  onToggleMode: () => void;
}

export default function ClassicLayout({ onToggleMode }: ClassicLayoutProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus !== "idle") return;

    playClickSound();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      playSuccessSound();
      
      // Trigger confetti
      import("canvas-confetti").then((module) => {
        module.default({ particleCount: 120, spread: 80, origin: { y: 0.8 } });
      });
    }, 1500);
  };

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <div className="bg-[#030303] text-[#f4f4f5] min-h-screen relative font-sans selection:bg-primary/20 selection:text-white pb-16">
      
      {/* Background Gradients (Stripe-like subtle mesh) */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-primary/10 via-purple-900/5 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-[1200px] left-[-20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute top-[2200px] right-[-20%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0"></div>

      {/* Sticky Header Nav */}
      <header className="sticky top-0 z-50 glass-panel-heavy border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              SOHAM<span className="text-primary">.</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AnimatedButton 
              onClick={() => { playClickSound(); onToggleMode(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 text-xs font-semibold rounded-md text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(124,77,255,0.15)]"
            >
              <Code size={13} />
              <span>IDE Workspace Mode</span>
            </AnimatedButton>
            <AnimatedButton 
              as="a"
              href="/soham.pdf" 
              download="Soham_Malekar_CV.pdf"
              onClick={handleLinkClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-xs font-semibold rounded-md text-zinc-350 hover:bg-zinc-800 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            >
              <FileText size={13} className="text-primary" />
              <span>Download CV</span>
            </AnimatedButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-16 md:pt-28 pb-16 md:pb-24 flex flex-col md:flex-row md:items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-xs text-zinc-400 font-mono"
          >
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span>Available for Internships & Projects</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Crafting premium <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-[#00e5ff] bg-clip-text text-transparent">
                frontend interfaces
              </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Hello! I'm <span className="text-white font-semibold">{portfolioData.name}</span>, an Information Technology engineering student. I build highly responsive websites with pure structure, premium aesthetics, and interactive flows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <AnimatedButton
              onClick={() => { playClickSound(); onToggleMode(); }}
              className="px-6 py-3 bg-primary hover:bg-primary-dark border-primary text-white font-bold text-sm flex items-center gap-2"
            >
              <Code size={16} />
              <span>Explore Workspace</span>
            </AnimatedButton>
            <AnimatedButton
              as="a"
              href="#contact"
              onClick={handleLinkClick}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-350 hover:text-white font-semibold text-sm flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ChevronDown size={14} className="text-zinc-500 group-hover:translate-y-1 transition-transform" />
            </AnimatedButton>
            <AnimatedButton
              as="a"
              href="/soham.pdf"
              download="Soham_Malekar_CV.pdf"
              onClick={handleLinkClick}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-350 hover:text-white font-semibold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            >
              <FileText size={16} className="text-primary" />
              <span>Download CV</span>
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Profile Image & Glowing Card (Apple/Linear style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 max-w-md mx-auto md:mx-0 w-full"
        >
          <div className="relative group p-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden glass-panel">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900/60 font-mono text-[10px] text-zinc-500">
              <span>soham_bio_card.js</span>
              <span className="text-primary font-bold">● ONLINE</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/images.jpg"
                  alt={portfolioData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/40"
                />
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{portfolioData.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono">{portfolioData.title}</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-zinc-400">
                <div className="flex gap-2">
                  <span className="text-primary">const</span>
                  <span className="text-blue-400">academicScore</span>
                  <span className="text-white">=</span>
                  <span className="text-emerald-400">"{portfolioData.score}"</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">const</span>
                  <span className="text-blue-400">location</span>
                  <span className="text-white">=</span>
                  <span className="text-emerald-400">"{portfolioData.location}"</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">const</span>
                  <span className="text-blue-400">institute</span>
                  <span className="text-white">=</span>
                  <span className="text-emerald-400">"Vidyalankar"</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-primary/30 pl-3">
                "I view web development not just as writing code, but as building digital workspaces that are highly visual, elegant, and interactive."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About & Education Section */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-4 py-16 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 items-start">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono mb-2">// EDUCATION & BACKGROUND</h2>
              <h3 className="text-2xl font-bold text-white">Academic Foundation</h3>
            </div>
            <AnimatedButton
              as="a"
              href="/soham.pdf"
              download="Soham_Malekar_CV.pdf"
              onClick={handleLinkClick}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-350 hover:text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            >
              <FileText size={14} className="text-primary" />
              <span>Download CV</span>
            </AnimatedButton>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                <GraduationCap size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">{portfolioData.education.school}</h4>
                <p className="text-xs text-zinc-300 font-semibold">{portfolioData.education.diploma}</p>
                <p className="text-xs text-zinc-500">Pursuing Information Technology Diploma</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
              <div className="w-10 h-10 bg-[#00c853]/10 rounded-lg flex items-center justify-center text-[#00c853] border border-[#00c853]/20">
                <Award size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Academic Score</h4>
                <p className="text-2xl font-extrabold text-[#00c853]">{portfolioData.score}</p>
                <p className="text-xs text-zinc-500">Aggregated performance across semesters.</p>
              </div>
            </div>

            <div className="sm:col-span-2 glass-panel p-6 rounded-xl border border-zinc-900 space-y-3">
              <h4 className="text-xs font-bold font-mono text-zinc-400 flex items-center gap-1">
                <Sparkles size={12} className="text-primary" />
                <span>VIIE Comprehensive Coursework</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {portfolioData.education.extra}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-4 py-16 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono mb-2">// TECHNICAL CAPABILITIES</h2>
            <h3 className="text-2xl font-bold text-white mb-4">Core Skillsets</h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Proficiencies in client-side architectures, UI/UX tools, and prompt engineering protocols.
            </p>
          </div>
          <div className="md:col-span-2 space-y-6">
            {portfolioData.skills.map((category) => (
              <div key={category.category} className="glass-panel p-6 rounded-xl border border-zinc-900 space-y-4">
                <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">{skill.name}</span>
                        <span className="text-primary font-bold">{skill.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 relative">
                        <div
                          style={{ width: `${skill.percentage}%` }}
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-4 py-16 border-t border-zinc-900/60">
        <div className="space-y-2 mb-10 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono">// WORK & DEMOS</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Featured Engineering Work</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <div
              key={project.title}
              className="glass-panel rounded-xl overflow-hidden border border-zinc-900 hover:border-primary/50 group flex flex-col justify-between h-full transition-all duration-300 shadow-xl"
            >
              <div className="relative h-56 bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-60 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-80 group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-zinc-950 text-zinc-400 rounded-md border border-zinc-900">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span>{project.title}</span>
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <AnimatedButton
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="flex-1 py-2 px-4 bg-primary hover:bg-primary-dark border-primary text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Site</span>
                    <ArrowUpRight size={13} />
                  </AnimatedButton>
                  <AnimatedButton
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="flex-1 py-2 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 hover:text-white text-xs flex items-center justify-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-4 py-16 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono mb-2">// GET IN TOUCH</h2>
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-6">
              I am open to discussions regarding internship opportunities, prompt engineering work, or UI design consultations.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail size={15} className="text-primary shrink-0" />
                <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-white transition-colors">{portfolioData.contact.email}</a>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone size={15} className="text-[#00c853] shrink-0" />
                <span>{portfolioData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={15} className="text-blue-400 shrink-0" />
                <span>{portfolioData.contact.location}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              {[
                { icon: <GithubIcon className="w-4 h-4" />, url: portfolioData.contact.github },
                { icon: <LinkedinIcon className="w-4 h-4" />, url: portfolioData.contact.linkedin },
                { icon: <InstagramIcon className="w-4 h-4" />, url: portfolioData.contact.instagram }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="w-9 h-9 bg-zinc-900 hover:bg-primary border border-zinc-800 hover:border-primary text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="glass-panel p-6 md:p-8 rounded-xl border border-zinc-900">
              {formStatus === "idle" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="c-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Name</label>
                      <input
                        type="text"
                        id="c-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="c-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Email</label>
                      <input
                        type="email"
                        id="c-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-subject" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Subject</label>
                    <input
                      type="text"
                      id="c-subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="c-message" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Message</label>
                    <textarea
                      id="c-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary-dark border-primary text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Mail size={13} />
                    <span>Send Message</span>
                  </AnimatedButton>
                </form>
              )}

              {formStatus === "sending" && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-zinc-400 font-mono">Transmitting secure packet...</p>
                </div>
              )}

              {formStatus === "success" && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 bg-success/10 border border-success/30 rounded-full flex items-center justify-center text-success animate-bounce">
                    <Sparkles size={22} />
                  </div>
                  <h4 className="text-base font-bold text-white">Message Transmitted!</h4>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    Thank you {formData.name}. The transmission was successful. Soham will check the incoming logs and respond.
                  </p>
                  <AnimatedButton
                    onClick={() => { playClickSound(); setFormStatus("idle"); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors"
                  >
                    Send Another Packet
                  </AnimatedButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-4 pt-16 border-t border-zinc-900/60 text-center font-mono text-[10px] text-zinc-500">
        <p>© 2026 Soham Malekar. Co-designed with Google DeepMind Antigravity AI.</p>
      </footer>
    </div>
  );
}

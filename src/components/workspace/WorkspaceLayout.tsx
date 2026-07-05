"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FileCode, 
  Terminal as TerminalIcon, 
  User, 
  Briefcase, 
  Cpu, 
  Mail, 
  GitBranch, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  X,
  FileText,
  Clock,
  Compass,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolioData";
import Terminal from "./Terminal";
import { playKeySound, playClickSound, playSuccessSound } from "@/utils/audio";
import AnimatedButton from "@/components/ui/animated-button";

interface WorkspaceLayoutProps {
  onToggleMode: () => void;
}

export default function WorkspaceLayout({ onToggleMode }: WorkspaceLayoutProps) {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openTabs, setOpenTabs] = useState(["README.md"]);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [time, setTime] = useState("");
  const [activeViewMode, setActiveViewMode] = useState<"visual" | "code">("visual"); // visual cards vs raw code
  
  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [contactLogs, setContactLogs] = useState<string[]>([]);

  // Sound wrapper
  const triggerSound = (type: "key" | "click" | "success") => {
    if (!soundEnabled) return;
    if (type === "key") playKeySound();
    if (type === "click") playClickSound();
    if (type === "success") playSuccessSound();
  };

  // Clock effect
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenFile = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const name = customEvent.detail;
        if (!openTabs.includes(name)) {
          setOpenTabs(prev => [...prev, name]);
        }
        setActiveFile(name);
      }
    };
    window.addEventListener("workspace-open-file", handleOpenFile);
    return () => window.removeEventListener("workspace-open-file", handleOpenFile);
  }, [openTabs]);

  const openFile = (fileName: string) => {
    triggerSound("click");
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
  };

  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerSound("click");
    const updatedTabs = openTabs.filter((t) => t !== fileName);
    setOpenTabs(updatedTabs);
    
    if (activeFile === fileName && updatedTabs.length > 0) {
      setActiveFile(updatedTabs[updatedTabs.length - 1]);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus !== "idle") return;
    
    triggerSound("click");
    setFormStatus("sending");
    setContactLogs(["Initializing secure POST connection to mail server...", "Endpoint resolves to sohamgamer99@gmail.com"]);

    setTimeout(() => {
      setContactLogs(prev => [...prev, "Authorizing handshake protocols...", "Encrypting payload data..."]);
      
      setTimeout(() => {
        setContactLogs(prev => [...prev, "Payload dispatched successfully.", "HTTP 200 OK - Message logged in terminal!"]);
        setFormStatus("success");
        triggerSound("success");
        
        // Trigger confetti
        import("canvas-confetti").then((module) => {
          module.default({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
        });
      }, 1000);
    }, 1000);
  };

  const resetContactForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormStatus("idle");
    setContactLogs([]);
    triggerSound("click");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden select-none font-sans text-sm antialiased text-[#e4e4e7]">
      {/* Top Header/Window Control Bar */}
      <header className="h-11 bg-[#09090b] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          {/* Virtual macOS Close/Min/Max Dot buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors" onClick={onToggleMode} title="Toggle Classic Mode"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800 hidden md:block"></div>
          <span className="text-xs text-zinc-500 font-mono hidden md:inline-flex items-center gap-1.5">
            <Sparkles size={11} className="text-primary animate-pulse" />
            soham-malekar-workspace.lnk
          </span>
        </div>

        {/* Global Nav tabs */}
        <div className="flex items-center gap-2">
          <AnimatedButton 
            onClick={onToggleMode} 
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs rounded-md text-zinc-400 hover:text-white transition-all"
          >
            <Compass size={12} className="text-primary" />
            <span>Classic Landing Mode</span>
          </AnimatedButton>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute typing sound" : "Unmute typing sound"}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      {/* Main Core Layout (Sidebar + Editor + Terminal) */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* Left VS Code Side Activity Bar */}
        <aside className="w-12 bg-[#050507] border-r border-zinc-900 flex flex-col items-center py-4 justify-between shrink-0 hidden sm:flex">
          <div className="flex flex-col gap-5 items-center w-full">
            <button className="p-2 text-primary hover:text-white transition-colors" title="Explorer">
              <FileCode size={20} />
            </button>
            <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={onToggleMode} title="View Classic Site">
              <Compass size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button 
              className={`p-2 transition-colors ${soundEnabled ? 'text-primary' : 'text-zinc-600'}`} 
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </aside>

        {/* Directory Explorer Sidebar */}
        <nav className="w-56 bg-[#09090b] border-r border-zinc-900 flex flex-col shrink-0 overflow-y-auto hidden md:flex font-mono text-xs">
          <div className="p-3 border-b border-zinc-900 flex items-center justify-between">
            <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">Explorer</span>
          </div>

          <div className="p-2">
            <div className="flex items-center gap-1.5 p-1 text-zinc-300 font-semibold cursor-pointer">
              <ChevronDown size={14} className="text-zinc-500" />
              <Folder size={14} className="text-primary" />
              <span>portfolio-workspace</span>
            </div>
            
            <div className="pl-4 space-y-1">
              {[
                { name: "README.md", icon: <User size={13} className="text-blue-400" /> },
                { name: "projects.json", icon: <Briefcase size={13} className="text-yellow-500" /> },
                { name: "skills.ts", icon: <Cpu size={13} className="text-purple-400" /> },
                { name: "contact.json", icon: <Mail size={13} className="text-green-400" /> },
                { name: "terminal.sh", icon: <TerminalIcon size={13} className="text-teal-400" /> }
              ].map((file) => (
                <div
                  key={file.name}
                  onClick={() => openFile(file.name)}
                  className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer hover:bg-zinc-900 group transition-colors ${
                    activeFile === file.name 
                      ? "bg-zinc-900 text-white font-medium border-l-2 border-primary" 
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {file.icon}
                    <span>{file.name}</span>
                  </div>
                  {openTabs.includes(file.name) && (
                    <X 
                      size={12} 
                      className="opacity-0 group-hover:opacity-100 hover:bg-zinc-800 rounded p-0.5" 
                      onClick={(e) => closeTab(file.name, e)} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Editor Area & Terminal Drawer (Vertical Split) */}
        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Tabs bar */}
          <div className="h-10 bg-[#09090b] border-b border-zinc-900 flex items-center justify-between px-2 overflow-x-auto shrink-0 scrollbar-none">
            <div className="flex items-center gap-1">
              {openTabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => openFile(tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 border-r border-zinc-900 cursor-pointer text-xs font-mono select-none transition-all ${
                    activeFile === tab
                      ? "bg-background text-white border-t-2 border-primary"
                      : "bg-[#09090b]/50 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span>{tab}</span>
                  <X
                    size={11}
                    className="hover:bg-zinc-800 rounded p-0.5 text-zinc-500 hover:text-white"
                    onClick={(e) => closeTab(tab, e)}
                  />
                </div>
              ))}
            </div>
            
            {/* Code / Visual toggle for JSON and TS files */}
            {["projects.json", "skills.ts", "contact.json"].includes(activeFile) && (
              <div className="flex items-center gap-1 px-2 border border-zinc-800 rounded-md bg-zinc-950 p-0.5 select-none shrink-0 mr-2 text-[11px]">
                <button
                  onClick={() => { triggerSound("click"); setActiveViewMode("visual"); }}
                  className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                    activeViewMode === "visual"
                      ? "bg-primary text-white shadow-sm font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Sparkles size={10} />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => { triggerSound("click"); setActiveViewMode("code"); }}
                  className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                    activeViewMode === "code"
                      ? "bg-primary text-white shadow-sm font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code size={10} />
                  <span>Source</span>
                </button>
              </div>
            )}
          </div>

          {/* Active File Content Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 grid-overlay relative">
            <AnimatePresence mode="wait">
              {openTabs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center font-mono text-zinc-600 gap-2"
                >
                  <FileText size={40} className="text-zinc-800" />
                  <span>No open files. Select a file from the explorer or type 'help' in the terminal.</span>
                </motion.div>
              ) : (
                <motion.div
                  key={activeFile}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="h-full"
                >
                  {/* File renderer: README.md */}
                  {activeFile === "README.md" && (
                    <article className="max-w-3xl mx-auto prose prose-invert bg-[#09090b]/80 border border-zinc-800/80 rounded-lg p-5 md:p-8 backdrop-blur-md shadow-xl text-zinc-300 space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                        <div>
                          <div className="text-primary font-mono text-xs uppercase tracking-widest mb-1">Interactive Resume</div>
                          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{portfolioData.name}</h1>
                          <p className="text-lg text-zinc-400 font-medium">{portfolioData.title}</p>
                          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-500 bg-zinc-950/80 px-3 py-1.5 rounded-full border border-zinc-900 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            <span>Mumbai, IN • Available for internship</span>
                          </div>
                        </div>
                        <div className="relative group self-center md:self-auto">
                          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                          <img
                            src="/images.jpg"
                            alt={portfolioData.name}
                            className="relative w-24 h-24 rounded-full object-cover border-2 border-primary/50 shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                          <User size={16} className="text-primary" />
                          <span>Biography</span>
                        </h2>
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                          {portfolioData.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-zinc-950/50 border border-zinc-900 rounded-lg space-y-2">
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Academic Score</h3>
                          <p className="text-2xl font-bold text-[#00c853]">{portfolioData.score}</p>
                          <p className="text-xs text-zinc-500">3rd Semester average, Information Technology.</p>
                        </div>
                        <div className="p-4 bg-zinc-950/50 border border-zinc-900 rounded-lg space-y-2">
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">University & Major</h3>
                          <p className="text-sm font-bold text-white leading-tight">{portfolioData.education.school}</p>
                          <p className="text-xs text-zinc-400 font-mono">{portfolioData.education.diploma}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <Sparkles size={14} className="text-primary" />
                          <span>Global Education (VIIE Expansion)</span>
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {portfolioData.education.extra}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                        <AnimatedButton 
                          as="a"
                          href="/soham.pdf" 
                          download="Soham_Malekar_CV.pdf"
                          className="px-4 py-2 bg-primary border-primary text-white font-semibold rounded-md transition-all text-xs flex items-center gap-2"
                        >
                          <FileText size={14} />
                          <span>Download CV (PDF)</span>
                        </AnimatedButton>
                        <AnimatedButton 
                          onClick={() => openFile("contact.json")}
                          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-200 rounded-md transition-all text-xs flex items-center gap-2"
                        >
                          <Mail size={14} className="text-zinc-500" />
                          <span>Connect Directly</span>
                        </AnimatedButton>
                      </div>
                    </article>
                  )}

                  {/* File renderer: projects.json */}
                  {activeFile === "projects.json" && (
                    <div className="h-full">
                      {activeViewMode === "code" ? (
                        <pre className="font-mono text-xs md:text-sm text-yellow-300 bg-[#09090b]/80 border border-zinc-800 p-4 md:p-6 rounded-lg overflow-x-auto shadow-xl">
                          <code>{JSON.stringify(portfolioData.projects, null, 2)}</code>
                        </pre>
                      ) : (
                        <div className="max-w-4xl mx-auto space-y-6">
                          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                            <div>
                              <h2 className="text-xl font-bold text-white">Visual Card Gallery</h2>
                              <p className="text-xs text-zinc-500 font-mono">Rendered dynamic objects from: projects.json</p>
                            </div>
                            <span className="text-xs text-zinc-500 font-mono">Length: {portfolioData.projects.length} entries</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolioData.projects.map((project, idx) => (
                              <motion.div
                                key={project.title}
                                whileHover={{ y: -5 }}
                                className="glass-panel rounded-lg overflow-hidden flex flex-col group border border-zinc-800 hover:border-primary/50 transition-all shadow-lg"
                              >
                                <div className="h-44 bg-zinc-900 relative overflow-hidden flex items-center justify-center border-b border-zinc-800">
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent opacity-80 z-10"></div>
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 opacity-90"
                                  />
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                                  <div className="space-y-2">
                                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                      <span>{project.title}</span>
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                      {project.description}
                                    </p>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="flex flex-wrap gap-1.5">
                                      {project.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 text-zinc-400 rounded-md border border-zinc-900">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-white bg-primary hover:bg-primary-dark font-medium px-3 py-1.5 rounded transition-all text-center flex-1"
                                      >
                                        Live Demo
                                      </a>
                                      <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-zinc-800 px-3 py-1.5 rounded transition-all text-center flex-1"
                                      >
                                        Source Code
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* File renderer: skills.ts */}
                  {activeFile === "skills.ts" && (
                    <div className="h-full">
                      {activeViewMode === "code" ? (
                        <pre className="font-mono text-xs md:text-sm text-purple-300 bg-[#09090b]/80 border border-zinc-800 p-4 md:p-6 rounded-lg overflow-x-auto shadow-xl">
                          <code>{`export interface Skill {
  name: string;
  level: number; // percentage
}

export const skills: Record<string, Skill[]> = {
${portfolioData.skills.map(cat => `  "${cat.category}": [
${cat.items.map(s => `    { name: "${s.name}", level: ${s.percentage} }`).join(",\n")}
  ]`).join(",\n")}
};`}</code>
                        </pre>
                      ) : (
                        <div className="max-w-3xl mx-auto space-y-6">
                          <div className="pb-4 border-b border-zinc-800">
                            <h2 className="text-xl font-bold text-white">Skill Matrix Preview</h2>
                            <p className="text-xs text-zinc-500 font-mono">Mapped arrays from: skills.ts</p>
                          </div>

                          <div className="space-y-6">
                            {portfolioData.skills.map((category) => (
                              <div key={category.category} className="glass-panel p-5 rounded-lg border border-zinc-800">
                                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 text-primary">
                                  // {category.category}
                                </h3>
                                <div className="space-y-4">
                                  {category.items.map((skill) => (
                                    <div key={skill.name} className="space-y-1.5">
                                      <div className="flex justify-between text-xs font-mono">
                                        <span className="text-zinc-300 font-medium">{skill.name}</span>
                                        <span className="text-primary font-bold">{skill.percentage}%</span>
                                      </div>
                                      <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 relative">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${skill.percentage}%` }}
                                          transition={{ duration: 1, ease: "easeOut" }}
                                          className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full relative"
                                        >
                                          {/* Animated shimmer on progress bar */}
                                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                                        </motion.div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* File renderer: contact.json */}
                  {activeFile === "contact.json" && (
                    <div className="h-full">
                      {activeViewMode === "code" ? (
                        <pre className="font-mono text-xs md:text-sm text-green-400 bg-[#09090b]/80 border border-zinc-800 p-4 md:p-6 rounded-lg overflow-x-auto shadow-xl">
                          <code>{JSON.stringify(portfolioData.contact, null, 2)}</code>
                        </pre>
                      ) : (
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          {/* Info panel */}
                          <div className="glass-panel p-5 md:p-6 rounded-lg border border-zinc-800 space-y-6">
                            <div>
                              <h2 className="text-xl font-bold text-white mb-1">Direct Contacts</h2>
                              <p className="text-xs text-zinc-500 font-mono">Attributes from: contact.json</p>
                            </div>

                            <div className="space-y-4 text-xs font-mono">
                              <div className="p-3 bg-zinc-950/50 rounded-md border border-zinc-900 flex items-center gap-3">
                                <Mail size={16} className="text-primary shrink-0" />
                                <div>
                                  <div className="text-zinc-500 uppercase tracking-wider text-[9px]">Email Address</div>
                                  <a href={`mailto:${portfolioData.contact.email}`} className="text-zinc-300 hover:text-white transition-colors">{portfolioData.contact.email}</a>
                                </div>
                              </div>

                              <div className="p-3 bg-zinc-950/50 rounded-md border border-zinc-900 flex items-center gap-3">
                                <Clock size={16} className="text-teal-400 shrink-0" />
                                <div>
                                  <div className="text-zinc-500 uppercase tracking-wider text-[9px]">Phone / WhatsApp</div>
                                  <span className="text-zinc-300">{portfolioData.contact.phone}</span>
                                </div>
                              </div>

                              <div className="p-3 bg-zinc-950/50 rounded-md border border-zinc-900 flex items-center gap-3">
                                <GitBranch size={16} className="text-blue-400 shrink-0" />
                                <div>
                                  <div className="text-zinc-500 uppercase tracking-wider text-[9px]">Location</div>
                                  <span className="text-zinc-300">{portfolioData.contact.location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-900">
                              <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-3">External Links</div>
                              <div className="flex gap-2">
                                {[
                                  { name: "GitHub", url: portfolioData.contact.github },
                                  { name: "LinkedIn", url: portfolioData.contact.linkedin },
                                  { name: "Instagram", url: portfolioData.contact.instagram }
                                ].map((soc) => (
                                  <a
                                    key={soc.name}
                                    href={soc.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded text-xs transition-colors"
                                  >
                                    {soc.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Interactive Form Panel */}
                          <div className="glass-panel p-5 md:p-6 rounded-lg border border-zinc-800 space-y-4">
                            <h3 className="text-base font-bold text-white">Send secure message</h3>
                            
                            {formStatus === "idle" && (
                              <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label htmlFor="form-name" className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Name</label>
                                    <input
                                      type="text"
                                      id="form-name"
                                      required
                                      value={formData.name}
                                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-primary transition-colors"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label htmlFor="form-email" className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Email</label>
                                    <input
                                      type="email"
                                      id="form-email"
                                      required
                                      value={formData.email}
                                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-primary transition-colors"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label htmlFor="form-subject" className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Subject</label>
                                  <input
                                    type="text"
                                    id="form-subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-primary transition-colors"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label htmlFor="form-message" className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Message</label>
                                  <textarea
                                    id="form-message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-primary transition-colors resize-none"
                                  />
                                </div>

                                <AnimatedButton
                                  type="submit"
                                  className="w-full py-2 bg-primary hover:bg-primary-dark border-primary text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <Mail size={13} />
                                  <span>Submit Payload</span>
                                </AnimatedButton>
                              </form>
                            )}

                            {formStatus === "sending" && (
                              <div className="py-6 flex flex-col items-center justify-center space-y-4">
                                <RefreshCw size={24} className="text-primary animate-spin" />
                                <div className="w-full bg-zinc-950 rounded border border-zinc-900 p-4 font-mono text-[10px] text-zinc-400 space-y-1 max-h-32 overflow-y-auto">
                                  {contactLogs.map((log, i) => (
                                    <div key={i} className="flex gap-1.5">
                                      <span className="text-[#00c853]">&gt;</span>
                                      <span>{log}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {formStatus === "success" && (
                              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-12 h-12 bg-success/15 border border-success/30 rounded-full flex items-center justify-center text-success animate-bounce">
                                  <Sparkles size={24} />
                                </div>
                                <h4 className="text-sm font-bold text-white">Transmission Successful!</h4>
                                <p className="text-xs text-zinc-400 max-w-xs">
                                  Hey {formData.name}, your message has been transmitted. Soham will get back to you shortly.
                                </p>
                                <div className="w-full bg-zinc-950 rounded border border-zinc-900 p-4 font-mono text-[10px] text-zinc-450 text-left space-y-1">
                                  {contactLogs.map((log, i) => (
                                    <div key={i} className="flex gap-1.5">
                                      <span className="text-[#00c853]">&gt;</span>
                                      <span>{log}</span>
                                    </div>
                                  ))}
                                </div>
                                <AnimatedButton
                                  onClick={resetContactForm}
                                  className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded border border-zinc-800 text-xs transition-colors"
                                >
                                  Send Another
                                </AnimatedButton>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* File renderer: terminal.sh */}
                  {activeFile === "terminal.sh" && (
                    <div className="h-[55vh] md:h-[65vh] border border-zinc-850 rounded-lg overflow-hidden shadow-2xl">
                      <Terminal onOpenFile={openFile} playSound={() => triggerSound("key")} />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Integrated Workspace Drawer Terminal (always available at bottom unless collapsed) */}
          {activeFile !== "terminal.sh" && (
            <div className={`border-t border-zinc-900 flex flex-col ${terminalCollapsed ? "h-9" : "h-48 md:h-56"} transition-all shrink-0`}>
              <div 
                className="h-9 bg-[#09090b] flex items-center justify-between px-4 cursor-pointer select-none shrink-0"
                onClick={() => { triggerSound("click"); setTerminalCollapsed(!terminalCollapsed); }}
              >
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className={terminalCollapsed ? "text-zinc-500" : "text-primary"} />
                  <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-wider">Terminal drawer</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span>{terminalCollapsed ? "[Expand]" : "[Collapse]"}</span>
                </div>
              </div>
              
              {!terminalCollapsed && (
                <div className="flex-1 overflow-hidden">
                  <Terminal onOpenFile={openFile} playSound={() => triggerSound("key")} />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Editor Status Bar */}
      <footer className="h-6 bg-[#09090b] border-t border-zinc-900 px-4 flex items-center justify-between font-mono text-[10px] text-zinc-500 shrink-0 select-none z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-primary">
            <GitBranch size={11} />
            <span>main</span>
          </div>
          <div className="w-[1px] h-3 bg-zinc-800"></div>
          <span className="hidden sm:inline">1 commit (DeepMind Antigravity AI)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock size={11} className="text-zinc-500" />
            <span>Mumbai Time: {time || "00:00:00"}</span>
          </div>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden md:inline">{activeFile.endsWith(".md") ? "Markdown" : activeFile.endsWith(".json") ? "JSON" : "TypeScript"}</span>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, User, Briefcase, Cpu, Mail, Download, RefreshCw, X, Compass, Code, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playSuccessSound } from "@/utils/audio";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  onOpenFile?: (fileName: string) => void;
  onToggleMode: () => void;
  currentMode: "workspace" | "classic";
}

export default function CommandPalette({ onOpenFile, onToggleMode, currentMode }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sound triggers
  const clickSound = () => playClickSound();
  const successSound = () => playSuccessSound();

  // Keyboard listeners for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setSearch("");
        setActiveIndex(0);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    {
      id: "toggle-mode",
      name: currentMode === "workspace" ? "Switch to Classic Mode" : "Switch to Workspace IDE Mode",
      category: "Navigation",
      icon: currentMode === "workspace" ? <Compass size={14} className="text-primary" /> : <Code size={14} className="text-primary" />,
      action: () => {
        onToggleMode();
        setIsOpen(false);
      }
    },
    {
      id: "open-readme",
      name: "Open README.md (Bio & Info)",
      category: "Files",
      icon: <User size={14} className="text-blue-400" />,
      action: () => {
        if (currentMode !== "workspace") onToggleMode();
        if (onOpenFile) onOpenFile("README.md");
        setIsOpen(false);
      }
    },
    {
      id: "open-projects",
      name: "Open projects.json (Works & Links)",
      category: "Files",
      icon: <Briefcase size={14} className="text-yellow-500" />,
      action: () => {
        if (currentMode !== "workspace") onToggleMode();
        if (onOpenFile) onOpenFile("projects.json");
        setIsOpen(false);
      }
    },
    {
      id: "open-skills",
      name: "Open skills.ts (Capabilities)",
      category: "Files",
      icon: <Cpu size={14} className="text-purple-400" />,
      action: () => {
        if (currentMode !== "workspace") onToggleMode();
        if (onOpenFile) onOpenFile("skills.ts");
        setIsOpen(false);
      }
    },
    {
      id: "open-contact",
      name: "Open contact.json (Connect & Form)",
      category: "Files",
      icon: <Mail size={14} className="text-green-400" />,
      action: () => {
        if (currentMode !== "workspace") onToggleMode();
        if (onOpenFile) onOpenFile("contact.json");
        setIsOpen(false);
      }
    },
    {
      id: "open-terminal",
      name: "Open terminal.sh (Shell Prompt)",
      category: "Files",
      icon: <Terminal size={14} className="text-teal-400" />,
      action: () => {
        if (currentMode !== "workspace") onToggleMode();
        if (onOpenFile) onOpenFile("terminal.sh");
        setIsOpen(false);
      }
    },
    {
      id: "download-resume",
      name: "Download CV / Resume PDF",
      category: "Actions",
      icon: <Download size={14} className="text-zinc-400" />,
      action: () => {
        window.open("/soham.pdf", "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "trigger-confetti",
      name: "Celebrate (Confetti Burst)",
      category: "Actions",
      icon: <Sparkles size={14} className="text-purple-500" />,
      action: () => {
        import("canvas-confetti").then((module) => {
          module.default({ particleCount: 150, spread: 80 });
        });
        successSound();
        setIsOpen(false);
      }
    }
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    clickSound();
    item.action();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        handleSelect(filteredItems[activeIndex]);
      }
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* Floating Prompt Bar Helper (Vercel style at screen center/top) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button 
          onClick={() => { clickSound(); setIsOpen(true); }}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs font-mono shadow-xl transition-all cursor-pointer backdrop-blur-md glow-effect"
        >
          <Search size={13} className="text-primary" />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[10px]">Ctrl+K</kbd>
          <span>to search</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Overlay background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Dialog Panel */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg bg-[#09090b] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden glass-panel-heavy z-10 font-mono text-xs text-zinc-300"
            >
              {/* Search Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-850">
                <Search size={16} className="text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search files..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white placeholder-zinc-500"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300 p-0.5">
                  <X size={14} />
                </button>
              </div>

              {/* Suggestions list */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                {filteredItems.length === 0 ? (
                  <div className="py-6 text-center text-zinc-500">No results found for "{search}"</div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? "bg-primary text-white font-medium" 
                            : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isSelected ? "text-white" : "text-zinc-400"}>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                          isSelected ? "bg-white/20 text-white" : "bg-zinc-950 border border-zinc-900 text-zinc-500"
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Command palette helper footer */}
              <div className="px-4 py-2 border-t border-zinc-850 bg-zinc-950/50 flex justify-between items-center text-[10px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span>Use keys</span>
                  <kbd className="px-1 bg-zinc-900 border border-zinc-800 rounded">↑↓</kbd>
                  <span>to navigate</span>
                  <kbd className="px-1 bg-zinc-900 border border-zinc-800 rounded">Enter</kbd>
                  <span>to select</span>
                </div>
                <span>ESC to exit</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

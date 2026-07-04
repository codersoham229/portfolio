"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];

export default function GalaxyScrollNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          // Special check for bottom of page to set to contact
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            setActiveSection("contact");
            ticking = false;
            return;
          }

          for (const section of SECTIONS) {
            const el = document.getElementById(section.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = id === "hero" ? document.documentElement : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-6 pointer-events-auto">
      {/* Side Track Label on Hover */}
      <AnimatePresence>
        {(hoveredSection || activeSection) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-8 bg-zinc-950/80 border border-zinc-900 text-[10px] font-mono uppercase tracking-widest text-zinc-400 px-2.5 py-1 rounded-md backdrop-blur-md pointer-events-none whitespace-nowrap"
            style={{
              top: `${SECTIONS.findIndex(s => s.id === (hoveredSection || activeSection)) * 40 + 8}px`
            }}
          >
            {SECTIONS.find(s => s.id === (hoveredSection || activeSection))?.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Navigation Track Line */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-zinc-900" />
      
      {/* Galaxy timeline scroll progress overlay */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-emerald-500/40 pointer-events-none opacity-40" />

      {/* Nav dots */}
      <div className="flex flex-col gap-8 relative z-10">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          
          return (
            <button
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative w-4 h-4 flex items-center justify-center group cursor-pointer focus:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Outer galaxy aura ring */}
              {isActive && (
                <motion.div
                  layoutId="galaxyActiveRing"
                  className="absolute inset-0 rounded-full border border-cyan-500/60 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Dot circle element matching first screenshot */}
              <div
                className={cn(
                  "w-2 h-2 rounded-full border transition-all duration-300 relative z-10",
                  isActive
                    ? "bg-white border-white scale-110 shadow-[0_0_10px_#fff]"
                    : "bg-zinc-950 border-zinc-700 group-hover:border-zinc-400 group-hover:scale-105"
                )}
              >
                {/* Micro particle orbits for "galaxy type" effect */}
                {isActive && (
                  <>
                    <span className="absolute -inset-1 rounded-full border border-purple-500/30 animate-ping opacity-60 pointer-events-none" />
                    <span className="absolute -inset-2 rounded-full border border-cyan-500/10 animate-pulse pointer-events-none" />
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

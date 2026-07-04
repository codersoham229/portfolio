"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Refs for the "light" positions so we can animate them imperatively
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      // Direct update for immediate feedback (no spring for the mouse itself, feels snappier)
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      // When mouse leaves, spring the spotlight back to the active item
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        }
      });
    }
  }, [activeIndex]);

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
    
    // Smooth scroll to target id
    if (item.href.startsWith("#")) {
      const targetId = item.href.slice(1);
      const targetElement = targetId ? document.getElementById(targetId) : document.documentElement;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("relative flex justify-center pt-6 z-50", className)}>
      <nav
        ref={navRef}
        style={{
          ["--spotlight-color" as any]: "rgba(124, 77, 255, 0.15)", // Theme violet spotlight
          ["--ambience-color" as any]: "rgba(124, 77, 255, 1)"      // Theme violet indicator
        }}
        className={cn(
          "spotlight-nav bg-zinc-950/80 border border-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.8)]",
          "relative h-11 rounded-full transition-all duration-300 overflow-hidden flex items-center"
        )}
      >
        {/* Content */}
        <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item, idx);
                }}
                className={cn(
                  "px-4 py-2 text-xs font-semibold tracking-wider uppercase font-mono transition-colors duration-200 rounded-full",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  // Active vs Inactive Text
                  activeIndex === idx
                    ? "text-white"
                    : "text-zinc-550 hover:text-white"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* LIGHTING LAYERS */}
        {/* 1. Moving Spotlight */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color) 0%, 
                transparent 50%
              )
            `
          }}
        />

        {/* 2. Active Ambience */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
              radial-gradient(
                60px circle at var(--ambience-x) 0%, 
                var(--ambience-color) 0%, 
                transparent 100%
              )
            `
          }}
        />
      </nav>
    </div>
  );
}

export default SpotlightNavbar;

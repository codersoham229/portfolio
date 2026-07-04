"use client";

import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Sparkles, 
  Code, 
  ArrowUpRight, 
  GraduationCap, 
  Award,
  ChevronDown,
  Clock,
  ExternalLink,
  Laptop,
  Cpu,
  MessageSquare,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolioData";
import { playClickSound, playSuccessSound } from "@/utils/audio";
import DiagonalCarousel from "@/components/ui/diagonal-carousel";
import AnimatedButton from "@/components/ui/animated-button";
import Orb from "@/components/ui/orb";
import ParticleEffectHero, { AntiGravityCanvas } from "@/components/ui/particle-effect-for-hero";
import MagicRings from "@/components/ui/magic-rings";
import SpotlightNavbar from "@/components/ui/spotlight-navbar";
import { ParticleHero } from "@/components/ui/particle-hero";
import GalaxyScrollNav from "@/components/ui/galaxy-scroll-nav";

// Inline Custom Brand Icons for reliability
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

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

// SVG Logos for Skills
const Html5Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#E34F26" {...props}>
    <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm7.031 9.75l-.232-2.625h9.402l-.234-2.625H6.094l.697 7.875h7.52l-.28 3.125-2.031.547-2.031-.547-.13-.1.13-.146-.098-1.1h-2.61l.178 2.008L12 19.469l4.945-1.375.651-7.313H8.531z"/>
  </svg>
);

const Css3Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1572B6" {...props}>
    <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm7.031 9.75l-.232-2.625h9.402l-.234-2.625H6.094l.697 7.875h7.52l-.28 3.125-2.031.547-2.031-.547-.13-.1.13-.146-.098-1.1h-2.61l.178 2.008L12 19.469l4.945-1.375.651-7.313H8.531z"/>
  </svg>
);

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3 3 3 0 0 0 3-3V5a3 3 0 0 0-3-3z" fill="#F24E1E"/>
    <path d="M6 10a3 3 0 0 0 3 3h3V7H9a3 3 0 0 0-3 3z" fill="#A259FF"/>
    <path d="M12 13a3 3 0 0 0 3-3V7h-3v6z" fill="#1ABC9C"/>
    <path d="M6 17a3 3 0 0 0 3 3h3v-6H9a3 3 0 0 0-3 3z" fill="#0ACF83"/>
    <path d="M12 20a3 3 0 0 0 3-3v-4h-3v7z" fill="#19BCFE"/>
  </svg>
);

const CanvaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" className="text-violet-500 fill-violet-500/10"/>
    <path d="M8 12c2.5-1.5 5.5-1.5 8 0" className="text-white"/>
    <path d="M12 8c1.5 2.5 1.5 5.5 0 8" className="text-white"/>
  </svg>
);

const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <path d="M16.5 15.5c-1.5 1-3.5 1.5-5.5 1.5-2.5 0-4.5-.5-5.5-1.5-.5-.5-.5-1-.2-1.5.3-.5 1-.8 2-1h7c1.2.2 2 .5 2.5 1 .3.5.2 1-.3 1.5z" fill="#E76F51"/>
    <path d="M13 11c1-1.5.5-3 0-4.5-.3-.7-.7-1.3-.5-2 .2-.5.8-.8 1.5-.5.5.2.8.7.5 1.2-.3 1 0 2 .5 3 .5 1.5 0 3-1.5 4.3-.3.2-.6.1-.7-.2-.1-.2 0-.4.2-.6z" fill="#F4A261"/>
  </svg>
);

const JavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F7DF1E" {...props}>
    <rect width="24" height="24" rx="3"/>
    <path d="M18.8 17.3c-.4.8-1.1 1.4-2.1 1.8-.9.4-2 .6-3.2.6-1.5 0-2.8-.4-3.7-1.1-.9-.7-1.4-1.8-1.6-3.2h2.8c.1.7.4 1.3.8 1.7.4.4 1.1.6 1.8.6.8 0 1.4-.2 1.8-.6.4-.4.6-.9.6-1.5 0-.5-.1-.9-.4-1.2-.3-.3-.7-.6-1.3-.8l-1.6-.6c-1.3-.5-2.2-1.1-2.8-1.9-.6-.8-.9-1.8-.9-3 0-1.3.5-2.4 1.4-3.2.9-.8 2.2-1.2 3.8-1.2 1.4 0 2.5.3 3.4 1 .9.7 1.4 1.6 1.6 2.8h-2.8c-.1-.6-.4-1.1-.8-1.4-.4-.3-.9-.5-1.5-.5-.7 0-1.2.2-1.6.5-.4.3-.5.7-.5 1.3 0 .4.1.8.4 1 .3.3.8.5 1.5.8l1.6.6c1.3.5 2.2 1.2 2.8 1.9s.9 1.8.9 3.1c0 1.2-.3 2.2-.9 3zm-7.6-5.8v5.8c0 .8-.2 1.4-.6 1.8-.4.4-1.1.6-2 .6-.9 0-1.6-.2-2-.6-.4-.4-.6-1-.6-1.8v-.6h2.7v.5c0 .4.1.7.2.9.1.2.3.3.6.3.3 0 .5-.1.6-.3.1-.2.2-.5.2-.9v-5.8h2.9z" fill="#000000"/>
  </svg>
);

const TypeScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3178C6" {...props}>
    <rect width="24" height="24" rx="3"/>
    <path d="M11.5 7.5H6.2v2.2h1.9v7.6H10v-7.6h1.5V7.5zm7.3 5.4c-.3-.5-.7-.9-1.2-1.1-.5-.2-1.1-.3-1.8-.3s-1.3.1-1.8.4c-.5.3-.8.7-1 1.2h2.5c0-.2.1-.4.3-.5.2-.1.4-.2.7-.2.3 0 .5.1.7.2.2.1.3.3.3.6 0 .3-.1.5-.3.6-.2.1-.6.3-1.1.5-.7.2-1.3.5-1.7.9-.4.4-.6.9-.6 1.6 0 .6.2 1.1.6 1.5.4.4.9.6 1.6.6.7 0 1.3-.2 1.7-.5.4-.3.7-.7.9-1.2h.1v1.5h2.2v-6.2c-.1-.7-.3-1.2-.6-1.6z" fill="#ffffff"/>
  </svg>
);

const CIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#00599C"/>
    <path d="M16 15.5c-.8.8-2 1.2-3.8 1.2-3 0-5-2-5-5s2-5 5-5c1.8 0 3 .4 3.8 1.2.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0-.5-.5-1.2-.8-2.4-.8-2 0-3.3 1.3-3.3 3.6s1.3 3.6 3.3 3.6c1.2 0 1.9-.3 2.4-.8.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7z" fill="#ffffff"/>
  </svg>
);

const CppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#00599C"/>
    <path d="M12 15c-.6.6-1.4.8-2.4.8-2 0-3.3-1.3-3.3-3.3s1.3-3.3 3.3-3.3c1 0 1.8.2 2.4.8.2.2.2.4 0 .6l-.5.5c-.1.1-.3.1-.5 0-.4-.4-.8-.6-1.4-.6-1.3 0-2.1.8-2.1 2.3s.8 2.3 2.1 2.3c.6 0 1-.2 1.4-.6.2-.2.4-.2.5 0l.5.5c.2.2.2.4 0 .6z" fill="#ffffff"/>
    <path d="M14 12.3h.8v.8h.4v-.8h.8v-.4h-.8v-.8h-.4v.8h-.8v.4z" fill="#ffffff"/>
    <path d="M17.5 12.3h.8v.8h.4v-.8h.8v-.4h-.8v-.8h-.4v.8h-.8v.4z" fill="#ffffff"/>
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(30 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(90 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(150 12 12)"/>
    <circle cx="12" cy="12" r="2" fill="#00d8ff"/>
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000000" stroke="#ffffff" strokeWidth="1" {...props}>
    <circle cx="12" cy="12" r="11" fill="#000000"/>
    <path d="M7.5 17.5V6.5h2l6.5 8V6.5h1.5v11h-2l-6.5-8v8H7.5z" fill="#ffffff" stroke="none"/>
  </svg>
);

const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#38BDF8" {...props}>
    <path d="M12 6.002C9.55 6.002 8.017 7.227 7.4 9.677c.917-1.225 1.986-1.684 3.208-1.378.697.175 1.196.68 1.748 1.25.898.928 1.942 2.008 4.244 2.008 2.45 0 3.983-1.225 4.6-3.675-.917 1.225-1.986 1.684-3.208 1.378-.697-.175-1.196-.68-1.748-1.25-.898-.928-1.942-2.008-4.244-2.008zm-4.6 5.673c-2.45 0-3.983 1.225-4.6 3.675.917-1.225 1.986-1.684 3.208-1.378.697.175 1.196.68 1.748 1.25.898.928 1.942 2.008 4.244 2.008 2.45 0 3.983-1.225 4.6-3.675-.917 1.225-1.986 1.684-3.208 1.378-.697-.175-1.196-.68-1.748-1.25-.898-.928-1.942-2.008-4.244-2.008z"/>
  </svg>
);

const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#339933" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15.5l-4.5-2.6v-5.2l4.5-2.6 4.5 2.6v5.2l-4.5 2.6zm-3.5-3.2l3.5 2v-4l-3.5-2v4zm4.5 2l3.5-2v-4l-3.5 2v4z"/>
  </svg>
);

const MySqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" {...props}>
    <ellipse cx="12" cy="12" rx="9" ry="8" fill="#4479A1"/>
    <path d="M12.11 3C7.22 3 3.25 6.97 3.25 11.86c0 4.89 3.97 8.86 8.86 8.86s8.86-3.97 8.86-8.86C20.97 6.97 17 3 12.11 3zm-2.88 11.33c-.34-.14-.52-.46-.52-.82V9.33c0-.36.18-.68.52-.82.34-.14.72-.05.98.21l1.75 1.75c.39.39.39 1.02 0 1.41L10.21 14.1c-.26.26-.64.35-.98.21z" fill="#F29111"/>
  </svg>
);

const SupabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3ECF8E" {...props}>
    <path d="M21.36 10.3a1.5 1.5 0 0 0-1.18-.8H14.5l2.4-7.2a1.5 1.5 0 0 0-2.6-1.1l-11.8 14.5A1.5 1.5 0 0 0 3.64 17h5.86l-2.4 7.2a1.5 1.5 0 0 0 2.6 1.1l11.8-14.5a1.5 1.5 0 0 0-.14-2.5z"/>
  </svg>
);

const FirebaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFCA28" {...props}>
    <path d="M3.89 15.67L10.21 2.3c.31-.66 1.27-.66 1.58 0l2.12 4.47 1.25-2.36a.89.89 0 0 1 1.58 0l3.37 11.26-9.14 5.3a1.78 1.78 0 0 1-1.78 0L3.89 15.67z" fill="#FFA000"/>
    <path d="M11 20.91a1.78 1.78 0 0 1-1.78 0L3.89 15.67l.14-.37 7.97 5.61v-.01z" fill="#F57C00"/>
    <path d="M20.13 15.68L16.76 4.42a.89.89 0 0 0-1.58 0l-1.25 2.36L11 20.91l9.13-5.23z" fill="#FFCA28"/>
  </svg>
);

const SqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" className="text-teal-400 fill-teal-400/10"/>
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
  </svg>
);

const DsaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="5" r="2.5" className="text-yellow-400 fill-yellow-400/10"/>
    <circle cx="6" cy="12" r="2.5" className="text-yellow-400 fill-yellow-400/10"/>
    <circle cx="18" cy="12" r="2.5" className="text-yellow-400 fill-yellow-400/10"/>
    <line x1="12" y1="7.5" x2="6" y2="9.5"/>
    <line x1="12" y1="7.5" x2="18" y2="9.5"/>
  </svg>
);

const LinuxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" className="text-orange-400 fill-orange-400/10"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <path d="M6 8l3 3-3 3"/>
    <line x1="10" y1="14" x2="15" y2="14"/>
  </svg>
);

const OsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" className="text-cyan-400 fill-cyan-400/10"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
  </svg>
);

const PromptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
  </svg>
);

const AiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88A2.5 2.5 0 0 1 9.5 2z" className="text-purple-400 fill-purple-400/10"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88A2.5 2.5 0 0 0 14.5 2z" className="text-purple-400 fill-purple-400/10"/>
  </svg>
);

const CommunicationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="text-emerald-400 fill-emerald-400/10"/>
  </svg>
);

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, color }) => {
  return (
    <div className="glass-panel px-3.5 py-2 rounded-xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-md flex items-center gap-3 hover:border-zinc-850 hover:bg-zinc-900/20 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all duration-300 group cursor-default">
      <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm" style={{ boxShadow: `0 0 8px ${color}08` }}>
        {icon}
      </div>
      <span className="text-xs font-bold text-zinc-300 group-hover:text-white tracking-wide transition-colors duration-300">{name}</span>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const categories = [
    {
      title: "Programming & Core",
      items: [
        { name: "Java", icon: <JavaIcon />, color: "#E76F51" },
        { name: "C++", icon: <CppIcon />, color: "#00599C" },
        { name: "JavaScript", icon: <JavaScriptIcon />, color: "#F7DF1E" },
        { name: "TypeScript", icon: <TypeScriptIcon />, color: "#3178C6" },
        { name: "C", icon: <CIcon />, color: "#00599C" },
        { name: "SQL", icon: <SqlIcon />, color: "#2A9D8F" },
        { name: "Data Structures", icon: <DsaIcon />, color: "#fbbf24" },
        { name: "Operating System", icon: <OsIcon />, color: "#22d3ee" },
      ]
    },
    {
      title: "Frontend & UI/UX",
      items: [
        { name: "HTML", icon: <Html5Icon />, color: "#E34F26" },
        { name: "CSS", icon: <Css3Icon />, color: "#1572B6" },
        { name: "React.js", icon: <ReactIcon />, color: "#00d8ff" },
        { name: "Next.js", icon: <NextjsIcon />, color: "#ffffff" },
        { name: "Tailwind CSS", icon: <TailwindIcon />, color: "#38BDF8" },
        { name: "Figma", icon: <FigmaIcon />, color: "#F24E1E" },
        { name: "Canva", icon: <CanvaIcon />, color: "#fc42ff" },
      ]
    },
    {
      title: "Backend & Database",
      items: [
        { name: "Node.js", icon: <NodejsIcon />, color: "#339933" },
        { name: "MySQL", icon: <MySqlIcon />, color: "#00758F" },
        { name: "Supabase", icon: <SupabaseIcon />, color: "#3ECF8E" },
        { name: "Firebase", icon: <FirebaseIcon />, color: "#FFCA28" },
        { name: "Linux", icon: <LinuxIcon />, color: "#f97316" },
      ]
    },
    {
      title: "Technologies & AI",
      items: [
        { name: "Blockchain Development", icon: <Cpu className="w-5 h-5 text-yellow-500" />, color: "#ffd700" },
        { name: "Cybersecurity Fundamentals", icon: <Award className="w-5 h-5 text-red-500" />, color: "#ef4444" },
        { name: "Prompt Engineering", icon: <PromptIcon />, color: "#fbbf24" },
        { name: "AI Development", icon: <AiIcon />, color: "#a855f7" },
        { name: "Git", icon: <Laptop className="w-5 h-5 text-orange-500" />, color: "#F05032" },
        { name: "GitHub", icon: <Code className="w-5 h-5 text-white" />, color: "#ffffff" },
        { name: "Communication Skills", icon: <CommunicationIcon />, color: "#10b981" },
      ]
    }
  ];

  return (
    <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900/60">
      <div className="relative z-10 flex flex-col justify-between mb-8 gap-4">
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Skills</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.title} className="glass-panel p-6 rounded-2xl border border-zinc-900/40 bg-zinc-950/10 backdrop-blur-md space-y-4 flex flex-col justify-start">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono border-l-2 border-[#ffd700] pl-3">
              {cat.title}
            </h4>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {cat.items.map((skill) => (
                <SkillCard 
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function PremiumLayout() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showProjectDetails, setShowProjectDetails] = useState(true);
  const [time, setTime] = useState("");

  const activeProject = portfolioData.projects[activeProjectIndex];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus !== "idle") return;

    playClickSound();
    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sohamgamer99@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Portfolio Message: ${formData.subject}`
        })
      });

      if (response.ok) {
        setFormStatus("success");
        playSuccessSound();
        
        // Confetti shower
        import("canvas-confetti").then((module) => {
          module.default({ particleCount: 150, spread: 80, origin: { y: 0.85 } });
        });
      } else {
        throw new Error("Form submission response error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to transmit message. Please try again or email directly.");
      setFormStatus("idle");
    }
  };

  const handleLinkClick = () => {
    playClickSound();
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    playClickSound();
    const el = id === "hero" ? document.documentElement : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Maps projects for the Vengence UI Diagonal Carousel
  const carouselItems = portfolioData.projects.map((p) => ({
    src: p.image,
    title: p.title,
  }));

  return (
    <div className="bg-[#030303] text-[#f4f4f5] min-h-screen relative font-sans selection:bg-primary/20 selection:text-white pb-20">
      
      {/* Fixed Full Website AntiGravity Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <AntiGravityCanvas />
      </div>

      {/* Floating Galaxy Side Navigation Indicator */}
      <GalaxyScrollNav />

      {/* Zero Gravity Interactive Particle Hero Frontpage */}
      <div id="hero" className="relative w-full h-screen">
        <ParticleEffectHero />
      </div>

      {/* Premium background radial glows */}
      <div className="absolute top-[800px] left-[-15%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute top-[1800px] right-[-15%] w-[600px] h-[600px] bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow"></div>

      {/* Futuristic grid mesh background */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0"></div>

      {/* Trendy Diagonal Projects Carousel Section with MagicRings Background */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900/60 overflow-hidden">
        {/* WebGL MagicRings Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <MagicRings
            color="#7c4dff"
            colorTwo="#00e5ff"
            ringCount={6}
            speed={0.9}
            attenuation={7}
            lineThickness={2}
            baseRadius={0.3}
            radiusStep={0.15}
            scaleRate={0.1}
            opacity={0.8}
            noiseAmount={0.03}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Projects</h3>
          </div>
          <p className="text-xs text-zinc-550 font-mono hidden md:block">Active Project: {activeProjectIndex + 1} of {portfolioData.projects.length}</p>
        </div>

        {/* Side-by-side Project Gallery and details */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          
          {/* Left Side: Diagonal Carousel and Indicator */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="h-[520px] md:h-[580px] overflow-hidden flex items-center justify-center relative">
              <DiagonalCarousel
                items={carouselItems}
                activeIndex={activeProjectIndex}
                onActiveIndexChange={setActiveProjectIndex}
                slideSize={650}
                verticalStep={40}
                rotationStep={10}
                loop={true}
                className="bg-transparent"
              />
            </div>

          </div>

          {/* Right Side: Selected Project Specifications Panel */}
          <div className="w-full lg:w-[460px] shrink-0 flex items-center">
            <AnimatePresence mode="wait">
              {showProjectDetails && (
                <motion.div
                  key={activeProjectIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full glass-panel p-6 md:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between relative shadow-xl min-h-[380px]"
                >
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

                  <div className="space-y-4 relative z-10 flex-1">
                    <div className="space-y-1">
                      <div className="text-primary font-mono text-xs uppercase tracking-widest font-bold">PROJECT SPECIFICATION</div>
                      <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span>{activeProject.title}</span>
                        {activeProject.liveUrl && (
                          <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" onClick={handleLinkClick} className="text-zinc-400 hover:text-white p-0.5 transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </h4>
                    </div>

                    <p className="text-[15px] text-zinc-250 leading-relaxed font-normal">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeProject.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono px-2.5 py-1 bg-zinc-950 text-zinc-300 border border-zinc-900 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 w-full shrink-0 relative z-10 mt-6">
                    {activeProject.liveUrl && (
                      <AnimatedButton
                        as="a"
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleLinkClick}
                        className="flex-1 py-2.5 bg-primary hover:bg-primary-dark border-primary text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <span>View Live</span>
                        <ArrowUpRight size={13} />
                      </AnimatedButton>
                    )}
                    <AnimatedButton
                      as="a"
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleLinkClick}
                      className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-300 hover:text-white text-xs flex items-center justify-center gap-1.5"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Skills Bento Section */}
      <SkillsSection />

      {/* Interactive About Section using ParticleHero component */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900/60">
        <div className="relative z-10 flex flex-col justify-between mb-8 gap-4">
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">About Me</h3>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-900">
          <ParticleHero />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono mb-2">// COMMUNICATE</h2>
            <h3 className="text-2xl font-bold text-white mb-4">Send a Message</h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-6">
              Connect directly for projects, collaboration queries, or internships. Response time generally under 24 hours.
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

            <div className="flex flex-wrap gap-3 pt-6">
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleLinkClick} 
                className="px-4 py-2.5 bg-zinc-950 hover:bg-white hover:text-black border border-zinc-900 hover:border-white text-zinc-300 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.03)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group font-mono text-[11px] font-bold"
              >
                <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>GITHUB</span>
              </a>
              
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleLinkClick} 
                className="px-4 py-2.5 bg-zinc-950 hover:bg-[#0077b5] hover:text-white border border-zinc-900 hover:border-[#0077b5] text-zinc-300 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(0,119,181,0.03)] hover:shadow-[0_0_20px_rgba(0,119,181,0.25)] group font-mono text-[11px] font-bold"
              >
                <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>LINKEDIN</span>
              </a>

              <a 
                href={portfolioData.contact.instagram} 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleLinkClick} 
                className="px-4 py-2.5 bg-zinc-950 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white border border-zinc-900 hover:border-transparent text-zinc-300 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(238,42,123,0.03)] hover:shadow-[0_0_20px_rgba(238,42,123,0.25)] group font-mono text-[11px] font-bold"
              >
                <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform animate-pulse-slow" />
                <span>INSTAGRAM</span>
              </a>

              <a 
                href={portfolioData.contact.twitter} 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleLinkClick} 
                className="px-4 py-2.5 bg-zinc-950 hover:bg-white hover:text-black border border-zinc-900 hover:border-white text-zinc-300 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.03)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group font-mono text-[11px] font-bold"
              >
                <TwitterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>TWITTER</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-zinc-900">
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
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-355 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-355 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-355 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-355 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
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
                  <div className="w-8 h-8 border border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-zinc-400 font-mono">Sending message packets...</p>
                </div>
              )}

              {formStatus === "success" && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 bg-success/10 border border-success/30 rounded-full flex items-center justify-center text-success animate-bounce">
                    <Sparkles size={22} />
                  </div>
                  <h4 className="text-base font-bold text-white">Transmission Successful!</h4>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    Thank you {formData.name}. The message has been sent successfully. Soham will respond shortly.
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

      {/* Divider */}
      <div className="max-w-7xl mx-auto w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent my-16 px-6"></div>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-12 text-zinc-300">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 space-y-5">
            <a 
              href="#hero" 
              onClick={(e) => handleScrollToSection(e, "hero")} 
              className="flex items-center gap-2 group cursor-pointer w-fit"
            >
              <div className="w-7 h-7 bg-white group-hover:bg-[#ffd700] rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <span className="font-bold text-black text-sm font-mono">S</span>
              </div>
              <span className="text-white font-extrabold tracking-wider text-base uppercase font-mono group-hover:text-[#ffd700] transition-colors">SOHAM<span className="text-[#ffd700]">.</span></span>
            </a>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Information Technology student building modular full-stack decentralized interfaces and intelligent AI orchestration layers with premium structural designs.
            </p>
            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-550 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.contact.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
                title="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-[#00c853] hover:border-[#00c853]/50 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 md:col-start-7 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffd700] font-bold">Navigation</h4>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-400 font-mono">
              <li>
                <a href="#projects" onClick={(e) => handleScrollToSection(e, "projects")} className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#ffd700] group-hover:scale-125 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">Projects</span>
                </a>
              </li>
              <li>
                <a href="#skills" onClick={(e) => handleScrollToSection(e, "skills")} className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#ffd700] group-hover:scale-125 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">Skills</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollToSection(e, "about")} className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#ffd700] group-hover:scale-125 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">About</span>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollToSection(e, "contact")} className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#ffd700] group-hover:scale-125 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">Contact</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffd700] font-bold">Connect</h4>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-400 font-mono">
              <li>
                <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-white transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">GitHub</span>
                </a>
              </li>
              <li>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-blue-400 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={portfolioData.contact.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-sky-400 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">Twitter</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#00c853] transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">Email Me</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900/60 pt-6 text-[10px] font-mono gap-4">
          <p className="text-zinc-550 order-2 sm:order-1">© {new Date().getFullYear()} SOHAM. All rights reserved.</p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer order-1 sm:order-2"
          >
            <span>Back to Top</span>
            <span className="group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
          </button>

          <div className="flex items-center gap-2 order-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-550">All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

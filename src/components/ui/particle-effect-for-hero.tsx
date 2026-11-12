"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MousePointer2, ArrowRight } from "lucide-react";
import AnimatedButton from "./animated-button";
import { motion } from "framer-motion";
import OptimizedBlackHole from "./optimized-black-hole";

// --- Types ---

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number; // For some organic oscillation
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// --- Configuration Constants ---

const PARTICLE_DENSITY = 0.00015; // Particles per pixel squared (adjust for density)
const BG_PARTICLE_DENSITY = 0.00005; // Less dense for background
const MOUSE_RADIUS = 180; // Radius of mouse influence
const RETURN_SPEED = 0.08; // How fast particles fly back to origin (spring constant)
const DAMPING = 0.90; // Friction (velocity decay)
const REPULSION_STRENGTH = 1.2; // Multiplier for mouse push force

// --- Helper Functions ---

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Components ---

export const AntiGravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debugInfo, setDebugInfo] = useState({ count: 0, fps: 0 });
  
  // Mutable state refs to avoid re-renders during animation loop
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Initialize Particles
  const initParticles = useCallback((width: number, height: number) => {
    // 1. Main Interactive Particles
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      newParticles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1, 2.5), 
        color: Math.random() > 0.8 ? (Math.random() > 0.5 ? "#7c4dff" : "#00e5ff") : "#ffffff", 
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = newParticles;

    // 2. Background Ambient Particles (Stars/Dust)
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const newBgParticles: BackgroundParticle[] = [];
    
    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Very slow drift
        vy: (Math.random() - 0.5) * 0.2,
        size: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2 // For twinkling offset
      });
    }
    backgroundParticlesRef.current = newBgParticles;

    setDebugInfo(prev => ({ ...prev, count: particleCount + bgCount }));
  }, []);

  // Animation Loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate Delta Time for smooth animation (optional, but good for FPS calculation)
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    if (delta > 0) {
        setDebugInfo(prev => ({ ...prev, fps: Math.round(1000 / delta) }));
    }

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Background Effects ---
    
    // 1. Pulsating Radial Glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulseSpeed = 0.0008;
    // Oscillates between 0.05 and 0.12 opacity
    const pulseOpacity = Math.sin(time * pulseSpeed) * 0.035 + 0.085; 
    
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7
    );
    gradient.addColorStop(0, `rgba(124, 77, 255, ${pulseOpacity})`); // Faint Violet theme glow
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Background Particles (Drifting Stars)
    const bgParticles = backgroundParticlesRef.current;
    ctx.fillStyle = "#ffffff";
    
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around screen
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Twinkle effect
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5; // 0 to 1
      const currentAlpha = p.alpha * (0.3 + 0.7 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0; // Reset alpha for foreground

    // --- Main Foreground Physics ---

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Phase 1: Apply Forces (Mouse & Spring)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // 1. Calculate Distance to Mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 2. Mouse Repulsion Force
      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS; 
        
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * 5; 
        p.vy -= forceDirectionY * repulsion * 5;
      }

      // 3. Spring Force (Return to Origin)
      const springDx = p.originX - p.x;
      const springDxY = p.originY - p.y;
      
      p.vx += springDx * RETURN_SPEED;
      p.vy += springDxY * RETURN_SPEED;
    }

    // Phase 2: Resolve Collisions
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          
          if (dist > 0.01) { // Avoid division by zero
            const nx = dx / dist; // Normal X
            const ny = dy / dist; // Normal Y

            // Static Resolution: Push particles apart so they don't overlap
            const overlap = minDist - dist;
            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            p1.x -= pushX;
            p1.y -= pushY;
            p2.x += pushX;
            p2.y += pushY;

            // Dynamic Resolution: Elastic Collision
            // Relative velocity
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;

            // Calculate velocity along the normal
            // Dot product of velocity difference and normal direction
            const velocityAlongNormal = dvx * nx + dvy * ny;

            // Only bounce if they are moving towards each other
            if (velocityAlongNormal > 0) {
              const m1 = p1.size; // Use size as mass proxy
              const m2 = p2.size;
              const restitution = 0.85; // Bounciness (1 is perfectly elastic)

              // Impulse scalar
              const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1/m1 + 1/m2);

              // Apply impulse
              const impulseX = impulseMagnitude * nx;
              const impulseY = impulseMagnitude * ny;

              p1.vx += impulseX / m1;
              p1.vy += impulseY / m1;
              p2.vx -= impulseX / m2;
              p2.vy -= impulseY / m2;
            }
          }
        }
      }
    }

    // Phase 3: Integration & Drawing
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physics Update
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      // Drawing
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      
      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + velocity * 0.1, 1); 
      
      ctx.fillStyle = p.color === "#ffffff" 
        ? `rgba(255, 255, 255, ${opacity})` 
        : p.color;
      
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set actual size in memory (scaled to account for extra pixel density)
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        
        // Make it visible size
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        // Normalize coordinate system to use CSS pixels
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);

        // Re-init particles for new dimensions
        initParticles(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Global Mouse Handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleGlobalMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseleave", handleGlobalMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-transparent pointer-events-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Debug Info Overlay */}
      <div className="absolute bottom-4 right-4 pointer-events-none text-[9px] text-white/5 font-mono text-right">
        <p>{debugInfo.count} particles • {debugInfo.fps} FPS</p>
      </div>
    </div>
  );
};

export const Navigation: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = id === "hero" ? document.documentElement : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-5 sm:p-6 md:p-8">
      {/* Brand logo on left - flex items-start */}
      <div className="flex items-center space-x-2 w-1/3 justify-start">
        <a href="#hero" onClick={(e) => handleScrollTo(e, "hero")} className="flex items-center space-x-2 group cursor-pointer">
          <div className="w-8 h-8 bg-white group-hover:bg-[#ffd700] rounded-full flex items-center justify-center transition-colors">
            <span className="font-bold text-black text-lg">S</span>
          </div>
          <span className="text-white font-bold tracking-wider text-xl uppercase font-mono group-hover:text-[#ffd700] transition-colors">SOHAM.</span>
        </a>
      </div>

      {/* Centered links - flex items-center */}
      <div className="hidden md:flex justify-center items-center space-x-8 text-sm font-medium text-white/70 w-1/3">
        <a href="#projects" onClick={(e) => handleScrollTo(e, "projects")} className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300">Projects</a>
        <a href="#skills" onClick={(e) => handleScrollTo(e, "skills")} className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300">Skills</a>
        <a href="#about" onClick={(e) => handleScrollTo(e, "about")} className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300">About</a>
        <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300">Contact</a>
      </div>
    </nav>
  );
};

export const HeroContent: React.FC = () => {
  const [typedTitleLine1, setTypedTitleLine1] = useState("");
  const [typedTitleLine2, setTypedTitleLine2] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursor3, setShowCursor3] = useState(false);

  const titleLine1 = "Soham";
  const titleLine2 = "Malekar";
  const descText = "Specializing in Decentralized protocols, Intelligent Systems, and modular full-stack interfaces with clean structural logic.";

  useEffect(() => {
    let active = true;
    const typeNext = async () => {
      // Line 1 typing
      for (let i = 0; i <= titleLine1.length; i++) {
        if (!active) return;
        setTypedTitleLine1(titleLine1.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      setShowCursor1(false);
      setShowCursor2(true);

      // Line 2 typing
      for (let i = 0; i <= titleLine2.length; i++) {
        if (!active) return;
        setTypedTitleLine2(titleLine2.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      setShowCursor2(false);
      setShowCursor3(true);

      // Description typing
      for (let i = 0; i <= descText.length; i++) {
        if (!active) return;
        setTypedDesc(descText.slice(0, i));
        await new Promise((r) => setTimeout(r, 20));
      }
      setShowCursor3(false);
    };

    const startTimeout = setTimeout(typeNext, 600);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-start justify-center pointer-events-none px-5 sm:px-8 md:px-16 lg:px-28">
      <div className="max-w-3xl w-full text-left space-y-4 sm:space-y-6 pt-16 sm:pt-12 relative z-10">
        <div className="inline-block animate-fade-in-up">
          <span className="py-1 px-3 border border-white/20 rounded-full text-[10px] sm:text-xs font-mono text-white/70 tracking-wider sm:tracking-widest uppercase bg-white/5 backdrop-blur-sm">
            Information Technology Student & Builder
          </span>
        </div>
        
        <style>{`
          @keyframes textShine {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 12px rgba(255,255,255,0.06), 0 0 20px rgba(124,77,255,0.08); }
            50% { text-shadow: 0 0 22px rgba(255,255,255,0.22), 0 0 40px rgba(0,229,255,0.25); }
          }
          .premium-text-shine {
            animation: textShine 8s linear infinite;
          }
          .premium-text-glow {
            animation: textGlow 5s ease-in-out infinite alternate;
          }
        `}</style>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[105px] font-black tracking-tighter leading-[0.95] sm:leading-none uppercase mix-blend-difference text-white">
          <span 
            className="text-transparent bg-clip-text premium-text-shine premium-text-glow"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #a1a1aa 75%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {typedTitleLine1}
          </span>
          {showCursor1 && <span className="text-white animate-pulse">_</span>}
          <br/>
          <span 
            className="text-transparent bg-clip-text premium-text-shine premium-text-glow"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #a1a1aa 75%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {typedTitleLine2}
          </span>
          {showCursor2 && <span className="text-white animate-pulse">_</span>}
        </h1>
        
        <p className="max-w-2xl text-sm sm:text-base md:text-xl text-white/80 font-light leading-relaxed min-h-[4em] sm:min-h-[3.5em]">
          {typedDesc}
          {showCursor3 && <span className="text-primary animate-pulse font-bold">|</span>}
        </p>

        <div className="pt-2 sm:pt-4 pointer-events-auto">
          <AnimatedButton 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-white rounded-full font-bold tracking-wide cursor-pointer text-xs sm:text-sm flex items-center gap-2 hover:bg-zinc-900 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Optimized WebGPU Black Hole Background - Shown on Desktop and Laptop */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <OptimizedBlackHole />
      </div>
      <Navigation />
      <HeroContent />
    </div>
  );
}

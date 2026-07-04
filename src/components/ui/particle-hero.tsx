"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
  reset: () => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGoldMode, setIsGoldMode] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      },
      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        if (isGoldMode) {
          ctx.fillStyle = `rgba(216, 189, 16, ${this.opacity})`;
        } else {
          ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`;
        }
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
      },
    };

    particle.reset();
    particle.y = Math.random() * canvas.height;
    particle.fadeDelay = Math.random() * 600 + 100;
    particle.fadeStart = Date.now() + particle.fadeDelay;
    particle.fadingOut = false;

    return particle;
  };

  const calculateParticleCount = (canvas: HTMLCanvasElement) => {
    return Math.floor((canvas.width * canvas.height) / 6000);
  };

  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = calculateParticleCount(canvas);
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }
  };

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles(canvas);
    animate(canvas, ctx);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const toggleGoldMode = () => {
    setIsGoldMode(!isGoldMode);
  };

  const styles = `
    .gold-mode {
      border: 1px solid rgba(216, 189, 16, 0.45) !important;
      box-shadow: 0 0 60px rgba(216, 189, 16, 0.25) !important;
      background: #080914 !important;
      transition: all 0.8s ease-in-out;
    }
    .gold-mode canvas {
      filter: drop-shadow(0 0 20px rgba(216, 189, 16, 0.4)) !important;
    }
    .gold-mode .header > div.mid-spot {
      box-shadow: 0 0 1.5em 0.2em #d8bd10 !important;
    }
    .gold-mode .header > div.mid-spot:hover {
      box-shadow: -0.3em 0.1em 0.2em 0 #ffd700 !important;
    }

    @keyframes load {  
      0% { opacity: 0;}    
      100% { opacity: 1;}    
    }
    @keyframes up {      
      100% { transform: translateY(0); }    
    }
    @keyframes load3 {  
      0% { opacity: 0;}    
      100% { opacity: 0.7;}    
    }
    @keyframes pulse { 
      0% { --p: 0%; }
      50% { --p: 300%;}
      100% { --p: 300%;}
    }
    @keyframes colorize {
      0%{filter: hue-rotate(0deg); }
      100% {filter: hue-rotate(-380deg);}
    }
    @keyframes spotlight {
      0% {
        transform: rotateZ(0deg) scale(1);
        filter: blur(40px) opacity(0.45);
      }
      20% {
        transform: rotateZ(-1deg) scale(1.15);
        filter: blur(45px) opacity(0.55);
      }    
      40% {
        transform: rotateZ(2deg) scale(1.25);
        filter: blur(35px) opacity(0.4);
      }    
      60% {
        transform: rotateZ(-2deg) scale(1.15);
        filter: blur(42px) opacity(0.55);
      }    
      80% {
        transform: rotateZ(1deg) scale(1.08);
        filter: blur(38px) opacity(0.4);
      }    
      100% {
        transform: rotateZ(0deg) scale(1);
        filter: blur(40px) opacity(0.45);
      }    
    }
    @keyframes loadrot {
      0% { transform: rotate(0deg) scale(0);}
      100% { transform: scale(1);}
    }
    @keyframes accentload {
      0% {
        opacity: 0; transform: scale(0);
      }
      100% {
        opacity: 1; transform: scale(1);
      }
    }
    @keyframes accentload2 {
      0% {
        opacity: 0; transform: scale(0) rotate(360deg);
      }
      50% { transform: scale(0); }
      100% {
        opacity: 0.12; transform: scale(1) rotate(0deg);
      }
    }
    @keyframes accentload3 {
      0% {
        opacity: 0; transform: scale(0) rotate(-360deg);
      }
      50% { transform: scale(0); }
      100% {
        opacity: 0.12; transform: scale(1) rotate(0deg);
      }
    }
    @keyframes mountainload1 {
      0% { bottom: -240%; }
      100% { bottom: -140%; }
    }
    @keyframes mountainload2 {
      0% { bottom: -240%; }
      100% { bottom: -108%; }
    }
    @keyframes loop {
      100% {
        offset-distance: 100%;
      }    
    }

    @property --p {
      syntax: '<percentage>';
      inherits: false;
      initial-value: 0%;
    }
  `;

  return (
    <div
      className={`relative min-h-[900px] lg:min-h-[680px] w-full overflow-hidden py-16 px-6 ${isGoldMode ? "gold-mode" : ""}`}
      style={{ 
        background: "#05060f",
        backgroundImage: "linear-gradient(0deg,rgba(216,236,248,.06),rgba(152,192,239,.06))",
        fontSize: "max(calc(min(600px, 80vh) * 0.03), 10px)",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        scrollBehavior: "smooth",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Header with Switcher Button */}
      <div
        className="header"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          color: "#bad6f7",
          padding: "1em",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(-0.5em)",
          animation: "load 2s ease-in 1s forwards, up 1.4s ease-out 1s forwards",
          zIndex: 20
        }}
      >
        <div
          className="mid-spot"
          onClick={toggleGoldMode}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "1.8em",
            height: "1.8em",
            borderRadius: "50%",
            background: "black",
            boxShadow: "0 0 1em 0 #98c0ef",
            cursor: "pointer",
            transition: "box-shadow 1s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = isGoldMode
              ? "-0.3em 0.1em 0.2em 0 #ffd700"
              : "-0.3em 0.1em 0.2em 0 #98c0ef"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = isGoldMode ? "0 0 1.5em 0.2em #d8bd10" : "0 0 1em 0 #98c0ef"
          }}
        />
      </div>

      {/* Background Spotlight Lighting (Optimized Ambient Glow) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Soft center ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "75%",
            borderRadius: "50%",
            background: isGoldMode
              ? "radial-gradient(circle, rgba(216, 189, 16, 0.12) 0%, rgba(216, 189, 16, 0.04) 50%, transparent 100%)"
              : "radial-gradient(circle, rgba(124, 77, 255, 0.12) 0%, rgba(0, 229, 255, 0.05) 50%, transparent 100%)",
            filter: "blur(60px)",
            opacity: 0.95,
          }}
        />
        {/* Secondary subtle side ambient glow for depth */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "15%",
            width: "35%",
            height: "35%",
            borderRadius: "50%",
            background: isGoldMode
              ? "radial-gradient(circle, rgba(255, 215, 0, 0.03) 0%, transparent 80%)"
              : "radial-gradient(circle, rgba(124, 77, 255, 0.04) 0%, transparent 80%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        style={{
          position: "absolute",
          pointerEvents: "none",
          animation: "load 0.4s ease-in-out forwards",
          zIndex: 1,
          width: "100%",
          height: "100%"
        }}
      />

      {/* Accent Lines */}
      <div
        className="accent-lines"
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "42em",
          zIndex: -2,
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, left: 0, margin: "auto", height: "100%", width: "100%" }}>
          {[6, 11, 16, 24, 29].map((top, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${top}em`,
                right: 0,
                left: 0,
                margin: "auto",
                width: "100%",
                height: "1px",
                background: isGoldMode
                  ? "linear-gradient(90deg, transparent, rgba(216, 189, 16, .25), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(186, 215, 247, .18), transparent)",
                opacity: 0,
                transform: "scale(0)",
                animation: "accentload 2s ease-out 2.4s forwards",
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, left: 0, margin: "auto", height: "100%", width: "100%" }}>
          {[24, 34, -24, -34].map((left, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: left > 0 ? `${left}em` : "auto",
                margin: "auto",
                width: "1px",
                height: "100%",
                background: isGoldMode ? "rgba(216, 189, 16, .25)" : "rgba(186, 215, 247, .18)",
                opacity: 0,
                transform: "scale(0)",
                animation: "accentload 2s ease-out 2s forwards",
              }}
            />
          ))}
        </div>
      </div>


      {/* Interactive About Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
        
        {/* Left Column: Portrait Card */}
        <div className="lg:col-span-3">
          <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between h-full backdrop-blur-md shadow-2xl relative transition-all duration-500 ${isGoldMode ? "border-[#d8bd10]/35 bg-zinc-950/60" : "border-zinc-800/80 bg-zinc-950/40"}`}>
            <div className={`relative aspect-[3/4] md:aspect-auto md:h-[350px] overflow-hidden border-b transition-colors duration-500 ${isGoldMode ? "border-[#d8bd10]/20" : "border-zinc-900"}`}>
              <img
                src="/soham_selfie.png"
                alt="Soham Malekar"
                className="object-cover w-full h-full transition-all duration-700 hover:scale-[1.02] profile-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent opacity-50"></div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-xl font-bold tracking-tight text-white">
                  Soham <span className={`transition-colors duration-500 ${isGoldMode ? "text-[#ffd700]" : "text-[#9dc3f7]"}`}>Malekar</span>
                </h4>
                <p className="text-xs text-zinc-300 font-mono mt-1">Information Technology Student</p>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-900/60">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isGoldMode ? "bg-[#ffd700]" : "bg-blue-500"}`}></span>
                  <span>Based in Mumbai, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Open to Global Remote Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Bio & Experiences & Best At */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className={`text-3xl font-extrabold tracking-tight transition-colors duration-500 ${isGoldMode ? "text-[#ffd700] drop-shadow-[0_0_15px_rgba(216,189,16,0.5)]" : "text-white"}`}>
              Hello,
            </h3>
            <div className="space-y-5 text-sm md:text-[15px] text-zinc-200 leading-relaxed font-normal max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              <p>
                I'm an <span className="text-white font-semibold">Information Technology</span> student passionate about building intelligent, scalable, and impactful software. My interests span Artificial Intelligence, Full Stack Development, Blockchain, and emerging technologies, with a strong focus on creating solutions that solve real-world problems.
              </p>
              <p>
                I recently completed my <span className="text-white font-semibold">Diploma in Information Technology</span> with <span className={`font-semibold transition-colors duration-500 ${isGoldMode ? "text-[#ffd700]" : "text-[#9dc3f7]"}`}>89.03%</span>, and I'm currently pursuing my engineering degree while focusing on building real-world projects, strengthening my software engineering skills, and exploring AI and Machine Learning.
              </p>
              <p>
                Beyond development, I've had the opportunity to <span className="text-white font-semibold">teach blockchain concepts to 43+ students</span>, an experience that strengthened both my technical understanding and my ability to simplify complex ideas. I also completed a Cybersecurity Internship, where I gained hands-on experience in vulnerability assessment, secure software practices, and understanding modern security challenges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900/60">
            <div className="space-y-3">
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold transition-colors duration-500 ${isGoldMode ? "text-[#ffd700]" : "text-[#9dc3f7]"}`}>
                Experiences :
              </h4>
              <div className="space-y-3 text-xs text-zinc-300">
                <div>
                  <p className="font-bold text-white leading-snug text-sm">Web3 Hackathon Builder</p>
                  <p className="text-[11px] text-zinc-450 font-mono mt-0.5">BNB Chain, Monad, Avalanche, ETHGlobal</p>
                </div>
                <div>
                  <p className="font-bold text-white leading-snug text-sm">Smart India Hackathon Finalist</p>
                  <p className="text-[11px] text-zinc-450 font-mono mt-0.5">Qualified for SIH Grand Finale</p>
                </div>
                <div>
                  <p className="font-bold text-white leading-snug text-sm">Cybersecurity Intern</p>
                  <p className="text-[11px] text-zinc-450 font-mono mt-0.5">Vulnerability assessment & secure practices</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold transition-colors duration-500 ${isGoldMode ? "text-[#ffd700]" : "text-[#9dc3f7]"}`}>
                Also best at :
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["System Architecture", "Security Auditing", "Decentralized Protocols", "AI Orchestration", "Rapid Prototyping", "Full Stack Development"].map((val) => (
                  <span key={val} className={`text-[11px] font-mono px-2 py-1 border rounded transition-all duration-500 ${isGoldMode ? "bg-zinc-900/80 border-[#d8bd10]/30 text-[#ffd700]" : "bg-zinc-950/80 border-zinc-900 text-zinc-300"}`}>
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Matrix / Languages & Contact Badges */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8">
          <div className={`border p-6 rounded-2xl backdrop-blur-md space-y-6 h-full flex flex-col justify-between transition-all duration-500 ${isGoldMode ? "border-[#d8bd10]/35 bg-zinc-950/60" : "border-zinc-800/80 bg-zinc-950/40"}`}>
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Know the language of</h4>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-350 flex items-center gap-1.5 font-bold">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isGoldMode ? "bg-[#ffd700]" : "bg-purple-500"}`}></span>
                    <span>Programming & Core</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    Java, C++, C, JavaScript, TypeScript, SQL, Data Structures, Operating Systems
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-350 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                    <span>Frontend & UI/UX</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    React.js, Next.js, Tailwind CSS, HTML, CSS, Figma, Canva
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-350 flex items-center gap-1.5 font-bold">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isGoldMode ? "bg-[#ffd700]" : "bg-blue-500"}`}></span>
                    <span>Backend & Database</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    Node.js, MySQL, Supabase, Firebase, Linux
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-350 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Technologies & AI</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    AI Development, Prompt Engineering, Blockchain, Cybersecurity, Git, GitHub
                  </p>
                </div>
              </div>
            </div>

            {/* Academics badge */}
            <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">Academics</span>
                <span className="text-sm font-extrabold text-[#00c853] block">89.03% Score</span>
                <span className="text-[10px] text-zinc-400 block font-mono">Information Technology</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">Location</span>
                <span className="text-xs font-bold text-white block">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

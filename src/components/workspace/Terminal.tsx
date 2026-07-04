"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, ShieldAlert } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

interface LogEntry {
  type: "input" | "output" | "error";
  text: string;
  isLink?: boolean;
  linkUrl?: string;
  isHTML?: boolean;
}

interface TerminalProps {
  onOpenFile?: (fileName: string) => void;
  playSound?: () => void;
}

export default function Terminal({ onOpenFile, playSound }: TerminalProps) {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", text: "Welcome to Soham Malekar's Digital Workspace Terminal v1.0.0" },
    { type: "output", text: "Type 'help' to see list of available commands." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  const triggerConfetti = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7c4dff", "#00c853", "#00e5ff", "#ff007f"]
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newCommandHistory = [...commandHistory, trimmed];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(newCommandHistory.length);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newLogs: LogEntry[] = [
      { type: "input", text: `visitor@soham-workspace:~$ ${trimmed}` }
    ];

    switch (command) {
      case "help":
        newLogs.push(
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  ls                List files in current directory" },
          { type: "output", text: "  cat [file]        Display the contents of a file (e.g. cat README.md)" },
          { type: "output", text: "  open [file]       Open a file in the workspace editor tab" },
          { type: "output", text: "  about             About Soham Malekar" },
          { type: "output", text: "  skills            Show technical skill proficiency" },
          { type: "output", text: "  projects          List portfolio projects" },
          { type: "output", text: "  contact           Display contact info and links" },
          { type: "output", text: "  resume            Download/Open Soham's CV (PDF)" },
          { type: "output", text: "  confetti          Celebrate with a confetti burst!" },
          { type: "output", text: "  clear             Clear the terminal screen" },
          { type: "output", text: "  secret            [classified] Reveal a hidden message" }
        );
        break;
      case "ls":
        newLogs.push({
          type: "output",
          text: "README.md     projects.json     skills.ts     contact.json     soham.pdf"
        });
        break;
      case "cat":
        if (!args[0]) {
          newLogs.push({ type: "error", text: "cat: missing file operand. Try 'cat README.md'." });
        } else {
          const fileName = args[0].toLowerCase();
          if (fileName === "readme.md") {
            newLogs.push(
              { type: "output", text: "## README.md" },
              { type: "output", text: `Name: ${portfolioData.name}` },
              { type: "output", text: `Role: ${portfolioData.title}` },
              { type: "output", text: `Bio: ${portfolioData.bio}` },
              { type: "output", text: `Education: ${portfolioData.education.diploma} at ${portfolioData.education.school}` },
              { type: "output", text: `GPA / Score: ${portfolioData.score}` }
            );
          } else if (fileName === "projects.json") {
            newLogs.push(
              { type: "output", text: JSON.stringify(portfolioData.projects, null, 2) }
            );
          } else if (fileName === "skills.ts") {
            newLogs.push(
              { type: "output", text: "// Technical skills configuration" },
              ...portfolioData.skills.flatMap(cat => [
                { type: "output", text: `// ${cat.category}` },
                ...cat.items.map(s => ({ type: "output", text: `  "${s.name}": ${s.percentage}%` }))
              ]) as LogEntry[]
            );
          } else if (fileName === "contact.json") {
            newLogs.push(
              { type: "output", text: JSON.stringify(portfolioData.contact, null, 2) }
            );
          } else if (fileName === "soham.pdf") {
            newLogs.push(
              { type: "output", text: "soham.pdf is a binary file. Type 'resume' to download." }
            );
          } else {
            newLogs.push({ type: "error", text: `cat: ${args[0]}: No such file. Type 'ls' to see files.` });
          }
        }
        break;
      case "open":
        if (!args[0]) {
          newLogs.push({ type: "error", text: "open: missing file name. Try 'open README.md'." });
        } else {
          const fileName = args[0].toLowerCase();
          const validFiles = ["readme.md", "projects.json", "skills.ts", "contact.json"];
          const matched = validFiles.find(f => f === fileName);
          if (matched) {
            if (onOpenFile) {
              onOpenFile(matched);
              newLogs.push({ type: "output", text: `Opening ${matched} in editor...` });
            } else {
              newLogs.push({ type: "output", text: `Editor not available in this view. Opened ${matched}.` });
            }
          } else {
            newLogs.push({ type: "error", text: `open: ${args[0]}: File not found in workspace.` });
          }
        }
        break;
      case "about":
        newLogs.push(
          { type: "output", text: `Soham Malekar - ${portfolioData.title}` },
          { type: "output", text: portfolioData.bio },
          { type: "output", text: `Education: ${portfolioData.education.diploma} @ ${portfolioData.education.school}` },
          { type: "output", text: `Academic Score: ${portfolioData.score}` },
          { type: "output", text: `Core Focus: UI/UX, Clean Frontend Engineering, Modern Web Frameworks` }
        );
        break;
      case "skills":
        newLogs.push({ type: "output", text: "Soham's Skill Matrix:" });
        portfolioData.skills.forEach(cat => {
          newLogs.push({ type: "output", text: `\n[${cat.category}]` });
          cat.items.forEach(s => {
            const barLength = Math.round(s.percentage / 5);
            const bar = "█".repeat(barLength) + "░".repeat(20 - barLength);
            newLogs.push({ type: "output", text: `  ${s.name.padEnd(22)}: ${bar} ${s.percentage}%` });
          });
        });
        break;
      case "projects":
        newLogs.push({ type: "output", text: "Soham's Key Projects (click to view live demos):" });
        portfolioData.projects.forEach(p => {
          newLogs.push(
            { type: "output", text: `\n* ${p.title}` },
            { type: "output", text: `  Description: ${p.description}` },
            { type: "output", text: `  Tech Stack: ${p.tags.join(", ")}` },
            { type: "output", text: `  GitHub: ${p.githubUrl}`, isLink: true, linkUrl: p.githubUrl },
            { type: "output", text: `  Live Demo: ${p.liveUrl}`, isLink: true, linkUrl: p.liveUrl }
          );
        });
        break;
      case "contact":
        newLogs.push(
          { type: "output", text: "Contact channels:" },
          { type: "output", text: `  Email: ${portfolioData.contact.email}` },
          { type: "output", text: `  Phone: ${portfolioData.contact.phone}` },
          { type: "output", text: `  Location: ${portfolioData.contact.location}` },
          { type: "output", text: `  GitHub: ${portfolioData.contact.github}`, isLink: true, linkUrl: portfolioData.contact.github },
          { type: "output", text: `  LinkedIn: ${portfolioData.contact.linkedin}`, isLink: true, linkUrl: portfolioData.contact.linkedin },
          { type: "output", text: `  Instagram: ${portfolioData.contact.instagram}`, isLink: true, linkUrl: portfolioData.contact.instagram }
        );
        break;
      case "resume":
        newLogs.push({ type: "output", text: "Opening CV / Resume PDF in a new tab..." });
        if (typeof window !== "undefined") {
          window.open("/soham.pdf", "_blank");
        }
        break;
      case "confetti":
        newLogs.push({ type: "output", text: "Party time! 🎉" });
        triggerConfetti();
        break;
      case "clear":
        setHistory([]);
        return;
      case "secret":
        newLogs.push(
          { type: "output", text: "--------------------------------------------------------" },
          { type: "output", text: "  ⚡ EXECUTING DEEPMIND ANTIGRAVITY AI PROTOCOL ⚡  " },
          { type: "output", text: "--------------------------------------------------------" },
          { type: "output", text: "  Congratulations! You found a hidden secret inside this" },
          { type: "output", text: "  developer workspace! This portfolio was built by Soham" },
          { type: "output", text: "  collaborating with Antigravity, an agentic AI coder" },
          { type: "output", text: "  from Google DeepMind. We coded this entire space together." },
          { type: "output", text: "  Have a magical day! ✨" },
          { type: "output", text: "--------------------------------------------------------" }
        );
        triggerConfetti();
        break;
      default:
        newLogs.push({
          type: "error",
          text: `sh: command not found: ${command}. Type 'help' to see all valid commands.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newLogs]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (playSound) playSound();

    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === commandHistory.length - 1) {
        setHistoryIndex(commandHistory.length);
        setInput("");
      }
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col font-mono text-xs md:text-sm bg-[#050507] text-[#00c853] overflow-hidden"
      onClick={focusInput}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#09090b] border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-zinc-400" />
          <span className="text-zinc-300 font-semibold text-[11px] uppercase tracking-wider">sh - interactive shell</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto space-y-1.5 leading-relaxed selection:bg-[#00c853]/20 selection:text-white"
      >
        {history.map((log, index) => (
          <div 
            key={index}
            className={`${
              log.type === "input" 
                ? "text-zinc-200" 
                : log.type === "error" 
                  ? "text-red-400 font-medium" 
                  : "text-[#00c853]"
            }`}
          >
            {log.isLink ? (
              <a 
                href={log.linkUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="underline hover:text-white transition-colors flex items-center gap-1 inline-flex"
              >
                {log.text}
              </a>
            ) : (
              <span className="whitespace-pre-wrap">{log.text}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-1 text-zinc-200">
          <span className="shrink-0 text-[#00e5ff] font-medium">visitor@soham-workspace:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-zinc-100 font-mono caret-[#7c4dff]"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

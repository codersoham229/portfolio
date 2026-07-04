let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playKeySound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  // Resume context if suspended (common browser security behavior)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Slight random pitch fluctuation for natural keyboard sound
    osc.frequency.setValueAtTime(200 + Math.random() * 150, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore context errors
  }
}

export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  try {
    const now = ctx.currentTime;
    
    // Low to high double beep
    const playBeep = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);
      
      gainNode.gain.setValueAtTime(0.02, start);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    playBeep(440, now, 0.1);
    playBeep(880, now + 0.1, 0.15);
  } catch (e) {
    // Ignore errors
  }
}

export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.012, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore context errors
  }
}

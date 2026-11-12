"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./optimized-black-hole-utils/renderer";

/** Standalone host for the optimized black-hole renderer formerly used by the homepage. */
export function Example({ className }: { className?: string } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run the WebGPU black hole on desktop and laptop screens (>= 768px)
    const mql = window.matchMedia("(min-width: 768px)");
    let renderer: ReturnType<typeof createRenderer> | null = null;

    const start = () => {
      if (renderer || !mql.matches || cancelled) return;
      renderer = createRenderer({ canvas });
      void renderer.ready
        .then(() => {
          if (!cancelled) setIsReady(true);
        })
        .catch((err) => {
          console.warn("Optimized black hole WebGPU initialization:", err);
        });
    };

    const stop = () => {
      if (renderer) {
        renderer.dispose();
        renderer = null;
        setIsReady(false);
      }
    };

    if (mql.matches) {
      start();
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        start();
      } else {
        stop();
      }
    };

    mql.addEventListener("change", handler);

    return () => {
      cancelled = true;
      mql.removeEventListener("change", handler);
      stop();
    };
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className={`block h-full w-full touch-none transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default Example;

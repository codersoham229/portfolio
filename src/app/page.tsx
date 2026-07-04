"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumLayout from "@/components/classic/PremiumLayout";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#030303] text-zinc-500 font-mono text-xs">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Loading premium portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#030303] select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key="premium-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen w-screen"
        >
          <PremiumLayout />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

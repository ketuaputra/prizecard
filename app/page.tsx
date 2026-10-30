"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientStarsCanvas } from "@/components/AmbientStarsCanvas";
import { EnvelopeModal } from "@/components/EnvelopeModal";
import { LetterCard } from "@/components/LetterCard";
import { SpotifyCdPlayer } from "@/components/SpotifyCdPlayer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleResetLetter = () => {
    setIsLetterOpen(false);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#070a12] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-amber-300/30 border-t-amber-300 animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-[#070a12]">
      {/* Dynamic 60fps Starry Sky & Warm Ambient Dust Canvas */}
      <AmbientStarsCanvas />

      {/* Spotify-Style Spinning CD Player: "In The End" - Akasha (Looping & Non-Pausable) */}
      <SpotifyCdPlayer shouldPlay={isLetterOpen} />

      {/* Warm Ambient Radial Backdrop Glows */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-amber-600/10 via-rose-500/5 to-transparent blur-[120px]" />
        <div className="absolute w-[30rem] h-[30rem] rounded-full bg-amber-400/5 blur-[90px]" />
      </div>

      {/* Interactive Stage (Phase 1/2 vs Phase 3) */}
      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {!isLetterOpen ? (
            /* Phase 1 & 2: The Envelope Gatekeeper */
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center py-6"
            >
              <EnvelopeModal
                isOpen={isLetterOpen}
                onOpened={() => setIsLetterOpen(true)}
              />
            </motion.div>
          ) : (
            /* Phase 3: The Unfolded Letter */
            <motion.div
              key="letter-view"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full py-4"
            >
              <LetterCard
                onReset={handleResetLetter}
                whatsappNumber="087786548348"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Footer Watermark */}
      <footer className="relative z-20 mt-auto pt-8 pb-3 text-center pointer-events-none select-none">
        <p className="text-[11px] font-mono tracking-widest text-slate-500/60 uppercase">
          Warkah Digital &bull; Dibuat dengan ketulusan & kehangatan
        </p>
      </footer>
    </main>
  );
}

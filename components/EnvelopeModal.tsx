"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSeal } from "./WaxSeal";
import { triggerEnvelopeConfetti } from "@/lib/confetti";
import { ambientAudio } from "@/lib/audio";
import { Mail, Sparkles } from "lucide-react";

interface EnvelopeModalProps {
  onOpened: () => void;
  isOpen: boolean;
}

export function EnvelopeModal({ onOpened, isOpen }: EnvelopeModalProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Audio chime sound effect
    ambientAudio.playSealBreakChime();

    // Trigger visual confetti burst with champagne gold and warm stardust
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    triggerEnvelopeConfetti(originX, originY);

    // Transition timeline:
    // 0ms: seal starts dissolving + sparkles burst
    // 350ms: flap flips upwards in 3D
    // 850ms: letter slides out and takes center stage
    setTimeout(() => {
      onOpened();
      setIsOpening(false);
    }, 1100);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto perspective-1000">
      
      {/* Intro Micro-copy */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 px-4"
      >
        <p className="font-serif italic text-base sm:text-lg text-amber-200/90 tracking-wide font-light drop-shadow">
          &ldquo;Ada sapaan kecil yang melintasi waktu...&rdquo;
        </p>
        <p className="text-xs text-slate-400/80 tracking-widest uppercase mt-2 font-mono">
          Tanpa tuntutan • Hanya harapan baik
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        animate={{
          y: isOpen ? 40 : [0, -6, 0],
        }}
        transition={{
          y: isOpen
            ? { duration: 0.6 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-80 h-52 sm:w-96 sm:h-60 rounded-xl glass-letter border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform-style-3d group cursor-pointer"
      >
        {/* Soft breathing background glow */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-400/10 to-amber-400/15 blur-2xl animate-breathing-glow pointer-events-none" />

        {/* Back plate of envelope */}
        <div className="absolute inset-0 rounded-xl bg-[#0d121e] border border-amber-300/10 shadow-inner" />

        {/* Interior folded paper peek */}
        <motion.div
          animate={
            isOpening || isOpen
              ? {
                  y: -120,
                  opacity: 1,
                  scale: 1.02,
                  boxShadow: "0 -10px 25px rgba(245, 208, 130, 0.2)",
                }
              : { y: 0, opacity: 0.9, scale: 0.98 }
          }
          transition={{
            duration: 0.9,
            delay: isOpening ? 0.35 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-x-5 top-4 h-44 rounded-lg bg-[#181f2f] border border-amber-200/25 p-4 flex flex-col justify-between shadow-md"
        >
          {/* Subtle text skeleton lines inside folded letter */}
          <div className="space-y-2 opacity-50">
            <div className="h-1.5 w-24 bg-amber-200/40 rounded" />
            <div className="h-1 w-full bg-slate-400/30 rounded" />
            <div className="h-1 w-5/6 bg-slate-400/30 rounded" />
          </div>
          <div className="flex justify-end">
            <Sparkles className="w-3.5 h-3.5 text-amber-300/60" />
          </div>
        </motion.div>

        {/* Left and Right Envelope Fold Geometry (CSS Clip-paths) */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(25, 33, 49, 0.95) 0%, rgba(13, 18, 28, 0.97) 100%)",
            clipPath: "polygon(0 0, 50% 55%, 0 100%)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        />
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(225deg, rgba(23, 30, 45, 0.95) 0%, rgba(11, 15, 24, 0.97) 100%)",
            clipPath: "polygon(100% 0, 50% 55%, 100% 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Bottom Envelope Fold */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(17, 24, 39, 0.98) 0%, rgba(20, 28, 44, 0.94) 100%)",
            clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.09)",
          }}
        />

        {/* Top Flap with 3D rotateX folding */}
        <motion.div
          animate={
            isOpening || isOpen
              ? { rotateX: 180, zIndex: 5 }
              : { rotateX: 0, zIndex: 25 }
          }
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: "top center",
          }}
          className="absolute inset-x-0 top-0 h-32 rounded-t-xl transform-style-3d pointer-events-none"
        >
          {/* Flap triangle polygon */}
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(180deg, rgba(26, 36, 56, 0.98) 0%, rgba(15, 22, 35, 0.95) 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          />
        </motion.div>

        {/* Wax Seal placed at the center apex */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <WaxSeal
            onClick={handleOpenClick}
            isOpening={isOpening}
            disabled={isOpen}
          />
        </div>
      </motion.div>
    </div>
  );
}

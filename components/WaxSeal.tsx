"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WaxSealProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpening: boolean;
  disabled?: boolean;
}

export function WaxSeal({ onClick, isOpening, disabled }: WaxSealProps) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer ambient breathing ring */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-amber-400/30 via-rose-300/20 to-amber-500/30 blur-xl pointer-events-none"
      />

      {/* Interactive Wax Button */}
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled || isOpening}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        animate={
          isOpening
            ? {
                scale: [1, 1.3, 0],
                opacity: [1, 0.8, 0],
                rotate: [0, 8, -12],
                filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
              }
            : {
                scale: 1,
                opacity: 1,
              }
        }
        transition={
          isOpening
            ? { duration: 0.65, ease: [0.36, 0, 0.66, -0.56] }
            : { duration: 0.2 }
        }
        className="group relative z-20 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-pointer focus:outline-none transition-shadow"
        aria-label="Buka Surat"
      >
        {/* Molten wax irregular edge */}
        <div className="absolute inset-0 rounded-full wax-texture animate-seal-pulse shadow-2xl transition-all duration-300 group-hover:brightness-110" />

        {/* Intricate Inner Ring */}
        <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-amber-200/40 flex items-center justify-center shadow-inner">
          <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/30" />
          
          {/* Engraved Center Emblem: Delicate Star & Leaf Motif */}
          <div className="relative flex flex-col items-center justify-center text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <svg
              className="w-7 h-7 sm:w-9 sm:h-9 text-amber-200/90 drop-shadow-sm transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Antique Monogram / Laurel Ribbon */}
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3" opacity="0.6" />
              <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="rgba(253, 230, 138, 0.15)" />
              <path d="m9 12 2 2 4-4" strokeWidth="1.75" />
            </svg>
          </div>
        </div>

        {/* Subtle glimmer shine highlight passing */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.button>

      {/* Callout action label with pulse */}
      <motion.div
        animate={
          isOpening
            ? { opacity: 0, y: 10 }
            : { opacity: [0.75, 1, 0.75], y: [0, -2, 0] }
        }
        transition={
          isOpening
            ? { duration: 0.3 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm tracking-widest uppercase font-medium text-amber-200/90 drop-shadow-md select-none pointer-events-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Buka Surat</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
      </motion.div>
    </div>
  );
}

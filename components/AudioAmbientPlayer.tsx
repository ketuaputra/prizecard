"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ambientAudio } from "@/lib/audio";

interface AudioAmbientPlayerProps {
  autoPlayTrigger?: boolean;
}

export function AudioAmbientPlayer({ autoPlayTrigger }: AudioAmbientPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // If user opens the envelope, optionally offer gentle autoplay if allowed
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && !hasInteracted) {
      ambientAudio.start().then((started) => {
        if (started) {
          setIsPlaying(true);
        }
      });
    }
  }, [autoPlayTrigger, hasInteracted, isPlaying]);

  const toggleSound = () => {
    setHasInteracted(true);
    const active = ambientAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-5 right-5 sm:top-7 sm:right-7 z-40">
      <motion.button
        type="button"
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-letter border border-white/10 hover:border-amber-300/30 text-slate-300 hover:text-amber-200 transition-all shadow-lg backdrop-blur-md"
        aria-label={isPlaying ? "Senyapkan Suara Lofi" : "Putar Suara Hujan & Melodi"}
      >
        {/* Subtle glowing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-amber-400/10 blur-sm animate-pulse pointer-events-none" />
        )}

        {/* Icon & animated equalizer waves */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-amber-200/80" />
          )}
        </div>

        {/* Animated equalizer bars when active */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 px-0.5">
            <motion.span
              animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-amber-300 rounded-full"
            />
            <motion.span
              animate={{ height: ["60%", "30%", "95%", "40%", "60%"] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-0.5 bg-amber-200 rounded-full"
            />
            <motion.span
              animate={{ height: ["20%", "75%", "35%", "100%", "20%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="w-0.5 bg-amber-300 rounded-full"
            />
          </div>
        ) : null}

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? "Suasana Hujan & Nada Damai" : "Putar Nada Lofi"}
        </span>

        {/* Pulse dot indicator */}
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isPlaying ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]" : "bg-slate-500"
          }`}
        />
      </motion.button>
    </div>
  );
}

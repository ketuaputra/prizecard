"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Sparkles, RotateCcw, Feather, Check } from "lucide-react";
import { triggerBlessingSparks } from "@/lib/confetti";
import { ambientAudio } from "@/lib/audio";

interface LetterCardProps {
  onSendBlessing: () => void;
  blessingCount: number;
  onReset: () => void;
}

export function LetterCard({ onSendBlessing, blessingCount, onReset }: LetterCardProps) {
  const [hasSentRecently, setHasSentRecently] = useState(false);

  const handleBlessingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    ambientAudio.playBlessingChime();
    triggerBlessingSparks(originX, originY);
    onSendBlessing();

    setHasSentRecently(true);
    setTimeout(() => setHasSentRecently(false), 2400);
  };

  // Easing natural curve requested in prompt
  const naturalEase = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.8, ease: naturalEase }}
      className="relative w-full max-w-2xl mx-auto z-30"
    >
      {/* Outer ambient glow behind the card */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-amber-400/20 via-rose-400/10 to-amber-500/15 blur-2xl opacity-70 pointer-events-none" />

      {/* Main Archival Letter Container */}
      <div className="relative rounded-2xl glass-letter border border-amber-200/20 p-7 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden paper-pattern">
        
        {/* Subtle decorative gold inner framing */}
        <div className="absolute inset-3 sm:inset-4 rounded-xl border border-amber-300/15 pointer-events-none" />
        <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-amber-400/40" />
        <div className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-amber-400/40" />
        <div className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-amber-400/40" />
        <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-amber-400/40" />

        {/* Vintage Postal / Archival Header */}
        <div className="relative flex items-center justify-between pb-6 mb-7 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-ping" />
            <span className="font-serif italic text-amber-200/80 text-sm tracking-wider">
              Sebuah warkah tanpa tuntutan
            </span>
          </div>

          {/* Minimalist wax stamp icon */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-200/20 bg-amber-500/5 text-[11px] tracking-widest uppercase font-mono text-amber-300/70">
            <span>Tenang & Ikhlas</span>
          </div>
        </div>

        {/* Letter Body with Editorial Typography & Staggered Reveal */}
        <div className="relative space-y-6 text-left">
          
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: naturalEase }}
            className="font-serif italic text-xl sm:text-2xl text-amber-100/90 font-normal tracking-wide"
          >
            Halo, semoga kabarmu baik hari ini.
          </motion.p>

          {/* Sentence 1: Staggered Fade Up */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: naturalEase }}
            className="font-serif text-base sm:text-lg text-slate-200/90 leading-relaxed sm:leading-loose tracking-normal"
          >
            Ruang obrolan kita mungkin sudah lama sunyi dan waktu pelan-pelan menyusun jarak,
            tetapi cerita yang pernah kita bagi tetap punya tempat yang layak untuk diingat.
          </motion.p>

          {/* Sentence 2: Staggered Fade Up */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: naturalEase }}
            className="font-serif text-base sm:text-lg text-slate-200/90 leading-relaxed sm:leading-loose tracking-normal"
          >
            Tidak ada tuntutan untuk kembali atau mengulang apa pun; tulisan ini hadir hanya
            sebagai sapaan hangat yang menyeberangi jeda panjang, sekadar mendoakan agar
            langkahmu hari ini selalu dikelilingi hal-hal baik dan hari-hari yang tenang.
          </motion.p>

          {/* Sign-off */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: naturalEase }}
            className="pt-4 flex flex-col items-start"
          >
            <p className="font-serif italic text-sm text-slate-400">
              Menjaga damai dari kejauhan,
            </p>
            <p className="font-serif text-base text-amber-200/80 font-medium tracking-wide mt-1">
              — Selalu mendoakan yang terbaik
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
          <Sparkles className="absolute w-4 h-4 text-amber-300/50 bg-[#0c101b] px-0.5" />
        </div>

        {/* Interactive Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: naturalEase }}
          className="relative flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Micro-interaction: Kirim Doa Balik */}
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
            <button
              type="button"
              onClick={handleBlessingClick}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-200/30 hover:border-amber-200/60 text-amber-100 text-sm font-medium transition-all shadow-md active:scale-95"
            >
              {/* Subtle ambient pulse glow */}
              <span className="absolute inset-0 rounded-xl bg-amber-400/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              {hasSentRecently ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-200">Doa Hangat Terkirim</span>
                </>
              ) : (
                <>
                  <HeartHandshake className="w-4 h-4 text-rose-300 transition-transform group-hover:scale-110" />
                  <span>Kirim Doa Balik</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                </>
              )}
            </button>

            {/* Counter display */}
            {blessingCount > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-amber-300/80 font-mono mt-2"
              >
                ✨ {blessingCount} lentera doa melambung ke langit malam
              </motion.p>
            )}
          </div>

          {/* Re-fold Button */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-200 transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.04]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Lipat Surat Kembali</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

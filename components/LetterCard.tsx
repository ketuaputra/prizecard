"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw, ExternalLink } from "lucide-react";

interface LetterCardProps {
  onReset: () => void;
  whatsappNumber?: string; // Nomor WA tujuan opsional (contoh: '6281234567890'), kosongkan jika ingin direct ke wa.me dengan prefill chat
}

export function LetterCard({ onReset, whatsappNumber = "6287786548348" }: LetterCardProps) {
  const naturalEase = [0.16, 1, 0.3, 1];

  const handleWhatsAppRedirect = () => {
    const prefilledText = encodeURIComponent(
      "Halo"
    );

    // Format nomor: otomatis ubah format lokal '08...' menjadi format internasional '628...'
    let cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "62" + cleanNumber.slice(1);
    }

    const waUrl = cleanNumber
      ? `https://wa.me/${cleanNumber}?text=${prefilledText}`
      : `https://wa.me/?text=${prefilledText}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

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
            Halo Ade Alda, semoga kabarmu baik hari ini.
          </motion.p>

          {/* Sentence 1 */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: naturalEase }}
            className="font-serif text-base sm:text-lg text-slate-200/90 leading-relaxed sm:leading-loose tracking-normal"
          >
            Ruang obrolan kita mungkin sudah lama sunyi dan waktu pelan-pelan menyusun jarak,
            tetapi cerita yang pernah kita bagi tetap punya tempat yang layak untuk diingat.
          </motion.p>

          {/* Sentence 2 */}
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
          {/* Action: Lanjut di WhatsApp */}
          <div className="w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppRedirect}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-medium text-sm transition-all shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] active:scale-95"
            >
              {/* WhatsApp Official Logo SVG */}
              <svg
                className="w-5 h-5 text-white transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>

              <span>Lanjut di WhatsApp</span>
              <ExternalLink className="w-4 h-4 text-emerald-200 transition-transform group-hover:translate-x-0.5" />
            </button>
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

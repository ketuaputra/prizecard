"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Disc3, Music2, Sparkles, Volume2 } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface SpotifyCdPlayerProps {
  shouldPlay: boolean;
}

export function SpotifyCdPlayer({ shouldPlay }: SpotifyCdPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video ID: Eg-I4ah2EXA (In The End - Akasha)
  const videoId = "Eg-I4ah2EXA";

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player("youtube-hidden-player", {
          height: "1",
          width: "1",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId, // Required for loop in YouTube iframe
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              event.target.setVolume(85);
              if (shouldPlay) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                // TIDAK BISA DIPAUSE: Jika terjadi jeda, paksa putar kembali secara instan!
                event.target.playVideo();
                setIsPlaying(true);
              } else if (event.data === 0) {
                // Loop langsung saat lagu berakhir
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
          },
        });
      } catch (err) {
        console.warn("YouTube player init warning:", err);
      }
    };

    // Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
    };
  }, [shouldPlay]);

  // When shouldPlay becomes true (e.g. envelope opened), enforce play
  useEffect(() => {
    if (shouldPlay && playerRef.current?.playVideo) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Autoplay trigger:", e);
      }
    }
  }, [shouldPlay]);

  // Global first-interaction unlock if browser blocked early autoplay
  useEffect(() => {
    const unlockAudio = () => {
      if (playerRef.current?.playVideo) {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  return (
    <>
      {/* Hidden YouTube Iframe for Audio Playback & Infinite Loop */}
      <div
        ref={containerRef}
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="youtube-hidden-player" />
      </div>

      {/* Floating Spotify-Style Spinning CD Player Widget */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40"
      >
        <div className="relative group flex items-center gap-3 sm:gap-3.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#0e1320]/90 border border-white/10 hover:border-emerald-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all">
          
          {/* Subtle Spotify Green ambient glow behind */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent blur-lg opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* SPINNING CD / VINYL DISC ANIMATION */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
            {/* Outer Vinyl Shadow */}
            <div className="absolute inset-0 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />

            {/* Spinning Disc */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "linear",
              }}
              className="relative w-full h-full rounded-full flex items-center justify-center p-0.5"
              style={{
                background:
                  "radial-gradient(circle at center, #2a2a2a 0%, #151515 45%, #050505 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 8px rgba(0,0,0,0.9)",
              }}
            >
              {/* Concentric Vinyl Grooves */}
              <div
                className="absolute inset-1 rounded-full pointer-events-none opacity-40"
                style={{
                  background:
                    "repeating-radial-gradient(circle, transparent, transparent 1.5px, rgba(255,255,255,0.06) 2px, transparent 3px)",
                }}
              />

              {/* Holographic Light Reflection across disc */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-25"
                style={{
                  background:
                    "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.4) 40deg, transparent 90deg, rgba(255,255,255,0.4) 220deg, transparent 270deg)",
                }}
              />

              {/* Center Label: Akasha Album Art / Monogram */}
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-300 border border-black/40 flex items-center justify-center shadow-inner">
                {/* Spindle hole */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] border border-white/30" />
              </div>
            </motion.div>

            {/* Center Tonearm Stylus Indicator */}
            <div className="absolute -top-1 -right-0.5 w-2 h-3 border-r-2 border-t-2 border-amber-300/60 rounded-tr-sm pointer-events-none transform rotate-12" />
          </div>

          {/* TRACK INFO & SPOTIFY VIBE */}
          <div className="flex flex-col min-w-0 pr-1">
            {/* Spotify Brand & Equalizer Badge */}
            <div className="flex items-center gap-1.5 mb-0.5">
              {/* Spotify Official Green Icon */}
              <svg
                className="w-3.5 h-3.5 text-[#1DB954]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>

              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                Spotify Audio
              </span>

              {/* Animated Equalizer Waves */}
              <div className="flex items-end gap-0.5 h-2.5 ml-1">
                <motion.span
                  animate={{ height: ["20%", "100%", "40%", "90%", "20%"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-0.5 bg-[#1DB954] rounded-full"
                />
                <motion.span
                  animate={{ height: ["60%", "25%", "95%", "35%", "60%"] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-0.5 bg-emerald-300 rounded-full"
                />
                <motion.span
                  animate={{ height: ["30%", "85%", "25%", "100%", "30%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="w-0.5 bg-[#1DB954] rounded-full"
                />
              </div>
            </div>

            {/* Song Title & Artist */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate max-w-[130px] sm:max-w-[160px]">
                In The End
              </span>
              <span className="text-[11px] text-slate-300 font-medium truncate max-w-[130px] sm:max-w-[160px]">
                Akasha
              </span>
            </div>

            {/* Non-Pausable Notice */}
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
              <span className="text-[10px] text-slate-400/90 font-mono tracking-tight">
                Looping terus • Non-stop
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

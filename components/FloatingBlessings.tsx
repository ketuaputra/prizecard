"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface BlessingItem {
  id: string;
  x: number; // percentage across screen (10% to 90%)
  size: number;
  duration: number;
  hue: number;
  driftX: number;
}

interface FloatingBlessingsProps {
  blessings: BlessingItem[];
  onRemove: (id: string) => void;
}

export function FloatingBlessings({ blessings, onRemove }: FloatingBlessingsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {blessings.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              opacity: 0,
              y: "100vh",
              x: `${b.x}vw`,
              scale: 0.3,
            }}
            animate={{
              opacity: [0, 0.9, 0.95, 0.8, 0],
              y: "-15vh",
              x: [`${b.x}vw`, `${b.x + b.driftX}vw`, `${b.x - b.driftX * 0.5}vw`],
              scale: [0.3, 1, 1.1, 0.95, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: b.duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={() => onRemove(b.id)}
            className="absolute -bottom-8 flex flex-col items-center justify-center"
          >
            {/* Glowing Lantern / Warm Ember Orb */}
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.3}px`,
              }}
            >
              {/* Outer soft aura */}
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  backgroundColor: `hsla(${b.hue}, 90%, 65%, 0.45)`,
                  transform: "scale(1.8)",
                }}
              />

              {/* Core warm glowing lantern shell */}
              <div
                className="relative w-full h-full rounded-2xl border border-amber-200/50 shadow-lg flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at center, hsla(${b.hue + 10}, 100%, 90%, 0.95) 0%, hsla(${b.hue}, 85%, 55%, 0.8) 60%, hsla(${b.hue - 10}, 80%, 40%, 0.6) 100%)`,
                  boxShadow: `0 0 20px 4px hsla(${b.hue}, 90%, 60%, 0.6)`,
                }}
              >
                {/* Tiny inner flickering wick / heart */}
                <div className="w-1.5 h-2 rounded-full bg-white shadow-[0_0_8px_#fff] animate-pulse" />
              </div>

              {/* Trailing golden sparkles */}
              <div className="absolute -bottom-2 w-1 h-3 bg-gradient-to-b from-amber-300/80 to-transparent blur-[0.5px]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

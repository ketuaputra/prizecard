import confetti from "canvas-confetti";

/**
 * Trigger an elegant, warm stardust/champagne gold particle burst
 * designed specifically for the romantic & nostalgic unsealing moment.
 */
export function triggerEnvelopeConfetti(originX = 0.5, originY = 0.5) {
  if (typeof window === "undefined") return;

  // Champagne, warm gold, rose glow, soft ivory
  const warmPalette = [
    "#f5d082", // warm gold
    "#fbbf24", // warm amber
    "#f3e8cb", // champagne
    "#ffffff", // soft white sparkle
    "#fbcfe8", // delicate rose gold
    "#e2b189", // warm peach
  ];

  // 1. Initial micro stardust explosion
  confetti({
    particleCount: 45,
    spread: 60,
    startVelocity: 28,
    origin: { x: originX, y: originY },
    colors: warmPalette,
    ticks: 200,
    gravity: 0.7,
    scalar: 0.7,
    shapes: ["circle"],
    disableForReducedMotion: true,
  });

  // 2. Secondary wider, slower float of stars and soft shimmering flakes
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 90,
      spread: 90,
      startVelocity: 20,
      origin: { x: originX, y: originY },
      colors: ["#f3e8cb", "#fef3c7", "#ffffff", "#f59e0b"],
      ticks: 250,
      gravity: 0.5,
      scalar: 0.85,
      drift: 0.1,
      shapes: ["circle", "star"],
      disableForReducedMotion: true,
    });
  }, 120);

  // 3. Gentle lingering warm shimmer
  setTimeout(() => {
    confetti({
      particleCount: 20,
      spread: 120,
      startVelocity: 15,
      origin: { x: originX, y: originY - 0.05 },
      colors: ["#ffffff", "#fde68a"],
      ticks: 300,
      gravity: 0.35,
      scalar: 0.5,
      shapes: ["circle"],
      disableForReducedMotion: true,
    });
  }, 260);
}

/**
 * Micro sparkle effect for blessing button
 */
export function triggerBlessingSparks(originX = 0.5, originY = 0.85) {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 28,
    spread: 55,
    startVelocity: 22,
    origin: { x: originX, y: originY },
    colors: ["#fef08a", "#fde047", "#fca5a5", "#ffffff"],
    ticks: 180,
    gravity: 0.4,
    scalar: 0.65,
    shapes: ["circle", "star"],
    disableForReducedMotion: true,
  });
}

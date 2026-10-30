"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  speedY: number;
  speedX: number;
  hue: number;
  glowRadius: number;
}

export function AmbientStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Create particles: mix of distant stars and floating warm embers/dust
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isWarmEmber = Math.random() > 0.45;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isWarmEmber ? Math.random() * 2.2 + 0.8 : Math.random() * 1.4 + 0.4,
          baseAlpha: Math.random() * 0.5 + 0.2,
          alpha: Math.random() * 0.6 + 0.2,
          alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          speedY: isWarmEmber ? -(Math.random() * 0.35 + 0.1) : (Math.random() * 0.08 - 0.04),
          speedX: Math.sin(Math.random() * Math.PI) * 0.15,
          // Warm gold/amber (38-48) or soft starlight blue/rose (210 or 340)
          hue: isWarmEmber ? Math.random() * 18 + 36 : Math.random() > 0.7 ? 340 : 215,
          glowRadius: isWarmEmber ? Math.random() * 6 + 3 : 2,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const offsetX = (mouseX - width / 2) * 0.02;
      const offsetY = (mouseY - height / 2) * 0.02;

      ctx.clearRect(0, 0, width, height);

      // Render subtle radial warm vignettes behind everything
      const grad = ctx.createRadialGradient(
        width / 2 + offsetX * 2,
        height / 2 + offsetY * 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, "rgba(220, 165, 76, 0.055)");
      grad.addColorStop(0.5, "rgba(224, 141, 152, 0.025)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update pulsation
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.baseAlpha + 0.3 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Update positions with gentle drifting
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around bounds
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const posX = p.x + offsetX;
        const posY = p.y + offsetY;

        ctx.save();
        ctx.beginPath();
        ctx.arc(posX, posY, p.size, 0, Math.PI * 2);

        // Subtle glow for larger particles
        if (p.size > 1.2) {
          ctx.shadowBlur = p.glowRadius;
          ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, ${p.alpha * 0.7})`;
        }

        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${Math.max(0, p.alpha)})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
}

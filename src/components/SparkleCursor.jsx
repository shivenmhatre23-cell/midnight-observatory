import React, { useEffect, useRef } from 'react';

const SPARKLE_CHARS = ['✦', '✧', '⋆', '✨'];
const SPARKLE_COLORS = ['#f3c96b', '#f4d6d7', '#fff8f1', '#a34063'];
const MAX_SPARKLES = 20;

export default function SparkleCursor({ enabled }) {
  const containerRef = useRef(null);
  const activeCountRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    // Suppress sparkles on devices with reduced motion or coarse pointer (touchscreens)
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isReducedMotion || isCoarsePointer) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e) => {
      if (activeCountRef.current >= MAX_SPARKLES) return;

      const x = e.clientX;
      const y = e.clientY;

      // Spawn 4 small celestial sparkles around the click point
      const count = 4;
      for (let i = 0; i < count; i++) {
        if (activeCountRef.current >= MAX_SPARKLES) break;

        const sparkle = document.createElement('span');
        sparkle.className = 'celestial-sparkle-particle';
        sparkle.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
        sparkle.setAttribute('aria-hidden', 'true');

        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const distance = 16 + Math.random() * 22;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        const size = 11 + Math.random() * 6;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.color = color;
        sparkle.style.fontSize = `${size}px`;
        sparkle.style.setProperty('--dx', `${targetX}px`);
        sparkle.style.setProperty('--dy', `${targetY}px`);

        container.appendChild(sparkle);
        activeCountRef.current += 1;

        // Clean up DOM particle after animation completes
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
          activeCountRef.current = Math.max(0, activeCountRef.current - 1);
        }, 650);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      // Clean up any remaining sparkles in the container
      if (container) {
        container.innerHTML = '';
      }
      activeCountRef.current = 0;
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className="sparkle-layer-container"
      aria-hidden="true"
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor Component
 *
 * A modern, minimal custom cursor with smooth glow effects and interactive animations.
 * Features:
 * - Smooth cursor tracking with lerp interpolation
 * - Velocity-based stretch and glow effects
 * - Ambient background glow that follo ws cursor
 * - Hover state detection for interactive elements
 * - Minimal, eye-catching animations
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Use lazy initialization to detect touch device
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return true; // SSR safety - assume touch
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  });

  const positionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    prevX: 0,
    prevY: 0,
  });

  const stateRef = useRef({
    isHovering: false,
    scale: 1,
    targetScale: 1,
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let animationFrameId: number;

    // Lerp function for smooth interpolation
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current.targetX = e.clientX;
      positionRef.current.targetY = e.clientY;
    };

    // Hover detection for interactive elements
    const checkHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"]'
      );

      let isOverInteractive = false;
      const { x, y } = positionRef.current;

      interactiveElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          isOverInteractive = true;
        }
      });

      if (isOverInteractive !== stateRef.current.isHovering) {
        stateRef.current.isHovering = isOverInteractive;
        stateRef.current.targetScale = isOverInteractive ? 2 : 1;
      }
    };

    // Animation loop
    const animate = () => {
      const pos = positionRef.current;
      const state = stateRef.current;

      // Smooth interpolation for position (0.25 = snappy, responsive)
      pos.prevX = pos.x;
      pos.prevY = pos.y;
      pos.x = lerp(pos.x, pos.targetX, 0.25);
      pos.y = lerp(pos.y, pos.targetY, 0.25);

      // Smooth scale interpolation
      state.scale = lerp(state.scale, state.targetScale, 0.15);

      // Calculate velocity for dynamic effects
      const dx = pos.x - pos.prevX;
      const dy = pos.y - pos.prevY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Update cursor position and effects
      if (cursor && glow) {
        // Main cursor ring
        cursor.style.left = `${pos.x}px`;
        cursor.style.top = `${pos.y}px`;

        // Velocity-based stretch and rotation
        const velocityScale = Math.min(velocity * 0.03, 0.4);
        const angle = Math.atan2(dy, dx);
        const totalScale = state.scale + velocityScale;

        cursor.style.transform = `
          translate(-50%, -50%) 
          scale(${totalScale}) 
          rotate(${angle}rad)
        `;

        // Dynamic glow based on velocity
        const glowIntensity = Math.min(velocity * 2, 30);
        const hoverGlow = state.isHovering ? 15 : 0;

        cursor.style.boxShadow = `
          0 0 ${20 + glowIntensity + hoverGlow}px rgba(59, 130, 246, ${
          0.5 + velocity * 0.01
        }),
          0 0 ${35 + glowIntensity + hoverGlow}px rgba(139, 92, 246, ${
          0.35 + velocity * 0.008
        }),
          0 0 ${50 + glowIntensity}px rgba(59, 130, 246, ${
          0.2 + velocity * 0.005
        }),
          inset 0 0 15px rgba(255, 255, 255, ${state.isHovering ? 0.25 : 0.1})
        `;

        // Ambient glow background (slightly delayed for trail effect)
        glow.style.left = `${pos.x}px`;
        glow.style.top = `${pos.y}px`;
        glow.style.opacity = `${0.6 + velocity * 0.015}`;

        // Show cursor after first update
        if (cursor.style.opacity === "0") {
          cursor.style.opacity = "1";
        }
      }

      // Check hover state
      checkHoverState();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Ambient background glow - creates beautiful halo effect */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(circle at center,
              rgba(59, 130, 246, 0.18) 0%,
              rgba(139, 92, 246, 0.12) 35%,
              rgba(59, 130, 246, 0.06) 60%,
              transparent 80%
            )
          `,
          filter: "blur(35px)",
          opacity: 0.6,
          willChange: "transform, opacity",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          background: `
            radial-gradient(circle at center,
              rgba(255, 255, 255, 0.4) 0%,
              rgba(59, 130, 246, 0.2) 30%,
              rgba(139, 92, 246, 0.15) 60%,
              transparent 100%
            )
          `,
          border: "2px solid rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: `
            0 0 20px rgba(59, 130, 246, 0.5),
            0 0 35px rgba(139, 92, 246, 0.35),
            0 0 50px rgba(59, 130, 246, 0.2),
            inset 0 0 15px rgba(255, 255, 255, 0.1)
          `,
          willChange: "transform, box-shadow",
          transition: "opacity 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
}

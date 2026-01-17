"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor Componentƒ
 *
 * A modern, minimal custom cursor with smooth glow effects and interactive animations.
 * Features:
 * - Smooth cursor tracking with lerp interpolation
 * - Velocity-based stretch and glow effects
 * - Ambient background glow that follows cursor
 * - Hover state detection for interactive elements
 * - Minimal, eye-catching animations with trailing particles
 */

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Use lazy initialization to detect touch device
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  });

  // Set mounted flag only after hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const trailParticlesRef = useRef<
    Array<{
      id: number;
      x: number;
      y: number;
      opacity: number;
      scale: number;
      createdAt: number;
      element?: HTMLDivElement;
    }>
  >([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    if (!mounted) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const trailContainer = trailContainerRef.current;
    if (!glow || !trailContainer) return;

    let animationFrameId: number;
    let frameCounter = 0;

    // Lerp function for smooth interpolation
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current.targetX = e.clientX;
      positionRef.current.targetY = e.clientY;
    };

    // Touch handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      positionRef.current.targetX = touch.clientX;
      positionRef.current.targetY = touch.clientY;
      positionRef.current.x = touch.clientX;
      positionRef.current.y = touch.clientY;

      // Create ripple effect on tap - 8 particles in a circle
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30;
        const particle: (typeof trailParticlesRef.current)[0] = {
          id: particleIdRef.current++,
          x: touch.clientX + Math.cos(angle) * distance,
          y: touch.clientY + Math.sin(angle) * distance,
          opacity: 0.8,
          scale: 1.2,
          createdAt: Date.now(),
        };

        trailParticlesRef.current.push(particle);
        const element = createParticleElement(particle);
        trailContainer.appendChild(element);
        particle.element = element;

        if (trailParticlesRef.current.length > 20) {
          const removed = trailParticlesRef.current.shift();
          removed?.element?.remove();
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      positionRef.current.targetX = touch.clientX;
      positionRef.current.targetY = touch.clientY;

      // Create trail particles on drag
      if (frameCounter % 5 === 0) {
        const particle: (typeof trailParticlesRef.current)[0] = {
          id: particleIdRef.current++,
          x: touch.clientX,
          y: touch.clientY,
          opacity: 0.7,
          scale: 1.0,
          createdAt: Date.now(),
        };

        trailParticlesRef.current.push(particle);
        const element = createParticleElement(particle);
        trailContainer.appendChild(element);
        particle.element = element;

        if (trailParticlesRef.current.length > 15) {
          const removed = trailParticlesRef.current.shift();
          removed?.element?.remove();
        }
      }
    };

    // Hover detection for interactive elements
    const checkHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, [role='button']",
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

    // Create particle DOM element
    const createParticleElement = (
      particle: (typeof trailParticlesRef.current)[0],
    ) => {
      const div = document.createElement("div");
      div.style.cssText = `
        position: absolute;
        left: ${particle.x}px;
        top: ${particle.y}px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(${particle.scale});
        background: radial-gradient(circle at center,
          rgba(59, 130, 246, ${particle.opacity * 0.4}) 0%,
          rgba(139, 92, 246, ${particle.opacity * 0.3}) 40%,
          transparent 70%
        );
        filter: blur(12px);
        pointer-events: none;
      `;
      return div;
    };

    // Animation loop
    const animate = () => {
      const pos = positionRef.current;
      const state = stateRef.current;

      // Smooth interpolation for position
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

      // Create trail particles when moving
      if (velocity > 1) {
        if (frameCounter % 3 === 0 && Math.random() > 0.5) {
          const particle: (typeof trailParticlesRef.current)[0] = {
            id: particleIdRef.current++,
            x: pos.x,
            y: pos.y,
            opacity: 0.6 + velocity * 0.02,
            scale: 0.8 + velocity * 0.015,
            createdAt: Date.now(),
          };

          trailParticlesRef.current.push(particle);
          const element = createParticleElement(particle);
          trailContainer.appendChild(element);
          particle.element = element;

          // Limit particles
          if (trailParticlesRef.current.length > 15) {
            const removed = trailParticlesRef.current.shift();
            removed?.element?.remove();
          }
        }
      }

      // Update and remove old trail particles
      const now = Date.now();
      for (let i = trailParticlesRef.current.length - 1; i >= 0; i--) {
        const particle = trailParticlesRef.current[i];
        const age = now - particle.createdAt;

        if (age > 600) {
          particle.element?.remove();
          trailParticlesRef.current.splice(i, 1);
        } else {
          // Update particle opacity and scale
          const lifetimeProgress = age / 600;
          const currentOpacity = particle.opacity * (1 - lifetimeProgress);
          const currentScale = particle.scale * (1 - lifetimeProgress * 0.5);

          if (particle.element) {
            particle.element.style.opacity = `${currentOpacity}`;
            particle.element.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
          }
        }
      }

      // Update cursor position and effects (desktop only)
      if (cursor) {
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

        // Show cursor after first update
        if (cursor.style.opacity === "0") {
          cursor.style.opacity = "1";
        }
      }

      // Update glow (works for both desktop and touch devices)
      if (glow) {
        glow.style.left = `${pos.x}px`;
        glow.style.top = `${pos.y}px`;
        glow.style.opacity = `${0.6 + velocity * 0.015}`;
      }

      // Check hover state
      checkHoverState();
      frameCounter++;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Add appropriate event listeners based on device type
    if (isTouchDevice) {
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);

      if (isTouchDevice) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      // Clean up particles
      trailParticlesRef.current.forEach((p) => p.element?.remove());
      trailParticlesRef.current = [];
    };
  }, [isTouchDevice, mounted]);

  // Don't render during SSR
  if (!mounted) return null;

  return (
    <>
      {/* Trail particles container */}
      <div
        ref={trailContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9997,
        }}
      />

      {/* Ambient background glow - creates beautiful halo effect with increased radius */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(circle at center,
              rgba(59, 130, 246, 0.22) 0%,
              rgba(139, 92, 246, 0.16) 30%,
              rgba(59, 130, 246, 0.1) 50%,
              rgba(139, 92, 246, 0.05) 70%,
              transparent 85%
            )
          `,
          filter: "blur(50px)",
          opacity: 0.6,
          willChange: "transform, opacity",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Main cursor ring - only show on desktop/non-touch devices */}
      {!isTouchDevice && (
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
      )}
    </>
  );
}

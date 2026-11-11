import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  strength?: number; // Distance coefficient (e.g. 0.3)
  className?: string;
  active?: boolean;
}

export function Magnet({
  children,
  strength = 0.35,
  className = "",
  active = true,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Physics spring configuration with soft damping
  const springConfig = { damping: 18, stiffness: 160, mass: 0.15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    if (!active) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

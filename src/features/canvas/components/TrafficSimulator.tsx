import { motion } from "framer-motion";
import { useDNA } from "@/features/engine";
import { useMemo } from "react";

const generateSeeds = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `particle-${i}`,
    initialX: Math.random() * 1000,
    randomOffset: Math.random(),
    delay: i * 0.1,
  }));
};

interface TrafficSimulatorProps {
  active: boolean;
}

export const TrafficSimulator = ({ active }: TrafficSimulatorProps) => {
  const { elements } = useDNA();

  const particles = useMemo(() => generateSeeds(25), []);

  const target = useMemo(
    () => [...elements].sort((a, b) => b.score - a.score)[0],
    [elements],
  );

  if (!active || elements.length === 0 || !target) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.8)",
            filter: "blur(0.5px)",
            willChange: "transform, opacity",
          }}
          initial={{
            x: p.initialX,
            y: "110%",
            opacity: 0,
          }}
          animate={{
            x: target.x + p.randomOffset * target.width,
            y: target.y + p.randomOffset * target.height,
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.4, 1.2, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </div>
  );
};

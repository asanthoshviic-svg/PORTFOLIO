import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ParallaxBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Background layers with different speeds (3 Depth Layers)
  // Layer 1: Slow background starfield / subtle grid
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  // Layer 2: Medium ambient glowing gradient spheres
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.35, 1.1]);
  // Layer 3: Foreground cyber accents / particles
  const yLayer3 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <div
      ref={containerRef}
      id="parallax-scene-root"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#06070a]"
      aria-hidden="true"
    >
      {/* Subtle Digital Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* LAYER 1: Deep Slow Layer */}
      <motion.div
        id="parallax-layer-deep"
        style={{ y: yLayer1 }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Deep ambient dark blue & violet glow */}
        <div className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-900/15 blur-[140px]" />
        <div className="absolute top-[40%] -right-[10%] w-[700px] h-[700px] rounded-full bg-indigo-950/20 blur-[160px]" />
        <div className="absolute top-[75%] left-[10%] w-[800px] h-[800px] rounded-full bg-purple-950/20 blur-[180px]" />
      </motion.div>

      {/* LAYER 2: Middle Dynamic Glow Orbs */}
      <motion.div
        id="parallax-layer-middle"
        style={{ y: yLayer2, scale: orbScale }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Core Hero radial gradient glow that expands on scroll */}
        <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-600/10 via-blue-500/10 to-cyan-400/10 blur-[120px]" />
        {/* AI Lab transition orb */}
        <div className="absolute top-[55%] left-[30%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
      </motion.div>

      {/* LAYER 3: Foreground Parallax Float Particles */}
      <motion.div
        id="parallax-layer-foreground"
        style={{ y: yLayer3 }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-[25%] left-[12%] w-1.5 h-1.5 rounded-full bg-blue-400/40 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        <div className="absolute top-[45%] right-[18%] w-2 h-2 rounded-full bg-purple-400/35 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
        <div className="absolute top-[65%] left-[22%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <div className="absolute top-[85%] right-[25%] w-2 h-2 rounded-full bg-emerald-400/35 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      </motion.div>
    </div>
  );
};

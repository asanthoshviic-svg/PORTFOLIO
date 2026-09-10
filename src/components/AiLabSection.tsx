import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AI_LAB_TOOLS } from '../data/portfolioData';
import { Sparkles, Terminal, Cpu, Zap, ArrowRight } from 'lucide-react';

export const AiLabSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Camera zoom & Orb rotation driven by scroll
  const cameraZoom = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.94, 1.0, 1.04]);
  const orbRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const orbScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1.2, 0.9]);
  const orbOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.95], [0.2, 0.8, 0.8, 0.2]);

  // Card staggered entries
  const card1Y = useTransform(scrollYProgress, [0.2, 0.4], [60, 0]);
  const card1Op = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const card2Y = useTransform(scrollYProgress, [0.24, 0.44], [80, 0]);
  const card2Op = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);

  const card3Y = useTransform(scrollYProgress, [0.28, 0.48], [100, 0]);
  const card3Op = useTransform(scrollYProgress, [0.28, 0.48], [0, 1]);

  const card4Y = useTransform(scrollYProgress, [0.32, 0.52], [60, 0]);
  const card4Op = useTransform(scrollYProgress, [0.32, 0.52], [0, 1]);

  const card5Y = useTransform(scrollYProgress, [0.36, 0.56], [80, 0]);
  const card5Op = useTransform(scrollYProgress, [0.36, 0.56], [0, 1]);

  const card6Y = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
  const card6Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const cardTransforms = [
    { y: card1Y, op: card1Op },
    { y: card2Y, op: card2Op },
    { y: card3Y, op: card3Op },
    { y: card4Y, op: card4Op },
    { y: card5Y, op: card5Op },
    { y: card6Y, op: card6Op },
  ];

  return (
    <section
      ref={sectionRef}
      id="ai-lab"
      className="relative min-h-screen w-full py-28 sm:py-36 overflow-hidden bg-[#050609]"
    >
      {/* Darkened background with ambient laboratory neural aura */}
      <div className="absolute inset-0 bg-[#040508]/80 pointer-events-none" />

      {/* Large Glowing AI Orb / Neural Network in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-0">
        <motion.div
          id="ai-neural-orb-container"
          style={{
            rotate: orbRotation,
            scale: orbScale,
            opacity: orbOpacity
          }}
          className="relative w-full h-full flex items-center justify-center will-change-transform"
        >
          {/* Central Pulsing Plasma Core */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-purple-500/25 blur-[60px] animate-pulse" />
          <div className="absolute w-96 h-96 rounded-full border border-indigo-500/20" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-cyan-500/15 border-dashed" />
          <div className="absolute w-[680px] h-[680px] rounded-full border border-purple-500/10" />

          {/* Neural Orbiting Nodes and Connecting Synapses */}
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
            <defs>
              <linearGradient id="synapseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="synapseGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Neural Lines */}
            <line x1="400" y1="400" x2="250" y2="220" stroke="url(#synapseGrad1)" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="400" y1="400" x2="560" y2="240" stroke="url(#synapseGrad2)" strokeWidth="1.5" strokeDasharray="5 5" />
            <line x1="400" y1="400" x2="600" y2="520" stroke="url(#synapseGrad1)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="400" y1="400" x2="230" y2="540" stroke="url(#synapseGrad2)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="250" y1="220" x2="560" y2="240" stroke="#818cf8" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="560" y1="240" x2="600" y2="520" stroke="#c084fc" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="600" y1="520" x2="230" y2="540" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" />

            {/* Glowing Nodes */}
            <circle cx="400" cy="400" r="12" fill="#818cf8" className="animate-ping" opacity="0.4" />
            <circle cx="400" cy="400" r="6" fill="#ffffff" />
            <circle cx="250" cy="220" r="5" fill="#38bdf8" />
            <circle cx="560" cy="240" r="6" fill="#c084fc" />
            <circle cx="600" cy="520" r="5" fill="#38bdf8" />
            <circle cx="230" cy="540" r="5" fill="#c084fc" />
            <circle cx="400" cy="180" r="4" fill="#a5f3fc" />
            <circle cx="400" cy="620" r="4" fill="#fbcfe8" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        style={{ scale: cameraZoom }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              // SECTION 04
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
            <span className="text-xs font-mono text-gray-400">AI PLAYGROUND &bull; ACTIVE LAB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Exploring what&apos;s possible with AI.
          </h2>
          <p className="text-base text-gray-400 max-w-2xl">
            I treat AI tools not as shortcuts, but as creative accelerators to expand what one person can build.
          </p>
        </div>

        {/* 6 AI Tools Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AI_LAB_TOOLS.map((tool, idx) => {
            const transform = cardTransforms[idx];
            return (
              <motion.div
                key={tool.name}
                id={`ai-tool-card-${idx}`}
                style={{
                  y: transform.y,
                  opacity: transform.op
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#111625] via-[#0c0e1a] to-[#070912] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl shadow-black/60 will-change-transform"
              >
                <div>
                  {/* Card Top Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/[0.04] text-gray-300 border border-white/10">
                      {tool.category}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 font-medium">
                      {tool.version}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                  <span>ENVIRONMENT</span>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <span>ACTIVE TESTING</span>
                    <Zap className="w-3 h-3 text-cyan-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Break Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-indigo-950/60 via-purple-950/50 to-blue-950/60 border border-white/15 overflow-hidden text-center shadow-2xl"
        >
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-3">
              PHILOSOPHY &bull; THE BUILDER&apos;S MINDSET
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              &ldquo;I may be at the beginning, but I&apos;m already building.&rdquo;
            </h3>

            {/* Loop Steps */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono font-medium">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Learn
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Build
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Break
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Improve
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Repeat
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

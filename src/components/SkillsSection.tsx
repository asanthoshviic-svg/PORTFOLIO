import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Bot, Terminal, Code2, Globe, Cpu, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Staggered depths for the 6 cards:
  // Card 1: 80px -> 0
  const yCard1 = useTransform(scrollYProgress, [0.15, 0.45], [80, 0]);
  const opCard1 = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  // Card 2: 120px -> 0
  const yCard2 = useTransform(scrollYProgress, [0.18, 0.48], [120, 0]);
  const opCard2 = useTransform(scrollYProgress, [0.18, 0.43], [0, 1]);

  // Card 3: 160px -> 0
  const yCard3 = useTransform(scrollYProgress, [0.22, 0.52], [160, 0]);
  const opCard3 = useTransform(scrollYProgress, [0.22, 0.47], [0, 1]);

  // Card 4: 90px -> 0
  const yCard4 = useTransform(scrollYProgress, [0.28, 0.58], [90, 0]);
  const opCard4 = useTransform(scrollYProgress, [0.28, 0.53], [0, 1]);

  // Card 5: 130px -> 0
  const yCard5 = useTransform(scrollYProgress, [0.32, 0.62], [130, 0]);
  const opCard5 = useTransform(scrollYProgress, [0.32, 0.57], [0, 1]);

  // Card 6: 170px -> 0
  const yCard6 = useTransform(scrollYProgress, [0.36, 0.66], [170, 0]);
  const opCard6 = useTransform(scrollYProgress, [0.36, 0.61], [0, 1]);

  const cardTransforms = [
    { y: yCard1, opacity: opCard1 },
    { y: yCard2, opacity: opCard2 },
    { y: yCard3, opacity: opCard3 },
    { y: yCard4, opacity: opCard4 },
    { y: yCard5, opacity: opCard5 },
    { y: yCard6, opacity: opCard6 },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'ai-genai':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'development':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'web-ops':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'payments':
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'agentic-ai':
        return <Bot className="w-4 h-4 text-purple-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-24 sm:py-32 flex flex-col justify-center"
    >
      {/* Futuristic Cyber Environment Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              // SECTION 02
            </span>
            <div className="h-[1px] w-12 bg-indigo-500/40" />
            <span className="text-xs font-mono text-gray-400">TOOLKIT &amp; CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Tools I use to turn ideas into projects.
          </h2>
          <p className="text-base text-gray-400 max-w-2xl">
            An honest breakdown of what I work with daily — from foundational coursework to production deployment tools.
          </p>
        </div>

        {/* 6 Grid Cards with Multi-Depth Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const transform = cardTransforms[idx];

            return (
              <motion.div
                key={category.id}
                id={`skill-card-${category.id}`}
                style={{
                  y: transform.y,
                  opacity: transform.opacity
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#131625] via-[#0d101d] to-[#070912] border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-xl shadow-black/50 will-change-transform`}
              >
                {/* Header with Icon & Title */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                        {getCategoryIcon(category.id)}
                      </div>
                      <h3 className="font-semibold text-base text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    {category.exploringBadge ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
                        EXPLORING
                      </span>
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${category.dotColor}`} />
                    )}
                  </div>

                  {/* Body Content */}
                  {category.singleItem ? (
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-white font-mono">
                          {category.singleItem.shortName}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-gray-200">
                            {category.singleItem.fullName}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-mono">
                            {category.singleItem.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed pt-2">
                        {category.singleItem.description}
                      </p>

                      {category.singleItem.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {category.singleItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {category.items?.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span className="text-xs font-semibold text-gray-200">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-gray-400">
                            {item.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subtle bottom edge line */}
                <div className="mt-6 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>ACTIVE PRACTICE</span>
                  <span className="text-indigo-400/60 font-semibold group-hover:text-indigo-400 transition-colors">
                    VERIFIED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

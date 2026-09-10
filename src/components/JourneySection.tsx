import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { Sparkles, Compass, CheckCircle, Flag, ArrowUpRight } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Timeline line progressive fill (0% -> 100%)
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%']);
  // Traveling particle y position
  const particleY = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative min-h-screen w-full py-28 sm:py-36 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              // SECTION 05
            </span>
            <div className="h-[1px] w-12 bg-emerald-500/40" />
            <span className="text-xs font-mono text-gray-400">TIMELINE &bull; THE ROAD SO FAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Just getting started.
          </h2>
          <p className="text-base text-gray-400 max-w-xl">
            A timeline of milestones, active explorations, and what lies ahead in my developer journey.
          </p>
        </div>

        {/* Interactive Scroll-Reactive Timeline Track */}
        <div className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Base Background Track Line */}
          <div className="absolute left-[15px] sm:left-[23px] md:left-[31px] top-4 bottom-4 w-[2px] bg-white/[0.08]" />

          {/* Glowing Illuminated Line that progressively draws as user scrolls */}
          <motion.div
            id="journey-active-timeline-line"
            style={{ height: lineHeight }}
            className="absolute left-[15px] sm:left-[23px] md:left-[31px] top-4 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] origin-top will-change-transform"
          />

          {/* Traveling Glowing Particle along the line */}
          <motion.div
            style={{ top: particleY }}
            className="absolute left-[12px] sm:left-[20px] md:left-[28px] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#818cf8] pointer-events-none -translate-y-1/2 z-20"
          />

          {/* Milestones list */}
          <div className="space-y-12 sm:space-y-16">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              return (
                <MilestoneItem
                  key={milestone.id}
                  milestone={milestone}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface MilestoneItemProps {
  milestone: (typeof JOURNEY_MILESTONES)[0];
  index: number;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ milestone }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-start gap-4 sm:gap-6 group will-change-transform"
    >
      {/* Node Dot / Marker */}
      <div className="relative -ml-[23px] sm:-ml-[27px] md:-ml-[35px] mt-1.5 flex items-center justify-center shrink-0">
        {milestone.isCurrent ? (
          <div className="relative flex items-center justify-center">
            <span className="w-5 h-5 rounded-full bg-emerald-500/30 animate-ping absolute" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#07070b] shadow-[0_0_10px_rgba(52,211,153,0.9)] relative z-10" />
          </div>
        ) : (
          <div
            className="w-3 h-3 rounded-full bg-[#1e2335] border-2 border-indigo-400/80 group-hover:scale-125 group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_rgba(129,140,248,0.8)] transition-all duration-300"
          />
        )}
      </div>

      {/* Milestone Content Card */}
      <div
        className={`flex-1 p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
          milestone.isCurrent
            ? 'bg-gradient-to-r from-emerald-950/40 via-[#0d131f] to-[#070912] border border-emerald-500/50 shadow-xl shadow-emerald-950/30'
            : 'bg-gradient-to-b from-[#111625] via-[#0c0e1a] to-[#070912] border border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span
            className="text-xs font-mono font-bold tracking-wider"
            style={{ color: milestone.color }}
          >
            {milestone.dateOrCategory}
          </span>

          {milestone.isCurrent && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CURRENT STATUS
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">
          {milestone.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {milestone.description}
        </p>

        {milestone.tags && (
          <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-white/[0.06]">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] text-gray-300 border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

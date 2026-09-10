import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Entry Transition (0.0 to 0.4):
  // Clean sharp opacity & scale transition (zero blur)
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.95], [0, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.95], [0.85, 1, 1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [60, 0, 0, -40]);

  // Staggered Stats Cards Animations (one after another based on scroll position)
  // Card 1: 0.25 -> 0.45
  const card1Y = useTransform(scrollYProgress, [0.25, 0.42], [50, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.25, 0.42], [0, 1]);
  const card1Scale = useTransform(scrollYProgress, [0.25, 0.42], [0.9, 1]);

  // Card 2: 0.32 -> 0.49
  const card2Y = useTransform(scrollYProgress, [0.32, 0.49], [50, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.49], [0, 1]);
  const card2Scale = useTransform(scrollYProgress, [0.32, 0.49], [0.9, 1]);

  // Card 3: 0.39 -> 0.56
  const card3Y = useTransform(scrollYProgress, [0.39, 0.56], [50, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.39, 0.56], [0, 1]);
  const card3Scale = useTransform(scrollYProgress, [0.39, 0.56], [0.9, 1]);

  // Card 4: 0.46 -> 0.63
  const card4Y = useTransform(scrollYProgress, [0.46, 0.63], [50, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.46, 0.63], [0, 1]);
  const card4Scale = useTransform(scrollYProgress, [0.46, 0.63], [0.9, 1]);

  const cardTransforms = [
    { y: card1Y, opacity: card1Opacity, scale: card1Scale },
    { y: card2Y, opacity: card2Opacity, scale: card2Scale },
    { y: card3Y, opacity: card3Opacity, scale: card3Scale },
    { y: card4Y, opacity: card4Opacity, scale: card4Scale },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[160vh] w-full flex items-center justify-center py-20"
    >
      <div className="sticky top-12 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          id="about-viewport-container"
          style={{
            opacity,
            scale,
            y: contentY
          }}
          className="relative will-change-transform"
        >
          {/* Section Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              // SECTION 01
            </span>
            <div className="h-[1px] w-12 bg-indigo-500/40" />
            <span className="text-xs font-mono text-gray-400">ABOUT SANTHOSH</span>
          </div>

          {/* Large About Headline revealed line-by-line */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl">
              <span className="block text-gray-400 font-normal text-2xl sm:text-3xl md:text-4xl mb-2">
                &ldquo;I don&apos;t just explore AI tools.
              </span>
              <span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                I use them to build.&rdquo;
              </span>
            </h2>
          </div>

          {/* Bio Story Split Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              {PERSONAL_INFO.aboutStory.map((paragraph, idx) => (
                <p key={idx} className="text-gray-300/95 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#0f1322] border border-white/[0.08]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-medium">
                  <Terminal className="w-4 h-4" />
                  <span>CURRENT_FOCUS.status</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Active in first-year studies while building live production sites, exploring Google AI Studio APIs, testing payment gateways, and experimenting with autonomous agents.
                </p>
              </div>

              <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>KGiSL Institute of Tech</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Coimbatore, TN</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Statistics Cards Animated Staggered One-After-Another */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PERSONAL_INFO.stats.map((stat, idx) => {
              const transform = cardTransforms[idx];
              return (
                <motion.div
                  key={stat.label}
                  id={`about-stat-card-${idx}`}
                  style={{
                    y: transform.y,
                    opacity: transform.opacity,
                    scale: transform.scale
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#141826] via-[#0d101a] to-[#080a11] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-xl shadow-black/40 will-change-transform"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent group-hover:via-indigo-400 transition-all" />

                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-display ${stat.color}`}>
                      {stat.value}
                    </span>
                    <Sparkles className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <h3 className="text-xs font-mono font-bold tracking-wider text-gray-300 uppercase mb-1">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {stat.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

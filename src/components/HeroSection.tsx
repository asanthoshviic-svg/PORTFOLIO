import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowDown, Github, MapPin, Sparkles, Code2, Cpu, Globe, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PortraitAvatar } from './PortraitAvatar';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse tilt tracking for the profile card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 24 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 24 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Bind scroll progress specifically to this Hero stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Camera Motion & Transitions:
  // 1. Headline scales down and fades out
  const headlineScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.88, 0.7]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45, 0.8], [1, 0.6, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  // 2. Profile card zooms toward viewer at first (1 -> 1.12), then shrinks and slides right/side (0.5 -> 0.9)
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1, 1.12, 0.88, 0.75]);
  const cardY = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0, -10, 40, 100]);
  const cardX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 15, 60, 120]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.65, 0.95], [1, 0.9, 0]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 4]);

  // 3. Background particles outward dispersion
  const particleSpread = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  // 4. Gradient glow expansion with rich vibrant blue filter
  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [0.65, 0.9, 0.55]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[200vh] w-full"
    >
      {/* Sticky Viewport Window with top clearance so navbar never obscures content */}
      <div className="sticky top-0 min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-16 pb-6">
        {/* Expanding Ambient Glow on Scroll with Strong Blue Filter */}
        <motion.div
          id="hero-ambient-glow"
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-600/35 via-cyan-500/25 to-indigo-600/30 blur-[130px] pointer-events-none"
        />

        {/* 3D Particle Accents that move outward as user scrolls */}
        <motion.div
          style={{ x: particleSpread }}
          className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full border border-indigo-500/10 pointer-events-none"
        />
        <motion.div
          style={{ x: useTransform(particleSpread, (v) => -v) }}
          className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full border border-cyan-500/10 pointer-events-none"
        />

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <motion.div
              id="hero-content-left"
              style={{
                scale: headlineScale,
                opacity: headlineOpacity,
                y: headlineY
              }}
              className="lg:col-span-7 flex flex-col items-start will-change-transform"
            >
              {/* Upper Introduction & Institution Status Pill */}
              <motion.div
                id="hero-upper-status"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3.5"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-xs font-mono text-cyan-300 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="font-semibold tracking-wide">HI, I&apos;M</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111424] border border-white/10 text-xs text-gray-300 font-mono shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>B.Tech AI &amp; DS • 1st Year</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-300">KGiSL Institute of Tech</span>
                </div>
              </motion.div>

              {/* Prominent Name as Primary Hero Headline */}
              <h1 id="hero-main-name" className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05] mb-2.5">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.3)]"
                  >
                    SANTHOSH A
                  </motion.span>
                </span>
              </h1>

              {/* Action Focus Tagline */}
              <div id="hero-action-tagline" className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                <span className="inline-block text-white mr-2 sm:mr-3">
                  BUILDING.
                </span>
                <span className="inline-block bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent mr-2 sm:mr-3">
                  LEARNING.
                </span>
                <span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  EXPLORING AI.
                </span>
              </div>

              {/* Subheadline Quote */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-lg sm:text-xl font-medium text-indigo-200/90 italic tracking-wide mb-5"
              >
                {PERSONAL_INFO.subheadline}
              </motion.p>

              {/* Bio Summary */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mb-8"
              >
                {PERSONAL_INFO.bioSummary}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <button
                  id="hero-explore-work-btn"
                  onClick={() => scrollToSection('projects')}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <a
                  id="hero-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-gray-200 hover:text-white border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 active:scale-95"
                >
                  <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span>GitHub</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">↗</span>
                </a>

                <button
                  id="hero-connect-btn"
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 text-sm font-medium transition-all"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Let&apos;s Connect</span>
                </button>
              </motion.div>

              {/* Location & Availability Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex items-center gap-2 text-xs text-gray-400 font-mono"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400/80" />
                <span>{PERSONAL_INFO.location}</span>
                <span className="text-gray-600">•</span>
                <span className="text-emerald-400/90 font-medium">Available for Internships &amp; Collaborations</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Profile Interactive Card */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div
                id="hero-profile-card"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  scale: cardScale,
                  y: cardY,
                  x: cardX,
                  opacity: cardOpacity,
                  rotateZ: cardRotate,
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1000
                }}
                className="relative w-full max-w-[360px] sm:max-w-[390px] rounded-2xl bg-[#090e1d] border-2 border-blue-500/40 p-3.5 shadow-2xl shadow-blue-950/80 ring-1 ring-purple-500/30 will-change-transform cursor-pointer group/herocard"
              >
                {/* Futuristic Ambient Blue/Purple Backlight Glow behind Hero Card */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-xl -z-10 pointer-events-none opacity-80 group-hover/herocard:opacity-100 transition-opacity duration-700" />

                {/* Window Header */}
                <div className="flex items-center justify-between px-3 py-2 mb-3 border-b border-white/[0.08] bg-black/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-1 text-xs font-mono font-bold text-white tracking-wide flex items-center gap-1.5">
                      SANTHOSH A
                      <span className="text-cyan-400 text-[10px] font-normal">// AI &amp; DS</span>
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    AI_STUDENT_v1
                  </span>
                </div>

                {/* Profile Portrait Container with Floating Badges */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-[#0c0d16]">
                  <PortraitAvatar className="w-full h-full" />

                  {/* FLOATING BADGE 1: Top Left - PYTHON */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0d18] border border-blue-500/50 shadow-lg shadow-black/80"
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-mono font-semibold text-blue-200">PYTHON</span>
                  </motion.div>

                  {/* FLOATING BADGE 2: Top Right - AI MODELS */}
                  <motion.div
                    animate={{ y: [3, -3, 3] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0d18] border border-purple-500/50 shadow-lg shadow-black/80"
                  >
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-mono font-semibold text-purple-200">AI MODELS</span>
                  </motion.div>

                  {/* FLOATING BADGE 3: Bottom Left - VERCEL & GITHUB */}
                  <motion.div
                    animate={{ y: [-2, 4, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0d18] border border-emerald-500/50 shadow-lg shadow-black/80"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono font-semibold text-emerald-200">VERCEL &amp; GITHUB</span>
                  </motion.div>

                  {/* FLOATING BADGE 4: Bottom Right - GEN AI & AGENTIC */}
                  <motion.div
                    animate={{ y: [2, -4, 2] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0d18] border border-amber-500/50 shadow-lg shadow-black/80"
                  >
                    <Bot className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-mono font-semibold text-amber-200">GEN AI &amp; AGENTIC</span>
                  </motion.div>
                </div>

                {/* Card Footer Bar */}
                <div className="mt-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">Santhosh A</h2>
                    <p className="text-[11px] text-gray-400 font-mono">B.Tech AI &amp; DS @ KGiSL Tech</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    SHIPPER
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll down mouse indicator at bottom */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

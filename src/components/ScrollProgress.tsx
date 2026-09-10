import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeIdx, setActiveIdx] = useState(0);

  const chapters = [
    { id: 'hero', label: '01', name: 'Hero' },
    { id: 'about', label: '02', name: 'About' },
    { id: 'skills', label: '03', name: 'Toolkit' },
    { id: 'projects', label: '04', name: 'Projects' },
    { id: 'ai-lab', label: '05', name: 'AI Lab' },
    { id: 'journey', label: '06', name: 'Journey' },
    { id: 'contact', label: '07', name: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      chapters.forEach((chapter, idx) => {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveIdx(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Edge Cinematic Progress Line */}
      <div id="scroll-progress-bar-container" className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-white/[0.05] pointer-events-none">
        <motion.div
          id="scroll-progress-indicator"
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 origin-left shadow-[0_0_12px_rgba(99,102,241,0.8)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Side Chapter Navigator (Desktop) */}
      <aside
        id="side-timeline-navigator"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-3 px-1.5 rounded-full bg-[#0b0d18] border border-white/10 shadow-2xl"
        aria-label="Section Timeline"
      >
        {chapters.map((chap, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={chap.id}
              id={`timeline-dot-${chap.id}`}
              onClick={() => scrollToChapter(chap.id)}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
              title={`${chap.label} — ${chap.name}`}
              aria-label={`Jump to ${chap.name}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-8 px-2.5 py-1 rounded bg-[#10121d] border border-white/15 text-[11px] font-mono text-gray-200 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                {chap.label} • {chap.name}
              </span>

              {/* Indicator Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-3 bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.9)] scale-110'
                    : 'w-1.5 h-1.5 bg-gray-600 group-hover:bg-gray-400 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
};

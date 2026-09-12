import React, { useState } from 'react';
import { motion } from 'motion/react';
import githubAvatar from '../assets/github_avatar.png';

interface PortraitAvatarProps {
  className?: string;
}

export const PortraitAvatar: React.FC<PortraitAvatarProps> = ({ className = '' }) => {
  // Source order: bundled local GitHub avatar asset -> live GitHub profile URL -> public folder fallbacks
  const [imageSrc, setImageSrc] = useState<string>(githubAvatar || 'https://github.com/asanthoshviic-svg.png');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      if (imageSrc !== 'https://github.com/asanthoshviic-svg.png') {
        setImageSrc('https://github.com/asanthoshviic-svg.png');
      } else if (imageSrc !== '/github_avatar.png') {
        setImageSrc('/github_avatar.png');
      } else {
        setImageSrc('/me1-removebg-preview.png');
      }
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none group/avatar ${className}`}>
      {/* Futuristic Deep Space Canvas with Multi-layer Blue/Purple Lighting */}
      <div className="absolute inset-0 bg-[#070b19]">
        {/* Core Electric Cyan & Blue Halo directly behind Santhosh's head */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.5, 0.75, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-cyan-400/45 via-blue-600/35 to-transparent blur-3xl pointer-events-none"
        />

        {/* Ambient Purple & Ultraviolet Accent Glow on Right Shoulder */}
        <motion.div
          animate={{
            scale: [1.05, 0.95, 1.05],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-1/3 -right-8 w-56 h-56 rounded-full bg-gradient-to-bl from-purple-600/40 via-indigo-500/30 to-transparent blur-2xl pointer-events-none"
        />

        {/* Deep Indigo Backlight on Left Shoulder */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/4 -left-8 w-48 h-48 rounded-full bg-blue-700/35 blur-2xl pointer-events-none"
        />

        {/* Subtle Futuristic Cyber Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(96, 165, 250, 0.6) 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Subtle Horizontal Tech Scanline Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #38bdf8 0px, #38bdf8 1px, transparent 1px, transparent 4px)',
          }}
        />
      </div>

      {/* GitHub Profile Photo with Dynamic Glow & Framing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: isLoaded ? 1 : 0.85,
          scale: isLoaded ? 1 : 0.96,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none"
      >
        <img
          src={imageSrc}
          alt="Santhosh A — GitHub Profile Photo"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          loading="eager"
          decoding="async"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.04] drop-shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-transform duration-700 group-hover/avatar:scale-[1.02]"
        />
      </motion.div>

      {/* Futuristic Bottom Vignette (smoothly melts suit jacket into card bottom) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#090e1d] via-[#090e1d]/30 via-40% to-transparent pointer-events-none" />

      {/* Subtle Specular Glow along Top Rim */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-20 pointer-events-none" />

      {/* Soft Blue/Purple Edge Ring for Clean Contrast */}
      <div className="absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-blue-500/25 pointer-events-none" />
    </div>
  );
};

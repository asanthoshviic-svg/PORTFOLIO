import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, RefreshCw } from 'lucide-react';

interface PortraitAvatarProps {
  className?: string;
}

export const PortraitAvatar: React.FC<PortraitAvatarProps> = ({ className = '' }) => {
  const [imageSrc, setImageSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('santhosh_hero_avatar');
      if (saved) return saved;
    }
    return '/me1-removebg-preview.png';
  });

  const [hasError, setHasError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUploadToast, setShowUploadToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fallback URLs chain
  const fallbackSources = [
    '/me1-removebg-preview.png',
    '/santhosh-profile.png',
    '/github_avatar.png'
  ];

  const handleImageError = () => {
    if (fallbackIndex < fallbackSources.length - 1) {
      const nextIndex = fallbackIndex + 1;
      setFallbackIndex(nextIndex);
      setImageSrc(fallbackSources[nextIndex]);
    } else {
      setHasError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          setHasError(false);
          setIsLoaded(true);
          try {
            localStorage.setItem('santhosh_hero_avatar', result);
          } catch {
            // Storage quota warning ignored
          }
          setShowUploadToast(true);
          setTimeout(() => setShowUploadToast(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    try {
      localStorage.removeItem('santhosh_hero_avatar');
    } catch {}
    setFallbackIndex(0);
    setImageSrc('/me1-removebg-preview.png');
    setHasError(false);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none group/avatar ${className}`}>
      {/* Hidden file input for one-click photo update */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        title="Upload photo"
      />

      {/* Dynamic Ambient Background with Rich Cinematic Blue Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b142f] via-[#090f23] to-[#060812]">
        {/* Pulsing Backlight Behind Silhouette */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-indigo-500/30 rounded-full blur-3xl pointer-events-none"
        />

        {/* Ambient Corner Accents */}
        <div className="absolute top-2 left-4 w-36 h-28 bg-blue-500/25 rounded-full blur-2xl" />
        <div className="absolute top-10 right-2 w-40 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-28 bg-blue-600/20 rounded-full blur-2xl" />

        {/* Futuristic Subtle Coordinate Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.4" />
          <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.4" />
          <circle cx="50%" cy="38%" r="90" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.35" />
          <circle cx="50%" cy="38%" r="130" stroke="#60a5fa" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" />
        </svg>
      </div>

      {/* Real Photo with Cinematic Floating & Entrance Animations */}
      {!hasError ? (
        <motion.div
          className="relative z-10 w-full h-full flex items-end justify-center"
          animate={{
            y: [-4, 4, -4],
            scale: [1, 1.012, 1]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.img
            src={imageSrc}
            alt="Santhosh A"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{
              opacity: isLoaded ? 1 : 0.8,
              scale: isLoaded ? 1 : 0.96,
              filter: isLoaded ? 'blur(0px)' : 'blur(4px)'
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[1.02] drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
          />

          {/* Holographic Cyan Scanline Animation */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)] pointer-events-none z-20"
            animate={{
              top: ['-5%', '110%'],
              opacity: [0, 0.85, 0.85, 0]
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1.5
            }}
          />
        </motion.div>
      ) : (
        /* Graceful High-Fidelity Character Vector Fallback */
        <motion.div
          className="relative z-10 w-full h-full flex items-end justify-center"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 400 460"
            className="relative z-10 w-full h-full object-cover filter contrast-[1.05]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e2333" />
                <stop offset="50%" stopColor="#12141f" />
                <stop offset="100%" stopColor="#0a0c13" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cf966c" />
                <stop offset="50%" stopColor="#b4784e" />
                <stop offset="100%" stopColor="#965d38" />
              </linearGradient>
              <linearGradient id="glassesGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#25242b" />
                <stop offset="60%" stopColor="#121115" />
                <stop offset="100%" stopColor="#080709" />
              </linearGradient>
            </defs>

            {/* Suit & Collar */}
            <path d="M 50 460 L 95 315 L 145 310 L 155 350 L 175 460 Z" fill="url(#suitGrad)" stroke="#2d3748" strokeWidth="1.5" />
            <path d="M 350 460 L 305 315 L 255 310 L 245 350 L 225 460 Z" fill="url(#suitGrad)" stroke="#2d3748" strokeWidth="1.5" />
            <polygon points="145,310 255,310 230,420 170,420" fill="#f8fafc" />
            <polygon points="145,310 185,340 188,310" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="255,310 215,340 212,310" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="188,318 212,318 218,460 182,460" fill="#090a0f" stroke="#1e2230" strokeWidth="1" />
            <polygon points="192,312 208,312 204,330 196,330" fill="#1e2230" />
            <path d="M 125 315 L 170 385 L 155 460 L 80 460 Z" fill="#131622" stroke="#334155" strokeWidth="1" />
            <path d="M 275 315 L 230 385 L 245 460 L 320 460 Z" fill="#131622" stroke="#334155" strokeWidth="1" />

            {/* Head & Neck */}
            <path d="M 170 240 L 170 320 Q 200 330 230 320 L 230 240 Z" fill="url(#skinGrad)" />
            <path d="M 170 240 Q 200 270 230 240 Z" fill="#7c4728" opacity="0.3" />
            <path d="M 140 160 Q 130 240 165 265 Q 200 278 235 265 Q 270 240 260 160 Q 260 90 200 90 Q 140 90 140 160 Z" fill="url(#skinGrad)" />
            <ellipse cx="132" cy="180" rx="9" ry="17" fill="#b4784e" />
            <ellipse cx="268" cy="180" rx="9" ry="17" fill="#b4784e" />

            {/* Hair */}
            <path d="M 132 155 Q 128 110 150 80 Q 175 45 205 45 Q 235 45 255 75 Q 272 105 268 155 Q 255 125 240 115 Q 200 110 160 115 Q 142 125 132 155 Z" fill="url(#hairGrad)" />
            <path d="M 150 78 Q 175 48 200 48 Q 230 48 250 72 Q 220 58 180 62 Z" fill="#33313d" />

            {/* Facial Features */}
            <path d="M 152 148 Q 170 142 188 147" stroke="#18171d" strokeWidth="5" strokeLinecap="round" />
            <path d="M 212 147 Q 230 142 248 148" stroke="#18171d" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="170" cy="165" rx="10" ry="6" fill="#f8fafc" />
            <circle cx="171" cy="165" r="4.5" fill="#261b16" />
            <circle cx="173" cy="163" r="1.5" fill="#ffffff" />
            <ellipse cx="230" cy="165" rx="10" ry="6" fill="#f8fafc" />
            <circle cx="229" cy="165" r="4.5" fill="#261b16" />
            <circle cx="231" cy="163" r="1.5" fill="#ffffff" />
            <path d="M 200 155 L 197 195 Q 200 200 206 195" stroke="#7c4728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 178 215 Q 200 210 222 215 Q 212 222 200 220 Q 188 222 178 215 Z" fill="#1c1917" opacity="0.9" />
            <path d="M 183 227 Q 200 234 217 227" stroke="#68341b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="200" cy="245" rx="12" ry="5" fill="#1c1917" opacity="0.5" />

            {/* Glasses */}
            <rect x="146" y="150" width="46" height="32" rx="6" fill="url(#glassesGlass)" stroke="#0f172a" strokeWidth="4" />
            <rect x="208" y="150" width="46" height="32" rx="6" fill="url(#glassesGlass)" stroke="#0f172a" strokeWidth="4" />
            <line x1="192" y1="162" x2="208" y2="162" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <line x1="146" y1="160" x2="132" y2="164" stroke="#0f172a" strokeWidth="3" />
            <line x1="254" y1="160" x2="268" y2="164" stroke="#0f172a" strokeWidth="3" />
            <path d="M 150 152 L 178 152 L 168 178 L 150 178 Z" fill="#38bdf8" opacity="0.85" />
            <path d="M 212 152 L 238 152 L 228 178 L 212 178 Z" fill="#38bdf8" opacity="0.85" />
            <line x1="150" y1="154" x2="178" y2="154" stroke="#e0f2fe" strokeWidth="2" opacity="0.9" />
            <line x1="212" y1="154" x2="238" y2="154" stroke="#e0f2fe" strokeWidth="2" opacity="0.9" />
          </svg>
        </motion.div>
      )}

      {/* Atmospheric Rim Glow & Soft Bottom Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#091128]/85 via-blue-950/15 to-transparent pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 ring-1 ring-inset ring-blue-500/30 rounded-xl pointer-events-none" />

      {/* Interactive Photo Control Overlay on Hover */}
      <div className="absolute bottom-2.5 right-2.5 z-30 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/80 hover:bg-blue-600/90 text-white text-[11px] font-mono border border-blue-400/40 shadow-lg backdrop-blur-sm transition-all"
          title="Upload or change photo"
        >
          <Camera className="w-3 h-3 text-cyan-300" />
          <span>Change Photo</span>
        </button>
        {localStorage.getItem('santhosh_hero_avatar') && (
          <button
            onClick={handleResetImage}
            className="p-1 rounded-md bg-black/80 hover:bg-rose-600/90 text-white border border-white/20 shadow-lg backdrop-blur-sm transition-all"
            title="Reset to default image"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Success Toast when new photo is loaded */}
      <AnimatePresence>
        {showUploadToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-black text-[11px] font-mono font-bold shadow-xl pointer-events-none"
          >
            <Sparkles className="w-3 h-3" />
            <span>Photo Updated!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

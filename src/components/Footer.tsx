import React from 'react';
import { ArrowUp, Heart, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 bg-[#040407] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-tight">
                {PERSONAL_INFO.name}
              </div>
              <p className="text-xs text-gray-500 font-mono">
                {PERSONAL_INFO.status} &bull; {PERSONAL_INFO.college}
              </p>
            </div>
          </div>

          {/* Center philosophy tag */}
          <div className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
            <span>Designed with curiosity.</span>
            <span>Built with AI.</span>
          </div>

          {/* Back to Top button */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all active:scale-95"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center text-xs font-mono text-gray-600">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Live interactive portfolio.
        </div>
      </div>
    </footer>
  );
};

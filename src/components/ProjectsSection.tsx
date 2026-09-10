import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Wrench, 
  Maximize2, 
  CheckCircle2, 
  Cpu, 
  CreditCard,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'01' | '02'>('01');
  const [selectedPreview, setSelectedPreview] = useState<(typeof PROJECTS)[0] | null>(null);

  const project1 = PROJECTS[0];
  const project2 = PROJECTS[1];

  const currentProject = activeTab === '01' ? project1 : project2;

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#05060a]"
    >
      {/* Vibrant Blue Atmospheric Ambient Stage Lighting (Preserved Vivid Blue Accent) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-indigo-600/25 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-500/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Harmonized with About, Skills, and Education */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
                // SECTION 03
              </span>
              <div className="h-[1px] w-12 bg-blue-500/40" />
              <span className="text-xs font-mono text-gray-400">FEATURED WORK &bull; CLIENT PLATFORMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Shipped Projects &amp; Web Architectures.
            </h2>
            <p className="text-base text-gray-400 max-w-xl">
              Live commercial client applications, custom domain deployments, and web platforms built with precision.
            </p>
          </div>

          {/* High-Visibility Project Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0c1326] border border-blue-500/40 shrink-0 shadow-lg shadow-blue-950/40 self-start md:self-auto">
            <button
              id="tab-project-01"
              onClick={() => setActiveTab('01')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === '01'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.8)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>01. Arun Hydraulics</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-normal hidden sm:inline">
                LIVE DOMAIN
              </span>
            </button>

            <button
              id="tab-project-02"
              onClick={() => setActiveTab('02')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === '02'
                  ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>02. The Golden Leaf</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-black font-semibold hidden sm:inline">
                BOOKSTORE
              </span>
            </button>
          </div>
        </div>

        {/* Project Stage: Exactly Aligned Card Layout */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {activeTab === '01' ? (
              <motion.div
                key="project-01"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                id="project-stage-card-1"
                className="w-full rounded-2xl bg-[#090d1a] border-2 border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-blue-950/50"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-5 flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono font-extrabold text-blue-400 tracking-wider">
                        PROJECT 01
                      </span>
                      <span className="text-gray-600">&bull;</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        CLIENT PRODUCTION &bull; LIVE DOMAIN
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
                      {project1.title}
                    </h3>

                    <p className="text-xs font-mono text-blue-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-blue-400" />
                      <span>{project1.badgeType}</span>
                    </p>

                    <p className="text-sm text-gray-200 leading-relaxed mb-5">
                      {project1.description}
                    </p>

                    {/* Architecture Highlights 2x2 */}
                    <div className="w-full grid grid-cols-2 gap-2.5 mb-6 p-3 rounded-xl bg-white/[0.04] border border-blue-500/20">
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Custom DNS Domain</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Industrial Machinery UI</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Vercel + GitHub CI/CD</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Mobile Responsive</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project1.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/40 text-blue-200 border border-blue-500/30 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        id="project1-live-btn"
                        href={project1.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60 hover:scale-[1.03] active:scale-95 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        <span>VISIT LIVE DOMAIN</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <button
                        onClick={() => setSelectedPreview(project1)}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 text-xs font-mono border border-white/15 transition-all active:scale-95"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Inspect Showcase</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Browser Mockup */}
                  <div className="lg:col-span-7 flex justify-center w-full">
                    <div className="w-full rounded-2xl overflow-hidden bg-[#0a0f1d] border-2 border-blue-500/40 shadow-2xl shadow-blue-950/60">
                      {/* Browser Window Header */}
                      <div className="px-4 py-3 bg-[#11182c] border-b border-blue-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          <span className="text-[11px] font-mono text-gray-400 ml-2 hidden sm:inline">
                            arun-hydraulics-production
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-blue-500/30 text-[11px] font-mono text-blue-200 w-full max-w-sm mx-4">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{project1.displayUrl}</span>
                        </div>

                        <a
                          href={project1.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-blue-400 hover:text-white transition-colors"
                          title="Open live site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Mockup Body with Blue UI */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#060a14]">
                        <div className="w-full h-full flex flex-col">
                          <div className="h-11 bg-[#0d1424] border-b border-blue-500/20 px-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-[11px] text-white shadow-sm shadow-blue-500">
                                AH
                              </div>
                              <span className="font-bold text-xs sm:text-sm text-white tracking-wider">
                                ARUN HYDRAULICS
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-mono text-blue-200">
                              <span className="hidden sm:inline">PRODUCTS</span>
                              <span className="hidden sm:inline">CYLINDERS</span>
                              <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">
                                CONTACT
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-[#0c162e] via-[#091024] to-[#050814] relative">
                            <div className="absolute top-2 right-4 text-blue-500/10 font-black text-6xl sm:text-7xl select-none font-mono pointer-events-none">
                              HYDRAULIC
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold w-fit mb-3">
                              <Sparkles className="w-3 h-3 text-cyan-300" />
                              <span>PRECISION ENGINEERING &bull; SOUTH INDIA</span>
                            </div>

                            <h4 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                              High-Pressure Hydraulic Cylinders &amp; Industrial Systems
                            </h4>

                            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mb-4 leading-relaxed">
                              Complete web presence designed for high-capacity hydraulic machinery manufacturers, custom fabrication, seal kits, and heavy machinery maintenance.
                            </p>

                            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md pt-3 border-t border-blue-500/20">
                              <div className="p-2 rounded bg-black/40 border border-blue-500/20">
                                <div className="text-base sm:text-lg font-black text-white">100%</div>
                                <div className="text-[10px] font-mono text-blue-300">Custom Built</div>
                              </div>
                              <div className="p-2 rounded bg-black/40 border border-blue-500/20">
                                <div className="text-base sm:text-lg font-black text-cyan-400">ISO</div>
                                <div className="text-[10px] font-mono text-cyan-200">Industrial Spec</div>
                              </div>
                              <div className="p-2 rounded bg-black/40 border border-emerald-500/20">
                                <div className="text-base sm:text-lg font-black text-emerald-400">ACTIVE</div>
                                <div className="text-[10px] font-mono text-emerald-200">Live Domain</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="project-02"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                id="project-stage-card-2"
                className="w-full rounded-2xl bg-[#120e0a] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-950/50"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-5 flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono font-extrabold text-amber-400 tracking-wider">
                        PROJECT 02
                      </span>
                      <span className="text-gray-600">&bull;</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        E-COMMERCE &bull; PAYMENT API EXPERIMENT
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
                      {project2.title}
                    </h3>

                    <p className="text-xs font-mono text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project2.badgeType}</span>
                    </p>

                    <p className="text-sm text-gray-200 leading-relaxed mb-5">
                      {project2.description}
                    </p>

                    {/* Architecture Highlights 2x2 */}
                    <div className="w-full grid grid-cols-2 gap-2.5 mb-6 p-3 rounded-xl bg-white/[0.04] border border-amber-500/20">
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Cashfree Gateway API</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>AI UI Workflows</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Vercel Cloud Hosted</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Curated Catalogue UI</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project2.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-amber-950/40 text-amber-200 border border-amber-500/30 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        id="project2-live-btn"
                        href={project2.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold tracking-wide shadow-lg shadow-amber-500/40 hover:shadow-amber-400/60 hover:scale-[1.03] active:scale-95 transition-all"
                      >
                        <Globe className="w-4 h-4 text-black" />
                        <span>EXPLORE BOOKSTORE</span>
                        <ExternalLink className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <button
                        onClick={() => setSelectedPreview(project2)}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 text-xs font-mono border border-white/15 transition-all active:scale-95"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Inspect Showcase</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Browser Mockup */}
                  <div className="lg:col-span-7 flex justify-center w-full">
                    <div className="w-full rounded-2xl overflow-hidden bg-[#16120d] border-2 border-amber-500/40 shadow-2xl shadow-amber-950/50">
                      {/* Browser Window Header */}
                      <div className="px-4 py-3 bg-[#201912] border-b border-amber-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          <span className="text-[11px] font-mono text-gray-400 ml-2 hidden sm:inline">
                            thegoldenleaf-production
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-amber-500/30 text-[11px] font-mono text-amber-200 w-full max-w-sm mx-4">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{project2.displayUrl}</span>
                        </div>

                        <a
                          href={project2.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-amber-400 hover:text-white transition-colors"
                          title="Open bookstore"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Mockup Body with Amber UI */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#0c0906]">
                        <div className="w-full h-full flex flex-col">
                          <div className="h-11 bg-[#1c150f] border-b border-amber-900/50 px-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-serif font-black text-xs text-black shadow-sm">
                                GL
                              </div>
                              <span className="font-serif font-bold text-xs sm:text-sm text-amber-100 tracking-wider">
                                THE GOLDEN LEAF
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-mono text-amber-200/80">
                              <span className="hidden sm:inline">FICTION</span>
                              <span className="hidden sm:inline">NON-FICTION</span>
                              <span className="px-2.5 py-1 rounded bg-amber-500 text-black font-bold">
                                CART (2)
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-[#1a140c] via-[#120e08] to-[#0a0704] relative">
                            <div className="absolute top-2 right-4 text-amber-500/10 font-serif font-black text-6xl sm:text-7xl select-none pointer-events-none">
                              BOOKS
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold w-fit mb-3">
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>INDEPENDENT BOOKSTORE PLATFORM</span>
                            </div>

                            <h4 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 leading-tight mb-2">
                              Discover Stories That Shape Your World
                            </h4>

                            <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mb-4 leading-relaxed font-sans">
                              Experimental online retail bookstore featuring instant category filtering, reader reviews, and integrated digital payment pathways via Cashfree.
                            </p>

                            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md pt-3 border-t border-amber-500/20">
                              <div className="p-2 rounded bg-black/40 border border-amber-500/20">
                                <div className="text-base sm:text-lg font-black text-amber-400 font-mono">CASHFREE</div>
                                <div className="text-[10px] font-mono text-amber-300">Payment API</div>
                              </div>
                              <div className="p-2 rounded bg-black/40 border border-amber-500/20">
                                <div className="text-base sm:text-lg font-black text-white font-mono">VERCEL</div>
                                <div className="text-[10px] font-mono text-gray-300">Deployment</div>
                              </div>
                              <div className="p-2 rounded bg-black/40 border border-amber-500/20">
                                <div className="text-base sm:text-lg font-black text-amber-300 font-mono">AI UI</div>
                                <div className="text-[10px] font-mono text-amber-200">Catalog Flows</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Project Navigation Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs font-mono text-gray-400">
            <button
              onClick={() => setActiveTab(activeTab === '01' ? '02' : '01')}
              className="flex items-center gap-2 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5"
            >
              {activeTab === '01' ? (
                <>
                  <span>Next Project:</span>
                  <span className="text-amber-400 font-bold">02. The Golden Leaf</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
                  <span>Previous Project:</span>
                  <span className="text-blue-400 font-bold">01. Arun Hydraulics</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">Displaying:</span>
              <span className="font-bold text-white">{activeTab === '01' ? 'Project 1 of 2' : 'Project 2 of 2'}</span>
              <div className="flex gap-1.5 ml-2">
                <button
                  onClick={() => setActiveTab('01')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTab === '01' ? 'bg-blue-400 ring-2 ring-blue-400/40' : 'bg-gray-700 hover:bg-gray-500'
                  }`}
                  title="Show Project 01"
                />
                <button
                  onClick={() => setActiveTab('02')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTab === '02' ? 'bg-amber-400 ring-2 ring-amber-400/40' : 'bg-gray-700 hover:bg-gray-500'
                  }`}
                  title="Show Project 02"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Project Inspector / Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPreview(null)}
              className="fixed inset-0 bg-black/90"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-2xl bg-[#0c1020] border-2 border-blue-500/40 p-6 sm:p-8 shadow-2xl z-10 text-white"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold">
                    {selectedPreview.badgeType}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedPreview.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    {selectedPreview.displayUrl}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPreview(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs font-mono transition-colors"
                >
                  Close [Esc]
                </button>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {selectedPreview.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPreview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/50 text-blue-200 border border-blue-500/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={selectedPreview.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
                >
                  <span>Open Live Site in New Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

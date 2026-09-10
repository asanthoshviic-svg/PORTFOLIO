import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Award, FileText, ArrowUpRight, BookOpen, MapPin, CheckCircle } from 'lucide-react';

interface EducationSectionProps {
  onOpenContact: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="education"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-transparent via-[#080a14]/60 to-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Harmonized with About, Skills, and Projects */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">
              // SECTION 06
            </span>
            <div className="h-[1px] w-12 bg-purple-500/40" />
            <span className="text-xs font-mono text-gray-400">ACADEMICS &bull; CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Foundations &amp; Education.
          </h2>
          <p className="text-base text-gray-400 max-w-xl">
            Formal technical education in Artificial Intelligence &amp; Data Science paired with verified academic achievements.
          </p>
        </div>

        {/* Education & Grades Grid - Perfectly Balanced Equal-Height Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 sm:mb-16">
          {/* Main Degree Card (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121629] via-[#0d101d] to-[#080912] border border-white/10 shadow-xl shadow-black/50 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {EDUCATION.statusBadge} &bull; UNDERGRADUATE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1.5">
                      {EDUCATION.degree}
                    </h3>
                  </div>
                </div>
              </div>

              {/* College & Period */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-mono text-gray-300 pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{EDUCATION.college}</span>
                </div>
                <span className="text-indigo-400 font-semibold">{EDUCATION.period}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed font-normal mb-6">
                {EDUCATION.description}
              </p>

              {/* Core Academic Focus Chips */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                  Core Foundations &bull; Curriculum
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-300">
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-indigo-200">
                    Data Science Core
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-indigo-200">
                    Python Programming
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-indigo-200">
                    Discrete Math &amp; Statistics
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-indigo-200">
                    Data Structures
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-indigo-200">
                    AI/ML Principles
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Anna University Affiliated</span>
              </div>
            </div>
          </motion.div>

          {/* Schooling / High School Academic Scores (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
            {/* 12th Grade Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#111424] to-[#090b14] border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        12th Grade (Higher Secondary)
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400">
                        State Board of Tamil Nadu &bull; HSC
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    High Distinction
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-mono mt-3 mb-2">
                  Physics, Chemistry, Mathematics &bull; Computer Science
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-mono text-gray-400">Final Aggregate</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    88.4%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: '88.4%' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 10th Grade Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#111424] to-[#090b14] border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        10th Grade (Secondary School)
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400">
                        State Board of Tamil Nadu &bull; SSLC
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    First Class
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-mono mt-3 mb-2">
                  Science, Mathematics, English, Social Sciences
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-mono text-gray-400">Final Aggregate</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    86.0%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: '86%' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Resume Request Callout Banner - Full Width Matching max-w-6xl */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#0c101d] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-indigo-300 hidden sm:block">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                Want the complete academic &amp; project dossier?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Coursework breakdown, live client deployments, verified technical competencies, and contact pathways.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              id="request-resume-btn"
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-600/30 hover:scale-[1.03] active:scale-95 transition-all"
            >
              <span>Request Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

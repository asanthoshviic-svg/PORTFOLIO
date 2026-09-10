import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    topic: 'Internship Opportunity'
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#050609] via-[#080913] to-[#040407]"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/10 via-blue-600/10 to-purple-600/15 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
            // SECTION 07
          </span>
          <div className="h-[1px] w-12 bg-indigo-500/40" />
          <span className="text-xs font-mono text-gray-400">INITIATE TRANSMISSION</span>
        </div>

        {/* Large Typography Reveal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            GOT AN IDEA? <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              LET&apos;S TALK.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Open to internships, junior developer collaborations, freelance projects, or conversations about generative and agentic AI.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="group p-5 sm:p-6 rounded-2xl bg-[#0f1322] hover:bg-[#13192c] border border-white/10 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5 text-xs font-mono text-gray-400">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'email' ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 hover:text-indigo-300">
                      <Copy className="w-3 h-3" /> Copy
                    </span>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="group p-5 sm:p-6 rounded-2xl bg-[#0f1322] hover:bg-[#13192c] border border-white/10 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5 text-xs font-mono text-gray-400">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>PHONE / WHATSAPP</span>
                </div>
                <button
                  id="copy-phone-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'phone' ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 hover:text-indigo-300">
                      <Copy className="w-3 h-3" /> Copy
                    </span>
                  )}
                </button>
              </div>
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>

            {/* Location Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1322] border border-white/10">
              <div className="flex items-center gap-2.5 text-xs font-mono text-gray-400 mb-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>LOCATION</span>
              </div>
              <p className="text-base font-bold text-white">
                {PERSONAL_INFO.location}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Open to remote &amp; on-site opportunities in Tamil Nadu / India
              </p>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <a
                id="contact-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/40 flex items-center justify-between text-xs font-medium text-gray-200 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a
                id="contact-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 flex items-center justify-between text-xs font-medium text-gray-200 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Terminal */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#111424] via-[#0d0f1a] to-[#070911] border border-white/15 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Send a Direct Note to Santhosh
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE INBOX
              </span>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Ready!</h4>
                <p className="text-sm text-gray-400 max-w-sm">
                  Thanks for reaching out! Your message was formatted and logged. You can also reach out directly via email at {PERSONAL_INFO.email}.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-indigo-400 hover:underline pt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    TOPIC
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141829] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option>Internship Opportunity</option>
                    <option>Freelance Web Project</option>
                    <option>AI / Dev Discussion</option>
                    <option>General Connect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what you are building or looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-95 transition-all duration-200"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

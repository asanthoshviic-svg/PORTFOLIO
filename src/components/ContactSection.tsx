import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  LogOut,
  Loader2,
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  sendEmailViaGmail,
  createMailtoLink,
  SendEmailPayload,
} from '../services/gmailAuth';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GmailConfirmModal } from './GmailConfirmModal';

const TARGET_RECIPIENT = PERSONAL_INFO.email; // asanthoshviic@gmail.com

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentSuccessInfo, setSentSuccessInfo] = useState<{ id?: string; time: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    topic: 'Internship Opportunity',
  });

  // Track Firebase Auth state & in-memory token
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          setAccessToken(token);
        }
        if (user) {
          setFormData((prev) => ({
            ...prev,
            name: prev.name || user.displayName || '',
            email: prev.email || user.email || '',
          }));
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Pre-validate and prompt confirmation before destructive send
  const handleInitiateSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all form fields before dispatching.');
      return;
    }

    // Check if we already have an active Google access token
    let token = accessToken;
    if (!token) {
      token = await getAccessToken();
    }

    if (!token) {
      // Prompt Google Sign-In with Gmail permissions
      setIsAuthenticating(true);
      try {
        const authResult = await googleSignIn();
        if (authResult?.accessToken) {
          setAccessToken(authResult.accessToken);
          setCurrentUser(authResult.user);
          setShowConfirmModal(true);
        }
      } catch (err: any) {
        console.error('OAuth flow error:', err);
        setErrorMessage(
          err?.message || 'Google authentication was cancelled or could not be completed.'
        );
      } finally {
        setIsAuthenticating(false);
      }
      return;
    }

    // Token exists; show mandatory user confirmation modal
    setShowConfirmModal(true);
  };

  // User confirmed the send operation in the modal
  const handleConfirmedSend = async () => {
    let token = accessToken;
    if (!token) {
      token = await getAccessToken();
    }

    if (!token) {
      setShowConfirmModal(false);
      setErrorMessage('Access token expired. Please reconnect your Google account to send.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    const payload: SendEmailPayload = {
      to: TARGET_RECIPIENT,
      fromName: formData.name.trim(),
      fromEmail: formData.email.trim(),
      topic: formData.topic,
      message: formData.message.trim(),
    };

    try {
      const result = await sendEmailViaGmail(token, payload);
      setShowConfirmModal(false);
      setSentSuccessInfo({
        id: result.id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      // Clear message field while retaining identity for convenience
      setFormData((prev) => ({ ...prev, message: '' }));
    } catch (err: any) {
      console.error('Gmail dispatch error:', err);
      setShowConfirmModal(false);
      setErrorMessage(
        err?.message ||
          'Failed to send via Gmail API. You can retry, re-authenticate, or use the direct mail fallback below.'
      );
    } finally {
      setIsSending(false);
    }
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

        {/* Header */}
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
            Send a direct note straight to Santhosh&apos;s verified inbox at{' '}
            <span className="text-white font-mono font-medium">{TARGET_RECIPIENT}</span> using integrated Gmail.
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
                className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors break-all font-mono"
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
                className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-mono"
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

          {/* Right Column: Direct Message Terminal with Gmail Integration */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#111424] via-[#0d0f1a] to-[#070911] border border-white/15 shadow-2xl relative">
            {/* Header / Gmail Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Direct Message via Gmail
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  TARGET: {TARGET_RECIPIENT}
                </span>
              </div>
            </div>

            {/* Google Authentication Status Banner */}
            {currentUser ? (
              <div className="mb-5 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-gray-400 text-[11px] block">AUTHORIZED VIA GOOGLE</span>
                    <span className="text-white font-medium truncate block">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-[11px] font-mono transition-colors shrink-0 ml-2"
                  title="Sign out of Google"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Switch</span>
                </button>
              </div>
            ) : (
              <div className="mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-white font-semibold block">Deliver directly to Santhosh&apos;s Gmail</span>
                  <span className="text-gray-400 text-[11px]">
                    Sign in with Google to dispatch directly from your email to {TARGET_RECIPIENT}.
                  </span>
                </div>
                <GoogleSignInButton
                  onClick={async () => {
                    setIsAuthenticating(true);
                    setErrorMessage(null);
                    try {
                      const res = await googleSignIn();
                      if (res) {
                        setAccessToken(res.accessToken);
                        setCurrentUser(res.user);
                      }
                    } catch (err: any) {
                      setErrorMessage(err?.message || 'Google Sign-In was cancelled.');
                    } finally {
                      setIsAuthenticating(false);
                    }
                  }}
                  isLoading={isAuthenticating}
                  text="Connect Google"
                  className="!py-2 !px-3.5 !text-xs self-start sm:self-auto shrink-0"
                />
              </div>
            )}

            {/* Error Display */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="space-y-1">
                  <p>{errorMessage}</p>
                  <a
                    href={createMailtoLink({
                      to: TARGET_RECIPIENT,
                      fromName: formData.name || 'Visitor',
                      fromEmail: formData.email || '',
                      topic: formData.topic,
                      message: formData.message,
                    })}
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:underline pt-1 font-mono"
                  >
                    <span>Click here to send via default mail client instead</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Success State */}
            {sentSuccessInfo ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white">Email Dispatched!</h4>
                  <p className="text-sm text-gray-300 max-w-sm">
                    Your message was delivered straight to{' '}
                    <span className="font-mono text-cyan-300 font-semibold">{TARGET_RECIPIENT}</span> via Gmail.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-gray-400 space-y-1 text-left w-full max-w-xs">
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-emerald-400">DELIVERED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TIME:</span>
                    <span className="text-white">{sentSuccessInfo.time}</span>
                  </div>
                  {sentSuccessInfo.id && (
                    <div className="flex justify-between">
                      <span>MSG ID:</span>
                      <span className="text-gray-300 truncate max-w-[120px]">{sentSuccessInfo.id}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSentSuccessInfo(null)}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline pt-2"
                >
                  Send another direct message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleInitiateSend} className="space-y-4">
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
                      YOUR EMAIL
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
                    <option>AI / Dev Collaboration</option>
                    <option>Research &amp; Data Science Discussion</option>
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
                    placeholder="Describe your project, internship offer, or questions for Santhosh..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isAuthenticating || isSending}
                    id="submit-contact-direct-btn"
                    className="w-full group inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting to Google...</span>
                      </>
                    ) : isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching via Gmail API...</span>
                      </>
                    ) : currentUser ? (
                      <>
                        <span>Send to {TARGET_RECIPIENT}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span>Sign in with Google &amp; Send to Santhosh</span>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Fallback Direct Link */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono px-1">
                    <span>Delivered straight to: {TARGET_RECIPIENT}</span>
                    <a
                      href={createMailtoLink({
                        to: TARGET_RECIPIENT,
                        fromName: formData.name || 'Visitor',
                        fromEmail: formData.email || '',
                        topic: formData.topic,
                        message: formData.message || '',
                      })}
                      className="text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                      title="Open in your default mail app"
                    >
                      <span>Open Mail Client</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive Workspace API Call */}
      <GmailConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedSend}
        isSending={isSending}
        payload={{
          to: TARGET_RECIPIENT,
          fromName: formData.name || currentUser?.displayName || 'Visitor',
          fromEmail: formData.email || currentUser?.email || '',
          topic: formData.topic,
          message: formData.message,
        }}
      />
    </section>
  );
};

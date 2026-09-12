import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { X, Mail, Phone, MapPin, Send, Check, Copy, ExternalLink, Sparkles, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  sendEmailViaGmail,
  createMailtoLink,
  SendEmailPayload,
} from '../services/gmailAuth';
import { GmailConfirmModal } from './GmailConfirmModal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_RECIPIENT = PERSONAL_INFO.email; // asanthoshviic@gmail.com

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (!isOpen) return;
    const unsub = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) setAccessToken(token);
        if (user) {
          setForm((prev) => ({
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
      if (typeof unsub === 'function') unsub();
    };
  }, [isOpen]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    let token = accessToken;
    if (!token) {
      token = await getAccessToken();
    }

    if (!token) {
      setIsAuthenticating(true);
      try {
        const authResult = await googleSignIn();
        if (authResult?.accessToken) {
          setAccessToken(authResult.accessToken);
          setCurrentUser(authResult.user);
          setShowConfirmModal(true);
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Google sign-in was cancelled.');
      } finally {
        setIsAuthenticating(false);
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmedSend = async () => {
    let token = accessToken;
    if (!token) {
      token = await getAccessToken();
    }

    if (!token) {
      setShowConfirmModal(false);
      setErrorMessage('Google token expired. Please re-authenticate.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    const payload: SendEmailPayload = {
      to: TARGET_RECIPIENT,
      fromName: form.name.trim(),
      fromEmail: form.email.trim(),
      topic: 'Quick Connect Note',
      message: form.message.trim(),
    };

    try {
      await sendEmailViaGmail(token, payload);
      setShowConfirmModal(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setShowConfirmModal(false);
      setErrorMessage(err?.message || 'Could not send message via Gmail.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#141829] to-[#0a0c16] border border-white/20 p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT CHANNELS</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                Connect with Santhosh
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Direct messages land instantly in Santhosh&apos;s verified inbox at{' '}
                <span className="font-mono text-cyan-300 font-medium">{TARGET_RECIPIENT}</span>.
              </p>

              {/* Quick Copy Items */}
              <div className="space-y-2.5 mb-5">
                {/* Email */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-[10px] font-mono text-gray-400">TARGET EMAIL</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-mono">{PERSONAL_INFO.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs"
                      title="Send Email"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] font-mono text-gray-400">PHONE / WHATSAPP</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-mono">{PERSONAL_INFO.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1"
                    >
                      {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs"
                      title="Call"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <div>
                    <div className="text-[10px] font-mono text-gray-400">BASE LOCATION</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Quick Note Form */}
              {sent ? (
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Dispatched to {TARGET_RECIPIENT}!</h4>
                  <p className="text-xs text-gray-300">
                    Your message was delivered via Gmail API. Santhosh will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-[11px] font-mono text-indigo-400 underline pt-1 block mx-auto"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-3">
                  {currentUser && (
                    <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-mono px-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Sending from: {currentUser.email}</span>
                    </div>
                  )}
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your message or opportunity for Santhosh..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={isAuthenticating || isSending}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Connecting with Google...</span>
                      </>
                    ) : isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to {TARGET_RECIPIENT}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch to {TARGET_RECIPIENT} via Gmail</span>
                      </>
                    )}
                  </button>
                  <div className="text-center pt-1">
                    <a
                      href={createMailtoLink({
                        to: TARGET_RECIPIENT,
                        fromName: form.name || 'Visitor',
                        fromEmail: form.email || '',
                        topic: 'Quick Connect Note',
                        message: form.message || '',
                      })}
                      className="text-[11px] text-gray-400 hover:text-indigo-300 font-mono underline"
                    >
                      Or open in your default mail app
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GmailConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedSend}
        isSending={isSending}
        payload={{
          to: TARGET_RECIPIENT,
          fromName: form.name || currentUser?.displayName || 'Visitor',
          fromEmail: form.email || currentUser?.email || '',
          topic: 'Quick Connect Note',
          message: form.message,
        }}
      />
    </>
  );
};

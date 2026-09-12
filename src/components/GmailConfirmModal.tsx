import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, AlertCircle, Check, Loader2, X, Send } from 'lucide-react';
import { SendEmailPayload } from '../services/gmailAuth';

interface GmailConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSending: boolean;
  payload: SendEmailPayload;
}

export const GmailConfirmModal: React.FC<GmailConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSending,
  payload,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSending && onClose()}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#141829] to-[#0a0c16] border border-indigo-500/30 p-6 sm:p-7 shadow-2xl z-10 text-white"
          >
            {/* Close Button */}
            {!isSending && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1.5">
              Confirm Email Dispatch via Gmail
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              You are about to send an email message directly to{' '}
              <span className="font-mono text-cyan-300 font-semibold">{payload.to}</span>{' '}
              using your authorized Google Gmail account.
            </p>

            {/* Message Details Preview Card */}
            <div className="space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono mb-5">
              <div className="flex items-center justify-between text-gray-400">
                <span>RECIPIENT:</span>
                <span className="text-white font-semibold">{payload.to}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>FROM:</span>
                <span className="text-white truncate max-w-[200px]">{payload.fromName} &lt;{payload.fromEmail}&gt;</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>TOPIC:</span>
                <span className="text-indigo-300">{payload.topic}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-gray-400 block mb-1 text-[11px]">MESSAGE SNIPPET:</span>
                <p className="text-gray-200 line-clamp-3 italic text-[11px] font-sans">
                  &ldquo;{payload.message}&rdquo;
                </p>
              </div>
            </div>

            {/* Warning Note */}
            <div className="flex items-start gap-2 text-[11px] text-gray-400 mb-5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                This will create and send an actual email in your sent folder to Santhosh.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSending}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-send-gmail-btn"
                onClick={onConfirm}
                disabled={isSending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm &amp; Send to Santhosh</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

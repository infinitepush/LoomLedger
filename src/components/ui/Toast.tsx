"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, LogIn } from 'lucide-react';
import Link from 'next/link';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'login';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  showLoginPrompt: (message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <AlertCircle size={18} />,
  login: <LogIn size={18} />,
};

const colorMap: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    text: 'text-blue-800',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'text-emerald-500',
    text: 'text-emerald-800',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-500',
    text: 'text-amber-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-500',
    text: 'text-red-800',
  },
  login: {
    bg: 'bg-[#FDF6F0]',
    border: 'border-primary/20',
    icon: 'text-primary',
    text: 'text-foreground',
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type, duration }]);

    const timer = setTimeout(() => removeToast(id), duration);
    timersRef.current.set(id, timer);
  }, [removeToast]);

  const showLoginPrompt = useCallback((message?: string) => {
    showToast(message || 'Please log in to continue.', 'login', 5000);
  }, [showToast]);

  // Listen for login-required events from AppContext (which is a parent provider)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      showLoginPrompt(detail?.message);
    };
    window.addEventListener('loomledger:login-required', handler);
    return () => window.removeEventListener('loomledger:login-required', handler);
  }, [showLoginPrompt]);

  return (
    <ToastContext.Provider value={{ showToast, showLoginPrompt }}>
      {children}

      {/* Toast Container — top center */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none w-full max-w-md px-4">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => {
            const colors = colorMap[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`pointer-events-auto w-full rounded-xl border ${colors.bg} ${colors.border} shadow-lg backdrop-blur-sm overflow-hidden`}
              >
                <div className="flex items-start gap-3 p-4">
                  <span className={`mt-0.5 shrink-0 ${colors.icon}`}>
                    {iconMap[toast.type]}
                  </span>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className={`text-sm font-medium ${colors.text} leading-snug`}>
                      {toast.message}
                    </p>
                    {toast.type === 'login' && (
                      <div className="flex gap-2">
                        <Link
                          href="/login"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:bg-primary-hover transition-colors shadow-sm"
                        >
                          <LogIn size={12} />
                          Log In
                        </Link>
                        <Link
                          href="/signup"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-foreground border border-border text-xs font-semibold rounded-md hover:bg-secondary transition-colors"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className={`shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors ${colors.icon} opacity-60 hover:opacity-100`}
                  >
                    <X size={14} />
                  </button>
                </div>
                {/* Progress bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
                  className={`h-0.5 origin-left ${colors.icon.replace('text-', 'bg-')} opacity-40`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

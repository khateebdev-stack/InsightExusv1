'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextType {
    toast: (props: Omit<Toast, 'id'>) => void;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(({ type, title, message, duration = 5000 }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, dismiss }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode='popLayout'>
                    {toasts.map((t) => (
                        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const styles = {
    success: 'bg-slate-900 border-green-500/20 text-green-400',
    error: 'bg-slate-900 border-red-500/20 text-red-400',
    warning: 'bg-slate-900 border-yellow-500/20 text-yellow-400',
    info: 'bg-slate-900 border-blue-500/20 text-blue-400',
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className={`pointer-events-auto flex items-start gap-4 p-4 rounded-xl border shadow-xl backdrop-blur-md ${styles[toast.type]}`}
        >
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-slate-200">{toast.title}</h4>
                {toast.message && <p className="text-sm text-slate-400 mt-1">{toast.message}</p>}
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
            >
                <X size={18} />
            </button>
        </motion.div>
    );
}

'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  action?: ToastAction;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, action?: ToastAction) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let _id = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', action?: ToastAction) => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type, action }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const bgColor = (type: ToastType) =>
    type === 'success' ? '#1a1a1a' : type === 'error' ? '#b91c1c' : '#2E1A4A';

  const iconColor = (type: ToastType) =>
    type === 'success' ? '#4ade80' : type === 'error' ? '#fca5a5' : '#a5b4fc';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && toasts.length > 0 && createPortal(
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          display: 'flex', flexDirection: 'column', gap: 10,
          zIndex: 999999, pointerEvents: 'none',
        }}>
          {toasts.map(toast => (
            <div
              key={toast.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: bgColor(toast.type),
                color: '#fff',
                padding: '13px 14px',
                borderRadius: 12,
                fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                pointerEvents: 'all',
                animation: 'toastIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                maxWidth: 340, minWidth: 220,
                lineHeight: 1.4,
              }}
            >
              {toast.type === 'error'
                ? <AlertCircle size={16} style={{ flexShrink: 0, color: iconColor(toast.type) }} />
                : toast.type === 'info'
                  ? <Info size={16} style={{ flexShrink: 0, color: iconColor(toast.type) }} />
                  : <CheckCircle size={16} style={{ flexShrink: 0, color: iconColor(toast.type) }} />
              }
              <span style={{ flex: 1 }}>{toast.message}</span>

              {toast.action && (
                <button
                  onClick={() => { toast.action!.onClick(); dismiss(toast.id); }}
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    fontFamily: 'inherit',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)'; }}
                >
                  {toast.action.label}
                </button>
              )}

              <button
                onClick={() => dismiss(toast.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)', padding: 2,
                  display: 'flex', alignItems: 'center', flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <style>{`
            @keyframes toastIn {
              from { opacity: 0; transform: translateX(28px) scale(0.92); }
              to   { opacity: 1; transform: translateX(0) scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

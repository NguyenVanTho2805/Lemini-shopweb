"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";
interface ToastItem { id: string; type: ToastType; message: string; }
interface ToastCtx { toast: (msg: string, type?: ToastType) => void; }

const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

const ICONS = { success: CheckCircle2, error: XCircle, warning: AlertCircle, info: Info };
const COLORS = {
  success: { bg: "#f0fdf4", border: "#bbf7d0", color: "#059669" },
  error:   { bg: "#fef2f2", border: "#fca5a5", color: "#dc2626" },
  warning: { bg: "#fffbeb", border: "#fde68a", color: "#d97706" },
  info:    { bg: "#eff6ff", border: "#bfdbfe", color: "#2563eb" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 9999, pointerEvents: "none" }}>
        {toasts.map(t => {
          const Icon = ICONS[t.type];
          const c = COLORS[t.type];
          return (
            <div key={t.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 16px", background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
              fontSize: 13, color: c.color, fontWeight: 500,
              minWidth: 280, maxWidth: 400, pointerEvents: "all",
              animation: "toastIn 0.2s ease",
            }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{t.message}</span>
              <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: c.color, opacity: 0.6, display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes toastIn { from { transform: translateX(16px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </ToastContext.Provider>
  );
}

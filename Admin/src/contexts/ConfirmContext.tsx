"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmOpts {
  title?: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}
interface ConfirmCtx { confirm: (opts: ConfirmOpts) => Promise<boolean>; }

const ConfirmContext = createContext<ConfirmCtx>({ confirm: () => Promise.resolve(false) });
export const useConfirm = () => useContext(ConfirmContext);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ opts: ConfirmOpts; resolve: (v: boolean) => void } | null>(null);

  const confirm = useCallback((opts: ConfirmOpts): Promise<boolean> =>
    new Promise(resolve => setState({ opts, resolve })), []);

  const handle = (v: boolean) => { state?.resolve(v); setState(null); };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }}
          onClick={() => handle(false)}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-card)", borderRadius: 14, padding: "28px 28px 24px", width: 380, boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            {state.opts.danger && (
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <AlertTriangle size={22} color="#dc2626" />
              </div>
            )}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", textAlign: "center", marginBottom: 8 }}>
              {state.opts.title ?? "Xác nhận"}
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.65, marginBottom: 24 }}>
              {state.opts.message}
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={() => handle(false)} style={{ padding: "9px 22px", borderRadius: 8, border: "1px solid var(--border-color)", background: "var(--bg-card)", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--text-secondary)", fontFamily: "inherit" }}>
                Hủy
              </button>
              <button onClick={() => handle(true)} style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: state.opts.danger ? "#ef4444" : "var(--color-primary)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                {state.opts.confirmLabel ?? "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

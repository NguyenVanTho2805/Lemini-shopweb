"use client";

import { Bell, Search, Sun, Moon, Plus } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { darkMode, toggle } = useTheme();

  return (
    <header
      style={{
        height: 64,
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      {/* Search */}
      <div className="hide-mobile" style={{ flex: 1, maxWidth: 360, position: "relative" }}>
        <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          style={{
            width: "100%",
            padding: "7px 12px 7px 32px",
            background: "var(--bg-page)",
            border: "1px solid var(--border-color)",
            borderRadius: 7,
            fontSize: 13,
            color: "var(--text-primary)",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <kbd style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "var(--bg-page)", border: "1px solid var(--border-color)", borderRadius: 4, padding: "1px 5px", fontSize: 10, color: "var(--text-muted)", fontFamily: "monospace" }}>
          ⌘K
        </kbd>
      </div>

      <div style={{ flex: 1 }} />

      {/* New Order Button */}
      <Link
        href="/don-hang"
        className="hide-mobile"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px",
          background: "var(--color-primary)", color: "#fff",
          borderRadius: 7, fontSize: 13, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--color-primary-hover)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--color-primary)")}
      >
        <Plus size={15} />
        Đơn hàng mới
      </Link>

      {/* Dark mode */}
      <button
        onClick={toggle}
        style={{
          width: 36, height: 36, borderRadius: 7,
          border: "1px solid var(--border-color)",
          background: darkMode ? "var(--bg-page)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-muted)", cursor: "pointer",
          transition: "background 0.15s",
        }}
        title={darkMode ? "Chế độ sáng" : "Chế độ tối"}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <button
        style={{
          width: 36, height: 36, borderRadius: 7,
          border: "1px solid var(--border-color)",
          background: "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-muted)", cursor: "pointer",
          position: "relative",
        }}
        title="Thông báo"
      >
        <Bell size={16} />
        <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#ef4444", borderRadius: "50%", border: "2px solid var(--bg-card)" }} />
      </button>

      {/* Avatar */}
      <div
        style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #059669, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 12,
          cursor: "pointer", flexShrink: 0,
        }}
        title="Admin"
      >
        AD
      </div>
    </header>
  );
}

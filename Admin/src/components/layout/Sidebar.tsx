"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Package,
  Grid3x3,
  Users,
  FileText,
  Archive,
  Tag,
  Ticket,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Star,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

const navSections = [
  {
    label: "Tổng quan",
    items: [
      { label: "Bảng điều khiển", href: "/", icon: LayoutDashboard },
      { label: "Phân tích", href: "/phan-tich", icon: BarChart3 },
    ],
  },
  {
    label: "Thương mại",
    items: [
      { label: "Đơn hàng", href: "/don-hang", icon: ShoppingBag },
      { label: "Sản phẩm", href: "/san-pham", icon: Package },
      { label: "Danh mục", href: "/danh-muc", icon: Grid3x3 },
      { label: "Khách hàng", href: "/khach-hang", icon: Users },
      { label: "Đánh giá", href: "/danh-gia", icon: Star },
      { label: "Hóa đơn", href: "/hoa-don", icon: FileText },
    ],
  },
  {
    label: "Kho & Khuyến mãi",
    items: [
      { label: "Kho hàng", href: "/kho-hang", icon: Archive },
      { label: "Khuyến mãi", href: "/khuyen-mai", icon: Tag },
      { label: "Voucher", href: "/voucher", icon: Ticket },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { label: "Nhân viên", href: "/nhan-vien", icon: UserCog },
      { label: "Cài đặt", href: "/cai-dat", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);

  useEffect(() => {
    const checkWidth = () => { if (window.innerWidth < 900) setCollapsed(true); };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const [ordersRes, reviewsRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/reviews?status=pending"),
        ]);
        const orders = await ordersRes.json();
        const reviews = await reviewsRes.json();
        setPendingCount(Array.isArray(orders) ? orders.filter((o: { status: string }) => o.status === "pending").length : 0);
        setPendingReviews(Array.isArray(reviews) ? reviews.length : 0);
      } catch { /* ignore */ }
    };
    fetchPending();
    const id = setInterval(fetchPending, 30_000);
    return () => clearInterval(id);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: collapsed ? 64 : 240,
        minWidth: collapsed ? 64 : 240,
        height: "100vh",
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease, min-width 0.25s ease",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: collapsed ? "20px 18px" : "20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          minHeight: 64,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Scissors size={16} color="#fff" strokeWidth={2} />
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.01em",
              }}
            >
              Lemini
            </div>
            <div
              style={{
                color: "var(--sidebar-text)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Quản trị
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 0",
        }}
      >
        {navSections.map((section) => (
          <div key={section.label} style={{ marginBottom: 4 }}>
            {!collapsed && (
              <div
                style={{
                  padding: "8px 20px 4px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--sidebar-section)",
                }}
              >
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: collapsed ? "9px 18px" : "9px 12px 9px 16px",
                    margin: "1px 8px",
                    borderRadius: 7,
                    background: active
                      ? "var(--sidebar-active)"
                      : "transparent",
                    color: active
                      ? "var(--sidebar-text-active)"
                      : "var(--sidebar-text)",
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    transition: "background 0.15s, color 0.15s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textDecoration: "none",
                    borderLeft: active
                      ? "3px solid #10b981"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.background =
                        "var(--sidebar-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon
                    size={17}
                    strokeWidth={active ? 2.2 : 1.8}
                    style={{ flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.href === "/don-hang" && pendingCount > 0 && (
                        <span style={{ background: "#ef4444", color: "#fff", borderRadius: 99, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                          {pendingCount}
                        </span>
                      )}
                      {item.href === "/danh-gia" && pendingReviews > 0 && (
                        <span style={{ background: "#f59e0b", color: "#fff", borderRadius: 99, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                          {pendingReviews}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #059669, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          AD
        </div>
        {!collapsed && (
          <>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Admin
              </div>
              <div style={{ color: "var(--sidebar-text)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Quản trị viên
              </div>
            </div>
            <button
              title="Đăng xuất"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/login";
              }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sidebar-text)", display: "flex", alignItems: "center", flexShrink: 0, padding: 4, borderRadius: 6, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--sidebar-text)")}
            >
              <LogOut size={15} />
            </button>
          </>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 20,
          right: -12,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#1e293b",
          border: "2px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          cursor: "pointer",
          zIndex: 20,
          transition: "background 0.15s",
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}

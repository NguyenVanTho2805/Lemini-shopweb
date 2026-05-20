"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign, ShoppingBag, Package, Tag,
  TrendingUp, ArrowRight, AlertTriangle, RefreshCw,
} from "lucide-react";
import { formatVND } from "@/lib/data";

interface Stats {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    completedOrders: number;
    activeProducts: number;
    totalProducts: number;
    totalSold: number;
    activeVouchers: number;
    lowStockCount: number;
  };
  orders: {
    byStatus: { pending: number; shipping: number; completed: number; cancelled: number };
    recent: { id: string; code: string; customerName: string; customerEmail: string; total: number; status: string; createdAt: string; itemCount: number }[];
  };
  revenue: {
    byMonth: { month: string; revenue: number; orders: number }[];
  };
  products: {
    top: { id: string; name: string; sold: number; revenue: number; image: string }[];
    lowStock: { id: string; name: string; stock: number; image: string }[];
  };
  categories: { name: string; slug: string; icon: string; productCount: number }[];
  promotions: { total: number; active: number; totalUsage: number };
}

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Chờ xác nhận", color: "#b45309", bg: "#fef3c7" },
  shipping:  { label: "Đang giao",    color: "#2563eb", bg: "#dbeafe" },
  completed: { label: "Hoàn thành",   color: "#059669", bg: "#d1fae5" },
  cancelled: { label: "Đã hủy",       color: "#ef4444", bg: "#fee2e2" },
};

export default function DashboardPage() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      setData(await res.json());
      setLastUpdated(new Date());
    } catch { /* keep previous */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(); }, []);

  const s = data?.summary;
  const maxRev = Math.max(...(data?.revenue.byMonth.map(m => m.revenue) ?? [1])) || 1;

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Bảng Điều Khiển
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
            {lastUpdated
              ? `Cập nhật lúc ${lastUpdated.toLocaleTimeString("vi-VN")} · Số liệu thực từ hệ thống`
              : "Đang tải số liệu..."}
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchStats} disabled={loading} style={{ gap: 6 }}>
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Làm mới
        </button>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {[
          {
            title: "Doanh Thu (Hoàn thành)",
            value: s ? formatVND(s.totalRevenue) : "—",
            sub: `${s?.completedOrders ?? 0} đơn hoàn thành`,
            icon: DollarSign, color: "#059669", bg: "#d1fae5",
            href: "/don-hang",
          },
          {
            title: "Tổng Đơn Hàng",
            value: s?.totalOrders ?? "—",
            sub: `${data?.orders.byStatus.pending ?? 0} đơn chờ xác nhận`,
            icon: ShoppingBag, color: "#2563eb", bg: "#dbeafe",
            href: "/don-hang",
          },
          {
            title: "Sản Phẩm Đang Bán",
            value: s?.activeProducts ?? "—",
            sub: `${s?.totalSold ?? 0} sản phẩm đã bán`,
            icon: Package, color: "#7c3aed", bg: "#ede9fe",
            href: "/san-pham",
          },
          {
            title: "Voucher Hoạt Động",
            value: data?.promotions.active ?? "—",
            sub: `${data?.promotions.totalUsage ?? 0} lần sử dụng`,
            icon: Tag, color: "#b45309", bg: "#fef3c7",
            href: "/khuyen-mai",
          },
        ].map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: "20px 20px 16px", cursor: "pointer", transition: "transform 0.15s", display: "flex", flexDirection: "column", gap: 10 }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: "var(--text-primary)" }}>{card.value}</div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={card.color} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{card.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{card.sub}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Low stock alert */}
      {(s?.lowStockCount ?? 0) > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={16} color="#b45309" />
          <span style={{ fontSize: 13, color: "#b45309", fontWeight: 500 }}>
            {s?.lowStockCount} sản phẩm sắp hết hàng (tồn kho &lt; 10)
          </span>
          <Link href="/san-pham" style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "#b45309" }}>
            Xem ngay →
          </Link>
        </div>
      )}

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 16, alignItems: "start" }}>
        {/* Revenue bar chart */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Doanh Thu Theo Tháng</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                Năm {new Date().getFullYear()} · Chỉ tính đơn hoàn thành
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#059669" }}>{s ? formatVND(s.totalRevenue) : "—"}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Tổng năm nay</div>
            </div>
          </div>
          {data?.revenue.byMonth.every(m => m.revenue === 0) ? (
            <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 13 }}>
              Chưa có đơn hoàn thành nào
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
              {data?.revenue.byMonth.map((m, i) => {
                const h = m.revenue > 0 ? Math.max(6, Math.round((m.revenue / maxRev) * 140)) : 2;
                const isCurrent = i === new Date().getMonth();
                return (
                  <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div title={`${m.month}: ${formatVND(m.revenue)} · ${m.orders} đơn`}
                      style={{ width: "100%", height: h, borderRadius: "3px 3px 0 0", cursor: "pointer", transition: "opacity 0.15s",
                        background: isCurrent ? "var(--color-primary)" : m.revenue > 0 ? "linear-gradient(180deg,#a7f3d0,#d1fae5)" : "var(--border-color)",
                      }} />
                    <span style={{ fontSize: 9, color: isCurrent ? "var(--color-primary)" : "var(--text-muted)", fontWeight: isCurrent ? 700 : 400 }}>
                      {m.month}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order status + top products */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Order status */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 14 }}>Trạng Thái Đơn Hàng</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(STATUS_STYLE).map(([key, info]) => {
                const count = data?.orders.byStatus[key as keyof typeof data.orders.byStatus] ?? 0;
                const total = data?.orders.recent ? data.summary?.totalOrders || 1 : 1;
                const pct = total > 0 ? Math.round((count / (s?.totalOrders || 1)) * 100) : 0;
                return (
                  <div key={key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: info.color, fontWeight: 600 }}>{info.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{count}</span>
                    </div>
                    <div style={{ height: 5, background: "var(--border-color)", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: info.color, borderRadius: 3, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top products */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Bán Chạy Nhất</div>
              <Link href="/san-pham" style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 600 }}>Xem tất cả</Link>
            </div>
            {(data?.products.top.length ?? 0) === 0 ? (
              <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: "16px 0" }}>Chưa có dữ liệu</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data?.products.top.map((p, i) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: ["#fde68a","#e2e8f0","#fed7aa","#dbeafe","#ede9fe"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <img src={p.image} alt="" style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Đã bán: {p.sold.toLocaleString("vi-VN")}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card" style={{ padding: "18px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Đơn Hàng Gần Đây</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Từ trang User · cập nhật thực</div>
          </div>
          <Link href="/don-hang" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-primary)", fontWeight: 600 }}>
            Xem tất cả <ArrowRight size={13} />
          </Link>
        </div>
        {(data?.orders.recent.length ?? 0) === 0 ? (
          <div style={{ padding: "32px 0", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
            Chưa có đơn hàng nào. Khi khách đặt hàng trên trang User, đơn sẽ hiển thị tại đây.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Mã đơn</th>
                <th>SP</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
                <th style={{ textAlign: "right" }}>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders.recent.map(o => {
                const st = STATUS_STYLE[o.status] ?? STATUS_STYLE.pending;
                return (
                  <tr key={o.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 10, flexShrink: 0 }}>
                          {(o.customerName || "?")[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{o.customerName}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{o.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-secondary)" }}>{o.code}</td>
                    <td style={{ fontSize: 13, color: "var(--text-muted)" }}>{o.itemCount} sp</td>
                    <td>
                      <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: st.bg, color: st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {o.createdAt ? new Date(o.createdAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "var(--text-primary)", fontSize: 13 }}>
                      {formatVND(o.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

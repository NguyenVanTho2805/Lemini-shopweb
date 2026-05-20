"use client";

import { useState, useEffect } from "react";
import { TrendingUp, ShoppingBag, Package, Tag, DollarSign, RefreshCw, BarChart2 } from "lucide-react";
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

export default function AnalyticsPage() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      setData(await res.json());
    } catch { /* keep */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(); }, []);

  const s = data?.summary;
  const maxRev = Math.max(...(data?.revenue.byMonth.map(m => m.revenue) ?? [1])) || 1;
  const maxSold = data?.products.top[0]?.sold || 1;
  const totalCatProducts = (data?.categories ?? []).reduce((acc, c) => acc + c.productCount, 0) || 1;
  const totalOrders = s?.totalOrders || 1;

  const conversionRate = s && s.totalOrders > 0
    ? ((s.completedOrders / s.totalOrders) * 100).toFixed(1)
    : "0.0";

  if (loading && !data) {
    return <div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>Đang tải số liệu...</div>;
  }

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1300 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Phân Tích & Báo Cáo
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            Số liệu thực từ hệ thống · {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchStats} disabled={loading}>
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Làm mới
        </button>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tổng Doanh Thu", value: s ? formatVND(s.totalRevenue) : "—", sub: "Từ đơn hoàn thành", icon: DollarSign, color: "#059669", bg: "#d1fae5" },
          { label: "Tổng Đơn Hàng", value: s?.totalOrders ?? "—", sub: `${s?.completedOrders ?? 0} hoàn thành`, icon: ShoppingBag, color: "#2563eb", bg: "#dbeafe" },
          { label: "Tổng SP Đã Bán", value: s?.totalSold.toLocaleString("vi-VN") ?? "—", sub: `${s?.activeProducts ?? 0} sp đang bán`, icon: Package, color: "#7c3aed", bg: "#ede9fe" },
          { label: "Tỷ Lệ Hoàn Thành", value: `${conversionRate}%`, sub: "Đơn hoàn thành / tổng đơn", icon: BarChart2, color: "#b45309", bg: "#fef3c7" },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</div>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={card.color} />
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{card.sub}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 16 }}>
        {/* Monthly revenue bar chart */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>Doanh Thu & Đơn Hàng Theo Tháng</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
            Năm {new Date().getFullYear()} · Chỉ tính đơn hoàn thành
          </div>
          {data?.revenue.byMonth.every(m => m.revenue === 0) ? (
            <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 13, flexDirection: "column", gap: 8 }}>
              <ShoppingBag size={32} strokeWidth={1} />
              <span>Chưa có đơn hoàn thành nào trong năm nay</span>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160, marginBottom: 8 }}>
                {data?.revenue.byMonth.map((m, i) => {
                  const barH = m.revenue > 0 ? Math.max(8, Math.round((m.revenue / maxRev) * 140)) : 2;
                  const isCurrent = i === new Date().getMonth();
                  return (
                    <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative" }}>
                      {m.revenue > 0 && (
                        <div style={{ position: "absolute", bottom: barH + 20, left: "50%", transform: "translateX(-50%)", background: "var(--sidebar-bg)", color: "#fff", borderRadius: 4, padding: "2px 5px", fontSize: 9, fontWeight: 600, whiteSpace: "nowrap", pointerEvents: "none", opacity: isCurrent ? 1 : 0, transition: "opacity 0.2s" }}
                          className={`bar-tooltip-${i}`}>
                          {formatVND(m.revenue)}
                        </div>
                      )}
                      <div title={`${m.month}: ${formatVND(m.revenue)} · ${m.orders} đơn`}
                        style={{ width: "100%", height: barH, borderRadius: "3px 3px 0 0", cursor: "help",
                          background: isCurrent ? "var(--color-primary)" : m.revenue > 0 ? "linear-gradient(180deg,#a7f3d0,#d1fae5)" : "var(--border-color)",
                        }} />
                      <span style={{ fontSize: 9, color: isCurrent ? "var(--color-primary)" : "var(--text-muted)", fontWeight: isCurrent ? 700 : 400 }}>{m.month}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid var(--border-color)" }}>
                {data?.revenue.byMonth.filter(m => m.revenue > 0).slice(0, 3).map(m => (
                  <div key={m.month}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.month}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>{formatVND(m.revenue)}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{m.orders} đơn</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Order status breakdown */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>Trạng Thái Đơn Hàng</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>Phân bổ tất cả đơn hàng</div>
          {s?.totalOrders === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, padding: "32px 0" }}>Chưa có đơn hàng nào</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "pending",   label: "Chờ xác nhận", color: "#b45309", bg: "#fef3c7" },
                { key: "shipping",  label: "Đang giao",    color: "#2563eb", bg: "#dbeafe" },
                { key: "completed", label: "Hoàn thành",   color: "#059669", bg: "#d1fae5" },
                { key: "cancelled", label: "Đã hủy",       color: "#ef4444", bg: "#fee2e2" },
              ].map(st => {
                const count = data?.orders.byStatus[st.key as keyof typeof data.orders.byStatus] ?? 0;
                const pct = Math.round((count / totalOrders) * 100);
                return (
                  <div key={st.key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: st.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{st.label}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{count}</span>
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: 6, background: "var(--border-color)", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: st.color, borderRadius: 4, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Top products */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>Sản Phẩm Bán Chạy</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>Top 5 theo số lượng bán</div>
          {(data?.products.top.length ?? 0) === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, padding: "24px 0" }}>Chưa có dữ liệu</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {data?.products.top.map((p, i) => (
                <div key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: ["#fde68a","#e2e8f0","#fed7aa","#dbeafe","#ede9fe"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <img src={p.image} alt="" style={{ width: 28, height: 28, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", flexShrink: 0, marginLeft: 8 }}>
                      {p.sold.toLocaleString("vi-VN")}
                    </span>
                  </div>
                  <div style={{ height: 5, background: "var(--border-color)", borderRadius: 3 }}>
                    <div style={{ height: "100%", width: `${Math.round((p.sold / maxSold) * 100)}%`, background: i === 0 ? "var(--color-primary)" : "#a7f3d0", borderRadius: 3, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category distribution */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>Phân Bổ Danh Mục</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>Số sản phẩm theo danh mục</div>
          {(data?.categories.length ?? 0) === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, padding: "24px 0" }}>Chưa có danh mục</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data?.categories.map((c, i) => {
                const pct = Math.round((c.productCount / totalCatProducts) * 100);
                const colors = ["#059669","#2563eb","#7c3aed","#b45309","#ef4444","#0891b2"];
                return (
                  <div key={c.slug}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{c.icon}</span>
                        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{c.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{c.productCount}</span>
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: 5, background: "var(--border-color)", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: colors[i % colors.length], borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Low stock + Promotions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Low stock */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Sản Phẩm Sắp Hết Hàng</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Tồn kho &lt; 10 sản phẩm</div>
            </div>
            {(s?.lowStockCount ?? 0) > 0 && (
              <span style={{ background: "#fee2e2", color: "#ef4444", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                {s?.lowStockCount} cảnh báo
              </span>
            )}
          </div>
          {(data?.products.lowStock.length ?? 0) === 0 ? (
            <div style={{ textAlign: "center", color: "#059669", fontSize: 13, padding: "24px 0" }}>
              ✓ Tất cả sản phẩm còn đủ hàng
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data?.products.lowStock.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={p.image} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#ef4444", marginTop: 1 }}>Còn {p.stock} sản phẩm</div>
                  </div>
                  <div style={{ height: 28, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 36, height: 6, background: "var(--border-color)", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${Math.min(100, (p.stock / 10) * 100)}%`, background: p.stock <= 3 ? "#ef4444" : "#f59e0b", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promotions summary */}
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>Khuyến Mãi</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Tổng quan voucher & mã giảm giá</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Tổng voucher", value: data?.promotions.total ?? 0, color: "#0f172a" },
              { label: "Đang hoạt động", value: data?.promotions.active ?? 0, color: "#059669" },
              { label: "Lần sử dụng", value: data?.promotions.totalUsage ?? 0, color: "#2563eb" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--bg-input)", borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={14} color="#059669" />
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {data?.promotions.active ?? 0} voucher đang được User sử dụng khi đặt hàng
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

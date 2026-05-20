"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Mail, Phone, ShoppingBag, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { formatVND } from "@/lib/data";
import type { AdminOrder } from "@/lib/orderStore";

const ADMIN_API = "http://localhost:3001";

interface Customer {
  email: string;
  name: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
  orders: AdminOrder[];
}

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Chờ xác nhận", color: "#b45309", bg: "#fef3c7" },
  shipping:  { label: "Đang giao",    color: "#2563eb", bg: "#dbeafe" },
  completed: { label: "Hoàn thành",   color: "#059669", bg: "#d1fae5" },
  cancelled: { label: "Đã hủy",       color: "#ef4444", bg: "#fee2e2" },
};

export default function CustomersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/orders`);
      setOrders(await res.json());
    } catch { setOrders([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const customers = useMemo<Customer[]>(() => {
    const map = new Map<string, Customer>();
    for (const o of orders) {
      const key = o.customerEmail;
      if (!map.has(key)) {
        map.set(key, {
          email: o.customerEmail,
          name: o.customerName,
          phone: o.customerPhone,
          orderCount: 0,
          totalSpent: 0,
          lastOrderAt: o.createdAt,
          orders: [],
        });
      }
      const c = map.get(key)!;
      c.orderCount++;
      c.totalSpent += o.total - (o.discount ?? 0);
      if (o.createdAt > c.lastOrderAt) {
        c.lastOrderAt = o.createdAt;
        c.name = o.customerName;
        c.phone = o.customerPhone;
      }
      c.orders.push(o);
    }
    for (const c of map.values()) {
      c.orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    let list = Array.from(map.values());
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    }
    switch (sortBy) {
      case "spent":  list.sort((a, b) => b.totalSpent - a.totalSpent); break;
      case "orders": list.sort((a, b) => b.orderCount - a.orderCount); break;
      default:       list.sort((a, b) => b.lastOrderAt.localeCompare(a.lastOrderAt));
    }
    return list;
  }, [orders, search, sortBy]);

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgSpent = customers.length > 0 ? Math.round(totalRevenue / customers.length) : 0;

  return (
    <div style={{ padding: "28px 28px 40px", maxWidth: 1300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Quản Lý Khách Hàng
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            Hồ sơ khách hàng tổng hợp từ lịch sử đơn hàng
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchOrders} disabled={loading}>
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Làm mới
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tổng khách hàng", value: customers.length, color: "#0f172a" },
          { label: "Đã mua hàng", value: customers.filter(c => c.orderCount > 0).length, color: "#059669" },
          { label: "Tổng doanh thu", value: formatVND(totalRevenue), color: "#2563eb" },
          { label: "Chi tiêu TB / KH", value: formatVND(avgSpent), color: "#7c3aed" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {s.label}
            </div>
            <div style={{ fontSize: typeof s.value === "string" && s.value.length > 10 ? 16 : 24, fontWeight: 700, color: s.color, marginTop: 6 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", display: "flex", gap: 10, borderBottom: "1px solid var(--border-color)", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input" style={{ paddingLeft: 32 }} placeholder="Tìm tên, email, số điện thoại..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input" style={{ width: "auto" }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Gần đây nhất</option>
            <option value="spent">Chi tiêu cao nhất</option>
            <option value="orders">Nhiều đơn nhất</option>
          </select>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
            {customers.length} khách hàng · {orders.length} đơn hàng
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Đang tải...</div>
        ) : customers.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
            {orders.length === 0
              ? "Chưa có đơn hàng. Khách hàng sẽ xuất hiện khi có đơn."
              : "Không tìm thấy khách hàng nào"}
          </div>
        ) : (
          <div>
            {/* Table header */}
            <div style={{
              display: "grid", gridTemplateColumns: "240px 200px 80px 180px 180px 28px",
              gap: 16, padding: "10px 20px",
              background: "var(--bg-input)", borderBottom: "1px solid var(--border-color)",
              fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              <div>Khách hàng</div>
              <div>Liên hệ</div>
              <div style={{ textAlign: "center" }}>Đơn</div>
              <div>Tổng chi tiêu</div>
              <div>Đơn gần nhất</div>
              <div />
            </div>

            {customers.map(c => {
              const open = expanded === c.email;
              const initials = c.name.trim().split(/\s+/).slice(-2).map(w => w[0]).join("").toUpperCase().slice(0, 2) || "KH";
              return (
                <div key={c.email} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <button
                    onClick={() => setExpanded(open ? null : c.email)}
                    style={{
                      display: "grid", gridTemplateColumns: "240px 200px 80px 180px 180px 28px",
                      gap: 16, width: "100%", padding: "14px 20px",
                      background: open ? "var(--bg-input)" : "transparent",
                      border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #059669, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                        {initials}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-secondary)" }}>
                        <Mail size={11} color="var(--text-muted)" />{c.email}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-secondary)" }}>
                        <Phone size={11} color="var(--text-muted)" />{c.phone}
                      </div>
                    </div>
                    <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                      <ShoppingBag size={13} color="var(--text-muted)" />
                      <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 14 }}>{c.orderCount}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: "#059669", fontSize: 13 }}>{formatVND(c.totalSpent)}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {new Date(c.lastOrderAt).toLocaleDateString("vi-VN")}
                    </div>
                    {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </button>

                  {open && (
                    <div style={{ background: "var(--bg-input)", borderTop: "1px solid var(--border-color)", padding: "14px 20px 14px 72px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                        Lịch sử đơn hàng ({c.orderCount} đơn)
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {c.orders.map(o => {
                          const st = STATUS_STYLE[o.status] ?? STATUS_STYLE.pending;
                          return (
                            <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 8, padding: "10px 14px", border: "1px solid var(--border-color)" }}>
                              <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, minWidth: 120 }}>{o.code}</span>
                              <span style={{ fontSize: 12, color: "var(--text-muted)", flex: 1 }}>
                                {new Date(o.createdAt).toLocaleDateString("vi-VN")} · {o.items.length} sản phẩm
                              </span>
                              {o.voucherCode && (
                                <span style={{ fontSize: 11, color: "#7c3aed", background: "#ede9fe", borderRadius: 4, padding: "2px 7px" }}>🏷 {o.voucherCode}</span>
                              )}
                              <span style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: st.bg, color: st.color }}>{st.label}</span>
                              <span style={{ fontWeight: 700, color: "#059669", fontSize: 13, minWidth: 100, textAlign: "right" }}>{formatVND(o.total)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Hiển thị {customers.length} khách hàng · Tổng {orders.length} đơn hàng
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

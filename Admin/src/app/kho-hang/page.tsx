"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, AlertTriangle, Package, RefreshCw, Check, X, History, TrendingUp, TrendingDown } from "lucide-react";
import type { AdminProduct } from "@/types/product";
import type { InventoryLogEntry } from "@/lib/inventoryLogStore";
import { formatVND } from "@/lib/data";

const ADMIN_API = "http://localhost:3001";

const CATEGORY_LABELS: Record<string, string> = {
  "tui-theu": "Túi thêu",
  "tranh-theu": "Tranh thêu",
  "bo-kit-diy": "Bộ kit DIY",
  "phu-kien": "Phụ kiện",
};

export default function InventoryPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const [log, setLog] = useState<InventoryLogEntry[]>([]);
  const [logLoading, setLogLoading] = useState(true);
  const [showLog, setShowLog] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/products`);
      setProducts(await res.json());
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const fetchLog = async () => {
    setLogLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/inventory-log`);
      setLog(await res.json());
    } catch { setLog([]); }
    finally { setLogLoading(false); }
  };

  useEffect(() => { fetchProducts(); fetchLog(); }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.slug.includes(q));
    }
    if (categoryFilter !== "all") list = list.filter(p => p.category === categoryFilter);
    if (stockFilter === "out") list = list.filter(p => p.stock === 0);
    else if (stockFilter === "low") list = list.filter(p => p.stock > 0 && p.stock < 20);
    else if (stockFilter === "ok") list = list.filter(p => p.stock >= 20);
    return list.sort((a, b) => a.stock - b.stock);
  }, [products, search, categoryFilter, stockFilter]);

  const startEdit = (p: AdminProduct) => {
    setEditingId(p.id);
    setEditStock(p.stock);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditStock(0);
  };

  const saveStock = async (p: AdminProduct) => {
    setSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock: editStock,
          status: editStock === 0 ? "out_of_stock" : "active",
        }),
      });
      const updated = await res.json();
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: updated.stock, status: updated.status } : x));

      // Log the stock change
      if (editStock !== p.stock) {
        const entry = await fetch(`${ADMIN_API}/api/inventory-log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: p.id,
            productName: p.name,
            previousStock: p.stock,
            newStock: editStock,
          }),
        });
        const newEntry = await entry.json();
        setLog(prev => [newEntry, ...prev].slice(0, 50));
      }

      setEditingId(null);
    } finally { setSaving(false); }
  };

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 20).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Quản Lý Kho Hàng
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            {products.length} sản phẩm · Dữ liệu thật từ hệ thống
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn btn-outline"
            onClick={() => { setShowLog(v => !v); if (!showLog) fetchLog(); }}
            style={{ gap: 6 }}
          >
            <History size={14} />
            Nhật ký kho
          </button>
          <button className="btn btn-outline" onClick={fetchProducts} disabled={loading}>
            <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Làm mới
          </button>
        </div>
      </div>

      {/* Alert banner */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div style={{
          background: "#fef3c7", border: "1px solid #fde68a",
          borderRadius: 10, padding: "12px 16px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <AlertTriangle size={18} color="#b45309" />
          <span style={{ fontSize: 13, color: "#92400e", fontWeight: 500 }}>
            {outOfStockCount > 0 && <><strong>{outOfStockCount}</strong> sản phẩm hết hàng</>}
            {outOfStockCount > 0 && lowStockCount > 0 && " · "}
            {lowStockCount > 0 && <><strong>{lowStockCount}</strong> sản phẩm sắp hết (dưới 20)</>}
            . Bấm vào số tồn kho để cập nhật.
          </span>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tổng tồn kho", value: `${totalStock.toLocaleString("vi-VN")} sp`, color: "#0f172a" },
          { label: "Mặt hàng còn hàng", value: products.filter(p => p.stock > 0).length, color: "#059669" },
          { label: "Sắp hết (< 20)", value: lowStockCount, color: "#b45309" },
          { label: "Hết hàng", value: outOfStockCount, color: "#dc2626" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="card" style={{ overflow: "hidden", marginBottom: showLog ? 16 : 0 }}>
        <div style={{ padding: "14px 20px", display: "flex", gap: 10, borderBottom: "1px solid var(--border-color)", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input" style={{ paddingLeft: 32 }} placeholder="Tìm sản phẩm trong kho..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input" style={{ width: "auto" }}
            value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="all">Tất cả danh mục</option>
            {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className="input" style={{ width: "auto" }}
            value={stockFilter} onChange={e => setStockFilter(e.target.value)}>
            <option value="all">Tất cả trạng thái kho</option>
            <option value="ok">Còn hàng (≥ 20)</option>
            <option value="low">Sắp hết (1–19)</option>
            <option value="out">Hết hàng (0)</option>
          </select>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} / {products.length} sản phẩm
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Đang tải...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>SKU</th>
                <th style={{ textAlign: "center" }}>Tồn kho</th>
                <th style={{ textAlign: "right" }}>Giá bán</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
                    <Package size={32} style={{ marginBottom: 8, opacity: 0.3, display: "block", margin: "0 auto 8px" }} />
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : filtered.map(p => {
                const stockStatus = p.stock === 0
                  ? { label: "Hết hàng", badge: "badge-danger" }
                  : p.stock < 20
                  ? { label: "Sắp hết", badge: "badge-warning" }
                  : { label: "Còn hàng", badge: "badge-success" };

                const isEditing = editingId === p.id;

                return (
                  <tr key={p.id} style={{ background: isEditing ? "#eff6ff" : undefined }}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", flexShrink: 0, border: "1px solid var(--border-color)", background: "#f1f5f9" }}>
                          {p.image
                            ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Package size={16} color="#94a3b8" />
                              </div>
                          }
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }}>/{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      {CATEGORY_LABELS[p.category] ?? p.category}
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-muted)" }}>
                      SP-{p.id.padStart(4, "0")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {isEditing ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                          <input
                            type="number" min={0}
                            value={editStock}
                            onChange={e => setEditStock(Math.max(0, Number(e.target.value)))}
                            style={{
                              width: 70, textAlign: "center", padding: "4px 8px",
                              border: "2px solid var(--color-primary)", borderRadius: 6,
                              fontSize: 13, fontWeight: 700, fontFamily: "inherit",
                              outline: "none", background: "#fff",
                            }}
                            autoFocus
                            onKeyDown={e => { if (e.key === "Enter") saveStock(p); if (e.key === "Escape") cancelEdit(); }}
                          />
                          <button onClick={() => saveStock(p)} disabled={saving}
                            style={{ background: "#059669", border: "none", borderRadius: 5, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            <Check size={12} color="#fff" />
                          </button>
                          <button onClick={cancelEdit}
                            style={{ background: "#f1f5f9", border: "none", borderRadius: 5, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            <X size={12} color="#64748b" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(p)}
                          title="Bấm để cập nhật tồn kho"
                          style={{
                            background: "none", border: "1px dashed transparent", borderRadius: 6,
                            padding: "2px 10px", cursor: "pointer", fontFamily: "inherit",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--color-primary-light)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
                        >
                          <span style={{ fontWeight: 700, fontSize: 15, color: p.stock === 0 ? "#ef4444" : p.stock < 20 ? "#f59e0b" : "#059669" }}>
                            {p.stock}
                          </span>
                        </button>
                      )}
                    </td>
                    <td style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                      {formatVND(p.price)}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        {p.stock < 20 && <AlertTriangle size={12} color={p.stock === 0 ? "#ef4444" : "#f59e0b"} />}
                        <span className={`badge ${stockStatus.badge}`}>{stockStatus.label}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Inventory log */}
      {showLog && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{
            padding: "14px 20px", borderBottom: "1px solid var(--border-color)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <History size={15} color="var(--text-secondary)" />
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Nhật ký nhập/xuất kho</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>50 thao tác gần nhất</span>
            </div>
            <button className="btn btn-outline" onClick={fetchLog} disabled={logLoading} style={{ fontSize: 11 }}>
              <RefreshCw size={12} style={{ animation: logLoading ? "spin 1s linear infinite" : "none" }} />
              Làm mới
            </button>
          </div>

          {logLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>Đang tải...</div>
          ) : log.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
              <History size={28} style={{ marginBottom: 8, opacity: 0.3, display: "block", margin: "0 auto 8px" }} />
              Chưa có thay đổi tồn kho nào được ghi lại
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Sản phẩm</th>
                  <th style={{ textAlign: "center" }}>Trước</th>
                  <th style={{ textAlign: "center" }}>Thay đổi</th>
                  <th style={{ textAlign: "center" }}>Sau</th>
                </tr>
              </thead>
              <tbody>
                {log.map(entry => (
                  <tr key={entry.id}>
                    <td style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                      {new Date(entry.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
                        {entry.productName}
                      </span>
                    </td>
                    <td style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)" }}>
                      {entry.previousStock}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 3,
                        fontWeight: 700, fontSize: 13,
                        color: entry.delta > 0 ? "#059669" : "#ef4444",
                      }}>
                        {entry.delta > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{
                        fontWeight: 700, fontSize: 13,
                        color: entry.newStock === 0 ? "#ef4444" : entry.newStock < 20 ? "#f59e0b" : "#059669",
                      }}>
                        {entry.newStock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

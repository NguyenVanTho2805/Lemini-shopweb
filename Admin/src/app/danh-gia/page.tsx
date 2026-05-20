"use client";

import { useState, useEffect, useMemo } from "react";
import { Star, RefreshCw, Check, X, Trash2, Search, MessageSquare } from "lucide-react";
import type { AdminReview, ReviewStatus } from "@/lib/reviewStore";
import { useToast } from "@/contexts/ToastContext";
import { useConfirm } from "@/contexts/ConfirmContext";

const ADMIN_API = "http://localhost:3001";

const STATUS_CONFIG: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: "Chờ duyệt",   color: "#b45309", bg: "#fef3c7" },
  approved: { label: "Đã duyệt",    color: "#059669", bg: "#d1fae5" },
  rejected: { label: "Từ chối",     color: "#ef4444", bg: "#fee2e2" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} fill={i <= rating ? "#f59e0b" : "none"} color={i <= rating ? "#f59e0b" : "#d1d5db"} />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const { confirm } = useConfirm();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/reviews`);
      setReviews(await res.json());
    } catch { setReviews([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const filtered = useMemo(() => {
    let list = statusFilter === "all" ? reviews : reviews.filter(r => r.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.author.toLowerCase().includes(q) ||
        r.productName.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q)
      );
    }
    return list;
  }, [reviews, statusFilter, search]);

  const updateStatus = async (id: string, status: ReviewStatus) => {
    setUpdating(id);
    try {
      await fetch(`${ADMIN_API}/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      toast(status === "approved" ? "Đã duyệt đánh giá" : "Đã từ chối đánh giá", status === "approved" ? "success" : "warning");
    } finally { setUpdating(null); }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({ message: "Xóa đánh giá này?", confirmLabel: "Xóa", danger: true });
    if (!ok) return;
    await fetch(`${ADMIN_API}/api/reviews/${id}`, { method: "DELETE" });
    setReviews(prev => prev.filter(r => r.id !== id));
    toast("Đã xóa đánh giá");
  };

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
  };

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1200 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Quản Lý Đánh Giá
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            Duyệt đánh giá từ khách hàng trước khi hiển thị trên trang sản phẩm
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchReviews} disabled={loading}>
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Làm mới
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tổng đánh giá", value: counts.all, color: "#0f172a" },
          { label: "Chờ duyệt",     value: counts.pending, color: "#b45309" },
          { label: "Đã duyệt",      value: counts.approved, color: "#059669" },
          { label: "Từ chối",       value: counts.rejected, color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, background: "var(--bg-input)", borderRadius: 8, padding: 4 }}>
          {(["all", "pending", "approved", "rejected"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s",
              background: statusFilter === s ? "#fff" : "transparent",
              color: statusFilter === s ? (s === "all" ? "#0f172a" : STATUS_CONFIG[s].color) : "var(--text-muted)",
              boxShadow: statusFilter === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}>
              {s === "all" ? "Tất cả" : STATUS_CONFIG[s].label} ({counts[s]})
            </button>
          ))}
        </div>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="input" placeholder="Tìm theo tên, sản phẩm, nội dung..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32, width: "100%", boxSizing: "border-box" }} />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Đang tải...</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
          <MessageSquare size={40} style={{ marginBottom: 12, opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 14 }}>Chưa có đánh giá nào</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(review => {
            const st = STATUS_CONFIG[review.status];
            return (
              <div key={review.id} className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{review.author}</span>
                      <Stars rating={review.rating} />
                      <span style={{
                        padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                        background: st.bg, color: st.color,
                      }}>{st.label}</span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>
                        {new Date(review.createdAt).toLocaleString("vi-VN")}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                      Sản phẩm: <strong style={{ color: "var(--text-secondary)" }}>{review.productName || review.productSlug}</strong>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      {review.content}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {review.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(review.id, "approved")}
                        disabled={updating === review.id}
                        title="Duyệt"
                        style={{
                          display: "flex", alignItems: "center", gap: 4,
                          padding: "6px 12px", borderRadius: 7, border: "1px solid #bbf7d0",
                          background: "#f0fdf4", color: "#059669",
                          fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        <Check size={13} /> Duyệt
                      </button>
                    )}
                    {review.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(review.id, "rejected")}
                        disabled={updating === review.id}
                        title="Từ chối"
                        style={{
                          display: "flex", alignItems: "center", gap: 4,
                          padding: "6px 12px", borderRadius: 7, border: "1px solid #fca5a5",
                          background: "#fff5f5", color: "#ef4444",
                          fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        <X size={13} /> Từ chối
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review.id)}
                      title="Xóa"
                      style={{
                        width: 32, height: 32, borderRadius: 7,
                        border: "1px solid var(--border-color)", background: "transparent",
                        color: "#94a3b8", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

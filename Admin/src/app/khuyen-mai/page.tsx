"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, RefreshCw, Tag, Copy, Edit, X, Check } from "lucide-react";
import { formatVND } from "@/lib/data";
import type { AdminPromotion } from "@/lib/promotionStore";
import { useToast } from "@/contexts/ToastContext";
import { useConfirm } from "@/contexts/ConfirmContext";

const ADMIN_API = "http://localhost:3001";

const EMPTY: Omit<AdminPromotion, "id" | "usageCount" | "createdAt"> = {
  code: "", description: "", type: "percent", value: 10,
  minOrder: 0, usageLimit: 100, status: "active", expiresAt: "",
};

type FormData = typeof EMPTY;

function PromoForm({
  title, form, onChange, onSubmit, onCancel, saving, submitLabel,
}: {
  title: string;
  form: FormData;
  onChange: (f: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  submitLabel: string;
}) {
  return (
    <div className="card" style={{ padding: "20px 24px", marginBottom: 20, borderLeft: "3px solid var(--color-primary)" }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MÃ VOUCHER *</label>
          <input className="input" placeholder="VD: SALE20" value={form.code}
            onChange={e => onChange({ ...form, code: e.target.value.toUpperCase() })} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LOẠI</label>
          <select className="input" value={form.type} onChange={e => onChange({ ...form, type: e.target.value as "percent" | "fixed" })}>
            <option value="percent">Phần trăm (%)</option>
            <option value="fixed">Số tiền cố định (đ)</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
            GIÁ TRỊ {form.type === "percent" ? "(%)" : "(đ)"}
          </label>
          <input className="input" type="number" value={form.value}
            onChange={e => onChange({ ...form, value: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ĐƠN TỐI THIỂU (đ)</label>
          <input className="input" type="number" value={form.minOrder}
            onChange={e => onChange({ ...form, minOrder: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>GIỚI HẠN SỬ DỤNG</label>
          <input className="input" type="number" value={form.usageLimit}
            onChange={e => onChange({ ...form, usageLimit: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HẾT HẠN</label>
          <input className="input" type="date" value={form.expiresAt}
            onChange={e => onChange({ ...form, expiresAt: e.target.value })} />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MÔ TẢ</label>
          <input className="input" placeholder="Giảm 20% cho đơn từ 300.000đ" value={form.description}
            onChange={e => onChange({ ...form, description: e.target.value })} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button className="btn btn-primary" onClick={onSubmit} disabled={saving || !form.code}>
          {saving ? "Đang lưu..." : submitLabel}
        </button>
        <button className="btn btn-outline" onClick={onCancel}>Hủy</button>
      </div>
    </div>
  );
}

export default function PromotionsPage() {
  const [promos, setPromos] = useState<AdminPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormData>({ ...EMPTY });
  const [savingEdit, setSavingEdit] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  const { confirm } = useConfirm();

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/promotions`);
      setPromos(await res.json());
    } catch { setPromos([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPromos(); }, []);

  const handleCreate = async () => {
    if (!form.code.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/promotions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const created = await res.json();
      setPromos(prev => [created, ...prev]);
      setForm({ ...EMPTY });
      setShowForm(false);
      toast(`Đã tạo voucher ${created.code}`);
    } finally { setSaving(false); }
  };

  const startEdit = (p: AdminPromotion) => {
    setEditingId(p.id);
    setEditForm({
      code: p.code, description: p.description, type: p.type, value: p.value,
      minOrder: p.minOrder, usageLimit: p.usageLimit, status: p.status, expiresAt: p.expiresAt,
    });
    setShowForm(false);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editForm.code.trim()) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/promotions/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const updated = await res.json();
      setPromos(prev => prev.map(p => p.id === editingId ? updated : p));
      setEditingId(null);
      toast("Đã cập nhật voucher");
    } finally { setSavingEdit(false); }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({ message: "Xóa voucher này? Hành động không thể hoàn tác.", confirmLabel: "Xóa", danger: true });
    if (!ok) return;
    await fetch(`${ADMIN_API}/api/promotions/${id}`, { method: "DELETE" });
    setPromos(prev => prev.filter(p => p.id !== id));
    toast("Đã xóa voucher");
  };

  const toggleStatus = async (p: AdminPromotion) => {
    const status = p.status === "active" ? "draft" : "active";
    await fetch(`${ADMIN_API}/api/promotions/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setPromos(prev => prev.map(x => x.id === p.id ? { ...x, status } : x));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const statusColor: Record<string, string> = { active: "#059669", expired: "#94a3b8", draft: "#b45309" };
  const statusLabel: Record<string, string> = { active: "Đang hoạt động", expired: "Hết hạn", draft: "Nháp" };

  const active = promos.filter(p => p.status === "active").length;
  const totalUsage = promos.reduce((s, p) => s + p.usageCount, 0);

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Khuyến Mãi & Voucher
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            Mã giảm giá được User nhập khi đặt hàng
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={fetchPromos}><RefreshCw size={14} /></button>
          <button className="btn btn-primary" onClick={() => { setShowForm(v => !v); setEditingId(null); }}>
            <Plus size={14} /> Tạo voucher
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Tổng voucher", value: promos.length, color: "#0f172a" },
          { label: "Đang hoạt động", value: active, color: "#059669" },
          { label: "Lần sử dụng", value: totalUsage, color: "#2563eb" },
          { label: "Vừa tạo hôm nay", value: promos.filter(p => p.createdAt === new Date().toISOString().split("T")[0]).length, color: "#7c3aed" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <PromoForm
          title="Tạo voucher mới"
          form={form}
          onChange={setForm}
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          saving={saving}
          submitLabel="Tạo voucher"
        />
      )}

      {loading ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Đang tải...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {promos.map(p => {
            const usagePct = Math.min(100, Math.round((p.usageCount / p.usageLimit) * 100));
            const isEditing = editingId === p.id;

            if (isEditing) {
              return (
                <PromoForm
                  key={p.id}
                  title={`Sửa voucher: ${p.code}`}
                  form={editForm}
                  onChange={setEditForm}
                  onSubmit={handleSaveEdit}
                  onCancel={() => setEditingId(null)}
                  saving={savingEdit}
                  submitLabel="Lưu thay đổi"
                />
              );
            }

            return (
              <div key={p.id} className="card" style={{ padding: "18px 20px", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: "var(--color-primary-light)", borderRadius: 8, padding: 8 }}>
                      <Tag size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 16, color: "var(--text-primary)", letterSpacing: "0.05em" }}>
                          {p.code}
                        </span>
                        <button onClick={() => copyCode(p.code)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--text-muted)" }}>
                          <Copy size={12} />
                        </button>
                        {copied === p.code && <span style={{ fontSize: 10, color: "#059669", fontWeight: 600 }}>Đã copy!</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{p.description}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button onClick={() => toggleStatus(p)} style={{
                      padding: "3px 10px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                      background: `${statusColor[p.status]}18`, color: statusColor[p.status], fontFamily: "inherit",
                    }}>
                      {statusLabel[p.status]}
                    </button>
                    <button onClick={() => startEdit(p)} title="Sửa voucher" style={{
                      background: "none", border: "1px solid var(--border-color)", borderRadius: 6,
                      cursor: "pointer", color: "var(--text-secondary)", padding: "4px 8px",
                      display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontFamily: "inherit",
                    }}>
                      <Edit size={12} /> Sửa
                    </button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 12, flexWrap: "wrap" }}>
                  <span style={{ background: "#f0fdf4", color: "#059669", borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>
                    {p.type === "percent" ? `Giảm ${p.value}%` : `Giảm ${formatVND(p.value)}`}
                  </span>
                  {p.minOrder > 0 && (
                    <span style={{ background: "var(--bg-input)", borderRadius: 6, padding: "3px 10px", color: "var(--text-secondary)" }}>
                      Đơn tối thiểu {formatVND(p.minOrder)}
                    </span>
                  )}
                  {p.expiresAt && (
                    <span style={{ background: "var(--bg-input)", borderRadius: 6, padding: "3px 10px", color: "var(--text-muted)" }}>
                      HSD: {new Date(p.expiresAt).toLocaleDateString("vi-VN")}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                  Đã dùng: {p.usageCount}/{p.usageLimit} ({usagePct}%)
                </div>
                <div style={{ height: 4, background: "var(--border-color)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${usagePct}%`, background: usagePct >= 90 ? "#ef4444" : "var(--color-primary)", borderRadius: 4, transition: "width 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

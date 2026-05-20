"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, RefreshCw, Check, X } from "lucide-react";
import type { AdminCategory } from "@/lib/categoryStore";
import { useToast } from "@/contexts/ToastContext";
import { useConfirm } from "@/contexts/ConfirmContext";

const ADMIN_API = "http://localhost:3001";

export default function CategoriesPage() {
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", icon: "📦", description: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { confirm } = useConfirm();

  const fetchCats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/categories`);
      setCats(await res.json());
    } catch { setCats([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCats(); }, []);

  const autoSlug = (name: string) =>
    name.toLowerCase()
      .replace(/[àáảãạăắằẳẵặâấầẩẫậ]/g, "a")
      .replace(/[đ]/g, "d")
      .replace(/[èéẻẽẹêếềểễệ]/g, "e")
      .replace(/[ìíỉĩị]/g, "i")
      .replace(/[òóỏõọôốồổỗộơớờởỡợ]/g, "o")
      .replace(/[ùúủũụưứừửữự]/g, "u")
      .replace(/[ỳýỷỹỵ]/g, "y")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug: form.slug || autoSlug(form.name) }),
      });
      const created = await res.json();
      setCats(prev => [...prev, created]);
      setForm({ name: "", slug: "", icon: "📦", description: "" });
      setShowForm(false);
      toast(`Đã tạo danh mục "${created.name}"`);
    } finally { setSaving(false); }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await fetch(`${ADMIN_API}/api/categories/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      setCats(prev => prev.map(c => c.id === editing.id ? editing : c));
      setEditing(null);
      toast("Đã cập nhật danh mục");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({ message: "Xóa danh mục này? Sản phẩm thuộc danh mục vẫn được giữ lại.", confirmLabel: "Xóa", danger: true });
    if (!ok) return;
    await fetch(`${ADMIN_API}/api/categories/${id}`, { method: "DELETE" });
    setCats(prev => prev.filter(c => c.id !== id));
    toast("Đã xóa danh mục");
  };

  const ICONS = ["👜", "🖼️", "🧵", "✨", "👒", "🧶", "🎁", "🏷️", "📦", "💎"];

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 900 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Quản Lý Danh Mục
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            Danh mục được đồng bộ sang trang User để lọc sản phẩm
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={fetchCats}><RefreshCw size={14} /></button>
          <button className="btn btn-primary" onClick={() => { setShowForm(v => !v); setEditing(null); }}>
            <Plus size={14} /> Thêm danh mục
          </button>
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="card" style={{ padding: "20px 24px", marginBottom: 20, borderLeft: "3px solid var(--color-primary)" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>Danh mục mới</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TÊN *</label>
              <input className="input" placeholder="Túi thêu" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: autoSlug(e.target.value) }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SLUG</label>
              <input className="input" placeholder="tui-theu" value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ICON</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                    style={{ fontSize: 20, background: form.icon === ic ? "var(--color-primary-light)" : "var(--bg-input)", border: `2px solid ${form.icon === ic ? "var(--color-primary)" : "transparent"}`, borderRadius: 8, width: 36, height: 36, cursor: "pointer" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MÔ TẢ</label>
              <input className="input" placeholder="Mô tả ngắn về danh mục" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-primary" onClick={handleCreate} disabled={saving || !form.name}>
              {saving ? "Đang lưu..." : "Thêm"}
            </button>
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Hủy</button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Đang tải...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {cats.sort((a, b) => a.order - b.order).map(cat => (
            <div key={cat.id} className="card" style={{ padding: "18px 22px" }}>
              {editing?.id === cat.id ? (
                /* Inline edit */
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <input className="input" value={editing.name}
                      onChange={e => setEditing(ed => ed ? { ...ed, name: e.target.value } : ed)} placeholder="Tên" />
                    <input className="input" value={editing.slug}
                      onChange={e => setEditing(ed => ed ? { ...ed, slug: e.target.value } : ed)} placeholder="slug" />
                    <input className="input" value={editing.description}
                      onChange={e => setEditing(ed => ed ? { ...ed, description: e.target.value } : ed)} placeholder="Mô tả" style={{ gridColumn: "1/-1" }} />
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    {ICONS.map(ic => (
                      <button key={ic} onClick={() => setEditing(ed => ed ? { ...ed, icon: ic } : ed)}
                        style={{ fontSize: 18, background: editing.icon === ic ? "var(--color-primary-light)" : "var(--bg-input)", border: `2px solid ${editing.icon === ic ? "var(--color-primary)" : "transparent"}`, borderRadius: 6, width: 32, height: 32, cursor: "pointer" }}>
                        {ic}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={handleUpdate} disabled={saving}>
                      <Check size={12} /> Lưu
                    </button>
                    <button className="btn btn-outline" style={{ fontSize: 12 }} onClick={() => setEditing(null)}>
                      <X size={12} /> Hủy
                    </button>
                  </div>
                </div>
              ) : (
                /* View */
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "1px solid #bbf7d0", flexShrink: 0 }}>
                      {cat.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{cat.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>/{cat.slug}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{cat.description}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button className="btn btn-outline" style={{ padding: "4px 10px", fontSize: 11 }}
                      onClick={() => { setEditing(cat); setShowForm(false); }}>
                      <Edit size={12} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fee2e2", background: "transparent", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

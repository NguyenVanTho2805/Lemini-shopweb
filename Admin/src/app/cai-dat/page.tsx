"use client";

import { useState, useEffect } from "react";
import { Save, Store, CreditCard, Truck, Bell, RefreshCw, Check } from "lucide-react";

const ADMIN_API = "http://localhost:3001";

interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  bankAccount: string;
  bankOwner: string;
  shippingFee: number;
  freeShippingThreshold: number;
}

type Tab = "store" | "payment" | "shipping" | "notifications";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    storeName: "Lemini",
    storeEmail: "hello@lemini.com",
    storePhone: "0901 234 567",
    storeAddress: "12 Lê Lợi, Q.1, TP.HCM",
    bankAccount: "0123456789 - Vietcombank",
    bankOwner: "NGUYEN THI MIRA",
    shippingFee: 30000,
    freeShippingThreshold: 500000,
  });
  const [activeTab, setActiveTab] = useState<Tab>("store");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${ADMIN_API}/api/settings`)
      .then(r => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const update = (key: keyof Settings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`${ADMIN_API}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Store }[] = [
    { id: "store", label: "Cửa hàng", icon: Store },
    { id: "payment", label: "Thanh toán", icon: CreditCard },
    { id: "shipping", label: "Vận chuyển", icon: Truck },
    { id: "notifications", label: "Thông báo", icon: Bell },
  ];

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "28px 28px 40px", maxWidth: 800 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Cài Đặt Hệ Thống
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
          Quản lý thông tin và cấu hình cửa hàng
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid var(--border-color)" }}>
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "10px 16px", fontSize: 13,
                fontWeight: activeTab === t.id ? 600 : 400,
                color: activeTab === t.id ? "var(--color-primary)" : "var(--text-secondary)",
                background: "none", border: "none",
                borderBottom: activeTab === t.id ? "2px solid var(--color-primary)" : "2px solid transparent",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
                marginBottom: -1,
              }}
            >
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Store tab */}
        {activeTab === "store" && (
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Store size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Thông tin cửa hàng</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              <Field label="Tên cửa hàng">
                <input className="input" value={settings.storeName} onChange={e => update("storeName", e.target.value)} />
              </Field>
              <Field label="Email liên hệ">
                <input className="input" type="email" value={settings.storeEmail} onChange={e => update("storeEmail", e.target.value)} />
              </Field>
              <Field label="Số điện thoại">
                <input className="input" type="tel" value={settings.storePhone} onChange={e => update("storePhone", e.target.value)} />
              </Field>
              <Field label="Địa chỉ">
                <input className="input" value={settings.storeAddress} onChange={e => update("storeAddress", e.target.value)} />
              </Field>
            </div>
          </div>
        )}

        {/* Payment tab */}
        {activeTab === "payment" && (
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CreditCard size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Thông tin thanh toán</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              <Field label="Tài khoản ngân hàng">
                <input className="input" value={settings.bankAccount} onChange={e => update("bankAccount", e.target.value)} />
              </Field>
              <Field label="Tên chủ tài khoản">
                <input className="input" value={settings.bankOwner} onChange={e => update("bankOwner", e.target.value)} />
              </Field>
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: 12, color: "#166534", fontWeight: 500 }}>
                💳 Thông tin này hiển thị cho khách khi chọn "Chuyển khoản ngân hàng" ở trang checkout.
              </div>
            </div>
          </div>
        )}

        {/* Shipping tab */}
        {activeTab === "shipping" && (
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Truck size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Cấu hình vận chuyển</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              <Field label="Phí ship mặc định (đ)">
                <input className="input" type="number" min={0} value={settings.shippingFee}
                  onChange={e => update("shippingFee", Number(e.target.value))} />
              </Field>
              <Field label="Miễn phí ship từ (đ)">
                <input className="input" type="number" min={0} value={settings.freeShippingThreshold}
                  onChange={e => update("freeShippingThreshold", Number(e.target.value))} />
              </Field>
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#eff6ff", borderRadius: 8, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 12, color: "#1e40af", fontWeight: 500 }}>
                🚚 Khi đơn hàng từ <strong>{settings.freeShippingThreshold.toLocaleString("vi-VN")}đ</strong> trở lên, khách được miễn phí ship.
              </div>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {activeTab === "notifications" && (
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bell size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Cài đặt thông báo</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Thông báo đơn hàng mới",
                "Cảnh báo hàng tồn kho thấp",
                "Báo cáo doanh thu hàng ngày",
                "Thông báo đánh giá mới",
              ].map(item => (
                <label key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item}</span>
                  <div style={{ width: 40, height: 22, borderRadius: 99, background: "var(--color-primary)", position: "relative" }}>
                    <div style={{ position: "absolute", top: 3, right: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Save */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          {saved && (
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#059669", fontWeight: 500 }}>
              <Check size={14} /> Đã lưu thành công
            </span>
          )}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ padding: "10px 24px" }}>
            {saving ? <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={14} />}
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

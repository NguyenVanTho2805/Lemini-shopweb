"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Star,
  ToggleLeft,
  ToggleRight,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/contexts/ProductContext";
import { formatVND } from "@/lib/data";
import type { AdminProduct } from "@/types/product";
import { useConfirm } from "@/contexts/ConfirmContext";

const STATUS_LABELS: Record<AdminProduct["status"], string> = {
  active: "Đang bán",
  draft: "Nháp",
  out_of_stock: "Hết hàng",
};
const STATUS_BADGE: Record<AdminProduct["status"], string> = {
  active: "badge-success",
  draft: "badge-neutral",
  out_of_stock: "badge-danger",
};
const CATEGORIES: Record<string, string> = {
  "tui-theu": "Túi thêu",
  "tranh-theu": "Tranh thêu",
  "bo-kit-diy": "Bộ kit DIY",
  "phu-kien": "Phụ kiện",
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getProduct, deleteProduct, updateProduct, loading } = useProducts();
  const router = useRouter();
  const { confirm } = useConfirm();
  const product = getProduct(id);
  const [activeImg, setActiveImg] = useState(0);
  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
        Đang tải...
      </div>
    );
  }
  if (!product) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "#ef4444", marginBottom: 12 }}>
          Không tìm thấy sản phẩm
        </div>
        <Link href="/san-pham" className="btn btn-outline">
          <ArrowLeft size={14} /> Quay lại
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = await confirm({ title: "Xóa sản phẩm", message: `Xóa sản phẩm "${product.name}"? Không thể hoàn tác.`, confirmLabel: "Xóa", danger: true });
    if (!ok) return;
    setDeleting(true);
    await deleteProduct(id);
    router.push("/san-pham");
  };

  const toggleStatus = async () => {
    const next: AdminProduct["status"] =
      product.status === "active"
        ? "draft"
        : product.stock === 0
        ? "out_of_stock"
        : "active";
    await updateProduct(id, { status: next });
  };

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1100 }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Link
          href="/san-pham"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={16} />
          Danh sách sản phẩm
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={toggleStatus}
            className="btn btn-outline"
            style={{
              color: product.status === "active" ? "#b45309" : "var(--color-primary)",
            }}
          >
            {product.status === "active" ? (
              <>
                <ToggleRight size={14} /> Ẩn sản phẩm
              </>
            ) : (
              <>
                <ToggleLeft size={14} /> Đăng bán
              </>
            )}
          </button>
          <Link href={`/san-pham/${id}/sua`} className="btn btn-outline">
            <Edit size={14} />
            Chỉnh sửa
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 6,
              border: "1px solid #fee2e2",
              background: "transparent",
              color: "#ef4444",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <Trash2 size={14} />
            {deleting ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20, alignItems: "start" }}>
        {/* Left: Images */}
        <div>
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              background: "#f8fafc",
              aspectRatio: "4/5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {product.images.length > 0 ? (
              <img
                src={product.images[activeImg] ?? product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Package size={48} color="#94a3b8" />
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `2px solid ${idx === activeImg ? "var(--color-primary)" : "var(--border-color)"}`,
                    padding: 0,
                    cursor: "pointer",
                    background: "#f8fafc",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Header card */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-primary)",
                  background: "var(--color-primary-light)",
                  borderRadius: 4,
                  padding: "2px 8px",
                }}
              >
                {CATEGORIES[product.category] ?? product.category}
              </span>
              <span className={`badge ${STATUS_BADGE[product.status]}`}>
                {STATUS_LABELS[product.status]}
              </span>
            </div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </h1>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>
              /{product.slug}
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#059669" }}>
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: 16, color: "var(--text-muted)", textDecoration: "line-through" }}>
                    {formatVND(product.originalPrice)}
                  </span>
                  <span
                    style={{
                      background: "#fee2e2",
                      color: "#ef4444",
                      borderRadius: 4,
                      padding: "1px 6px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    -{discountPct}%
                  </span>
                </>
              )}
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {product.featured && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#b45309", background: "#fef3c7", borderRadius: 4, padding: "2px 8px" }}>
                  <Star size={10} /> Nổi bật
                </span>
              )}
              {product.badge && (
                <span className={`badge ${product.badge === "sale" ? "badge-danger" : product.badge === "new" ? "badge-info" : "badge-warning"}`}>
                  <Tag size={9} style={{ marginRight: 3 }} />
                  {product.badge === "sale" ? "Sale" : product.badge === "new" ? "Mới" : "Hot"}
                </span>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "Tồn kho", value: product.stock, color: product.stock === 0 ? "#ef4444" : product.stock < 20 ? "#f59e0b" : "#059669" },
              { label: "Đã bán", value: product.sold.toLocaleString("vi-VN"), color: "#2563eb" },
              { label: "Doanh thu ước tính", value: formatVND(product.sold * product.price), color: "#059669" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Variants */}
          {(product.colors.length > 0 || product.sizes.length > 0) && (
            <div className="card" style={{ padding: "16px 20px" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 12 }}>Biến thể</div>
              {product.colors.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Màu sắc</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {product.colors.map((c) => (
                      <span key={c} style={{ background: "#f1f5f9", borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.sizes.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Kích cỡ</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {product.sizes.map((s) => (
                      <span key={s} style={{ border: "1px solid var(--border-color)", borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "var(--text-secondary)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="card" style={{ padding: "16px 20px" }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 10 }}>Mô tả</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{product.description}</p>
          </div>

          {/* Details & Care */}
          {(product.details.length > 0 || product.care.length > 0) && (
            <div className="card" style={{ padding: "16px 20px" }}>
              {product.details.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 8 }}>Chi tiết sản phẩm</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {product.details.map((d, i) => (
                      <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", gap: 6 }}>
                        <span style={{ color: "var(--color-primary)", fontWeight: 700, flexShrink: 0 }}>•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.care.length > 0 && (
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 8 }}>Hướng dẫn bảo quản</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {product.care.map((c, i) => (
                      <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", gap: 6 }}>
                        <span style={{ color: "var(--color-primary)", fontWeight: 700, flexShrink: 0 }}>•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Meta */}
          <div className="card" style={{ padding: "14px 20px" }}>
            <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--text-muted)" }}>
              <span>ID: <strong style={{ color: "var(--text-secondary)" }}>{product.id}</strong></span>
              <span>Tạo: <strong style={{ color: "var(--text-secondary)" }}>{new Date(product.createdAt).toLocaleDateString("vi-VN")}</strong></span>
              <span>Cập nhật: <strong style={{ color: "var(--text-secondary)" }}>{new Date(product.updatedAt).toLocaleDateString("vi-VN")}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

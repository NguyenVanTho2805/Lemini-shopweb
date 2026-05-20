"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";
import type { AdminProduct } from "@/types/product";
import { slugify } from "@/types/product";

const CATEGORIES = [
  { value: "tui-theu", label: "Túi thêu" },
  { value: "tranh-theu", label: "Tranh thêu" },
  { value: "bo-kit-diy", label: "Bộ kit DIY" },
  { value: "phu-kien", label: "Phụ kiện" },
];

const COLOR_SUGGESTIONS = [
  "đỏ", "hồng", "trắng", "đen", "xanh lá", "xanh dương", "xanh nhạt",
  "vàng", "cam", "tím", "be", "kem", "nâu", "navy", "bạc", "vàng champagne",
  "đỏ đô", "hồng pastel", "xanh mint", "tuỳ chọn",
];

const SIZE_SUGGESTIONS = [
  "S", "M", "L", "XL", "XXL",
  "20×20cm", "25×25cm", "30×40cm", "40×60cm",
  "45×45cm", "60×60cm", "One size",
];

type FormErrors = Partial<Record<keyof AdminProduct | "submit", string>>;

interface ProductFormProps {
  initialData?: AdminProduct;
  onSubmit: (product: AdminProduct) => Promise<void>;
  mode: "add" | "edit";
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function ProductForm({ initialData, onSubmit, mode }: ProductFormProps) {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [price, setPrice] = useState(initialData ? String(initialData.price) : "");
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.originalPrice ? String(initialData.originalPrice) : ""
  );
  const [stock, setStock] = useState(initialData ? String(initialData.stock) : "");
  const [status, setStatus] = useState<AdminProduct["status"]>(
    initialData?.status ?? "draft"
  );
  const [badge, setBadge] = useState<AdminProduct["badge"] | "">(
    initialData?.badge ?? ""
  );
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [colors, setColors] = useState<string[]>(initialData?.colors ?? []);
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes ?? []);
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription ?? "");
  const [details, setDetails] = useState<string[]>(initialData?.details ?? [""]);
  const [care, setCare] = useState<string[]>(initialData?.care ?? [""]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugEdited && name) {
      setSlug(slugify(name));
    }
  }, [name, slugEdited]);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Tên sản phẩm không được để trống";
    else if (name.trim().length < 3) errs.name = "Tên sản phẩm tối thiểu 3 ký tự";
    if (!category) errs.category = "Vui lòng chọn danh mục";
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      errs.price = "Giá bán phải lớn hơn 0";
    if (originalPrice && (isNaN(Number(originalPrice)) || Number(originalPrice) <= 0))
      errs.originalPrice = "Giá gốc không hợp lệ";
    if (stock === "" || isNaN(Number(stock)) || Number(stock) < 0)
      errs.stock = "Tồn kho không hợp lệ";
    if (!description.trim()) errs.description = "Mô tả không được để trống";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanDetails = details.filter((d) => d.trim());
    const cleanCare = care.filter((c) => c.trim());
    const priceNum = Number(price);
    const stockNum = Number(stock);
    const origPriceNum = originalPrice ? Number(originalPrice) : undefined;
    const mainImage = images[0] ?? "https://picsum.photos/600/800?random=99";

    const product: AdminProduct = {
      id: initialData?.id ?? generateId(),
      name: name.trim(),
      slug: slug || slugify(name),
      description: description.trim(),
      category,
      price: priceNum,
      ...(origPriceNum ? { originalPrice: origPriceNum } : {}),
      image: mainImage,
      images: images.length > 0 ? images : [mainImage],
      ...(badge ? { badge: badge as AdminProduct["badge"] } : {}),
      colors,
      sizes,
      stock: stockNum,
      sold: initialData?.sold ?? 0,
      status:
        stockNum === 0 && status === "active" ? "out_of_stock" : status,
      featured,
      details: cleanDetails,
      care: cleanCare,
      metaDescription: metaDescription.trim(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    setErrors({});
    try {
      await onSubmit(product);
      router.push("/san-pham");
    } catch (e) {
      setErrors({
        submit: e instanceof Error ? e.message : "Đã có lỗi xảy ra, vui lòng thử lại",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addBullet = (arr: string[], setArr: (a: string[]) => void) =>
    setArr([...arr, ""]);
  const updateBullet = (arr: string[], setArr: (a: string[]) => void, idx: number, val: string) => {
    const next = [...arr];
    next[idx] = val;
    setArr(next);
  };
  const removeBullet = (arr: string[], setArr: (a: string[]) => void, idx: number) =>
    setArr(arr.filter((_, i) => i !== idx));

  const sectionStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid var(--border-color)",
    boxShadow: "var(--shadow)",
    padding: "20px 24px",
    marginBottom: 16,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary)",
    display: "block",
    marginBottom: 6,
  };
  const errorStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 4,
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
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
          Quay lại danh sách
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={() => router.push("/san-pham")} className="btn btn-outline">
            Hủy
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? (
              <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <Save size={14} />
            )}
            {mode === "add" ? "Đăng sản phẩm" : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      {errors.submit && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: "#dc2626",
          }}
        >
          {errors.submit}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, alignItems: "start" }}>
        {/* ── LEFT COLUMN ── */}
        <div>
          {/* Basic info */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>
              Thông tin cơ bản
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Tên sản phẩm *</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Túi thêu hoa cúc vàng"
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>URL Slug</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="input"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEdited(true);
                  }}
                  placeholder="tui-theu-hoa-cuc-vang"
                  style={{ fontFamily: "monospace", fontSize: 12 }}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ flexShrink: 0 }}
                  onClick={() => {
                    setSlug(slugify(name));
                    setSlugEdited(false);
                  }}
                >
                  Tự động
                </button>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                lemini.com/products/<strong>{slug || "..."}</strong>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Mô tả sản phẩm *</label>
              <textarea
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về sản phẩm, chất liệu, đặc điểm nổi bật..."
                rows={4}
                style={{ resize: "vertical" }}
              />
              {errors.description && <div style={errorStyle}>{errors.description}</div>}
            </div>
          </div>

          {/* Pricing */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>
              Giá & Tồn kho
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Giá bán (₫) *</label>
                <input
                  className="input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="320000"
                  min={0}
                />
                {errors.price && <div style={errorStyle}>{errors.price}</div>}
              </div>
              <div>
                <label style={labelStyle}>Giá gốc (₫)</label>
                <input
                  className="input"
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="380000"
                  min={0}
                />
                {errors.originalPrice && <div style={errorStyle}>{errors.originalPrice}</div>}
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                  Để hiện giá gạch đỏ (sale)
                </div>
              </div>
              <div>
                <label style={labelStyle}>Tồn kho *</label>
                <input
                  className="input"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="100"
                  min={0}
                />
                {errors.stock && <div style={errorStyle}>{errors.stock}</div>}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 4 }}>
              Biến thể sản phẩm
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
              Màu sắc và kích cỡ khách hàng có thể chọn
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Màu sắc</label>
                <TagInput
                  tags={colors}
                  onChange={setColors}
                  placeholder="VD: đỏ, hồng, trắng..."
                  suggestions={COLOR_SUGGESTIONS}
                />
              </div>
              <div>
                <label style={labelStyle}>Kích cỡ</label>
                <TagInput
                  tags={sizes}
                  onChange={setSizes}
                  placeholder="VD: S, M, L hoặc 30×40cm..."
                  suggestions={SIZE_SUGGESTIONS}
                />
              </div>
            </div>
          </div>

          {/* Details & Care */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>
              Chi tiết & Hướng dẫn bảo quản
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Thông tin chi tiết</label>
              {details.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <input
                    className="input"
                    value={d}
                    onChange={(e) => updateBullet(details, setDetails, i, e.target.value)}
                    placeholder={`Chi tiết ${i + 1}...`}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(details, setDetails, i)}
                    style={{
                      padding: "6px 8px", borderRadius: 6, border: "1px solid #fee2e2",
                      background: "transparent", color: "#ef4444", cursor: "pointer",
                      display: "flex", alignItems: "center", fontFamily: "inherit",
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addBullet(details, setDetails)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                  color: "var(--color-primary)", fontWeight: 600, background: "none",
                  border: "none", cursor: "pointer", padding: "4px 0", fontFamily: "inherit",
                }}
              >
                <Plus size={13} /> Thêm chi tiết
              </button>
            </div>

            <div>
              <label style={labelStyle}>Hướng dẫn bảo quản</label>
              {care.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <input
                    className="input"
                    value={c}
                    onChange={(e) => updateBullet(care, setCare, i, e.target.value)}
                    placeholder={`Hướng dẫn ${i + 1}...`}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(care, setCare, i)}
                    style={{
                      padding: "6px 8px", borderRadius: 6, border: "1px solid #fee2e2",
                      background: "transparent", color: "#ef4444", cursor: "pointer",
                      display: "flex", alignItems: "center", fontFamily: "inherit",
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addBullet(care, setCare)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                  color: "var(--color-primary)", fontWeight: 600, background: "none",
                  border: "none", cursor: "pointer", padding: "4px 0", fontFamily: "inherit",
                }}
              >
                <Plus size={13} /> Thêm hướng dẫn
              </button>
            </div>
          </div>

          {/* SEO */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 16 }}>
              SEO & Mô tả meta
            </div>
            <div>
              <label style={labelStyle}>Meta description</label>
              <textarea
                className="input"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Mô tả ngắn hiển thị trên Google (tối đa 160 ký tự)..."
                rows={2}
                maxLength={160}
                style={{ resize: "vertical" }}
              />
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>
                {metaDescription.length}/160
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>
          {/* Status */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 14 }}>
              Trạng thái
            </div>
            {(["active", "draft"] as const).map((s) => (
              <label
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 7,
                  border: `1px solid ${status === s ? "var(--color-primary)" : "var(--border-color)"}`,
                  background: status === s ? "var(--color-primary-light)" : "transparent",
                  cursor: "pointer",
                  marginBottom: 8,
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => setStatus(s)}
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    {s === "active" ? "Đang bán" : "Nháp"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {s === "active" ? "Hiển thị trên cửa hàng" : "Ẩn, chưa đăng bán"}
                  </div>
                </div>
              </label>
            ))}

            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ accentColor: "var(--color-primary)", width: 14, height: 14 }}
              />
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Hiển thị trang chủ
              </span>
            </label>
          </div>

          {/* Badge */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 14 }}>
              Nhãn sản phẩm
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(["", "new", "sale", "hot"] as const).map((b) => (
                <label
                  key={b ?? "none"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                  }}
                >
                  <input
                    type="radio"
                    name="badge"
                    value={b}
                    checked={badge === b}
                    onChange={() => setBadge(b)}
                    style={{ accentColor: "var(--color-primary)" }}
                  />
                  {b === "" ? (
                    <span>Không có nhãn</span>
                  ) : (
                    <span
                      className={`badge ${b === "sale" ? "badge-danger" : b === "new" ? "badge-info" : "badge-warning"}`}
                    >
                      {b === "sale" ? "Sale" : b === "new" ? "Mới" : "Hot"}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 14 }}>
              Danh mục *
            </div>
            {CATEGORIES.map((cat) => (
              <label
                key={cat.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  marginBottom: 4,
                  background: category === cat.value ? "var(--color-primary-light)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={category === cat.value}
                  onChange={() => setCategory(cat.value)}
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span style={{ fontSize: 13, color: category === cat.value ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: category === cat.value ? 600 : 400 }}>
                  {cat.label}
                </span>
              </label>
            ))}
            {errors.category && <div style={errorStyle}>{errors.category}</div>}
          </div>

          {/* Images */}
          <div style={sectionStyle}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 14 }}>
              Ảnh sản phẩm
            </div>
            <ImageUpload images={images} onChange={setImages} max={5} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Package,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  Download,
  Star,
} from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { formatVND } from "@/lib/data";
import type { AdminProduct } from "@/types/product";
import { useToast } from "@/contexts/ToastContext";
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

export default function ProductsPage() {
  const { products, loading, error, deleteProduct, bulkDelete, updateProduct } =
    useProducts();
  const { toast } = useToast();
  const { confirm } = useConfirm();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.includes(q) ||
          p.id.includes(q)
      );
    }
    if (categoryFilter !== "all")
      list = list.filter((p) => p.category === categoryFilter);
    if (statusFilter !== "all")
      list = list.filter((p) => p.status === statusFilter);

    switch (sortBy) {
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "stock_asc":
        list.sort((a, b) => a.stock - b.stock);
        break;
      case "sold_desc":
        list.sort((a, b) => b.sold - a.sold);
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }
    return list;
  }, [products, search, categoryFilter, statusFilter, sortBy]);

  const allSelected =
    filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));
  const someSelected = selectedIds.size > 0;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({ title: "Xóa sản phẩm", message: "Sản phẩm sẽ bị xóa vĩnh viễn. Hành động không thể hoàn tác.", confirmLabel: "Xóa", danger: true });
    if (!ok) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast("Đã xóa sản phẩm thành công");
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    const ok = await confirm({ title: "Xóa nhiều sản phẩm", message: `Xóa ${selectedIds.size} sản phẩm đã chọn? Hành động không thể hoàn tác.`, confirmLabel: "Xóa tất cả", danger: true });
    if (!ok) return;
    setBulkDeleting(true);
    try {
      await bulkDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
      toast(`Đã xóa ${selectedIds.size} sản phẩm`);
    } finally {
      setBulkDeleting(false);
    }
  };

  const toggleStatus = async (product: AdminProduct) => {
    const next: AdminProduct["status"] =
      product.status === "active"
        ? "draft"
        : product.stock === 0
        ? "out_of_stock"
        : "active";
    await updateProduct(product.id, { status: next });
    toast(next === "active" ? "Sản phẩm đã được đăng bán" : "Sản phẩm đã ẩn", "info");
  };

  const totals = {
    all: products.length,
    active: products.filter((p) => p.status === "active").length,
    draft: products.filter((p) => p.status === "draft").length,
    out_of_stock: products.filter((p) => p.status === "out_of_stock").length,
  };

  if (loading) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: 14,
        }}
      >
        Đang tải danh sách sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          color: "#ef4444",
          fontSize: 14,
        }}
      >
        Lỗi: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 28px 40px", maxWidth: 1300 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Quản Lý Sản Phẩm
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
            {products.length} sản phẩm trong hệ thống
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline">
            <Download size={14} />
            Xuất Excel
          </button>
          <Link href="/san-pham/them" className="btn btn-primary">
            <Plus size={14} />
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Tổng sản phẩm", value: totals.all, color: "#0f172a" },
          { label: "Đang bán", value: totals.active, color: "#059669" },
          { label: "Nháp", value: totals.draft, color: "#b45309" },
          { label: "Hết hàng", value: totals.out_of_stock, color: "#dc2626" },
        ].map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ padding: "14px 18px" }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: s.color,
                marginTop: 4,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main table card */}
      <div className="card" style={{ overflow: "hidden" }}>
        {/* Bulk action bar */}
        {someSelected && (
          <div
            style={{
              padding: "10px 20px",
              background: "#eff6ff",
              borderBottom: "1px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600 }}>
              Đã chọn {selectedIds.size} sản phẩm
            </span>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 12px",
                borderRadius: 6,
                border: "1px solid #fca5a5",
                background: "#fee2e2",
                color: "#dc2626",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Trash2 size={12} />
              {bulkDeleting ? "Đang xóa..." : `Xóa ${selectedIds.size} sản phẩm`}
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              style={{
                fontSize: 12,
                color: "#64748b",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Bỏ chọn
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            gap: 10,
            borderBottom: "1px solid var(--border-color)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              className="input"
              style={{ paddingLeft: 32 }}
              placeholder="Tìm theo tên, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ position: "relative" }}>
            <select
              className="input"
              style={{ width: "auto", paddingRight: 28, appearance: "none" }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {Object.entries(CATEGORIES).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <select
              className="input"
              style={{ width: "auto", paddingRight: 28, appearance: "none" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái ({totals.all})</option>
              <option value="active">Đang bán ({totals.active})</option>
              <option value="draft">Nháp ({totals.draft})</option>
              <option value="out_of_stock">Hết hàng ({totals.out_of_stock})</option>
            </select>
            <ChevronDown
              size={13}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <select
              className="input"
              style={{ width: "auto", paddingRight: 28, appearance: "none" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="name_asc">Tên A–Z</option>
              <option value="price_asc">Giá thấp–cao</option>
              <option value="price_desc">Giá cao–thấp</option>
              <option value="stock_asc">Tồn kho thấp nhất</option>
              <option value="sold_desc">Bán chạy nhất</option>
            </select>
            <ChevronDown
              size={13}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} / {products.length} sản phẩm
          </div>
        </div>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 44 }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Biến thể</th>
              <th style={{ textAlign: "right" }}>Giá bán</th>
              <th style={{ textAlign: "center" }}>Kho</th>
              <th style={{ textAlign: "center" }}>Đã bán</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: "center" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
                  <Package size={32} style={{ marginBottom: 8, opacity: 0.3 }} />
                  <br />
                  Không tìm thấy sản phẩm nào
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    background: selectedIds.has(p.id) ? "#f0f9ff" : undefined,
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleOne(p.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {/* Product image */}
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 8,
                          overflow: "hidden",
                          flexShrink: 0,
                          border: "1px solid var(--border-color)",
                          background: "#f1f5f9",
                        }}
                      >
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Package size={18} color="#94a3b8" />
                          </div>
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            fontSize: 13,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 200,
                          }}
                        >
                          {p.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-muted)",
                            fontFamily: "monospace",
                          }}
                        >
                          /{p.slug}
                        </div>
                        {p.featured && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "#b45309",
                              background: "#fef3c7",
                              borderRadius: 3,
                              padding: "1px 5px",
                            }}
                          >
                            ⭐ Nổi bật
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#f1f5f9",
                        color: "var(--text-secondary)",
                        borderRadius: 5,
                        padding: "3px 8px",
                        fontSize: 11,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {CATEGORIES[p.category] ?? p.category}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {p.colors.length > 0 && `${p.colors.length} màu`}
                    {p.colors.length > 0 && p.sizes.length > 0 && " · "}
                    {p.sizes.length > 0 && `${p.sizes.length} cỡ`}
                    {p.colors.length === 0 && p.sizes.length === 0 && "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatVND(p.price)}
                    </div>
                    {p.originalPrice && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatVND(p.originalPrice)}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color:
                          p.stock === 0
                            ? "#ef4444"
                            : p.stock < 20
                            ? "#f59e0b"
                            : "#059669",
                      }}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: "var(--text-secondary)",
                      fontSize: 13,
                    }}
                  >
                    {p.sold.toLocaleString("vi-VN")}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className={`badge ${STATUS_BADGE[p.status]}`}>
                        {STATUS_LABELS[p.status]}
                      </span>
                      <button
                        title={p.status === "active" ? "Ẩn sản phẩm" : "Đăng bán"}
                        onClick={() => toggleStatus(p)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color:
                            p.status === "active"
                              ? "var(--color-primary)"
                              : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {p.status === "active" ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        justifyContent: "center",
                      }}
                    >
                      <button
                        title={p.featured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
                        onClick={() => updateProduct(p.id, { featured: !p.featured })}
                        style={{
                          width: 30, height: 30, borderRadius: 6,
                          border: p.featured ? "1px solid #fbbf24" : "1px solid var(--border-color)",
                          background: p.featured ? "#fffbeb" : "transparent",
                          color: p.featured ? "#d97706" : "var(--text-muted)",
                          cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "inherit",
                        }}
                      >
                        <Star size={13} fill={p.featured ? "#d97706" : "none"} />
                      </button>
                      <Link
                        href={`/san-pham/${p.id}`}
                        title="Xem chi tiết"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          background: "transparent",
                        }}
                      >
                        <Eye size={13} />
                      </Link>
                      <Link
                        href={`/san-pham/${p.id}/sua`}
                        title="Chỉnh sửa"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          background: "transparent",
                        }}
                      >
                        <Edit size={13} />
                      </Link>
                      <button
                        title="Xóa"
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: "1px solid #fee2e2",
                          background: "transparent",
                          color: deletingId === p.id ? "#fca5a5" : "#ef4444",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "inherit",
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Hiển thị {filtered.length} / {products.length} sản phẩm
          </div>
          {someSelected && (
            <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>
              Đã chọn {selectedIds.size} sản phẩm
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

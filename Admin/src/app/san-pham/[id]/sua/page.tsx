"use client";

import { use } from "react";
import { useProducts } from "@/contexts/ProductContext";
import ProductForm from "@/components/products/ProductForm";
import type { AdminProduct } from "@/types/product";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getProduct, updateProduct, loading } = useProducts();
  const product = getProduct(id);

  const handleSubmit = async (updated: AdminProduct) => {
    await updateProduct(id, updated);
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
        Đang tải...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          color: "#ef4444",
          fontSize: 14,
        }}
      >
        Không tìm thấy sản phẩm (ID: {id})
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 28px 60px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Chỉnh Sửa Sản Phẩm
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
          {product.name}
        </p>
      </div>
      <ProductForm mode="edit" initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}

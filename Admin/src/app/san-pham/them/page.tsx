"use client";

import { useProducts } from "@/contexts/ProductContext";
import ProductForm from "@/components/products/ProductForm";
import type { AdminProduct } from "@/types/product";

export default function AddProductPage() {
  const { addProduct } = useProducts();

  const handleSubmit = async (product: AdminProduct) => {
    await addProduct(product);
  };

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
          Thêm Sản Phẩm Mới
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
          Điền đầy đủ thông tin để đăng bán sản phẩm lên cửa hàng
        </p>
      </div>
      <ProductForm mode="add" onSubmit={handleSubmit} />
    </div>
  );
}

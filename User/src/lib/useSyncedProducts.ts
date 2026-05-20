"use client";

import { useState, useEffect } from "react";
import { mockProducts, type Product } from "./data";

const ADMIN_BASE = process.env.NEXT_PUBLIC_ADMIN_API ?? "http://localhost:3001";
const ADMIN_API = `${ADMIN_BASE}/api/products`;

function toUserProduct(p: Record<string, unknown>): Product {
  return {
    id: String(p.id),
    name: String(p.name),
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    image: String(p.image ?? (Array.isArray(p.images) ? p.images[0] : "")),
    images: Array.isArray(p.images) ? (p.images as string[]) : undefined,
    badge: (p.badge as Product["badge"]) ?? undefined,
    colors: Array.isArray(p.colors) ? (p.colors as string[]) : undefined,
    sizes: Array.isArray(p.sizes) ? (p.sizes as string[]) : undefined,
    slug: String(p.slug),
    category: String(p.category),
    description: p.description ? String(p.description) : undefined,
    details: Array.isArray(p.details) ? (p.details as string[]) : undefined,
    care: Array.isArray(p.care) ? (p.care as string[]) : undefined,
    featured: p.featured === true,
  };
}

export function useSyncedProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ADMIN_API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Admin API unavailable");
        return res.json();
      })
      .then((data: unknown[]) => {
        const active = data
          .filter(
            (p) =>
              typeof p === "object" &&
              p !== null &&
              (p as Record<string, unknown>).status === "active"
          )
          .map((p) => toUserProduct(p as Record<string, unknown>));
        if (active.length > 0) {
          setProducts(active);
          setSynced(true);
        }
      })
      .catch(() => {
        /* Silently fall back to static data */
      });
    return () => controller.abort();
  }, []);

  return { products, synced };
}

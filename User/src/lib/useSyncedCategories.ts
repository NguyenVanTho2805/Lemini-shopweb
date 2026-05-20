"use client";

import { useState, useEffect } from "react";
import { mockCategories, type Category } from "./data";

const ADMIN_BASE = process.env.NEXT_PUBLIC_ADMIN_API ?? "http://localhost:3001";
const ADMIN_API = `${ADMIN_BASE}/api/categories`;

export function useSyncedCategories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ADMIN_API, { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data: { id: string; name: string; slug: string; icon: string; image?: string; description: string }[]) => {
        const mapped: Category[] = data.map(c => {
          const existing = mockCategories.find(m => m.slug === c.slug);
          return {
            id: c.id,
            name: c.name,
            slug: c.slug,
            image: c.image || existing?.image || `https://picsum.photos/600/800?random=${c.id}`,
            description: c.description,
          };
        });
        if (mapped.length > 0) setCategories(mapped);
      })
      .catch(() => { /* fallback to mockCategories */ });
    return () => controller.abort();
  }, []);

  return categories;
}

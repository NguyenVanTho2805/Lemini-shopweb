import { useEffect, useState } from 'react';
import { Product } from '@/lib/data';

const STORAGE_KEY = 'lemini_recently_viewed';
const MAX_ITEMS = 6;

export function addToRecentlyViewed(product: Product) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const existing: Product[] = saved ? JSON.parse(saved) : [];
    const filtered = existing.filter(p => p.id !== product.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([product, ...filtered].slice(0, MAX_ITEMS)));
  } catch {}
}

export function useRecentlyViewed(excludeId?: string): Product[] {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: Product[] = saved ? JSON.parse(saved) : [];
      setItems(excludeId ? parsed.filter(p => p.id !== excludeId) : parsed);
    } catch {}
  }, [excludeId]);

  return items;
}

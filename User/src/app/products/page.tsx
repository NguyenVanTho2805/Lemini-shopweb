'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { useSyncedProducts } from '@/lib/useSyncedProducts';
import { useSyncedCategories } from '@/lib/useSyncedCategories';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { SlidersHorizontal, ChevronDown, X as XIcon, Search } from 'lucide-react';

const PRICE_RANGES = [
  { label: 'Tất cả', min: 0, max: Infinity },
  { label: 'Dưới 100k', min: 0, max: 100000 },
  { label: '100k – 200k', min: 100000, max: 200000 },
  { label: '200k – 400k', min: 200000, max: 400000 },
  { label: 'Trên 400k', min: 400000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'default',    label: 'Mặc định' },
  { value: 'price-asc',  label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'newest',     label: 'Mới nhất' },
];

const BADGE_OPTIONS = [
  { value: 'all',  label: 'Tất cả' },
  { value: 'new',  label: 'Hàng mới' },
  { value: 'sale', label: 'Đang sale' },
  { value: 'hot',  label: 'Bán chạy' },
];

function ProductsPageInner() {
  const { products: allProducts, synced } = useSyncedProducts();
  const categories = useSyncedCategories();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [activeCategory, setActiveCategory]   = useState('all');
  const [activePriceIdx, setActivePriceIdx]   = useState(0);
  const [activeBadge, setActiveBadge]         = useState('all');
  const [sortBy, setSortBy]                   = useState('default');
  const [showPriceMenu, setShowPriceMenu]     = useState(false);
  const [showSortMenu, setShowSortMenu]       = useState(false);
  const [visibleCount, setVisibleCount]       = useState(12);
  const [searchQuery, setSearchQuery]         = useState(initialQuery);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    const range = PRICE_RANGES[activePriceIdx];
    list = list.filter(p => p.price >= range.min && p.price <= range.max);
    if (activeBadge !== 'all') list = list.filter(p => p.badge === activeBadge);
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest')     list = list.filter(p => p.badge === 'new').concat(list.filter(p => p.badge !== 'new'));
    return list;
  }, [activeCategory, activePriceIdx, activeBadge, sortBy, searchQuery, allProducts]);

  useEffect(() => { setVisibleCount(12); }, [activeCategory, activePriceIdx, activeBadge, sortBy, searchQuery]);

  const hasFilter = activeCategory !== 'all' || activePriceIdx !== 0 || activeBadge !== 'all';

  const clearAll = () => {
    setActiveCategory('all');
    setActivePriceIdx(0);
    setActiveBadge('all');
    setVisibleCount(12);
  };

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: '#fff' }}>

        {/* ── Page header ── */}
        <div style={{
          borderBottom: '1px solid #f0f0f0',
          padding: '28px 24px 22px',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <p style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>
              Trang chủ &rsaquo; <span style={{ color: '#555' }}>Sản phẩm</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
                {searchQuery.trim() ? `Kết quả cho "${searchQuery}"` : 'Tất Cả Sản Phẩm'}
              </h1>
              <span style={{ fontSize: 13, color: '#aaa' }}>
                {filtered.length} sản phẩm
              </span>
              {searchQuery.trim() && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '3px 10px',
                    background: '#f0ebff', border: '1px solid #C4A8E8',
                    borderRadius: 999, fontSize: 12, fontWeight: 600,
                    color: '#9B72CF', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <XIcon size={11} /> Xóa tìm kiếm
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div style={{
          borderBottom: '1px solid #f0f0f0',
          background: '#fafafa',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            overflowX: 'auto',
          }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
              {([{ id: 'all', name: 'Tất cả', slug: 'all' }] as { id: string; name: string; slug: string }[]).concat(categories).map(cat => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    style={{
                      padding: '14px 16px',
                      border: 'none',
                      borderBottom: `2px solid ${isActive ? '#2E1A4A' : 'transparent'}`,
                      background: 'transparent',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? '#2E1A4A' : '#666',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: '#e8e8e8', margin: '0 12px', flexShrink: 0 }} />

            {/* Badge chips */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {BADGE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setActiveBadge(opt.value)}
                  style={{
                    padding: '5px 14px',
                    border: `1.5px solid ${activeBadge === opt.value ? '#2E1A4A' : '#e8e8e8'}`,
                    borderRadius: 999,
                    background: activeBadge === opt.value ? '#2E1A4A' : '#fff',
                    color: activeBadge === opt.value ? '#fff' : '#555',
                    fontSize: 12,
                    fontWeight: activeBadge === opt.value ? 700 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Price dropdown */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => { setShowPriceMenu(v => !v); setShowSortMenu(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px',
                  border: `1.5px solid ${activePriceIdx !== 0 ? '#2E1A4A' : '#e8e8e8'}`,
                  borderRadius: 8,
                  background: '#fff',
                  fontSize: 12,
                  fontWeight: 500,
                  color: activePriceIdx !== 0 ? '#2E1A4A' : '#555',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                <SlidersHorizontal size={13} />
                {PRICE_RANGES[activePriceIdx].label}
                <ChevronDown size={12} style={{ transform: showPriceMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {showPriceMenu && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                  background: '#fff', border: '1px solid #e8e8e8',
                  borderRadius: 10, padding: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  zIndex: 100, minWidth: 180,
                }}>
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActivePriceIdx(idx); setShowPriceMenu(false); }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 14px', border: 'none',
                        background: activePriceIdx === idx ? '#f5f0ff' : 'transparent',
                        color: activePriceIdx === idx ? '#2E1A4A' : '#555',
                        fontWeight: activePriceIdx === idx ? 700 : 400,
                        fontSize: 13, cursor: 'pointer', borderRadius: 7,
                        fontFamily: 'inherit',
                      }}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: 8, flexShrink: 0 }} />

            {/* Sort dropdown */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => { setShowSortMenu(v => !v); setShowPriceMenu(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px',
                  border: '1.5px solid #e8e8e8',
                  borderRadius: 8,
                  background: '#fff',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#555',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown size={12} style={{ transform: showSortMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {showSortMenu && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                  background: '#fff', border: '1px solid #e8e8e8',
                  borderRadius: 10, padding: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  zIndex: 100, minWidth: 170,
                }}>
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 14px', border: 'none',
                        background: sortBy === opt.value ? '#f5f0ff' : 'transparent',
                        color: sortBy === opt.value ? '#2E1A4A' : '#555',
                        fontWeight: sortBy === opt.value ? 700 : 400,
                        fontSize: 13, cursor: 'pointer', borderRadius: 7,
                        fontFamily: 'inherit',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear filters */}
            {hasFilter && (
              <>
                <div style={{ width: 8, flexShrink: 0 }} />
                <button
                  onClick={clearAll}
                  style={{
                    padding: '7px 12px',
                    border: 'none', background: 'transparent',
                    fontSize: 12, color: '#e53935',
                    cursor: 'pointer', fontFamily: 'inherit',
                    whiteSpace: 'nowrap', textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}
                >
                  Xóa lọc
                </button>
              </>
            )}
          </div>
        </div>

        {/* Close dropdowns on outside click */}
        {(showPriceMenu || showSortMenu) && (
          <div
            onClick={() => { setShowPriceMenu(false); setShowSortMenu(false); }}
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          />
        )}

        {/* ── Product grid ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
          {!synced && allProducts.length === 0 ? (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <>
              <div className="product-grid">
                {visibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: 48 }}>
                  <button
                    onClick={() => setVisibleCount(v => v + 8)}
                    style={{
                      padding: '13px 40px',
                      border: '1.5px solid #2E1A4A',
                      borderRadius: 999,
                      background: 'transparent',
                      fontSize: 14, fontWeight: 700,
                      color: '#2E1A4A', cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#2E1A4A';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#2E1A4A';
                    }}
                  >
                    Xem thêm ({filtered.length - visibleCount} sản phẩm)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
              <p style={{ fontSize: 40 }}>🧵</p>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Không tìm thấy sản phẩm</p>
              <p style={{ fontSize: 14, color: '#aaa' }}>Thử thay đổi bộ lọc để xem thêm sản phẩm</p>
              <button onClick={clearAll} style={{
                marginTop: 8, padding: '10px 28px',
                border: '1.5px solid #2E1A4A', borderRadius: 999,
                background: 'transparent', fontSize: 14, fontWeight: 600,
                color: '#2E1A4A', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style jsx global>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}

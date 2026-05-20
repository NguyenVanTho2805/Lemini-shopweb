'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingCart, Heart, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useQuickView } from '@/contexts/QuickViewContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const { addToCart, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setAdded(false);
      setActiveImg(0);
      setSelectedColor(product.colors?.[0] ?? null);
      setSelectedSize(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeQuickView(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeQuickView]);

  if (!mounted || !product) return null;

  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.inStock === false;
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const images = product.images ?? [product.image];

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, { color: selectedColor ?? undefined, size: selectedSize ?? undefined });
    setAdded(true);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success', { label: 'Xem giỏ', onClick: openCart });
    setTimeout(() => setAdded(false), 1800);
  };

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      {/* Backdrop */}
      <div onClick={closeQuickView} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(3px)',
        animation: 'fadeIn 0.2s ease',
      }} />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 16,
        width: '100%',
        maxWidth: 800,
        maxHeight: '88vh',
        overflow: 'hidden',
        display: 'flex',
        animation: 'qvScaleIn 0.24s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.25)',
      }}>
        {/* Close */}
        <button onClick={closeQuickView} style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)', border: '1px solid #e8e8e8',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#555', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <X size={15} />
        </button>

        {/* Gallery */}
        <div style={{ width: '44%', flexShrink: 0, background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img src={images[activeImg]} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {outOfStock && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,255,255,0.65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ background: '#555', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 18px', borderRadius: 999 }}>Hết hàng</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 6, padding: '10px 12px', background: '#f5f5f5', flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{
                  width: 52, height: 52, padding: 0, flexShrink: 0,
                  border: `2px solid ${activeImg === i ? '#2E1A4A' : 'transparent'}`,
                  borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                  background: '#eee',
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, padding: '28px 26px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 8 }}>
              {product.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <span style={{ fontSize: 12, color: '#888' }}>5.0 · 5 đánh giá</span>
            </div>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: product.originalPrice ? '#e53935' : '#1a1a1a', letterSpacing: '-0.5px' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: 13, color: '#bbb', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span style={{ background: '#e53935', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>
                  -{discountPct}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
              {product.description.length > 160 ? product.description.slice(0, 157) + '…' : product.description}
            </p>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500 }}>
                Màu sắc{selectedColor && <span style={{ color: '#2E1A4A', marginLeft: 6 }}>· {selectedColor}</span>}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.colors.map(c => (
                  <button
                    key={c}
                    title={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: 28, height: 28, borderRadius: '50%', background: c,
                      border: selectedColor === c ? '3px solid #2E1A4A' : '2px solid rgba(0,0,0,0.1)',
                      boxShadow: selectedColor === c ? '0 0 0 2px #fff, 0 0 0 4px #2E1A4A' : '0 1px 4px rgba(0,0,0,0.12)',
                      cursor: 'pointer', flexShrink: 0,
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500 }}>Kích thước</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(prev => prev === s ? null : s)}
                    style={{
                      padding: '5px 14px',
                      border: selectedSize === s ? '1.5px solid #2E1A4A' : '1px solid #e0e0e0',
                      borderRadius: 6, fontSize: 12,
                      color: selectedSize === s ? '#2E1A4A' : '#555',
                      background: selectedSize === s ? '#f5f0ff' : 'transparent',
                      fontWeight: selectedSize === s ? 700 : 400,
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Low stock */}
          {typeof product.stock === 'number' && product.stock <= 5 && !outOfStock && (
            <p style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>
              ⚡ Chỉ còn {product.stock} sản phẩm!
            </p>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={handleAdd} disabled={outOfStock} style={{
              flex: 1, height: 44,
              background: outOfStock ? '#f5f5f5' : added ? '#2d7a4a' : '#2E1A4A',
              color: outOfStock ? '#aaa' : '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 700,
              cursor: outOfStock ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: 'inherit', transition: 'background 0.2s',
            }}>
              <ShoppingCart size={14} />
              {outOfStock ? 'Hết hàng' : added ? 'Đã thêm!' : 'Thêm vào giỏ'}
            </button>
            <button onClick={() => toggle(product)} style={{
              width: 44, height: 44,
              border: `1.5px solid ${wishlisted ? '#e53935' : '#e8e8e8'}`,
              borderRadius: 8,
              background: wishlisted ? '#fff5f5' : '#fff',
              color: wishlisted ? '#e53935' : '#888',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <Link href={`/products/${product.slug}`} onClick={closeQuickView} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 13, color: '#9B72CF', textDecoration: 'none', fontWeight: 500,
          }}>
            <ExternalLink size={13} />
            Xem đầy đủ thông tin sản phẩm
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes qvScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';
import { useQuickView } from '@/contexts/QuickViewContext';

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addToCart, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const { openQuickView } = useQuickView();
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.inStock === false;
  const lowStock = !outOfStock && typeof product.stock === 'number' && product.stock <= 5;

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const hoverImage = product.images && product.images.length > 1 ? product.images[1] : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product);
    setAdded(true);
    showToast(`Đã thêm vào giỏ hàng`, 'success', { label: 'Xem giỏ', onClick: openCart });
    setTimeout(() => setAdded(false), 1800);
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(i => {
      const filled = rating >= i;
      const partial = !filled && rating >= i - 0.5;
      return (
        <span key={i} style={{ position: 'relative', display: 'inline-block', width: 12, height: 12 }}>
          <Star size={12} style={{ color: '#e5e7eb', fill: '#e5e7eb', display: 'block' }} />
          {(filled || partial) && (
            <span style={{
              position: 'absolute', inset: 0,
              overflow: 'hidden',
              width: filled ? '100%' : '50%',
            }}>
              <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b', display: 'block' }} />
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="card">
      {/* Image area */}
      <div className="img-wrap">
        <Link href={`/products/${product.slug}`}>
          <img src={product.image} alt={product.name} className="img img-main" />
          {hoverImage && (
            <img src={hoverImage} alt={product.name} className="img img-hover" />
          )}
        </Link>

        {/* Out of stock overlay */}
        {outOfStock && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(1px)',
          }}>
            <span style={{
              background: '#555', color: '#fff',
              fontSize: 12, fontWeight: 700,
              padding: '6px 16px', borderRadius: 999,
              letterSpacing: '0.05em',
            }}>
              Hết hàng
            </span>
          </div>
        )}

        {/* Badges */}
        {!outOfStock && (
          <div className="badges">
            {product.badge === 'sale' && discountPct > 0 && (
              <span className="badge badge-sale">-{discountPct}%</span>
            )}
            {product.badge === 'new' && (
              <span className="badge badge-new">Mới</span>
            )}
            {product.badge === 'hot' && (
              <span className="badge badge-hot">Hot</span>
            )}
          </div>
        )}

        {/* Wishlist */}
        <button
          className={`btn-wish ${wishlisted ? 'wished' : ''}`}
          onClick={(e) => { e.preventDefault(); toggle(product); }}
          aria-label={wishlisted ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view */}
        <button
          className="btn-eye"
          onClick={(e) => { e.preventDefault(); openQuickView(product); }}
          aria-label="Xem nhanh"
        >
          <Eye size={14} />
        </button>

        {/* Quick add */}
        {!outOfStock && (
          <button className={`btn-add ${added ? 'done' : ''}`} onClick={handleAdd}>
            <ShoppingCart size={14} />
            <span>{added ? 'Đã thêm!' : 'Thêm vào giỏ'}</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="info">
        <Link href={`/products/${product.slug}`} className="name">
          {product.name}
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="rating-row">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-num">{product.rating.toFixed(1)}</span>
            {product.reviewCount && (
              <span className="review-count">({product.reviewCount})</span>
            )}
          </div>
        )}

        <div className="prices">
          <span className={`price ${product.originalPrice && !outOfStock ? 'sale' : ''} ${outOfStock ? 'oos' : ''}`}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && !outOfStock && (
            <span className="orig">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {lowStock && (
          <p className="low-stock">⚡ Chỉ còn {product.stock} sản phẩm!</p>
        )}
      </div>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
        }

        .img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 10px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .img-main {
          transition: opacity 0.45s ease, transform 0.45s ease;
          z-index: 1;
        }
        .img-hover {
          z-index: 0;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        .card:hover .img-main {
          opacity: 0;
        }
        .card:hover .img-hover {
          opacity: 1;
          transform: scale(1);
        }
        .card:hover .img-main {
          transform: scale(1.05);
        }

        /* Badges */
        .badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          pointer-events: none;
          z-index: 2;
        }
        .badge {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 7px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          line-height: 1.4;
        }
        .badge-sale { background: #e53935; color: #fff; }
        .badge-new  { background: #2E1A4A; color: #fff; }
        .badge-hot  { background: #ff6d00; color: #fff; }

        /* Quick view */
        .btn-eye {
          position: absolute;
          top: 46px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #aaa;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease, color 0.15s;
          z-index: 2;
        }
        .card:hover .btn-eye {
          opacity: 1;
          transform: translateY(0);
        }
        .btn-eye:hover {
          color: #2E1A4A;
          background: #fff;
        }

        /* Wishlist */
        .btn-wish {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #aaa;
          transition: color 0.2s, background 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .btn-wish:hover,
        .btn-wish.wished {
          color: #e53935;
          background: #fff;
        }

        /* Quick add */
        .btn-add {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #2E1A4A;
          color: #fff;
          border: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          font-family: var(--font-body);
          cursor: pointer;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.22s ease, transform 0.22s ease, background 0.15s;
          z-index: 2;
        }
        .card:hover .btn-add {
          opacity: 1;
          transform: translateY(0);
        }
        .btn-add.done {
          background: #2d7a4a;
        }

        /* Info */
        .info {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0 2px;
        }

        :global(.name) {
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-decoration: none;
        }
        :global(.name:hover) {
          color: #2E1A4A;
        }

        /* Rating */
        .rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .stars {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .rating-num {
          font-size: 11px;
          font-weight: 700;
          color: #f59e0b;
        }
        .review-count {
          font-size: 11px;
          color: #aaa;
        }

        .prices {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
        }
        .price {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .price.sale {
          color: #e53935;
        }
        .price.oos {
          color: #aaa;
        }
        .orig {
          font-size: 12px;
          color: #bbb;
          text-decoration: line-through;
        }
        .low-stock {
          font-size: 11px;
          color: #f59e0b;
          font-weight: 600;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

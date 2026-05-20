'use client';

import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    toggle(product);
    showToast(`Đã thêm vào giỏ hàng`, 'success', { label: 'Xem giỏ', onClick: openCart });
  };

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1 className="page-title">Sản phẩm yêu thích</h1>
        <p className="page-sub">{items.length} sản phẩm</p>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          <Heart size={56} strokeWidth={1} />
          <h2 className="empty-title">Danh sách trống</h2>
          <p className="empty-sub">Nhấn vào ❤️ trên sản phẩm để lưu vào đây.</p>
          <Link href="/products" className="browse-btn">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid">
          {items.map(product => (
            <div key={product.id} className="wish-card">
              <Link href={`/products/${product.slug}`} className="card-img-wrap">
                <img src={product.image} alt={product.name} className="card-img" />
                {product.badge && (
                  <span className={`card-badge card-badge--${product.badge}`}>
                    {product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'Mới' : 'Hot'}
                  </span>
                )}
              </Link>

              <div className="card-body">
                <Link href={`/products/${product.slug}`} className="card-name">
                  {product.name}
                </Link>
                <div className="price-row">
                  <span className="price">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="original">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag size={15} />
                    Thêm vào giỏ
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => toggle(product)}
                    aria-label="Xóa khỏi yêu thích"
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .wishlist-page { padding: 0; }

        .page-header {
          padding: 28px 32px 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .page-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 500;
          color: var(--color-primary);
        }

        .page-sub {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        /* Empty */
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 32px;
          text-align: center;
          gap: 14px;
          color: var(--color-text-muted);
        }

        .empty-title {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--color-primary);
          font-weight: 500;
        }

        .empty-sub {
          font-size: 14px;
          color: var(--color-text-muted);
        }

        :global(.browse-btn) {
          display: inline-flex;
          margin-top: 8px;
          padding: 12px 28px;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        :global(.browse-btn:hover) {
          background: var(--color-primary-light);
          transform: translateY(-1px);
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          padding: 28px 32px 40px;
        }

        .wish-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--color-bg);
          transition: var(--transition-fast);
        }

        .wish-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        :global(.card-img-wrap) {
          position: relative;
          display: block;
          aspect-ratio: 1;
          overflow: hidden;
          background: var(--color-bg-alt);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .wish-card:hover .card-img { transform: scale(1.04); }

        .card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          color: #fff;
        }

        .card-badge--sale { background: var(--color-sale); }
        .card-badge--new  { background: var(--color-new);  }
        .card-badge--hot  { background: var(--color-hot);  }

        .card-body {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        :global(.card-name) {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        :global(.card-name:hover) { color: var(--color-primary); }

        .price-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary);
        }

        .original {
          font-size: 12px;
          color: var(--color-text-muted);
          text-decoration: line-through;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }

        .add-btn {
          flex: 1;
          height: 38px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: var(--font-body);
          transition: var(--transition-fast);
        }

        .add-btn:hover { background: var(--color-primary-light); }

        .remove-btn {
          width: 38px;
          height: 38px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          transition: var(--transition-fast);
          flex-shrink: 0;
        }

        .remove-btn:hover {
          border-color: var(--color-sale);
          color: var(--color-sale);
          background: rgba(196, 75, 122, 0.06);
        }

        @media (max-width: 600px) {
          .page-header { padding: 20px 16px; }
          .grid { padding: 16px; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>
    </div>
  );
}

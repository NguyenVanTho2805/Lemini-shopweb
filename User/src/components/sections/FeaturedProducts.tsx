'use client';

import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { useSyncedProducts } from '@/lib/useSyncedProducts';
import { mockProducts } from '@/lib/data';

export default function FeaturedProducts() {
  const { products, synced } = useSyncedProducts();

  const featured = synced
    ? products.filter(p => p.featured).slice(0, 8)
    : mockProducts.filter(p => p.featured !== false).slice(0, 8);

  return (
    <section className="section products">
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <p className="sec-eyebrow">Lemini Collection</p>
            <h2 className="sec-title">Sản Phẩm Nổi Bật</h2>
          </div>
          <Link href="/products" className="view-all">Xem tất cả →</Link>
        </div>

        <div className="product-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .section {
          padding: var(--section-pad-y) var(--section-pad-x);
          background-color: #fff;
        }

        .section-inner {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .sec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }

        .sec-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          margin-bottom: 6px;
        }

        .sec-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -0.5px;
        }

        :global(.view-all) {
          font-size: 13px;
          font-weight: 600;
          color: #2E1A4A;
          text-decoration: none;
          padding: 8px 18px;
          border: 1.5px solid #2E1A4A;
          border-radius: 999px;
          transition: all 0.2s;
        }

        :global(.view-all:hover) {
          background: #2E1A4A;
          color: #fff;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .sec-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}

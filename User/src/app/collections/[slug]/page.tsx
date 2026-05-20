'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts, mockCategories } from '@/lib/data';

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = mockCategories.find(c => c.slug === slug);
  if (!category) notFound();

  const products = mockProducts.filter(p => p.category === slug);

  return (
    <>
      <Header />
      <main>
        {/* Banner */}
        <div className="banner">
          <img src={category.image} alt={category.name} className="banner-img" />
          <div className="banner-overlay" />
          <div className="banner-content">
            <p className="banner-pre">Bộ sưu tập</p>
            <h1 className="banner-title">{category.name}</h1>
            {category.description && (
              <p className="banner-desc">{category.description}</p>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="breadcrumb-inner">
            <Link href="/">Trang chủ</Link>
            <span>/</span>
            <Link href="/products">Sản phẩm</Link>
            <span>/</span>
            <span>{category.name}</span>
          </div>
        </div>

        {/* Products */}
        <div className="collection-body">
          <div className="collection-header">
            <h2 className="collection-count">{products.length} sản phẩm</h2>

            {/* Other categories nav */}
            <div className="cat-pills">
              {mockCategories.filter(c => c.slug !== slug).map(c => (
                <Link key={c.id} href={`/collections/${c.slug}`} className="cat-pill">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="empty-icon">🧵</p>
              <p>Bộ sưu tập đang được cập nhật. Quay lại sau nhé!</p>
              <Link href="/products" className="back-link">Xem tất cả sản phẩm</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .banner {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(46,26,74,0.75) 0%, rgba(46,26,74,0.3) 60%, transparent 100%);
        }

        .banner-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 var(--section-pad-x);
          max-width: var(--container-max);
          margin: 0 auto;
          left: 0;
          right: 0;
        }

        .banner-pre {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent-light);
          margin-bottom: 12px;
        }

        .banner-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .banner-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          max-width: 480px;
          line-height: 1.7;
        }

        .breadcrumb-bar {
          background: var(--color-bg-alt);
          border-bottom: 1px solid var(--color-border);
          padding: 14px var(--section-pad-x);
        }

        .breadcrumb-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--color-text-muted);
          flex-wrap: wrap;
        }

        :global(.breadcrumb-inner a) {
          color: var(--color-text-secondary);
          transition: color 0.2s;
        }

        :global(.breadcrumb-inner a:hover) { color: var(--color-primary); }
        .breadcrumb-inner span:last-child { color: var(--color-text); font-weight: 500; }

        .collection-body {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 40px var(--section-pad-x) 80px;
        }

        .collection-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .collection-count {
          font-size: 14px;
          color: var(--color-text-muted);
          font-weight: 400;
        }

        .cat-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        :global(.cat-pill) {
          padding: 6px 16px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 13px;
          color: var(--color-text-secondary);
          transition: var(--transition-fast);
        }

        :global(.cat-pill:hover) {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .empty {
          text-align: center;
          padding: 80px 0;
          color: var(--color-text-muted);
        }

        .empty-icon { font-size: 48px; margin-bottom: 16px; }
        .empty p { margin-bottom: 24px; }

        :global(.back-link) {
          display: inline-block;
          padding: 10px 24px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 14px;
          color: var(--color-text-secondary);
        }

        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); }
          .banner { height: 300px; }
        }

        @media (max-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .banner { height: 260px; }
          .collection-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}

'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockCategories, mockProducts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="page-hero">
          <div className="hero-inner">
            <p className="breadcrumb">Trang chủ / <span>Bộ sưu tập</span></p>
            <h1 className="hero-title">Bộ Sưu Tập</h1>
            <p className="hero-sub">
              Khám phá thế giới thêu tay qua những bộ sưu tập được chọn lọc kỹ lưỡng, 
              mang đậm bản sắc văn hóa Việt Nam.
            </p>
          </div>
        </section>

        {/* Collections grid */}
        <section className="collections-section">
          <div className="collections-inner">
            <div className="collections-grid">
              {mockCategories.map((cat, idx) => {
                const productCount = mockProducts.filter(p => p.category === cat.slug).length;
                const isLarge = idx === 0 || idx === 3;
                return (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    className={`col-card ${isLarge ? 'col-card--large' : ''}`}
                  >
                    <div className="col-img-wrap">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="col-img"
                      />
                      <div className="col-overlay" />
                    </div>
                    <div className="col-info">
                      <div className="col-meta">
                        <span className="col-count">{productCount} sản phẩm</span>
                        <h2 className="col-name">{cat.name}</h2>
                        {cat.description && (
                          <p className="col-desc">{cat.description}</p>
                        )}
                      </div>
                      <span className="col-cta">
                        Khám phá <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured banner */}
        <section className="featured-banner">
          <div className="banner-inner">
            <div className="banner-text">
              <span className="banner-label">Mới nhất</span>
              <h2 className="banner-title">Bộ Kit DIY — Tự Tay Tạo Ra Vẻ Đẹp</h2>
              <p className="banner-body">
                Chưa biết thêu? Không sao cả. Bộ kit của chúng tôi đi kèm hướng dẫn 
                từng bước bằng tiếng Việt, phù hợp cho người mới bắt đầu từ 10 tuổi trở lên.
              </p>
              <Link href="/collections/bo-kit-diy" className="banner-btn">
                Xem bộ kit
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="banner-imgs">
              <div className="banner-img-main">
                <img src="https://picsum.photos/600/700?random=40" alt="Kit thêu tay" />
              </div>
              <div className="banner-img-side">
                <img src="https://picsum.photos/600/350?random=41" alt="Kit thêu tay" />
                <img src="https://picsum.photos/600/350?random=42" alt="Kit thêu tay" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Hero */
        .page-hero {
          padding: 64px var(--section-pad-x) 56px;
          background: linear-gradient(135deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
          border-bottom: 1px solid var(--color-border);
        }

        .hero-inner {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .breadcrumb {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        .breadcrumb span {
          color: var(--color-text-secondary);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .hero-sub {
          font-size: 16px;
          color: var(--color-text-secondary);
          max-width: 560px;
          line-height: 1.8;
        }

        /* Collections grid */
        .collections-section {
          padding: 64px var(--section-pad-x) 80px;
        }

        .collections-inner {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .collections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 20px;
        }

        :global(.col-card) {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          background: var(--color-bg-alt);
          transition: var(--transition-normal);
        }

        :global(.col-card:hover) {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        :global(.col-card--large) {
          grid-column: span 2;
        }

        .col-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
        }

        :global(.col-card--large) .col-img-wrap {
          aspect-ratio: 16/8;
        }

        .col-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        :global(.col-card:hover) .col-img {
          transform: scale(1.04);
        }

        .col-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(46,26,74,0.4) 0%, transparent 60%);
        }

        .col-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 24px;
          gap: 16px;
        }

        .col-meta {
          flex: 1;
        }

        .col-count {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          display: block;
          margin-bottom: 6px;
        }

        .col-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 6px;
          line-height: 1.2;
        }

        :global(.col-card--large) .col-name {
          font-size: 28px;
        }

        .col-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .col-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent);
          white-space: nowrap;
          transition: var(--transition-fast);
          flex-shrink: 0;
        }

        :global(.col-card:hover) .col-cta {
          color: var(--color-primary);
          gap: 10px;
        }

        /* Featured banner */
        .featured-banner {
          background: var(--color-bg-alt);
          border-top: 1px solid var(--color-border);
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .banner-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .banner-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          background: var(--color-accent-muted);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          margin-bottom: 20px;
        }

        .banner-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 500;
          color: var(--color-primary);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .banner-body {
          font-size: 15px;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
          max-width: 440px;
        }

        :global(.banner-btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 28px;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        :global(.banner-btn:hover) {
          background: var(--color-primary-light);
          gap: 12px;
        }

        .banner-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .banner-img-main {
          grid-column: span 1;
          grid-row: span 2;
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 3/4;
        }

        .banner-img-side {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .banner-img-main img,
        .banner-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .banner-img-side img {
          border-radius: var(--radius-lg);
          aspect-ratio: 4/3;
          height: auto;
        }

        @media (max-width: 1024px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          :global(.col-card--large) {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .collections-grid {
            grid-template-columns: 1fr;
          }
          :global(.col-card--large) {
            grid-column: span 1;
          }
          .banner-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .banner-imgs {
            order: -1;
          }
          .banner-img-main {
            aspect-ratio: 16/9;
          }
        }

        @media (max-width: 480px) {
          .col-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}

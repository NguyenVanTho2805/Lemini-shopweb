'use client';

import Link from 'next/link';

export default function GiftBanner() {
  return (
    <section className="promo">
      <div className="promo-inner">
        <div className="promo-content">
          <span className="promo-badge">Bộ Sưu Tập Mới</span>
          <h2 className="promo-title">Quà Tặng Ý Nghĩa</h2>
          <p className="promo-desc">
            Những set quà thêu tay được gói cẩn thận, mang trọn tâm ý người trao.
          </p>
          <Link href="/products" className="btn-banner">
            Khám phá sản phẩm
          </Link>
        </div>
        <div className="promo-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://picsum.photos/800/800?random=20" 
            alt="Gift Set"
            loading="lazy"
          />
        </div>
      </div>

      <style jsx>{`
        .promo {
          padding: var(--section-pad-y) var(--section-pad-x);
          background-color: var(--color-bg);
        }

        .promo-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background-color: var(--color-bg-alt);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .promo-content {
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .promo-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          background-color: var(--color-accent-light);
          color: var(--color-primary);
          border-radius: var(--radius-full);
          margin-bottom: 24px;
        }

        .promo-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 400;
          color: var(--color-primary);
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .promo-desc {
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--color-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
          max-width: 400px;
        }

        :global(.btn-banner) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          padding: 0 32px;
          background-color: var(--color-primary);
          color: var(--color-bg);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        :global(.btn-banner:hover) {
          background-color: var(--color-primary-light);
          transform: translateY(-2px);
        }

        .promo-image {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;
        }

        .promo-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .promo-inner {
            grid-template-columns: 1fr;
          }
          
          .promo-content {
            padding: 40px 24px;
          }
          
          .promo-image {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}

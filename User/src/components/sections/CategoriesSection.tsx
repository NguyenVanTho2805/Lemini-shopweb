'use client';

import Link from 'next/link';
import { mockCategories } from '@/lib/data';

export default function CategoriesSection() {
  return (
    <section className="section categories">
      <div className="section-inner">
        <div className="sec-header">
          <h2 className="sec-title">Danh Mục Nổi Bật</h2>
          <p className="sec-sub">Khám phá thế giới thêu tay qua những bộ sưu tập được yêu thích nhất.</p>
        </div>

        <div className="grid">
          {mockCategories.map((category, idx) => (
            <Link 
              key={category.id} 
              href={`/collections/${category.slug}`}
              className={`cat-card ${idx === 0 || idx === 3 ? 'large' : 'small'}`}
            >
              <img src={category.image} alt={category.name} className="cat-img" />
              <div className="cat-overlay">
                <h3 className="cat-name">{category.name}</h3>
                <span className="cat-link">Khám phá</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section {
          padding: var(--section-pad-y) var(--section-pad-x);
          background-color: var(--color-bg);
        }
        
        .section-inner {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .sec-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .sec-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 400;
          color: var(--color-primary);
          margin-bottom: 12px;
        }

        .sec-sub {
          font-size: 15px;
          color: var(--color-text-secondary);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 300px);
          gap: 20px;
        }

        :global(.cat-card) {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: block;
        }

        :global(.cat-card.large) {
          grid-column: span 2;
        }

        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        :global(.cat-card:hover) .cat-img {
          transform: scale(1.05);
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(46, 26, 74, 0.7) 0%, rgba(46, 26, 74, 0) 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
        }

        .cat-name {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 8px;
        }

        .cat-link {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent-light);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cat-link::after {
          content: '→';
          transition: transform 0.3s ease;
        }

        :global(.cat-card:hover) .cat-link::after {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          :global(.cat-card.large) {
            grid-column: span 1;
          }
          :global(.cat-card) {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}

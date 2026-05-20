'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="title">
          <span>Từng mũi kim là</span>
          <br />
          <span>Một tình yêu</span>
        </h1>
        <p className="subtitle">
          Khám phá bộ sưu tập thêu tay thủ công đầy tinh tế, mang dấu ấn cá nhân và tình yêu nghệ thuật.
        </p>
        <div className="cta-group">
          <Link href="/products" className="btn-primary">Mua sắm ngay</Link>
          <Link href="/collections/bo-kit-diy" className="btn-ghost">Tự tay làm</Link>
        </div>
      </div>
      
      <div className="hero-image">
        {/* Placeholder image from unsplash matching the theme */}
        <img 
          src="https://picsum.photos/1600/900?random=10" 
          alt="Lemini Embroidery" 
        />
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          padding: 0 var(--section-pad-x);
          overflow: hidden;
          background-color: var(--color-bg-soft);
        }

        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .hero-image::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to right, rgba(250, 248, 255, 0.95) 0%, rgba(250, 248, 255, 0.6) 50%, rgba(250, 248, 255, 0) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
          margin: 0 auto;
          margin-left: max(0px, calc((100vw - var(--container-max)) / 2));
        }

        .title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--color-primary);
          margin-bottom: 24px;
        }

        .title span:last-child {
          font-style: italic;
          color: var(--color-accent);
        }

        .subtitle {
          font-size: 16px;
          color: var(--color-text-secondary);
          margin-bottom: 40px;
          line-height: 1.8;
          max-width: 480px;
        }

        .cta-group {
          display: flex;
          gap: 16px;
        }

        :global(.btn-primary) {
          background: var(--color-primary);
          color: #fff;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: background-color 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        :global(.btn-primary:hover) {
          background: var(--color-primary-hover);
        }

        :global(.btn-ghost) {
          background: transparent;
          color: var(--color-primary);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px 24px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--color-accent-light);
          font-weight: 500;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        :global(.btn-ghost:hover) {
          background: var(--color-accent-muted);
          border-color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 70vh;
            align-items: flex-end;
            padding-bottom: 60px;
          }
          .hero-content {
            margin-left: 0;
            text-align: center;
          }
          .subtitle {
            margin: 0 auto 32px;
          }
          .hero-image::after {
            background: linear-gradient(to top, rgba(250, 248, 255, 1) 0%, rgba(250, 248, 255, 0.4) 60%, rgba(250, 248, 255, 0) 100%);
          }
          .cta-group {
            justify-content: center;
            flex-direction: column;
          }
          :global(.btn-primary), :global(.btn-ghost) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

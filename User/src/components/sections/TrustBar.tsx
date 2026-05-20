'use client';

import { HeartHandshake, Package, ShieldCheck, Sparkles } from 'lucide-react';

export default function TrustBar() {
  const items = [
    { icon: <HeartHandshake size={24} />, title: "Thủ công bằng tình yêu", desc: "100% thêu tay tỉ mỉ" },
    { icon: <Sparkles size={24} />, title: "Thiết kế độc bản", desc: "Mỗi sản phẩm là duy nhất" },
    { icon: <Package size={24} />, title: "Giao hàng toàn quốc", desc: "Freeship đơn từ 500k" },
    { icon: <ShieldCheck size={24} />, title: "Bảo hành tận tâm", desc: "Đổi trả trong 7 ngày" }
  ];

  return (
    <section className="trust-bar">
      <div className="trust-inner">
        {items.map((item, idx) => (
          <div key={idx} className="trust-item">
            <div className="icon-wrapper">{item.icon}</div>
            <div className="text-content">
              <h4 className="title">{item.title}</h4>
              <p className="desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-bar {
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          padding: 32px 0;
        }

        .trust-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--section-pad-x);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-wrapper {
          color: var(--color-accent);
          background: var(--color-bg-alt);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 2px;
        }

        .desc {
          font-size: 13px;
          color: var(--color-text-secondary);
        }

        @media (max-width: 1024px) {
          .trust-inner {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .trust-inner {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .trust-item {
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}

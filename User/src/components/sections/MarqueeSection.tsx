'use client';

export default function MarqueeSection() {
  const items = [
    "Thêu tay 100%", "Chất liệu tự nhiên", "Thiết kế độc bản", "Sản xuất tại Việt Nam",
    "Thêu tay 100%", "Chất liệu tự nhiên", "Thiết kế độc bản", "Sản xuất tại Việt Nam",
    "Thêu tay 100%", "Chất liệu tự nhiên", "Thiết kế độc bản", "Sản xuất tại Việt Nam"
  ];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-content">
        {items.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-wrapper {
          background-color: var(--color-primary);
          color: var(--color-surface);
          padding: 12px 0;
          overflow: hidden;
          display: flex;
          white-space: nowrap;
        }

        .marquee-content {
          display: flex;
          animation: marquee 25s linear infinite;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-right: 24px;
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .dot {
          width: 4px;
          height: 4px;
          background-color: var(--color-accent);
          border-radius: 50%;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

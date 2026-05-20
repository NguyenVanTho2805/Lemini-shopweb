export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line w-full" />
        <div className="skeleton-line w-3/4" />
        <div className="skeleton-stars" />
        <div className="skeleton-line w-1/2 price" />
      </div>

      <style jsx>{`
        .skeleton-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skeleton-img {
          aspect-ratio: 3/4;
          border-radius: 10px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }

        .skeleton-body {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 0 2px;
        }

        .skeleton-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-line.w-full { width: 100%; }
        .skeleton-line.w-3\\/4 { width: 75%; }
        .skeleton-line.w-1\\/2 { width: 50%; }
        .skeleton-line.price { height: 14px; margin-top: 2px; }

        .skeleton-stars {
          display: flex;
          gap: 3px;
          align-items: center;
        }
        .skeleton-stars::before {
          content: '';
          display: block;
          width: 72px;
          height: 10px;
          border-radius: 5px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

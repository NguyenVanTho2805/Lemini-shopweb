'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, Eye } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useQuickView } from '@/contexts/QuickViewContext';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR = ['Túi thêu', 'Tranh thêu hoa', 'Kit DIY', 'Thêu tên', 'Khăn tay'];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openQuickView } = useQuickView();

  // Autofocus khi mở
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [open]);

  // Đóng bằng Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const results = query.trim().length > 0
    ? mockProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-overlay">
      <div className="search-backdrop" onClick={onClose} />

      <div className="search-panel">
        {/* Input */}
        <div className="search-input-wrap">
          <Search size={20} className="search-icon-input" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="search-input"
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')} aria-label="Xóa">
              <X size={16} />
            </button>
          )}
          <button className="close-search" onClick={onClose} aria-label="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="search-body">
          {/* Gợi ý khi chưa nhập */}
          {!query && (
            <div className="suggestions">
              <p className="suggest-label">Tìm kiếm phổ biến</p>
              <div className="suggest-chips">
                {POPULAR.map(term => (
                  <button
                    key={term}
                    className="suggest-chip"
                    onClick={() => setQuery(term)}
                  >
                    <Search size={13} />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kết quả tìm kiếm */}
          {query && results.length > 0 && (
            <div className="results">
              <p className="result-label">{results.length} kết quả cho "{query}"</p>
              <ul className="result-list">
                {results.map(product => (
                  <li key={product.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="result-item"
                      onClick={onClose}
                      style={{ flex: 1 }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="result-img"
                      />
                      <div className="result-info">
                        <p className="result-name">{product.name}</p>
                        <p className="result-price">{formatPrice(product.price)}</p>
                      </div>
                      {product.badge && (
                        <span className={`result-badge result-badge--${product.badge}`}>
                          {product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'Mới' : 'Hot'}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => { openQuickView(product); onClose(); }}
                      title="Xem nhanh"
                      style={{
                        width: 36, height: 36, borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg)',
                        cursor: 'pointer', flexShrink: 0, marginLeft: 6,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-text-muted)', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-accent-muted)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg)';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                      }}
                    >
                      <Eye size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                href={`/products?q=${encodeURIComponent(query)}`}
                className="view-all-link"
                onClick={onClose}
              >
                Xem tất cả {results.length} kết quả cho &ldquo;{query}&rdquo; →
              </Link>
            </div>
          )}

          {/* Không có kết quả */}
          {query && results.length === 0 && (
            <div className="no-results">
              <p className="no-results-title">Không tìm thấy "{query}"</p>
              <p className="no-results-sub">Thử tìm với từ khóa khác hoặc xem tất cả sản phẩm.</p>
              <Link href="/products" className="browse-link" onClick={onClose}>
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(46, 26, 74, 0.5);
          backdrop-filter: blur(4px);
        }

        .search-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 680px;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          box-shadow: var(--shadow-lg);
          animation: dropDown 0.22s ease;
          overflow: hidden;
        }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Input */
        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-border);
        }

        :global(.search-icon-input) {
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 18px;
          font-family: var(--font-body);
          color: var(--color-text);
          background: transparent;
        }

        .search-input::placeholder {
          color: var(--color-text-muted);
        }

        .clear-btn, .close-search {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.15s;
          flex-shrink: 0;
        }

        .clear-btn:hover, .close-search:hover {
          background: var(--color-bg-alt);
          color: var(--color-text);
        }

        .close-search {
          margin-left: 4px;
          border-left: 1px solid var(--color-border);
          border-radius: 0;
          padding-left: 12px;
          width: auto;
        }

        /* Body */
        .search-body {
          padding: 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        /* Suggestions */
        .suggest-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 12px;
        }

        .suggest-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .suggest-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background: transparent;
          font-size: 13px;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          font-family: var(--font-body);
        }

        .suggest-chip:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: var(--color-accent-muted);
        }

        /* Results */
        .result-label {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        .result-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        :global(.result-item) {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: var(--radius-md);
          transition: background 0.15s;
        }

        :global(.result-item:hover) {
          background: var(--color-bg-alt);
        }

        .result-img {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          object-fit: cover;
          flex-shrink: 0;
        }

        .result-info { flex: 1; }

        .result-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text);
          margin-bottom: 4px;
        }

        .result-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary);
        }

        .result-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          color: #fff;
          flex-shrink: 0;
        }

        .result-badge--sale { background: var(--color-sale); }
        .result-badge--new  { background: var(--color-new);  }
        .result-badge--hot  { background: var(--color-hot);  }

        :global(.view-all-link) {
          display: block;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent);
          padding: 12px;
          border-top: 1px solid var(--color-border);
          transition: opacity 0.2s;
        }

        :global(.view-all-link:hover) { opacity: 0.7; }

        /* No results */
        .no-results {
          text-align: center;
          padding: 24px 0;
        }

        .no-results-title {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--color-primary);
          margin-bottom: 8px;
        }

        .no-results-sub {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-bottom: 20px;
        }

        :global(.browse-link) {
          display: inline-flex;
          padding: 10px 24px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 13px;
          color: var(--color-text-secondary);
          transition: var(--transition-fast);
        }

        :global(.browse-link:hover) {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        @media (max-width: 720px) {
          .search-panel {
            max-width: 100%;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}

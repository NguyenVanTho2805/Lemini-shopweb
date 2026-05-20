'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      padding: '24px',
      textAlign: 'center',
      gap: 16,
    }}>
      <p style={{ fontSize: 64 }}>🧵</p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 32,
        fontWeight: 500,
        color: '#2E1A4A',
        marginBottom: 4,
      }}>
        Oops! Có lỗi xảy ra
      </h1>
      <p style={{ fontSize: 15, color: '#888', maxWidth: 400, lineHeight: 1.7 }}>
        Trang này gặp sự cố không mong muốn. Bạn có thể thử lại hoặc quay về trang chủ.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        <button
          onClick={reset}
          style={{
            padding: '12px 28px',
            background: '#2E1A4A',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          Thử lại
        </button>
        <Link href="/" style={{
          padding: '12px 28px',
          border: '1.5px solid #e0e0e0',
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          color: '#555',
          textDecoration: 'none',
        }}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

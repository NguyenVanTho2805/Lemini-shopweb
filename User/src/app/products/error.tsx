'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 14, padding: '60px 24px', textAlign: 'center',
    }}>
      <p style={{ fontSize: 48 }}>🧵</p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>Không thể tải sản phẩm</h2>
      <p style={{ fontSize: 14, color: '#888' }}>Có lỗi xảy ra khi tải danh sách sản phẩm.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={reset} style={{
          padding: '10px 24px', background: '#2E1A4A', color: '#fff',
          border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>Thử lại</button>
        <Link href="/" style={{
          padding: '10px 24px', border: '1px solid #e0e0e0',
          borderRadius: 999, fontSize: 13, color: '#555', textDecoration: 'none',
        }}>Trang chủ</Link>
      </div>
    </div>
  );
}

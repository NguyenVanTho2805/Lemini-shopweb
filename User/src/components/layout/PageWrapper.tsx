'use client';

import { useCart } from '@/contexts/CartContext';
import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { cartOpen } = useCart();

  return (
    <div
      className="page-wrapper"
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        background: 'var(--color-bg, #FAF8FF)',
      }}
    >
      {children}
    </div>
  );
}

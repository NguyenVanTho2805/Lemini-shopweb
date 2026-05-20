'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const COOKIE_KEY = 'lemini_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) setTimeout(() => setVisible(true), 1500);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 99999,
      width: 'calc(100% - 48px)',
      maxWidth: 560,
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderRadius: 14,
      boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
      padding: '18px 20px',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      animation: 'slideUp 0.3s ease',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Cookie size={18} color="#7C3AED" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
          Chúng tôi dùng cookie 🍪
        </p>
        <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6 }}>
          Lemini sử dụng cookie để cải thiện trải nghiệm của bạn và lưu trữ giỏ hàng.{' '}
          <Link href="/privacy" style={{ color: '#7C3AED', textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Chính sách cookie
          </Link>
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={accept} style={{
            padding: '8px 20px',
            background: '#2E1A4A', color: '#fff',
            border: 'none', borderRadius: 999,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', transition: 'background 0.15s',
          }}>
            Chấp nhận tất cả
          </button>
          <button onClick={decline} style={{
            padding: '8px 16px',
            background: 'transparent', color: '#666',
            border: '1px solid #e0e0e0', borderRadius: 999,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', transition: 'all 0.15s',
          }}>
            Từ chối
          </button>
        </div>
      </div>

      <button onClick={decline} style={{
        background: 'none', border: 'none',
        cursor: 'pointer', color: '#bbb', flexShrink: 0, padding: 2,
      }}>
        <X size={16} />
      </button>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

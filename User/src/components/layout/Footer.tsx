'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── Newsletter banner ── */}
        <div className="newsletter-wrap">
          <div className="newsletter-text">
            <p className="newsletter-eyebrow">Nhận ưu đãi độc quyền</p>
            <h3 className="newsletter-title">Đăng ký nhận bản tin</h3>
            <p className="newsletter-desc">Cập nhật sản phẩm mới, khuyến mãi và mẹo thêu tay hàng tuần.</p>
          </div>
          <div className="newsletter-form-wrap">
            {submitted ? (
              <div className="newsletter-success">
                <span style={{ fontSize: 20 }}>🎉</span>
                <p>Cảm ơn bạn! Chúng tôi sẽ gửi tin sớm nhé.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email của bạn..."
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <Send size={14} />
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid">
          <div className="col brand-col">
            <h2 className="logo">Lemini</h2>
            <p className="tagline">"Từng mũi kim là một tình yêu"</p>
            <p className="desc">
              Mang đến những sản phẩm thêu tay tinh tế, được làm bằng tất cả sự tỉ mỉ và niềm đam mê nghệ thuật thủ công Việt Nam.
            </p>
          </div>

          <div className="col">
            <h3 className="col-title">Cửa Hàng</h3>
            <ul className="links">
              <li><Link href="/products">Tất cả sản phẩm</Link></li>
              <li><Link href="/collections/tranh-theu">Tranh thêu</Link></li>
              <li><Link href="/collections/tui-theu">Túi & Ví</Link></li>
              <li><Link href="/collections/bo-kit-diy">Bộ Kit DIY</Link></li>
              <li><Link href="/blog">Blog & Cảm hứng</Link></li>
            </ul>
          </div>

          <div className="col">
            <h3 className="col-title">Hỗ Trợ</h3>
            <ul className="links">
              <li><Link href="/about">Về chúng tôi</Link></li>
              <li><Link href="/faq">Câu hỏi thường gặp</Link></li>
              <li><Link href="/shipping">Chính sách vận chuyển</Link></li>
              <li><Link href="/returns">Đổi trả & Hoàn tiền</Link></li>
              <li><Link href="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          <div className="col">
            <h3 className="col-title">Kết Nối</h3>
            <ul className="links">
              <li><a href="https://instagram.com/lemini.vn" target="_blank" rel="noopener noreferrer">Instagram: @lemini.vn</a></li>
              <li><a href="https://facebook.com/lemini" target="_blank" rel="noopener noreferrer">Facebook: Lemini</a></li>
              <li>Email: hello@lemini.vn</li>
              <li>Hotline: 0987 654 321</li>
            </ul>
          </div>
        </div>

        <div className="bottom">
          <p className="copyright">© 2024 Lemini. All rights reserved.</p>
          <div className="payment-methods">
            <div className="payment-chip">VISA</div>
            <div className="payment-chip">MasterCard</div>
            <div className="payment-chip">Momo</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--color-bg-alt);
          padding: 0 0 40px;
          border-top: 1px solid var(--color-border);
        }

        .footer-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--section-pad-x);
        }

        /* Newsletter */
        .newsletter-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          background: #2E1A4A;
          border-radius: 16px;
          padding: 32px 40px;
          margin: 40px 0 48px;
        }

        .newsletter-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #C4A8E8;
          margin-bottom: 6px;
        }

        .newsletter-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 6px;
        }

        .newsletter-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        .newsletter-form-wrap {
          flex-shrink: 0;
          min-width: 320px;
        }

        .newsletter-form {
          display: flex;
          gap: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
        }

        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 13px;
          font-family: inherit;
        }
        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .newsletter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 18px;
          background: #C4A8E8;
          border: none;
          color: #1a1a1a;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .newsletter-btn:hover {
          background: #d5bcf5;
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 10;
          color: #C4A8E8;
          font-size: 14px;
          font-weight: 500;
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .brand-col {
          padding-right: 40px;
        }

        .logo {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--color-primary);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .tagline {
          font-family: var(--font-display);
          font-size: 18px;
          font-style: italic;
          color: var(--color-accent);
          margin-bottom: 16px;
        }

        .desc {
          color: var(--color-text-secondary);
          font-size: 14px;
          line-height: 1.8;
        }

        .col-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          margin-bottom: 24px;
          font-weight: 600;
        }

        .links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        :global(.links a), .links li {
          color: var(--color-text-secondary);
          font-size: 14px;
          transition: color 0.2s;
        }

        :global(.links a:hover) {
          color: var(--color-primary);
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid var(--color-border);
        }

        .copyright {
          color: var(--color-text-muted);
          font-size: 13px;
        }

        .payment-methods {
          display: flex;
          gap: 12px;
        }

        .payment-chip {
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .newsletter-wrap {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px 28px;
          }
          .newsletter-form-wrap {
            min-width: 0;
            width: 100%;
          }
          .grid {
            grid-template-columns: 1fr 1fr;
          }
          .brand-col {
            grid-column: span 2;
            padding-right: 0;
            margin-bottom: 20px;
          }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .brand-col {
            grid-column: span 1;
          }
          .bottom {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
          .newsletter-wrap {
            padding: 24px 20px;
          }
        }
      `}</style>
    </footer>
  );
}

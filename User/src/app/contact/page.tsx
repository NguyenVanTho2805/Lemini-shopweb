'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <div className="hero-inner">
            <p className="breadcrumb">Trang chủ / <span>Liên hệ</span></p>
            <h1 className="title">Liên Hệ Với Chúng Tôi</h1>
            <p className="subtitle">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
          </div>
        </div>

        <div className="content">
          <div className="container">
            <div className="layout">
              {/* Info */}
              <div className="info-col">
                <h2>Thông tin liên hệ</h2>

                <div className="info-items">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <div>
                      <p className="info-label">Địa chỉ</p>
                      <p className="info-value">123 Đường Nguyễn Trãi, Quận 1<br />TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📞</span>
                    <div>
                      <p className="info-label">Hotline</p>
                      <p className="info-value">0987 654 321</p>
                      <p className="info-note">8:00 – 22:00 hàng ngày</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">✉️</span>
                    <div>
                      <p className="info-label">Email</p>
                      <p className="info-value">hello@lemini.vn</p>
                      <p className="info-note">Phản hồi trong 24 giờ</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🕐</span>
                    <div>
                      <p className="info-label">Giờ làm việc</p>
                      <p className="info-value">Thứ 2 – Chủ nhật</p>
                      <p className="info-note">8:00 – 22:00</p>
                    </div>
                  </div>
                </div>

                <div className="socials">
                  <p className="socials-title">Kết nối với Lemini</p>
                  <div className="social-links">
                    <a href="https://instagram.com/lemini.vn" target="_blank" rel="noopener noreferrer" className="social-btn">
                      📸 Instagram
                    </a>
                    <a href="https://facebook.com/lemini" target="_blank" rel="noopener noreferrer" className="social-btn">
                      📘 Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="form-col">
                <h2>Gửi tin nhắn</h2>

                {sent ? (
                  <div className="success-box">
                    <p className="success-icon">✅</p>
                    <h3>Gửi thành công!</h3>
                    <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                    <button className="btn-reset" onClick={() => setSent(false)}>Gửi tin nhắn khác</button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="field-row">
                      <div className="field">
                        <label className="label">Họ và tên *</label>
                        <input
                          className="input"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Email *</label>
                        <input
                          className="input"
                          type="email"
                          placeholder="email@example.com"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Chủ đề</label>
                      <select
                        className="input"
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      >
                        <option value="">Chọn chủ đề...</option>
                        <option value="order">Hỏi về đơn hàng</option>
                        <option value="product">Hỏi về sản phẩm</option>
                        <option value="return">Đổi trả, khiếu nại</option>
                        <option value="collab">Hợp tác kinh doanh</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>

                    <div className="field">
                      <label className="label">Nội dung *</label>
                      <textarea
                        className="input textarea"
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                        rows={5}
                        required
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>

                    <button type="submit" className="btn-submit" disabled={sending}>
                      {sending ? 'Đang gửi...' : 'Gửi tin nhắn'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
          padding: 48px var(--section-pad-x) 40px;
          border-bottom: 1px solid var(--color-border);
        }
        .hero-inner { max-width: var(--container-max); margin: 0 auto; }
        .breadcrumb { font-size: 13px; color: var(--color-text-muted); margin-bottom: 12px; }
        .breadcrumb span { color: var(--color-text-secondary); }
        .title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 8px;
        }
        .subtitle { font-size: 15px; color: var(--color-text-muted); }

        .content { padding: 60px var(--section-pad-x) 100px; }
        .container { max-width: var(--container-max); margin: 0 auto; }

        .layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 60px;
        }

        .info-col h2, .form-col h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 28px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-border);
        }

        .info-items { display: flex; flex-direction: column; gap: 24px; margin-bottom: 36px; }
        .info-item { display: flex; gap: 16px; align-items: flex-start; }
        .info-icon { font-size: 22px; flex-shrink: 0; }
        .info-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); margin-bottom: 4px; }
        .info-value { font-size: 15px; color: var(--color-text); line-height: 1.6; }
        .info-note { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }

        .socials-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-muted); margin-bottom: 12px; }
        .social-links { display: flex; gap: 10px; }
        .social-btn {
          padding: 9px 18px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: var(--transition-fast);
          text-decoration: none;
        }
        .social-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }

        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .label { font-size: 13px; font-weight: 600; color: var(--color-text-secondary); }
        .input {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 11px 14px;
          font-size: 14px;
          color: var(--color-text);
          font-family: var(--font-body);
          background: var(--color-surface);
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: var(--color-accent); }
        .textarea { resize: vertical; min-height: 120px; }

        .btn-submit {
          align-self: flex-start;
          padding: 13px 36px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-submit:hover:not(:disabled) { background: var(--color-primary-light); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .success-box {
          text-align: center;
          padding: 60px 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-bg-alt);
        }
        .success-icon { font-size: 48px; margin-bottom: 16px; }
        .success-box h3 { font-family: var(--font-display); font-size: 22px; color: var(--color-primary); margin-bottom: 10px; }
        .success-box p { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 8px; }
        .btn-reset {
          margin-top: 16px;
          padding: 10px 24px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background: transparent;
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-reset:hover { border-color: var(--color-accent); color: var(--color-accent); }

        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr; }
          .field-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

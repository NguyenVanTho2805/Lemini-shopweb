'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <div className="hero-inner">
            <p className="breadcrumb">Trang chủ / <span>Chính sách vận chuyển</span></p>
            <h1 className="title">Chính Sách Vận Chuyển</h1>
            <p className="subtitle">Thông tin về giao hàng và vận chuyển của Lemini</p>
          </div>
        </div>

        <div className="content">
          <div className="container">
            <section className="section">
              <h2>Khu vực giao hàng</h2>
              <p>Lemini hiện giao hàng toàn quốc đến tất cả 63 tỉnh thành Việt Nam.</p>
            </section>

            <section className="section">
              <h2>Thời gian giao hàng</h2>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">🏙️</div>
                  <h3>Nội thành</h3>
                  <p><strong>Hà Nội & TP.HCM</strong></p>
                  <p>1 – 2 ngày làm việc</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🏘️</div>
                  <h3>Ngoại thành</h3>
                  <p><strong>Tỉnh thành khác</strong></p>
                  <p>2 – 4 ngày làm việc</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🏔️</div>
                  <h3>Vùng sâu, vùng xa</h3>
                  <p><strong>Khu vực đặc biệt</strong></p>
                  <p>5 – 7 ngày làm việc</p>
                </div>
              </div>
              <p className="note">* Thời gian trên tính từ khi đơn hàng được xác nhận và không tính ngày lễ, Tết.</p>
            </section>

            <section className="section">
              <h2>Phí vận chuyển</h2>
              <div className="fee-table">
                <div className="fee-row fee-row--header">
                  <span>Giá trị đơn hàng</span>
                  <span>Phí vận chuyển</span>
                </div>
                <div className="fee-row">
                  <span>Dưới 500.000₫</span>
                  <span>30.000₫</span>
                </div>
                <div className="fee-row">
                  <span>Từ 500.000₫ trở lên</span>
                  <span className="free">MIỄN PHÍ</span>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Đơn vị vận chuyển</h2>
              <p>Lemini hợp tác với các đơn vị vận chuyển uy tín:</p>
              <ul className="list">
                <li>Giao Hàng Nhanh (GHN)</li>
                <li>Giao Hàng Tiết Kiệm (GHTK)</li>
                <li>J&amp;T Express</li>
                <li>ViettelPost</li>
              </ul>
            </section>

            <section className="section">
              <h2>Theo dõi đơn hàng</h2>
              <p>Sau khi đơn hàng được giao cho đơn vị vận chuyển, bạn sẽ nhận được mã vận đơn qua email để theo dõi trạng thái giao hàng theo thời gian thực.</p>
              <p>Bạn cũng có thể kiểm tra trạng thái đơn hàng tại <strong>Tài khoản → Đơn hàng của tôi</strong>.</p>
            </section>

            <section className="section">
              <h2>Lưu ý khi nhận hàng</h2>
              <ul className="list">
                <li>Vui lòng kiểm tra hàng hóa trước khi ký nhận.</li>
                <li>Nếu phát hiện hàng bị hư hỏng, vui lòng từ chối nhận và liên hệ với chúng tôi ngay.</li>
                <li>Chụp ảnh toàn bộ quá trình mở kiện hàng để làm bằng chứng khiếu nại nếu cần.</li>
              </ul>
            </section>

            <div className="contact-box">
              <p>Cần hỗ trợ về vận chuyển?</p>
              <p>Hotline: <strong>0987 654 321</strong> · Email: <strong>hello@lemini.vn</strong></p>
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
        .container { max-width: 800px; margin: 0 auto; }
        .section { margin-bottom: 48px; }
        .section h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-border);
        }
        .section p { color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 12px; }
        .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0; }
        .info-card {
          background: var(--color-bg-alt);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px;
          text-align: center;
        }
        .info-icon { font-size: 28px; margin-bottom: 12px; }
        .info-card h3 { font-size: 14px; font-weight: 700; color: var(--color-primary); margin-bottom: 8px; }
        .info-card p { font-size: 14px; color: var(--color-text-secondary); margin: 0; line-height: 1.6; }
        .note { font-size: 13px; color: var(--color-text-muted); font-style: italic; }
        .fee-table {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin: 16px 0;
        }
        .fee-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-border);
          font-size: 14px;
          color: var(--color-text-secondary);
        }
        .fee-row:last-child { border-bottom: none; }
        .fee-row--header { background: var(--color-bg-alt); font-weight: 700; color: var(--color-primary); font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
        .free { color: #22c55e; font-weight: 700; }
        .list { padding-left: 20px; }
        .list li { color: var(--color-text-secondary); line-height: 2; font-size: 15px; }
        .contact-box {
          background: var(--color-accent-muted);
          border: 1px solid var(--color-accent-light);
          border-radius: var(--radius-md);
          padding: 24px 28px;
          text-align: center;
          margin-top: 40px;
        }
        .contact-box p { color: var(--color-text-secondary); margin: 4px 0; font-size: 15px; }
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

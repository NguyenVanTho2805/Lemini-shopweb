'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <div className="hero-inner">
            <p className="breadcrumb">Trang chủ / <span>Đổi trả & Hoàn tiền</span></p>
            <h1 className="title">Đổi Trả & Hoàn Tiền</h1>
            <p className="subtitle">Chính sách bảo vệ quyền lợi khách hàng của Lemini</p>
          </div>
        </div>

        <div className="content">
          <div className="container">
            <div className="policy-banner">
              <span className="banner-icon">🛡️</span>
              <p>Lemini cam kết đổi trả miễn phí trong vòng <strong>7 ngày</strong> nếu sản phẩm bị lỗi do nhà sản xuất.</p>
            </div>

            <section className="section">
              <h2>Điều kiện đổi trả</h2>
              <p>Sản phẩm được chấp nhận đổi trả khi đáp ứng <strong>tất cả</strong> các điều kiện sau:</p>
              <ul className="checklist">
                <li><span className="check">✓</span> Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                <li><span className="check">✓</span> Còn nguyên vẹn, chưa qua sử dụng</li>
                <li><span className="check">✓</span> Còn nguyên tem, nhãn, hộp đựng gốc</li>
                <li><span className="check">✓</span> Có hóa đơn mua hàng hoặc mã đơn hàng</li>
                <li><span className="check">✓</span> Có ảnh/video chứng minh lỗi sản phẩm</li>
              </ul>
            </section>

            <section className="section">
              <h2>Các trường hợp được đổi trả</h2>
              <div className="case-grid">
                <div className="case-card case-card--ok">
                  <h3>✅ Được đổi trả</h3>
                  <ul>
                    <li>Sản phẩm bị lỗi kỹ thuật (chỉ bung, thêu sai màu)</li>
                    <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
                    <li>Giao sai sản phẩm, sai màu, sai kích thước</li>
                    <li>Sản phẩm thiếu phụ kiện so với mô tả</li>
                  </ul>
                </div>
                <div className="case-card case-card--no">
                  <h3>❌ Không đổi trả</h3>
                  <ul>
                    <li>Sản phẩm đã qua sử dụng, giặt, tẩy</li>
                    <li>Quá 7 ngày kể từ ngày nhận hàng</li>
                    <li>Sản phẩm bị hỏng do tác động bên ngoài</li>
                    <li>Không còn tem nhãn hoặc hộp gốc</li>
                    <li>Lý do chủ quan (không thích, đổi ý)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Quy trình đổi trả</h2>
              <div className="steps">
                <div className="step">
                  <div className="step-num">1</div>
                  <div className="step-content">
                    <h3>Liên hệ Lemini</h3>
                    <p>Gửi email hoặc gọi hotline để thông báo yêu cầu đổi trả. Cung cấp mã đơn hàng và ảnh sản phẩm bị lỗi.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">2</div>
                  <div className="step-content">
                    <h3>Xác nhận yêu cầu</h3>
                    <p>Đội ngũ Lemini xem xét và xác nhận yêu cầu trong vòng 24 giờ làm việc.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">3</div>
                  <div className="step-content">
                    <h3>Gửi hàng về</h3>
                    <p>Đóng gói sản phẩm cẩn thận và gửi về địa chỉ kho của Lemini. Chi phí vận chuyển sẽ do Lemini hỗ trợ nếu lỗi từ phía chúng tôi.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">4</div>
                  <div className="step-content">
                    <h3>Hoàn tất</h3>
                    <p>Sau khi nhận và kiểm tra hàng, chúng tôi sẽ gửi sản phẩm mới hoặc hoàn tiền trong vòng 3–5 ngày làm việc.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Chính sách hoàn tiền</h2>
              <p>Trong trường hợp không có sản phẩm thay thế, Lemini sẽ hoàn tiền 100% giá trị sản phẩm (không bao gồm phí vận chuyển ban đầu).</p>
              <div className="refund-table">
                <div className="refund-row refund-row--header">
                  <span>Phương thức thanh toán</span>
                  <span>Thời gian hoàn tiền</span>
                </div>
                <div className="refund-row">
                  <span>Chuyển khoản ngân hàng</span>
                  <span>1 – 3 ngày làm việc</span>
                </div>
                <div className="refund-row">
                  <span>Ví điện tử (MoMo, ZaloPay)</span>
                  <span>1 – 2 ngày làm việc</span>
                </div>
                <div className="refund-row">
                  <span>Thanh toán khi nhận hàng (COD)</span>
                  <span>2 – 5 ngày làm việc</span>
                </div>
              </div>
            </section>

            <div className="contact-box">
              <p>Cần hỗ trợ đổi trả?</p>
              <p>Hotline: <strong>0987 654 321</strong> (8:00 – 22:00 hàng ngày)</p>
              <p>Email: <strong>returns@lemini.vn</strong></p>
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

        .policy-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--color-accent-muted);
          border: 1px solid var(--color-accent-light);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          margin-bottom: 48px;
        }
        .banner-icon { font-size: 28px; flex-shrink: 0; }
        .policy-banner p { color: var(--color-text-secondary); font-size: 15px; margin: 0; line-height: 1.6; }

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

        .checklist { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .checklist li { display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--color-text-secondary); }
        .check { color: #22c55e; font-weight: 700; font-size: 16px; }

        .case-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .case-card {
          border-radius: var(--radius-md);
          padding: 20px 24px;
          border: 1px solid var(--color-border);
        }
        .case-card h3 { font-size: 14px; font-weight: 700; margin-bottom: 14px; }
        .case-card ul { padding-left: 18px; display: flex; flex-direction: column; gap: 8px; }
        .case-card ul li { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; }
        .case-card--ok { background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); }
        .case-card--no { background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); }

        .steps { display: flex; flex-direction: column; gap: 0; }
        .step {
          display: flex;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .step:last-child { border-bottom: none; }
        .step-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-content h3 { font-size: 15px; font-weight: 700; color: var(--color-primary); margin-bottom: 6px; }
        .step-content p { font-size: 14px; color: var(--color-text-secondary); line-height: 1.7; margin: 0; }

        .refund-table {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-top: 16px;
        }
        .refund-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-border);
          font-size: 14px;
          color: var(--color-text-secondary);
        }
        .refund-row:last-child { border-bottom: none; }
        .refund-row--header { background: var(--color-bg-alt); font-weight: 700; color: var(--color-primary); font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }

        .contact-box {
          background: var(--color-bg-alt);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px 28px;
          text-align: center;
          margin-top: 40px;
        }
        .contact-box p { color: var(--color-text-secondary); margin: 6px 0; font-size: 15px; }

        @media (max-width: 768px) {
          .case-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

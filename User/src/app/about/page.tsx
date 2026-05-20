'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Scissors, Leaf, Award, Users } from 'lucide-react';

const VALUES = [
  {
    icon: Heart,
    title: 'Làm bằng tình yêu',
    desc: 'Mỗi mũi kim, mỗi cuộn chỉ đều chứa đựng tâm huyết và tình yêu của người thợ thêu Việt Nam.',
  },
  {
    icon: Scissors,
    title: 'Thủ công 100%',
    desc: 'Tất cả sản phẩm đều được thêu tay hoàn toàn — không máy móc, không hàng loạt.',
  },
  {
    icon: Leaf,
    title: 'Nguyên liệu tự nhiên',
    desc: 'Vải cotton, linen tự nhiên kết hợp chỉ thêu DMC chính hãng để mang lại chất lượng bền vững.',
  },
  {
    icon: Award,
    title: 'Chất lượng đảm bảo',
    desc: 'Kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng. Đổi trả trong 7 ngày nếu không hài lòng.',
  },
  {
    icon: Users,
    title: 'Cộng đồng thêu tay',
    desc: 'Lemini không chỉ là cửa hàng — chúng tôi là cộng đồng của những người yêu nghề thêu.',
  },
];

const TIMELINE = [
  { year: '2020', title: 'Bắt đầu từ niềm đam mê', desc: 'Lemini ra đời từ một góc nhỏ của cô gái trẻ yêu thêu tay ở Hà Nội.' },
  { year: '2021', title: 'Mở rộng ra cộng đồng', desc: 'Từ bán hàng cho bạn bè, Lemini bắt đầu có mặt trên các nền tảng mạng xã hội.' },
  { year: '2022', title: 'Ra mắt bộ kit DIY', desc: 'Dòng sản phẩm kit thêu tay cho người mới ra đời, giúp hàng ngàn người tiếp cận nghệ thuật thêu.' },
  { year: '2023', title: 'Workshop & Cộng đồng', desc: 'Tổ chức các workshop thêu tay trực tiếp và online thu hút hàng trăm người tham gia.' },
  { year: '2024', title: 'Ngày hôm nay', desc: 'Lemini tiếp tục lan tỏa vẻ đẹp của nghề thêu tay Việt Nam ra thế giới.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-bg">
            <img src="https://picsum.photos/1600/900?random=30" alt="Xưởng thêu Lemini" className="hero-img" />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            <p className="pre-title">Câu chuyện của chúng tôi</p>
            <h1 className="hero-title">
              Từng Mũi Kim<br />
              <em>Là Một Tình Yêu</em>
            </h1>
            <p className="hero-sub">
              Lemini được tạo ra từ niềm đam mê với nghề thêu tay truyền thống Việt Nam,
              mang vẻ đẹp thủ công đến với cuộc sống hiện đại.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="story-section">
          <div className="story-inner">
            <div className="story-img-wrap">
              <img src="https://picsum.photos/800/1000?random=31" alt="Người thợ thêu" className="story-img" />
            </div>
            <div className="story-text">
              <p className="story-label">Về Lemini</p>
              <h2 className="story-title">Khi Nghề Xưa Gặp Hơi Thở Mới</h2>
              <p className="story-body">
                Chúng tôi tin rằng trong thế giới ngập tràn sản phẩm công nghiệp, những món đồ được làm bằng tay
                mang một giá trị đặc biệt không thể thay thế. Mỗi sản phẩm của Lemini là một tác phẩm nghệ thuật
                nhỏ — được tạo ra bởi đôi tay tài hoa, trái tim nhiệt thành và hàng giờ miệt mài.
              </p>
              <p className="story-body">
                Tên thương hiệu <strong>Lemini</strong> (tên thương hiệu mang ý nghĩa nhỏ nhắn, tinh tế và đầy cảm xúc)
                nhắc nhở chúng tôi mỗi ngày rằng: công việc chúng tôi đang làm không chỉ là kinh doanh,
                mà là gìn giữ và lan tỏa một nét đẹp văn hóa của người Việt.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <span className="stat-num">500+</span>
                  <span className="stat-label">Sản phẩm đã bán</span>
                </div>
                <div className="stat">
                  <span className="stat-num">98%</span>
                  <span className="stat-label">Khách hàng hài lòng</span>
                </div>
                <div className="stat">
                  <span className="stat-num">4</span>
                  <span className="stat-label">Năm hoạt động</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section">
          <div className="values-inner">
            <div className="section-header">
              <h2 className="section-title">Giá Trị Cốt Lõi</h2>
              <p className="section-sub">Những điều chúng tôi tin và làm mỗi ngày.</p>
            </div>
            <div className="values-grid">
              {VALUES.map((v, idx) => (
                <div key={idx} className="value-card">
                  <div className="value-icon">
                    <v.icon size={24} />
                  </div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <div className="timeline-inner">
            <div className="section-header">
              <h2 className="section-title">Hành Trình Của Chúng Tôi</h2>
            </div>
            <div className="timeline">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team photo CTA */}
        <section className="cta-section">
          <div className="cta-inner">
            <img src="https://picsum.photos/1200/500?random=32" alt="Đội ngũ Lemini" className="cta-img" />
            <div className="cta-overlay" />
            <div className="cta-content">
              <h2 className="cta-title">Hãy Cùng Chúng Tôi<br />Lan Tỏa Vẻ Đẹp Thêu Tay</h2>
              <div className="cta-actions">
                <a href="/products" className="btn-primary-cta">Khám phá sản phẩm</a>
                <a href="/collections/bo-kit-diy" className="btn-ghost-cta">Thử thêu tay</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Hero */
        .hero {
          position: relative;
          height: 90vh;
          min-height: 560px;
          display: flex;
          align-items: flex-end;
          background-color: #2E1A4A;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(46,26,74,0.92) 0%, rgba(46,26,74,0.55) 40%, rgba(46,26,74,0.25) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          padding: 0 var(--section-pad-x) 80px;
          max-width: var(--container-max);
          margin: 0 auto;
          width: 100%;
        }

        .pre-title {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent-light);
          margin-bottom: 16px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 500;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero-title em {
          font-style: italic;
          color: var(--color-accent-light);
        }

        .hero-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          max-width: 560px;
          line-height: 1.8;
        }

        /* Story */
        .story-section {
          padding: 100px var(--section-pad-x);
        }

        .story-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-img-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/5;
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          margin-bottom: 16px;
        }

        .story-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .story-body {
          font-size: 15px;
          line-height: 1.9;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
        }

        .story-stats {
          display: flex;
          gap: 40px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid var(--color-border);
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 600;
          color: var(--color-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 13px;
          color: var(--color-text-muted);
        }

        /* Values */
        .values-section {
          padding: var(--section-pad-y) var(--section-pad-x);
          background: var(--color-bg-alt);
        }

        .values-inner {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 12px;
        }

        .section-sub {
          font-size: 15px;
          color: var(--color-text-muted);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .value-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 32px;
          border: 1px solid var(--color-border);
          transition: var(--transition-fast);
        }

        .value-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .value-icon {
          width: 52px;
          height: 52px;
          background: var(--color-accent-muted);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          margin-bottom: 20px;
        }

        .value-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 12px;
        }

        .value-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-text-secondary);
        }

        /* Timeline */
        .timeline-section {
          padding: var(--section-pad-y) var(--section-pad-x);
        }

        .timeline-inner {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-border);
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: calc(50% + 32px);
          padding-bottom: 40px;
          position: relative;
        }

        .timeline-item.right {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: calc(50% + 32px);
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 8px);
          width: 14px;
          height: 14px;
          background: var(--color-accent);
          border: 3px solid var(--color-bg);
          border-radius: 50%;
          box-shadow: 0 0 0 3px var(--color-accent-muted);
        }

        .timeline-card {
          background: var(--color-bg-alt);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 320px;
        }

        .timeline-year {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 8px;
        }

        .timeline-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 8px;
        }

        .timeline-desc {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* CTA */
        .cta-section {
          padding: var(--section-pad-y) var(--section-pad-x);
          background: var(--color-bg-alt);
        }

        .cta-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          height: 400px;
        }

        .cta-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: rgba(46,26,74,0.65);
        }

        .cta-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 4vw, 40px);
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 32px;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary-cta, .btn-ghost-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          padding: 0 32px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .btn-primary-cta {
          background: #fff;
          color: var(--color-primary);
        }

        .btn-primary-cta:hover {
          background: var(--color-accent-light);
        }

        .btn-ghost-cta {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.6);
        }

        .btn-ghost-cta:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .story-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .story-img-wrap {
            aspect-ratio: 3/2;
          }

          .timeline::before { left: 16px; }
          .timeline-item, .timeline-item.right {
            padding-left: 48px;
            padding-right: 0;
            justify-content: flex-start;
          }
          .timeline-dot {
            left: 16px;
          }
          .timeline-card { max-width: 100%; }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .cta-inner { height: 320px; }
        }

        @media (max-width: 640px) {
          .hero { height: 70vh; }
          .story-section { padding: 60px var(--section-pad-x); }
          .story-stats { gap: 24px; }
          .cta-inner { height: 280px; }
        }
      `}</style>
    </>
  );
}

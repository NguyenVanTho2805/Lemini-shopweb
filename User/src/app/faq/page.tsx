'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  emoji: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQSection[] = [
  {
    title: 'Đặt hàng & Thanh toán',
    emoji: '🛍️',
    items: [
      {
        q: 'Tôi có thể đặt hàng theo yêu cầu không?',
        a: 'Có! Lemini nhận thêu theo yêu cầu: thêu tên, initials, ngày tháng đặc biệt. Vui lòng ghi rõ nội dung cần thêu trong mục "Ghi chú" khi đặt hàng hoặc liên hệ trực tiếp qua hotline để được tư vấn.',
      },
      {
        q: 'Các phương thức thanh toán được chấp nhận?',
        a: 'Lemini chấp nhận 3 hình thức thanh toán: (1) Thanh toán khi nhận hàng (COD), (2) Chuyển khoản ngân hàng, (3) Ví MoMo. Thông tin tài khoản sẽ hiển thị ngay trong quá trình đặt hàng.',
      },
      {
        q: 'Đơn hàng có thể bị hủy sau khi đặt không?',
        a: 'Bạn có thể hủy đơn hàng khi đơn còn ở trạng thái "Chờ xác nhận". Sau khi shop đã xác nhận và chuyển sang "Đang giao", đơn hàng không thể hủy qua hệ thống. Trong trường hợp đó, vui lòng liên hệ trực tiếp với chúng tôi.',
      },
      {
        q: 'Có áp dụng mã giảm giá không?',
        a: 'Có! Bạn có thể nhập mã voucher tại bước thanh toán trong giỏ hàng. Mã giảm giá thường được phát qua bản tin email hoặc trang fanpage của Lemini. Hãy đăng ký nhận bản tin để không bỏ lỡ ưu đãi.',
      },
    ],
  },
  {
    title: 'Vận chuyển & Giao hàng',
    emoji: '🚚',
    items: [
      {
        q: 'Thời gian giao hàng là bao lâu?',
        a: 'Đối với các sản phẩm có sẵn: Nội thành TP.HCM & Hà Nội giao trong ngày hoặc 1–2 ngày, tỉnh thành khác 2–4 ngày, vùng sâu vùng xa 5–7 ngày. Sản phẩm theo yêu cầu cần thêm 3–5 ngày sản xuất.',
      },
      {
        q: 'Phí vận chuyển được tính như thế nào?',
        a: 'Đơn hàng từ 500.000₫ trở lên được MIỄN PHÍ vận chuyển toàn quốc. Đơn hàng dưới 500.000₫ áp dụng phí vận chuyển 30.000₫. Phí sẽ được tính tự động và hiển thị trước khi bạn xác nhận đặt hàng.',
      },
      {
        q: 'Tôi có thể theo dõi đơn hàng không?',
        a: 'Có! Sau khi đơn hàng được giao cho đơn vị vận chuyển, chúng tôi sẽ cập nhật mã vận đơn vào trang quản lý đơn hàng của bạn. Bạn cũng có thể liên hệ shop qua hotline để được hỗ trợ tra cứu.',
      },
    ],
  },
  {
    title: 'Đổi trả & Hoàn tiền',
    emoji: '🔄',
    items: [
      {
        q: 'Chính sách đổi trả như thế nào?',
        a: 'Lemini chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi kỹ thuật, thêu sai yêu cầu hoặc giao sai sản phẩm. Sản phẩm cần còn nguyên vẹn, chưa qua sử dụng và còn tem nhãn.',
      },
      {
        q: 'Những trường hợp nào không được đổi trả?',
        a: 'Không nhận đổi trả với: sản phẩm đã sử dụng hoặc giặt, sản phẩm bị hư do tác động bên ngoài (vết bẩn, rách), sản phẩm đặt làm theo yêu cầu cá nhân hóa (thêu tên, ngày tháng) trừ trường hợp shop thêu sai.',
      },
      {
        q: 'Thời gian hoàn tiền mất bao lâu?',
        a: 'Sau khi nhận và kiểm tra sản phẩm trả về (1–2 ngày làm việc), hoàn tiền sẽ được xử lý trong 3–5 ngày làm việc tùy phương thức thanh toán ban đầu.',
      },
    ],
  },
  {
    title: 'Sản phẩm & Chăm sóc',
    emoji: '🧵',
    items: [
      {
        q: 'Sản phẩm có bền không? Cách bảo quản như thế nào?',
        a: 'Các sản phẩm thêu của Lemini được làm từ chỉ DMC chính hãng và vải cao cấp, đảm bảo độ bền cao. Nên giặt tay nhẹ nhàng với nước lạnh, không vắt mạnh, phơi nơi thoáng mát tránh ánh nắng trực tiếp để giữ màu sắc đường thêu bền đẹp lâu dài.',
      },
      {
        q: 'Tôi mới học thêu, nên bắt đầu với sản phẩm nào?',
        a: 'Lemini có dòng Bộ Kit DIY đặc biệt dành cho người mới bắt đầu, bao gồm đầy đủ dụng cụ và hướng dẫn từng bước bằng tiếng Việt. Bắt đầu với "Bộ Kit Thêu Tay Cho Người Mới" là lựa chọn được nhiều khách hàng yêu thích.',
      },
      {
        q: 'Sản phẩm có thể làm quà tặng không? Có hộp quà không?',
        a: 'Tất cả sản phẩm Lemini đều phù hợp làm quà tặng. Bạn có thể chọn gói quà trong giỏ hàng trước khi thanh toán. Ngoài ra, dịch vụ thêu tên theo yêu cầu giúp món quà trở nên đặc biệt và cá nhân hóa hơn.',
      },
    ],
  },
  {
    title: 'Tài khoản & Bảo mật',
    emoji: '🔒',
    items: [
      {
        q: 'Tôi có cần tạo tài khoản để mua hàng không?',
        a: 'Bạn cần đăng nhập để hoàn tất đặt hàng và theo dõi đơn hàng. Tuy nhiên, bạn có thể duyệt và thêm sản phẩm vào giỏ hàng mà không cần tài khoản. Việc tạo tài khoản cũng giúp bạn lưu wishlist và xem lịch sử mua hàng.',
      },
      {
        q: 'Thông tin cá nhân của tôi có được bảo mật không?',
        a: 'Lemini cam kết bảo mật tuyệt đối thông tin khách hàng. Chúng tôi không chia sẻ thông tin cá nhân với bên thứ ba. Dữ liệu thanh toán được mã hóa an toàn và không được lưu trữ trực tiếp trên hệ thống.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #2E1A4A 0%, #5B3691 100%)',
          padding: '64px 24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
            Trung tâm hỗ trợ
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500, color: '#fff', marginBottom: 16 }}>
            Câu hỏi thường gặp
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Tìm câu trả lời nhanh cho các thắc mắc phổ biến về đặt hàng, vận chuyển và sản phẩm.
          </p>
        </div>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 24px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 13, color: '#aaa' }}>
            <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Trang chủ</Link>
            {' / '}
            <span style={{ color: '#555' }}>FAQ</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>

          {FAQ_DATA.map((section, si) => (
            <div key={si} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>{section.emoji}</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: '#2E1A4A' }}>
                  {section.title}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={ii} style={{
                      border: '1px solid',
                      borderColor: isOpen ? '#C4A8E8' : '#f0f0f0',
                      borderRadius: 10,
                      overflow: 'hidden',
                      background: isOpen ? '#faf8ff' : '#fff',
                      transition: 'border-color 0.2s, background 0.2s',
                      marginBottom: 4,
                    }}>
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%', textAlign: 'left',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          gap: 16, padding: '16px 20px',
                          border: 'none', background: 'transparent',
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5 }}>
                          {item.q}
                        </span>
                        <span style={{
                          flexShrink: 0,
                          width: 24, height: 24,
                          borderRadius: '50%',
                          background: isOpen ? '#2E1A4A' : '#f0f0f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.2s, transform 0.2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>
                          <ChevronDown size={14} color={isOpen ? '#fff' : '#888'} />
                        </span>
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 20px 18px', borderTop: '1px solid #ede8f5' }}>
                          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginTop: 14 }}>
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div style={{
            marginTop: 16,
            padding: '32px',
            background: 'linear-gradient(135deg, #f5f0ff 0%, #ede8ff 100%)',
            borderRadius: 16,
            textAlign: 'center',
          }}>
            <MessageCircle size={32} color="#7C3AED" strokeWidth={1.5} style={{ marginBottom: 12 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: '#2E1A4A', marginBottom: 8 }}>
              Không tìm thấy câu trả lời?
            </h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
              Đội ngũ hỗ trợ Lemini luôn sẵn sàng giúp bạn.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px',
              background: '#2E1A4A', color: '#fff',
              borderRadius: 999, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', transition: 'background 0.2s',
            }}>
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

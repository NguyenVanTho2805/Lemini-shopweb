import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{
        minHeight: '70vh', background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 24px', textAlign: 'center',
      }}>
        <div style={{
          fontSize: 72, lineHeight: 1, marginBottom: 4,
          userSelect: 'none',
        }}>🧵</div>
        <div style={{
          fontSize: 'clamp(80px, 16vw, 140px)', fontWeight: 900,
          color: '#f0eaf9', letterSpacing: '-6px', lineHeight: 1,
          marginBottom: 12, fontFamily: 'inherit',
        }}>
          404
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', marginBottom: 10 }}>
          Trang không tồn tại
        </h1>
        <p style={{ fontSize: 14, color: '#888', maxWidth: 360, lineHeight: 1.8, marginBottom: 36 }}>
          Có vẻ như đường chỉ bị đứt giữa chừng. Trang bạn tìm kiếm không còn ở đây nữa.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            padding: '12px 28px', background: '#2E1A4A', color: '#fff',
            borderRadius: 999, fontSize: 14, fontWeight: 700,
            textDecoration: 'none',
          }}>
            Về trang chủ
          </Link>
          <Link href="/products" style={{
            padding: '12px 28px', background: 'transparent', color: '#2E1A4A',
            border: '1.5px solid #2E1A4A',
            borderRadius: 999, fontSize: 14, fontWeight: 700,
            textDecoration: 'none',
          }}>
            Xem sản phẩm
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

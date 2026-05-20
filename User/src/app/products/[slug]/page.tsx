'use client';

import { useState, useEffect, useRef, use } from 'react';
import { createPortal } from 'react-dom';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Heart, Minus, Plus, ShoppingCart, Zap, Truck, RotateCcw, ShieldCheck, Star, ChevronDown, ChevronRight, Send, X, ChevronLeft, Link2, Check, ZoomIn, Ruler, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts, mockCategories, mockReviews } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';
import { useRecentlyViewed, addToRecentlyViewed } from '@/lib/useRecentlyViewed';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = mockProducts.find(p => p.slug === slug);
  if (!product) notFound();

  const category = mockCategories.find(c => c.slug === product.category);
  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const { addToCart, openCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.inStock === false;

  const [activeImg, setActiveImg]         = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? null);
  const [selectedSize, setSelectedSize]   = useState<string | null>(null);
  const [qty, setQty]                     = useState(1);
  const [added, setAdded]                 = useState(false);
  const [openDesc, setOpenDesc]           = useState(true);
  const [openDetails, setOpenDetails]     = useState(false);
  const [openCare, setOpenCare]           = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen]     = useState(false);
  const [lightboxIdx, setLightboxIdx]       = useState(0);

  // Sticky bar
  const actionRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky]         = useState(false);

  // Size guide
  const [showSizeGuide, setShowSizeGuide]   = useState(false);

  // Share
  const [linkCopied, setLinkCopied]         = useState(false);

  // Recently viewed
  const recentlyViewed = useRecentlyViewed(product.id);
  useEffect(() => { addToRecentlyViewed(product); }, [product.id]);

  // Sticky bar via IntersectionObserver
  useEffect(() => {
    if (!actionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(actionRef.current);
    return () => obs.disconnect();
  }, []);

  // Review form state
  const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API ?? 'http://localhost:3001';
  interface UserReview { id: number | string; author: string; rating: number; content: string; date: string; }
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName]         = useState('');
  const [reviewRating, setReviewRating]     = useState(5);
  const [reviewHover, setReviewHover]       = useState(0);
  const [reviewContent, setReviewContent]   = useState('');
  const [userReviews, setUserReviews]       = useState<UserReview[]>([]);
  const [reviewDone, setReviewDone]         = useState(false);

  useEffect(() => {
    fetch(`${ADMIN_API}/api/reviews?productId=${product.id}&status=approved`)
      .then(r => r.json())
      .then((data: { id: string; author: string; rating: number; content: string; createdAt: string }[]) => {
        setUserReviews(data.map(r => ({
          id: r.id,
          author: r.author,
          rating: r.rating,
          content: r.content,
          date: new Date(r.createdAt).toLocaleDateString('vi-VN'),
        })));
      })
      .catch(() => {});
  }, [product.id]);

  const images = product.images ?? [product.image];
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const allReviews = [...userReviews, ...mockReviews];
  const avgRating = allReviews.length > 0
    ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10
    : 5;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart(product, { color: selectedColor ?? undefined, size: selectedSize ?? undefined, qty });
    setAdded(true);
    showToast(`Đã thêm vào giỏ hàng`, 'success', { label: 'Xem giỏ', onClick: openCart });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleNotifyMe = () => {
    if (!wishlisted) {
      toggle(product);
      showToast('Đã lưu! Chúng tôi sẽ liên hệ khi sản phẩm có hàng trở lại.', 'info');
    } else {
      showToast('Bạn đã theo dõi sản phẩm này rồi.', 'info');
    }
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    addToCart(product, { color: selectedColor ?? undefined, size: selectedSize ?? undefined, qty });
    openCart();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const lightboxImages = images;
  const lightboxPrev = () => setLightboxIdx(i => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const lightboxNext = () => setLightboxIdx(i => (i + 1) % lightboxImages.length);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim()) return;
    try {
      await fetch(`${ADMIN_API}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          author: reviewName.trim(),
          rating: reviewRating,
          content: reviewContent.trim(),
        }),
      });
    } catch { /* fire-and-forget, still show success */ }
    setReviewName('');
    setReviewContent('');
    setReviewRating(5);
    setReviewDone(true);
    setShowReviewForm(false);
    setTimeout(() => setReviewDone(false), 4000);
  };

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#aaa' }}>
            <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/products" style={{ color: '#aaa', textDecoration: 'none' }}>Sản phẩm</Link>
            {category && (
              <>
                <ChevronRight size={12} />
                <Link href={`/collections/${category.slug}`} style={{ color: '#aaa', textDecoration: 'none' }}>{category.name}</Link>
              </>
            )}
            <ChevronRight size={12} />
            <span style={{ color: '#333', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>

        {/* Main product layout */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
          <div className="product-layout">

            {/* ── Gallery ── */}
            <div className="gallery">
              {/* Vertical thumbnails */}
              {images.length > 1 && (
                <div className="thumbs-col">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImg(idx)} style={{
                      width: 76, height: 76, padding: 0,
                      border: `2px solid ${activeImg === idx ? '#2E1A4A' : '#e8e8e8'}`,
                      borderRadius: 8, overflow: 'hidden',
                      cursor: 'pointer', background: '#f5f5f5', flexShrink: 0,
                      transition: 'border-color 0.15s',
                    }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div
                style={{ flex: 1, position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#f5f5f5', aspectRatio: '4/5', cursor: 'zoom-in' }}
                onClick={() => { setLightboxIdx(activeImg); setLightboxOpen(true); }}
              >
                <img src={images[activeImg]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(0,0,0,0.45)', color: '#fff',
                  borderRadius: 6, padding: '5px 10px',
                  fontSize: 11, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 4,
                  pointerEvents: 'none',
                }}>
                  <ZoomIn size={12} />
                  Phóng to
                </div>
                {product.badge && (
                  <span style={{
                    position: 'absolute', top: 14, left: 14,
                    background: product.badge === 'sale' ? '#e53935' : product.badge === 'new' ? '#2E1A4A' : '#ff6d00',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 5, letterSpacing: '0.05em',
                  }}>
                    {product.badge === 'sale' ? `-${discountPct}%` : product.badge === 'new' ? 'Mới' : 'Hot'}
                  </span>
                )}
              </div>
            </div>

            {/* ── Product info ── */}
            <div className="info-col">

              {/* Category + name */}
              {category && (
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9B72CF', marginBottom: 8 }}>
                  {category.name}
                </p>
              )}
              <h1 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.5px' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>{avgRating}.0</span>
                <span style={{ color: '#e0e0e0' }}>|</span>
                <span style={{ fontSize: 13, color: '#888' }}>{mockReviews.length} đánh giá</span>
                <span style={{ color: '#e0e0e0' }}>|</span>
                <span style={{ fontSize: 13, color: '#888' }}>Đã bán 120+</span>
              </div>

              {/* Price */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#fafafa', borderRadius: 10,
                padding: '14px 16px', marginBottom: 20,
              }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#e53935', letterSpacing: '-1px' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: 16, color: '#bbb', textDecoration: 'line-through' }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span style={{
                      background: '#e53935', color: '#fff',
                      fontSize: 12, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 4,
                    }}>
                      -{discountPct}%
                    </span>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>
                    Màu sắc: <strong style={{ color: '#1a1a1a' }}>{selectedColor ?? 'Chưa chọn'}</strong>
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} title={color} style={{
                        width: 30, height: 30,
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: `3px solid ${selectedColor === color ? '#1a1a1a' : 'transparent'}`,
                        outline: selectedColor === color ? '2px solid #1a1a1a' : '2px solid transparent',
                        outlineOffset: 2,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        padding: 0,
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <p style={{ fontSize: 13, color: '#555' }}>
                      Kích thước: <strong style={{ color: '#1a1a1a' }}>{selectedSize ?? 'Chưa chọn'}</strong>
                    </p>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      style={{ fontSize: 12, color: '#9B72CF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Ruler size={12} />
                      Hướng dẫn chọn size
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)} style={{
                        minWidth: 44, height: 44,
                        padding: '0 14px',
                        border: `1.5px solid ${selectedSize === size ? '#1a1a1a' : '#e0e0e0'}`,
                        borderRadius: 8,
                        background: selectedSize === size ? '#1a1a1a' : '#fff',
                        color: selectedSize === size ? '#fff' : '#333',
                        fontSize: 13, fontWeight: selectedSize === size ? 700 : 400,
                        cursor: 'pointer', transition: 'all 0.15s',
                        fontFamily: 'inherit',
                      }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: '#555' }}>Số lượng:</span>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  border: '1.5px solid #e0e0e0', borderRadius: 8, overflow: 'hidden',
                }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                    width: 40, height: 40, border: 'none', background: '#fafafa',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#555', fontSize: 16,
                  }}>
                    <Minus size={13} />
                  </button>
                  <span style={{
                    width: 48, textAlign: 'center', fontSize: 14, fontWeight: 700,
                    borderLeft: '1px solid #e8e8e8', borderRight: '1px solid #e8e8e8',
                    lineHeight: '40px', color: '#1a1a1a',
                  }}>
                    {qty}
                  </span>
                  <button onClick={() => setQty(q => q + 1)} style={{
                    width: 40, height: 40, border: 'none', background: '#fafafa',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#555',
                  }}>
                    <Plus size={13} />
                  </button>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 600,
                  color: outOfStock ? '#e53935' : '#2d7a4a',
                  background: outOfStock ? '#fff0f0' : '#f0fff4',
                  padding: '3px 10px', borderRadius: 999,
                }}>
                  {outOfStock ? 'Hết hàng' : 'Còn hàng'}
                </span>
              </div>

              {/* Low stock */}
              {typeof product.stock === 'number' && product.stock <= 5 && !outOfStock && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 14px', marginBottom: 4,
                  background: '#fffbeb', border: '1px solid #fde68a',
                  borderRadius: 8, fontSize: 13, color: '#b45309', fontWeight: 600,
                }}>
                  ⚡ Chỉ còn {product.stock} sản phẩm — Đặt hàng sớm!
                </div>
              )}

              {/* Action buttons */}
              <div ref={actionRef} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                {outOfStock ? (
                  <button
                    onClick={handleNotifyMe}
                    style={{
                      flex: 1, height: 50,
                      border: `1.5px solid ${wishlisted ? '#C4A8E8' : '#2E1A4A'}`,
                      borderRadius: 8,
                      background: wishlisted ? '#f5f0ff' : '#2E1A4A',
                      color: wishlisted ? '#9B72CF' : '#fff',
                      fontSize: 14, fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 8,
                      transition: 'all 0.2s', fontFamily: 'inherit',
                    }}
                  >
                    <Bell size={16} />
                    {wishlisted ? 'Đang theo dõi' : 'Thông báo khi có hàng'}
                  </button>
                ) : (
                <>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, height: 50,
                    border: `1.5px solid ${added ? '#2d7a4a' : '#2E1A4A'}`,
                    borderRadius: 8,
                    background: added ? '#2d7a4a' : '#fff',
                    color: added ? '#fff' : '#2E1A4A',
                    fontSize: 14, fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                    transition: 'all 0.2s', fontFamily: 'inherit',
                    letterSpacing: '0.3px',
                  }}
                >
                  <ShoppingCart size={16} />
                  {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
                </button>
                <button
                  onClick={handleBuyNow}
                  style={{
                    flex: 1, height: 50,
                    border: 'none', borderRadius: 8,
                    background: '#2E1A4A',
                    color: '#fff',
                    fontSize: 14, fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s', fontFamily: 'inherit',
                    letterSpacing: '0.3px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#3D2560'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2E1A4A'; }}
                >
                  <Zap size={16} />
                  Mua ngay
                </button>
                </>
                )}
              </div>

              {/* Wishlist */}
              <button onClick={() => toggle(product)} style={{
                width: '100%', height: 42,
                border: `1.5px solid ${wishlisted ? '#e53935' : '#e8e8e8'}`,
                borderRadius: 8, background: wishlisted ? '#fff5f5' : '#fff',
                color: wishlisted ? '#e53935' : '#888',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all 0.2s', fontFamily: 'inherit', marginBottom: 20,
              }}>
                <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Đã thêm vào yêu thích' : 'Thêm vào danh sách yêu thích'}
              </button>

              {/* Share */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: '#aaa', fontWeight: 500 }}>Chia sẻ:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: '#1877f2', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', flexShrink: 0,
                  }}
                  title="Chia sẻ lên Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <button
                  onClick={handleCopyLink}
                  title="Sao chép link"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: linkCopied ? '#2d7a4a' : '#f0f0f0',
                    color: linkCopied ? '#fff' : '#555',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', flexShrink: 0,
                  }}
                >
                  {linkCopied ? <Check size={15} /> : <Link2 size={15} />}
                </button>
                {linkCopied && (
                  <span style={{ fontSize: 12, color: '#2d7a4a', fontWeight: 500 }}>Đã sao chép!</span>
                )}
              </div>

              {/* Shipping & policies */}
              <div style={{
                border: '1px solid #f0f0f0', borderRadius: 10,
                overflow: 'hidden',
              }}>
                {[
                  { icon: <Truck size={15} color="#2E1A4A" />, text: 'Miễn phí vận chuyển đơn từ 500.000đ' },
                  { icon: <RotateCcw size={15} color="#2E1A4A" />, text: 'Đổi trả miễn phí trong 7 ngày' },
                  { icon: <ShieldCheck size={15} color="#2E1A4A" />, text: '100% thêu tay, chính hãng Lemini' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 14px',
                    borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none',
                    background: '#fff',
                  }}>
                    {item.icon}
                    <span style={{ fontSize: 13, color: '#555' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description accordions ── */}
        <div style={{ borderTop: '8px solid #f5f5f5' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            {[
              { label: 'Mô tả sản phẩm', open: openDesc, toggle: () => setOpenDesc(v => !v), content: (
                <p style={{ fontSize: 14, lineHeight: 2, color: '#555', maxWidth: 760 }}>{product.description}</p>
              )},
              { label: 'Thông tin chi tiết', open: openDetails, toggle: () => setOpenDetails(v => !v), content: product.details && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.details.map((d, i) => (
                    <li key={i} style={{ fontSize: 14, color: '#555', lineHeight: 1.7, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#9B72CF', fontWeight: 700 }}>—</span> {d}
                    </li>
                  ))}
                </ul>
              )},
              { label: 'Hướng dẫn bảo quản', open: openCare, toggle: () => setOpenCare(v => !v), content: product.care && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.care.map((c, i) => (
                    <li key={i} style={{ fontSize: 14, color: '#555', lineHeight: 1.7, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#9B72CF', fontWeight: 700 }}>—</span> {c}
                    </li>
                  ))}
                </ul>
              )},
            ].map((acc, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <button onClick={acc.toggle} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', border: 'none', background: 'transparent',
                  fontSize: 14, fontWeight: 700, color: '#1a1a1a',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}>
                  {acc.label}
                  <ChevronDown size={16} color="#888" style={{ transform: acc.open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {acc.open && acc.content && (
                  <div style={{ paddingBottom: 20 }}>{acc.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Reviews ── */}
        <div style={{ borderTop: '8px solid #f5f5f5', padding: '40px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Rating summary */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 4 }}>Đánh giá sản phẩm</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>5.0</span>
                  <div>
                    <div style={{ display: 'flex', gap: 2, color: '#f59e0b', marginBottom: 3 }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <span style={{ fontSize: 12, color: '#aaa' }}>{mockReviews.length + userReviews.length} đánh giá</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowReviewForm(v => !v)}
                style={{
                  padding: '10px 20px',
                  border: '1.5px solid #2E1A4A',
                  borderRadius: 999,
                  background: showReviewForm ? '#2E1A4A' : 'transparent',
                  color: showReviewForm ? '#fff' : '#2E1A4A',
                  fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <Star size={13} fill={showReviewForm ? 'currentColor' : 'none'} />
                {showReviewForm ? 'Đóng' : 'Viết đánh giá'}
              </button>
            </div>

            {/* Success banner */}
            {reviewDone && (
              <div style={{
                background: '#f0fff4', border: '1px solid #bbf7d0',
                borderRadius: 10, padding: '14px 18px',
                fontSize: 14, color: '#166534', fontWeight: 500,
                marginBottom: 20,
              }}>
                🎉 Cảm ơn bạn đã gửi đánh giá! Đánh giá sẽ hiển thị sau khi được admin duyệt.
              </div>
            )}

            {/* Review form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} style={{
                background: '#fafafa', border: '1px solid #f0f0f0',
                borderRadius: 14, padding: '24px',
                marginBottom: 32,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>
                  Chia sẻ trải nghiệm của bạn
                </h3>

                {/* Star rating */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, color: '#555', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                    Đánh giá của bạn *
                  </label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3,4,5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setReviewHover(s)}
                        onMouseLeave={() => setReviewHover(0)}
                        onClick={() => setReviewRating(s)}
                        style={{
                          background: 'none', border: 'none', padding: 2,
                          cursor: 'pointer', color: '#f59e0b',
                          transition: 'transform 0.1s',
                          transform: reviewHover >= s || reviewRating >= s ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        <Star
                          size={28}
                          fill={(reviewHover || reviewRating) >= s ? 'currentColor' : 'none'}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: 13, color: '#888', alignSelf: 'center', marginLeft: 8 }}>
                      {['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'][reviewHover || reviewRating]}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, color: '#555', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="Nguyễn Thị Lan"
                    required
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '1.5px solid #e0e0e0', borderRadius: 8,
                      fontSize: 14, fontFamily: 'inherit',
                      outline: 'none', background: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, color: '#555', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                    Nội dung đánh giá *
                  </label>
                  <textarea
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                    placeholder="Chia sẻ chi tiết về sản phẩm, chất lượng, màu sắc, kích thước..."
                    required
                    rows={4}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '1.5px solid #e0e0e0', borderRadius: 8,
                      fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6,
                      outline: 'none', resize: 'vertical', background: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button type="submit" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '11px 24px',
                  background: '#2E1A4A', color: '#fff',
                  border: 'none', borderRadius: 8,
                  fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Send size={14} />
                  Gửi đánh giá
                </button>
              </form>
            )}

            {/* Review cards */}
            <div className="reviews-grid">
              {[...userReviews, ...mockReviews].map(review => (
                <div key={review.id} style={{
                  border: '1px solid #f0f0f0', borderRadius: 12,
                  padding: '20px', background: '#fff',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{review.author}</p>
                      <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={12} fill={s <= review.rating ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: '#ccc' }}>Đã mua hàng</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div style={{ borderTop: '8px solid #f5f5f5', padding: '40px 24px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a' }}>Sản phẩm liên quan</h2>
                <Link href="/products" style={{
                  fontSize: 13, color: '#2E1A4A', fontWeight: 600,
                  textDecoration: 'none', padding: '7px 16px',
                  border: '1.5px solid #2E1A4A', borderRadius: 999,
                }}>
                  Xem tất cả →
                </Link>
              </div>
              <div className="related-grid">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        )}

        {/* ── Recently Viewed ── */}
        {recentlyViewed.length > 0 && (
          <div style={{ borderTop: '8px solid #f5f5f5', padding: '40px 24px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>
                Đã xem gần đây
              </h2>
              <div className="related-grid">
                {recentlyViewed.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* ── Sticky add-to-cart bar ── */}
      {showSticky && typeof window !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: '#fff', borderTop: '1px solid #f0f0f0',
          padding: '12px 24px', zIndex: 9980,
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          animation: 'stickyUp 0.25s ease',
        }}>
          <img src={product.image} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#e53935' }}>{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            style={{
              padding: '11px 28px',
              background: outOfStock ? '#e0e0e0' : added ? '#2d7a4a' : '#2E1A4A',
              color: outOfStock ? '#aaa' : '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 700,
              cursor: outOfStock ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              fontFamily: 'inherit', flexShrink: 0,
            }}
          >
            <ShoppingCart size={15} />
            {outOfStock ? 'Hết hàng' : added ? 'Đã thêm!' : 'Thêm vào giỏ'}
          </button>
          <style>{`@keyframes stickyUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        </div>,
        document.body
      )}

      {/* ── Image Lightbox ── */}
      {lightboxOpen && typeof window !== 'undefined' && createPortal(
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99997,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Close */}
          <button onClick={() => setLightboxOpen(false)} style={{
            position: 'absolute', top: 20, right: 20,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={20} /></button>

          {/* Prev */}
          {lightboxImages.length > 1 && (
            <button onClick={lightboxPrev} style={{
              position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><ChevronLeft size={22} /></button>
          )}

          {/* Image */}
          <img
            src={lightboxImages[lightboxIdx]}
            alt={product.name}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              objectFit: 'contain', borderRadius: 8,
              animation: 'fadeIn 0.15s ease',
            }}
          />

          {/* Next */}
          {lightboxImages.length > 1 && (
            <button onClick={lightboxNext} style={{
              position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><ChevronRight size={22} /></button>
          )}

          {/* Dots */}
          {lightboxImages.length > 1 && (
            <div style={{ position: 'absolute', bottom: 24, display: 'flex', gap: 8 }}>
              {lightboxImages.map((_, i) => (
                <button key={i} onClick={() => setLightboxIdx(i)} style={{
                  width: i === lightboxIdx ? 20 : 8,
                  height: 8, borderRadius: 999,
                  background: i === lightboxIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.2s',
                }} />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}

      {/* ── Size Guide Modal ── */}
      {showSizeGuide && typeof window !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99996,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div onClick={() => setShowSizeGuide(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} />
          <div style={{
            position: 'relative', background: '#fff', borderRadius: 16,
            padding: '32px', maxWidth: 540, width: '100%',
            maxHeight: '85vh', overflowY: 'auto',
            animation: 'qvScaleIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
          }}>
            <button onClick={() => setShowSizeGuide(false)} style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              background: '#f5f5f5', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555',
            }}><X size={15} /></button>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 6 }}>Hướng dẫn chọn size</h3>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Tất cả số đo tính bằng cm. Đo ở trạng thái thoải mái nhất.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#2E1A4A', color: '#fff' }}>
                  {['Kích thước', 'Chiều rộng (cm)', 'Chiều cao (cm)', 'Phù hợp với'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['15cm', '15', '15', 'Treo tường nhỏ, quà tặng'],
                  ['20cm', '20', '20', 'Trang trí bàn làm việc'],
                  ['25cm', '25', '25', 'Trang trí phòng ngủ'],
                  ['30x40cm', '30', '40', 'Tranh treo tường lớn'],
                  ['38x40cm', '38', '40', 'Túi tote tiêu chuẩn'],
                ].map(([size, w, h, note], i) => (
                  <tr key={size} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#2E1A4A' }}>{size}</td>
                    <td style={{ padding: '10px 14px', color: '#555' }}>{w}</td>
                    <td style={{ padding: '10px 14px', color: '#555' }}>{h}</td>
                    <td style={{ padding: '10px 14px', color: '#888' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 20, padding: '14px 16px', background: '#fdf6ff', borderRadius: 10, fontSize: 13, color: '#7c3aed' }}>
              <strong>Mẹo:</strong> Nếu bạn không chắc, hãy liên hệ shop qua hotline <strong>0987 654 321</strong> — chúng tôi sẽ tư vấn cụ thể cho từng sản phẩm!
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx global>{`
        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .gallery {
          display: flex;
          gap: 12px;
          position: sticky;
          top: 20px;
        }
        .thumbs-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-col {
          padding-top: 4px;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .product-layout { grid-template-columns: 1fr; gap: 28px; }
          .gallery { position: static; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .related-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .thumbs-col { flex-direction: row; }
          .gallery { flex-direction: column; }
        }
      `}</style>
    </>
  );
}

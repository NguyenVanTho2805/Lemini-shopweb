# ═══════════════════════════════════════════════════════
#  MASTER PROMPT — MIRA EMB WEBSHOP
#  Copy toàn bộ phần dưới đây, paste vào đầu mỗi cuộc trò chuyện
# ═══════════════════════════════════════════════════════

---

## 🧠 BỐI CẢNH DỰ ÁN

Bạn đang giúp tôi xây dựng webshop **Mira Emb** — cửa hàng bán sản phẩm thêu tay handmade Việt Nam.

Tham khảo thiết kế từ: **coolmate.me** (phong cách, cấu trúc) nhưng áp dụng cho thương hiệu thêu tay nữ tính.

---

## 🎨 DESIGN SYSTEM — BẮT BUỘC TUÂN THỦ

### Màu sắc (Lavender Dust Palette)
```
--color-primary:       #2E1A4A   → Header, nút chính, text đậm
--color-primary-hover: #3D2560   → Hover trên primary
--color-accent:        #9B72CF   → CTA button, badge, icon nổi bật
--color-accent-light:  #C4A8E8   → Hover state, border nhấn
--color-accent-muted:  rgba(155,114,207,0.12)

--color-bg:            #FAF8FF   → Nền trang chính
--color-bg-alt:        #F3EEFF   → Section xen kẽ
--color-bg-soft:       #EDE0FF   → Card image background
--color-surface:       #FFFFFF   → Card, modal

--color-border:        #EDE0FF
--color-border-subtle: #F5EEFF

--color-text:          #1A0D2E   → Chữ chính
--color-text-secondary:#5A3F6F   → Chữ phụ
--color-text-muted:    #9B84B3   → Placeholder

--color-sale:          #C44B7A   → Badge sale
--color-new:           #9B72CF   → Badge mới
--color-hot:           #2E1A4A   → Badge hot
```

### Typography
```
--font-display: 'Cormorant Garamond', Georgia, serif
  → Dùng cho: tiêu đề section, tên sản phẩm, hero title
  → Weight: 300 (light), 400 (regular), 500 (medium)
  → Hay dùng italic cho điểm nhấn

--font-body: 'DM Sans', system-ui, sans-serif
  → Dùng cho: body text, nav, button, label, price
  → Weight: 400 (regular), 500 (medium), 600 (semibold)
```

### Phong cách thiết kế
- **Tông:** Nhẹ nhàng, nữ tính, tinh tế — KHÔNG lạnh lẽo tech-y
- **Layout:** Fashion editorial — giống Coolmate nhưng tone lavender
- **Border radius:** 2px cho button/badge (sắc nét), 6px cho card, 9999px cho pill
- **Shadow:** Rất nhẹ, tinh tế — `0 1px 3px rgba(46,26,74,0.06)`
- **Animation:** Subtle — hover translateY(-2px), scale(1.04) trên ảnh
- **Spacing:** Generous padding, nhiều khoảng trắng

---

## 🏗️ TECH STACK

```
Framework:  Next.js 14 (App Router)
Language:   TypeScript strict (không dùng any)
Styling:    CSS-in-JSX với styled-jsx (đã setup sẵn)
State:      useState cho local, Zustand cho cart
Database:   Supabase (chưa kết nối, dùng mock data)
Payment:    Stripe (chưa tích hợp)
Hosting:    Vercel
```

---

## 📁 CẤU TRÚC PROJECT ĐÃ CÓ

```
src/
├── app/
│   ├── layout.tsx          ✅ Root layout + Google Fonts
│   └── page.tsx            ✅ Trang chủ hoàn chỉnh
├── components/
│   ├── layout/
│   │   ├── Header.tsx      ✅ Nav sticky, mobile menu, cart badge
│   │   └── Footer.tsx      ✅ 3 cột, social links, payment chips
│   ├── sections/
│   │   ├── HeroSection.tsx       ✅
│   │   ├── MarqueeSection.tsx    ✅ Chạy chữ branding
│   │   ├── TrustBar.tsx          ✅ 4 stats: khách hàng, đánh giá...
│   │   ├── CategoriesSection.tsx ✅ Grid bất đối xứng
│   │   └── HomeSections.tsx      ✅ Products, Banners, Benefits,
│   │                                 Reviews, Instagram
│   └── ui/
│       └── ProductCard.tsx ✅ Card với badge, wishlist, size, màu
├── lib/
│   ├── data.ts             ✅ Mock data (products, categories, reviews)
│   └── utils.ts            ✅ formatPrice (VNĐ), cn()
├── styles/
│   └── tokens.css          ✅ Toàn bộ CSS variables
└── types/index.ts          ✅ TypeScript interfaces
```

---

## 🧩 COMPONENT PATTERNS ĐÃ ĐỊNH NGHĨA

### Section wrapper chuẩn
```tsx
<section className="section">
  <div className="section-inner">
    <div className="sec-header">
      <h2 className="sec-title">Tên section</h2>
      <p className="sec-sub">Mô tả phụ</p>
    </div>
    {/* content */}
  </div>
  <style jsx>{`
    .section { padding: var(--section-pad-y) var(--section-pad-x); }
    .section-inner { max-width: var(--container-max); margin: 0 auto; }
    .sec-title { font-family: var(--font-display); font-size: clamp(24px,3vw,32px); font-weight: 300; color: var(--color-primary); }
    .sec-sub { font-size: 12px; color: var(--color-text-muted); }
  `}</style>
</section>
```

### Button primary
```tsx
<button style={{
  background: 'var(--color-primary)', color: '#fff',
  fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
  padding: '14px 32px', borderRadius: 'var(--radius-sm)',
  border: 'none', fontWeight: 600, cursor: 'pointer',
  fontFamily: 'var(--font-body)'
}}>
  Tên nút
</button>
```

### Button ghost
```tsx
<button style={{
  background: 'transparent', color: 'var(--color-primary)',
  fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
  padding: '13px 24px', borderRadius: 'var(--radius-sm)',
  border: '1.5px solid var(--color-accent-light)',
  fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)'
}}>
  Tên nút
</button>
```

### Badge
```tsx
// New
<span style={{ background: 'var(--color-new)', color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 'var(--radius-sm)' }}>Mới</span>
// Sale
<span style={{ background: 'var(--color-sale)', ... }}>−20%</span>
```

### Giá tiền
```tsx
import { formatPrice } from '@/lib/utils'
// formatPrice(285000) → "285.000₫"

<span style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
  {formatPrice(product.price)}
</span>
```

---

## 🎯 THÔNG TIN THƯƠNG HIỆU

```
Tên shop:      Mira Emb
Tagline:       "Từng mũi kim là một tình yêu"
Handle:        @miraemb.vn
Sản phẩm:      Thêu tay handmade (tranh thêu, vòng thêu, bộ kit DIY, quà tặng)
Khách hàng:    Nữ, 18–35 tuổi, thích handmade, thẩm mỹ tốt
Tông giọng:    Ấm áp, chân thành, nghệ thuật — KHÔNG formal, KHÔNG sales-y
Giá:           150.000₫ – 650.000₫
```

---

## ✅ QUY TẮC CODE BẮT BUỘC

1. **TypeScript strict** — không dùng `any`, type đầy đủ
2. **CSS variables** — mọi màu dùng `var(--color-*)`, không hardcode hex
3. **Font** — tiêu đề dùng `var(--font-display)`, body dùng `var(--font-body)`
4. **Mobile-first** — thiết kế từ 375px, breakpoint chính: 640px, 768px, 1024px
5. **Semantic HTML** — `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`
6. **Accessibility** — `aria-label` cho icon buttons, `alt` cho ảnh
7. **Giá VNĐ** — luôn dùng `formatPrice()` từ `@/lib/utils`
8. **Component size** — tối đa 200 dòng, tách sub-component nếu cần
9. **Loading state** — mọi component fetch data phải có skeleton
10. **Không gradient button** — button luôn flat color

---

## 🚫 TUYỆT ĐỐI KHÔNG

- Dùng màu ngoài design system (hardcode hex)
- Dùng font Inter, Roboto, Arial, system-ui cho display text
- Dùng `!important` trong CSS
- Tạo component > 200 dòng không tách nhỏ
- Dùng inline style cho layout chính (dùng styled-jsx)
- Gradient trên button
- Bo góc > 6px trên card sản phẩm

---

## 📋 TRẠNG THÁI DỰ ÁN

### ✅ Đã hoàn thành
- Trang chủ đầy đủ (Header → Hero → Marquee → Trust → Categories → Products → Banners → Benefits → Reviews → Instagram → Footer)
- Design system + tokens.css
- ProductCard component
- Mock data

### 🚧 Cần làm tiếp
- [ ] Trang danh sách sản phẩm `/products`
- [ ] Trang chi tiết sản phẩm `/products/[slug]`
- [ ] Giỏ hàng `/cart` + CartDrawer
- [ ] Checkout `/checkout`
- [ ] Trang bộ sưu tập `/collections/[slug]`
- [ ] Kết nối Supabase
- [ ] Stripe payment
- [ ] Auth (đăng nhập/đăng ký)

---

## 💬 CÁCH SỬ DỤNG PROMPT NÀY

**Bắt đầu session mới**, paste prompt này rồi thêm yêu cầu cụ thể:

```
[PASTE TOÀN BỘ PROMPT Ở TRÊN]

---
NHIỆM VỤ HÔM NAY:
Tạo trang [TÊN TRANG] với các yêu cầu sau:
- [yêu cầu 1]
- [yêu cầu 2]
```

---

## 📌 PROMPT MẪU CHO TỪNG TRANG

### Trang chi tiết sản phẩm
```
[PASTE MASTER PROMPT]

NHIỆM VỤ: Tạo trang chi tiết sản phẩm tại src/app/products/[slug]/page.tsx

Yêu cầu UI:
- Gallery ảnh: 1 ảnh to bên trái + thumbnails nhỏ bên dưới
- Bên phải: tên SP (font-display), giá, badge sale nếu có
- Chọn màu sắc: các dot tròn có thể click
- Chọn size: chip có thể click, size hết hàng thì gạch ngang
- Nút "Thêm vào giỏ" (full width, dark) + "Yêu thích" (ghost)
- Accordion: Mô tả / Chất liệu / Hướng dẫn bảo quản
- Section "Sản phẩm liên quan" ở dưới
- Mobile: gallery trên, info dưới
```

### Giỏ hàng
```
[PASTE MASTER PROMPT]

NHIỆM VỤ: Tạo CartDrawer (slide từ phải) tại src/components/ui/CartDrawer.tsx

Yêu cầu:
- Overlay tối khi mở, click ngoài để đóng
- Danh sách CartItem: ảnh nhỏ, tên, size, màu, giá, nút +/- số lượng, nút xóa
- Footer cố định: Tổng tiền + nút "Thanh toán" (dark full width)
- Trống giỏ: icon + text + nút "Tiếp tục mua"
- Dùng Zustand store từ src/store/cart.ts
```

### Trang danh sách sản phẩm
```
[PASTE MASTER PROMPT]

NHIỆM VỤ: Tạo trang danh sách sản phẩm tại src/app/products/page.tsx

Yêu cầu:
- Breadcrumb: Trang chủ > Sản phẩm
- Filter sidebar (desktop) / Bottom sheet (mobile):
  + Danh mục, Khoảng giá (range slider), Màu sắc, Size
- Sort dropdown: Mới nhất / Giá thấp→cao / Bán chạy
- Grid sản phẩm: 2 cột mobile, 3 cột tablet, 4 cột desktop
- Skeleton loading khi fetch
- Pagination hoặc "Xem thêm" button
```

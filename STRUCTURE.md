# Sơ Đồ Cấu Trúc Dự Án — Webshop Mira Emb

> **Stack:** Next.js 16 · React 19 · TypeScript · CSS-in-JSX  
> **Cổng:** User `localhost:3000` · Admin `localhost:3001`

---

## Tổng Quan

```
d:\webshop\
├── User\          ← Trang khách hàng (port 3000)
├── Admin\         ← Trang quản trị   (port 3001)
└── STRUCTURE.md   ← File này
```

---

## 🛍️ User — Trang Khách Hàng (`localhost:3000`)

```
User\
├── src\
│   ├── app\                          ← Next.js App Router (pages)
│   │   ├── layout.tsx                ← Root layout: font, CartProvider, AuthProvider
│   │   ├── globals.css               ← CSS toàn cục + biến màu sắc
│   │   ├── page.tsx                  ← Trang chủ (/)
│   │   │
│   │   ├── products\
│   │   │   ├── page.tsx              ← Danh sách sản phẩm với lọc/sort
│   │   │   └── [slug]\
│   │   │       └── page.tsx          ← Chi tiết sản phẩm
│   │   │
│   │   ├── collections\
│   │   │   ├── page.tsx              ← Danh sách bộ sưu tập
│   │   │   └── [slug]\
│   │   │       └── page.tsx          ← Chi tiết bộ sưu tập
│   │   │
│   │   ├── about\
│   │   │   └── page.tsx              ← Trang giới thiệu thương hiệu
│   │   │
│   │   └── account\                  ← Khu vực tài khoản (yêu cầu đăng nhập)
│   │       ├── layout.tsx            ← Layout riêng: sidebar tài khoản
│   │       ├── page.tsx              ← Tổng quan tài khoản
│   │       ├── profile\
│   │       │   └── page.tsx          ← Chỉnh sửa thông tin cá nhân
│   │       ├── orders\
│   │       │   └── page.tsx          ← Lịch sử đơn hàng
│   │       └── wishlist\
│   │           └── page.tsx          ← Danh sách yêu thích
│   │
│   ├── components\
│   │   ├── layout\
│   │   │   ├── Header.tsx            ← Thanh điều hướng: logo, search, giỏ hàng, auth
│   │   │   └── Footer.tsx            ← Footer: liên kết, mạng xã hội, bản quyền
│   │   │
│   │   ├── sections\                 ← Các section của trang chủ
│   │   │   ├── HeroSection.tsx       ← Banner hero lớn
│   │   │   ├── MarqueeSection.tsx    ← Băng chuyền tên thương hiệu
│   │   │   ├── FeaturedProducts.tsx  ← Grid sản phẩm nổi bật
│   │   │   ├── CategoriesSection.tsx ← Grid danh mục sản phẩm
│   │   │   ├── GiftBanner.tsx        ← Banner quà tặng/khuyến mãi
│   │   │   └── TrustBar.tsx          ← Thanh cam kết: giao hàng, đổi trả, v.v.
│   │   │
│   │   └── ui\                       ← Thành phần UI tái sử dụng
│   │       ├── ProductCard.tsx        ← Card sản phẩm (ảnh, tên, giá, badge)
│   │       ├── CartDrawer.tsx         ← Ngăn kéo giỏ hàng (slide từ phải)
│   │       ├── SearchModal.tsx        ← Modal tìm kiếm sản phẩm
│   │       └── AuthModal.tsx          ← Modal đăng nhập / đăng ký
│   │
│   ├── contexts\                      ← React Context — state toàn cục
│   │   ├── AuthContext.tsx            ← Trạng thái xác thực người dùng
│   │   ├── CartContext.tsx            ← Giỏ hàng (thêm/xóa/số lượng)
│   │   ├── WishlistContext.tsx        ← Danh sách yêu thích
│   │   └── OrdersContext.tsx          ← Lịch sử & trạng thái đơn hàng
│   │
│   ├── lib\
│   │   ├── data.ts                    ← Dữ liệu tĩnh: sản phẩm, danh mục, mock
│   │   ├── useSyncedProducts.ts       ← Hook: fetch sản phẩm từ Admin API (Hướng 2)
│   │   ├── orders.ts                  ← Tiện ích xử lý đơn hàng
│   │   └── utils.ts                   ← Hàm tiện ích chung
│   │
│   └── styles\
│       └── tokens.css                 ← Design tokens: màu sắc, spacing, typography
│
├── public\                            ← Tài nguyên tĩnh
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── next.config.ts                     ← Cấu hình Next.js
├── tsconfig.json                      ← Cấu hình TypeScript
├── package.json                       ← Dependencies (Next.js 16, React 19)
└── CLAUDE.md / AGENTS.md             ← Hướng dẫn cho AI agent
```

---

## 🔧 Admin — Trang Quản Trị (`localhost:3001`)

```
Admin\
├── src\
│   ├── app\                           ← Next.js App Router (pages)
│   │   ├── layout.tsx                 ← Root layout: font Be Vietnam Pro, AdminShell
│   │   ├── globals.css                ← Design system: CSS vars, .btn, .card, .badge, table
│   │   ├── page.tsx                   ← Dashboard tổng quan (/)
│   │   │
│   │   ├── api\                       ← REST API Routes (Node.js, file-based)
│   │   │   └── products\
│   │   │       ├── route.ts           ← GET /api/products · POST /api/products
│   │   │       └── [id]\
│   │   │           └── route.ts       ← GET · PUT · DELETE /api/products/:id
│   │   │
│   │   ├── san-pham\                  ← Quản lý sản phẩm
│   │   │   ├── page.tsx               ← Danh sách: search, lọc, sort, bulk delete
│   │   │   ├── them\
│   │   │   │   └── page.tsx           ← Form thêm sản phẩm mới
│   │   │   └── [id]\
│   │   │       ├── page.tsx           ← Chi tiết sản phẩm (xem)
│   │   │       └── sua\
│   │   │           └── page.tsx       ← Form chỉnh sửa sản phẩm
│   │   │
│   │   ├── don-hang\
│   │   │   └── page.tsx               ← Quản lý đơn hàng (placeholder)
│   │   │
│   │   ├── khach-hang\
│   │   │   └── page.tsx               ← Quản lý khách hàng (placeholder)
│   │   │
│   │   ├── danh-muc\
│   │   │   └── page.tsx               ← Quản lý danh mục (placeholder)
│   │   │
│   │   ├── kho-hang\
│   │   │   └── page.tsx               ← Quản lý kho hàng (placeholder)
│   │   │
│   │   ├── khuyen-mai\
│   │   │   └── page.tsx               ← Quản lý khuyến mãi (placeholder)
│   │   │
│   │   ├── phan-tich\
│   │   │   └── page.tsx               ← Phân tích & báo cáo (placeholder)
│   │   │
│   │   └── cai-dat\
│   │       └── page.tsx               ← Cài đặt hệ thống (placeholder)
│   │
│   ├── components\
│   │   ├── layout\
│   │   │   ├── AdminShell.tsx         ← Khung chính: sidebar + header + nội dung
│   │   │   ├── Sidebar.tsx            ← Sidebar thu gọn được, nav với icon Lucide
│   │   │   └── Header.tsx             ← Thanh header: tiêu đề trang, avatar admin
│   │   │
│   │   └── products\                  ← Thành phần dùng riêng cho sản phẩm
│   │       ├── ProductForm.tsx        ← Form dùng chung (thêm & sửa): 2 cột
│   │       ├── ImageUpload.tsx        ← Upload ảnh: kéo & thả, base64, tối đa 5 ảnh
│   │       └── TagInput.tsx           ← Input tag (màu sắc, kích cỡ): Enter/phẩy để thêm
│   │
│   ├── contexts\
│   │   └── ProductContext.tsx         ← React Context: CRUD sản phẩm, gọi API
│   │
│   ├── lib\
│   │   ├── data.ts                    ← Mock data: đơn hàng, khách hàng, doanh thu
│   │   └── productStore.ts            ← Đọc/ghi Admin/data/products.json (Node.js fs)
│   │
│   └── types\
│       └── product.ts                 ← Interface AdminProduct + hàm slugify() tiếng Việt
│
├── data\
│   └── products.json                  ← Lưu trữ sản phẩm (tạo tự động khi thêm đầu tiên)
│
├── next.config.ts                     ← CORS headers: cho phép localhost:3000 gọi API
├── tsconfig.json
└── package.json
```

---

## 🔗 Luồng Dữ Liệu

```
Admin (port 3001)
│
├── Thêm/Sửa/Xóa sản phẩm
│   └── ProductContext → API Route → productStore → data/products.json
│
└── API công khai (có CORS)
    └── GET /api/products  ──────────────────────────┐
                                                      │ HTTP fetch
User (port 3000)                                      │
│                                                     │
└── useSyncedProducts.ts ◄───────────────────────────┘
    │  Thành công → hiển thị "Đồng bộ từ Admin"
    └  Thất bại   → fallback về dữ liệu tĩnh (mockProducts)
```

---

## 📦 Thư Viện Sử Dụng

| Thư viện | Phiên bản | Dùng cho |
|---|---|---|
| `next` | 16.2.6 | Framework (App Router, API Routes) |
| `react` | 19.2.4 | UI, `use()` hook cho Promise params |
| `lucide-react` | latest | Icon bộ (Sidebar, ProductForm, v.v.) |
| `typescript` | 5.x | Kiểm tra kiểu tĩnh |

*Không dùng thư viện chart hay form thêm — chart SVG tự xây dựng.*

---

## 🚀 Lệnh Khởi Chạy

```bash
# Chạy cả hai cùng lúc
cd webshop/User  && npm run dev  # → localhost:3000
cd webshop/Admin && npm run dev  # → localhost:3001
```

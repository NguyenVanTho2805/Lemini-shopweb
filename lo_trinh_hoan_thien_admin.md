# Lộ Trình Hoàn Thiện Admin Panel — Lemini Webshop

> Mỗi khi hoàn thành một tác vụ, tích `[x]` vào checkbox tương ứng.  
> Cập nhật lần cuối: 2026-05-20

---

## Kiến trúc kết nối

```
User App (port 3000)                    Admin App (port 3001)
─────────────────────                   ──────────────────────
useSyncedProducts()  ──GET /api/products──▶  data/products.json
useSyncedCategories()──GET /api/categories──▶ data/categories.json
OrdersContext ───────POST /api/orders────▶  data/orders.json
CartDrawer (voucher)─GET /api/promotions?code=XXX──▶ data/promotions.json
```

---

## GIAI ĐOẠN 1 — Vá lỗ hổng API ✅ HOÀN THÀNH
> Mục tiêu: Tất cả API hoạt động đúng, 2 app kết nối thật sự

- [x] **1.1** `PUT /api/orders/[id]` — cập nhật trạng thái đơn hàng  
  _File: `Admin/src/app/api/orders/[id]/route.ts`_

- [x] **1.2** `PUT /api/products/[id]` — chỉnh sửa sản phẩm  
  _File: `Admin/src/app/api/products/[id]/route.ts`_

- [x] **1.3** `DELETE /api/products/[id]` — xóa sản phẩm  
  _File: `Admin/src/app/api/products/[id]/route.ts`_

- [x] **1.4** `GET / POST / PUT / DELETE /api/promotions` — CRUD voucher  
  _File: `Admin/src/app/api/promotions/route.ts` + `promotions/[id]/route.ts`_  
  _Bổ sung: `GET /api/promotions?code=XXX` cho User validate voucher_

- [x] **1.5** `GET /api/stats` — số liệu tổng quan cho Dashboard  
  _File: `Admin/src/app/api/stats/route.ts`_

- [x] **1.6** CORS header cho Admin API (User app gọi cross-origin)  
  _File: `Admin/next.config.ts`_

**Bổ sung trong quá trình thực hiện:**
- [x] `AdminOrder` thêm `paymentMethod`, `carrier`, `trackingNumber`
- [x] `POST /api/orders` lưu `paymentMethod` + tự động tăng `usageCount` khi dùng voucher
- [x] Trang kho hàng dùng API thật (thay static mock data), thêm inline edit tồn kho
- [x] Trang đơn hàng thêm input nhập tracking number + carrier

---

## GIAI ĐOẠN 2 — Hoàn thiện các trang Admin ✅ HOÀN THÀNH
> Mục tiêu: Mỗi trang đủ tính năng để vận hành cửa hàng thực tế

### 2.1 Dashboard `/`
- [x] Wired stats thật (doanh thu, tổng đơn, sản phẩm tồn, voucher)
- [x] Biểu đồ doanh thu theo tháng (12 tháng)
- [x] Top 5 sản phẩm bán chạy
- [x] Danh sách đơn hàng mới nhất (8 đơn)
- [x] Badge thông báo đơn hàng chưa xử lý (polling)

### 2.2 Đơn hàng `/don-hang`
- [x] Cập nhật trạng thái: `pending → shipping → completed / cancelled`
- [x] Nhập mã vận đơn (tracking number) + tên đơn vị vận chuyển
- [x] Tìm kiếm theo mã đơn / tên khách / email
- [x] Lọc theo trạng thái
- [x] Lọc theo khoảng thời gian (date range picker)
- [x] In phiếu giao hàng (print-friendly view)

### 2.3 Sản phẩm `/san-pham`
- [x] Sửa sản phẩm (form edit đầy đủ)
- [x] Xóa sản phẩm (có confirm dialog)
- [x] Bật/tắt trạng thái active/inactive
- [x] Bulk action (chọn nhiều → xóa)
- [x] Tìm kiếm + lọc theo danh mục / trạng thái
- [x] Hiển thị badge sản phẩm "nổi bật"
- [x] Đánh dấu / bỏ "nổi bật" trực tiếp từ danh sách

### 2.4 Kho hàng `/kho-hang`
- [x] Dùng dữ liệu thật từ API (không còn mock)
- [x] Cập nhật số lượng tồn kho từng sản phẩm (inline edit)
- [x] Cảnh báo sắp hết hàng (tồn < 20)
- [x] Lọc theo danh mục / trạng thái kho
- [x] Nhật ký nhập/xuất kho đơn giản

### 2.5 Khuyến mãi `/khuyen-mai`
- [x] CRUD voucher (tạo / xóa)
- [x] Bật/tắt voucher
- [x] Đặt thời hạn hiệu lực
- [x] Thống kê lượt sử dụng (progress bar)
- [x] API validate voucher từ User app (`GET /api/promotions?code=XXX`)
- [x] Sửa voucher (edit form)

### 2.6 Phân tích `/phan-tich`
- [x] Biểu đồ doanh thu theo tuần / tháng
- [x] Top sản phẩm bán chạy
- [x] Tỷ lệ đơn hoàn thành / huỷ
- [x] Doanh thu theo danh mục

### 2.7 Khách hàng `/khach-hang`
- [x] Danh sách khách từ orders.json (group by email)
- [x] Lịch sử đơn hàng theo từng khách
- [x] Tổng chi tiêu mỗi khách

### 2.8 Cài đặt `/cai-dat`
- [x] Thông tin cửa hàng (tên, địa chỉ, hotline, email)
- [x] Cấu hình phí vận chuyển
- [x] Ngưỡng miễn phí ship

---

## GIAI ĐOẠN 3 — Kết nối sâu User ↔ Admin (2 chiều) ✅ HOÀN THÀNH
> Mục tiêu: Dữ liệu đồng bộ thực sự, không còn mock

- [x] **3.1** Voucher hoạt động: User nhập mã → gọi Admin API → áp dụng discount vào giỏ  
  _(API endpoint đã có, cần wiring vào CartDrawer User app)_
- [x] **3.2** Trạng thái đơn thật: User app gọi `GET /api/orders?email=...` từ Admin
- [x] **3.3** Tracking number: Admin nhập → lưu vào orders.json → User có thể lấy qua API
- [x] **3.4** Đánh giá sản phẩm: User gửi review → `POST /api/reviews` → Admin duyệt  
  _Files: `Admin/src/app/api/reviews/`, `Admin/src/app/danh-gia/page.tsx`, `User/src/app/products/[slug]/page.tsx`_
- [x] **3.5** Sản phẩm "nổi bật": Admin toggle `featured: true` → User Homepage tự cập nhật  
  _Files: `User/src/lib/useSyncedProducts.ts`, `User/src/components/sections/FeaturedProducts.tsx`, `User/src/lib/data.ts`_
- [x] **3.6** Thông báo real-time: Khi có đơn mới, Admin sidebar hiện badge (polling 30s)  
  _(Đã có từ trước)_

---

## GIAI ĐOẠN 4 — Nâng cao UX Admin ✅ HOÀN THÀNH
> Mục tiêu: Trải nghiệm admin chuyên nghiệp, dễ dùng hàng ngày

- [x] **4.1** Đăng nhập Admin (username/password, lưu session trong cookie)  
  _Files: `Admin/src/app/login/page.tsx`, `Admin/src/app/api/auth/login/route.ts`, `Admin/src/app/api/auth/logout/route.ts`, `Admin/src/middleware.ts`_  
  _Credentials: admin / admin123 · Cookie `admin-session` 7 ngày · Middleware bảo vệ tất cả route trừ `/login` và `/api/*`_

- [x] **4.2** Upload ảnh thật (lưu vào `public/uploads`, thay vì nhập URL)  
  _Files: `Admin/src/app/api/upload/route.ts`, `Admin/src/components/products/ImageUpload.tsx`_  
  _ImageUpload dùng FormData POST tới `/api/upload`, trả về URL `/uploads/filename.ext`_

- [x] **4.3** Toast notification khi lưu / xóa thành công  
  _File: `Admin/src/contexts/ToastContext.tsx` — `useToast()` hook, toast slide-in bottom-right, 3.2s auto-dismiss_  
  _Wired vào: san-pham, khuyen-mai, danh-muc, danh-gia_

- [x] **4.4** Confirm dialog trước khi xóa dữ liệu  
  _File: `Admin/src/contexts/ConfirmContext.tsx` — `useConfirm()` hook, modal với nút Hủy / Xác nhận_  
  _Thay thế `window.confirm()` ở tất cả trang: san-pham, khuyen-mai, danh-muc, danh-gia_

- [x] **4.5** Responsive layout cho tablet (quản lý từ iPad)  
  _Sidebar tự động collapsed khi window width < 900px · Header ẩn search & "Đơn hàng mới" trên màn nhỏ_  
  _CSS utility classes: `.hide-tablet` (< 900px), `.hide-mobile` (< 640px) trong globals.css_

- [x] **4.6** Dark mode toggle  
  _File: `Admin/src/contexts/ThemeContext.tsx` — `useTheme()` hook, lưu vào localStorage_  
  _Header button Sun/Moon wired tới toggle · CSS variables `[data-theme="dark"]` trong globals.css_

---

## Thứ tự thực hiện

```
Giai đoạn 1 ✅      →   Giai đoạn 2 (ưu tiên 🟠)   →   Giai đoạn 3 (ưu tiên 🟡)   →   Giai đoạn 4 (ưu tiên 🟢)
API hoàn chỉnh          Trang đủ tính năng               Đồng bộ 2 chiều                  UX polish
DONE                    ~2–3 ngày còn lại                ~1–2 ngày còn lại                ~1–2 ngày
```

---

## Tiến độ tổng quan

| Giai đoạn | Tổng task | Hoàn thành | % |
|-----------|-----------|------------|---|
| Giai đoạn 1 — API | 10 | 10 | 100% ✅ |
| Giai đoạn 2 — Admin Pages | 24 | 24 | 100% ✅ |
| Giai đoạn 3 — User↔Admin | 6 | 6 | 100% ✅ |
| Giai đoạn 4 — UX Polish | 6 | 6 | 100% ✅ |
| **Tổng** | **46** | **46** | **100% 🎉** |

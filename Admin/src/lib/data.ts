export type OrderStatus = "cho_xu_ly" | "dang_giao" | "hoan_thanh" | "da_huy" | "hoan_tien";

export interface Order {
  id: string;
  code: string;
  customer: string;
  customerEmail: string;
  product: string;
  quantity: number;
  date: string;
  status: OrderStatus;
  total: number;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sold: number;
  status: "active" | "draft" | "out_of_stock";
  colors: string[];
  sizes: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedDate: string;
  status: "active" | "inactive";
  avatar: string;
}

export interface InventoryItem {
  id: string;
  product: string;
  category: string;
  sku: string;
  stock: number;
  minStock: number;
  warehouseLocation: string;
  lastUpdated: string;
}

export interface Promotion {
  id: string;
  name: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  usageLimit: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "draft";
}

export const orders: Order[] = [
  {
    id: "1",
    code: "#DH-2025001",
    customer: "Nguyễn Thị Lan",
    customerEmail: "lan.nguyen@gmail.com",
    product: "Túi thêu hoa cúc vàng",
    quantity: 1,
    date: "14/05/2025",
    status: "cho_xu_ly",
    total: 320000,
    address: "12 Lê Lợi, Q.1, TP.HCM",
  },
  {
    id: "2",
    code: "#DH-2025002",
    customer: "Trần Minh Khoa",
    customerEmail: "khoa.tran@gmail.com",
    product: "Bộ kit DIY thêu tranh sen",
    quantity: 2,
    date: "14/05/2025",
    status: "dang_giao",
    total: 560000,
    address: "45 Hai Bà Trưng, Q.3, TP.HCM",
  },
  {
    id: "3",
    code: "#DH-2025003",
    customer: "Phạm Thu Hà",
    customerEmail: "ha.pham@gmail.com",
    product: "Tranh thêu phong cảnh Hội An",
    quantity: 1,
    date: "13/05/2025",
    status: "hoan_thanh",
    total: 850000,
    address: "78 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    id: "4",
    code: "#DH-2025004",
    customer: "Lê Văn Đức",
    customerEmail: "duc.le@gmail.com",
    product: "Khăn thêu lụa cao cấp",
    quantity: 3,
    date: "13/05/2025",
    status: "hoan_thanh",
    total: 1290000,
    address: "23 Bà Triệu, Hoàn Kiếm, Hà Nội",
  },
  {
    id: "5",
    code: "#DH-2025005",
    customer: "Võ Thị Bích",
    customerEmail: "bich.vo@gmail.com",
    product: "Túi thêu chim phượng hoàng",
    quantity: 1,
    date: "12/05/2025",
    status: "cho_xu_ly",
    total: 480000,
    address: "156 Trần Phú, Hải Châu, Đà Nẵng",
  },
  {
    id: "6",
    code: "#DH-2025006",
    customer: "Nguyễn Văn Nam",
    customerEmail: "nam.nguyen@gmail.com",
    product: "Cài tóc thêu hoa mai",
    quantity: 5,
    date: "12/05/2025",
    status: "da_huy",
    total: 375000,
    address: "90 Hùng Vương, Ninh Kiều, Cần Thơ",
  },
  {
    id: "7",
    code: "#DH-2025007",
    customer: "Đặng Thị Minh",
    customerEmail: "minh.dang@gmail.com",
    product: "Bộ kit DIY thêu túi bướm",
    quantity: 1,
    date: "11/05/2025",
    status: "dang_giao",
    total: 285000,
    address: "34 Đinh Tiên Hoàng, Q.Bình Thạnh, TP.HCM",
  },
  {
    id: "8",
    code: "#DH-2025008",
    customer: "Hoàng Thanh Tú",
    customerEmail: "tu.hoang@gmail.com",
    product: "Tranh thêu chân dung",
    quantity: 1,
    date: "11/05/2025",
    status: "hoan_thanh",
    total: 1200000,
    address: "67 Láng Hạ, Đống Đa, Hà Nội",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Túi thêu hoa cúc vàng",
    category: "Túi thêu",
    image: "/products/tui-hoa-cuc.jpg",
    price: 320000,
    originalPrice: 380000,
    stock: 45,
    sold: 128,
    status: "active",
    colors: ["kem", "xanh nhạt", "hồng"],
    sizes: ["S", "M"],
  },
  {
    id: "2",
    name: "Tranh thêu phong cảnh Hội An",
    category: "Tranh thêu",
    image: "/products/tranh-hoi-an.jpg",
    price: 850000,
    stock: 12,
    sold: 67,
    status: "active",
    colors: ["nâu cổ", "trắng"],
    sizes: ["30x40cm", "40x60cm"],
  },
  {
    id: "3",
    name: "Bộ kit DIY thêu tranh sen",
    category: "Bộ kit DIY",
    image: "/products/kit-sen.jpg",
    price: 280000,
    originalPrice: 320000,
    stock: 89,
    sold: 243,
    status: "active",
    colors: ["đỏ", "hồng", "trắng"],
    sizes: ["20x20cm"],
  },
  {
    id: "4",
    name: "Khăn thêu lụa cao cấp",
    category: "Phụ kiện",
    image: "/products/khan-lua.jpg",
    price: 430000,
    stock: 0,
    sold: 156,
    status: "out_of_stock",
    colors: ["trắng", "be", "vàng champagne"],
    sizes: ["45x45cm", "60x60cm"],
  },
  {
    id: "5",
    name: "Cài tóc thêu hoa mai",
    category: "Phụ kiện",
    image: "/products/cai-toc.jpg",
    price: 75000,
    stock: 234,
    sold: 489,
    status: "active",
    colors: ["vàng", "bạc", "đồng"],
    sizes: ["One size"],
  },
  {
    id: "6",
    name: "Bộ kit DIY thêu túi bướm",
    category: "Bộ kit DIY",
    image: "/products/kit-buom.jpg",
    price: 285000,
    stock: 67,
    sold: 112,
    status: "active",
    colors: ["xanh", "hồng", "tím"],
    sizes: ["25x25cm"],
  },
  {
    id: "7",
    name: "Tranh thêu chân dung tùy chỉnh",
    category: "Tranh thêu",
    image: "/products/tranh-chan-dung.jpg",
    price: 1200000,
    stock: 8,
    sold: 34,
    status: "active",
    colors: ["tuỳ chọn"],
    sizes: ["20x25cm", "25x30cm", "30x40cm"],
  },
  {
    id: "8",
    name: "Túi thêu chim phượng hoàng",
    category: "Túi thêu",
    image: "/products/tui-phuong-hoang.jpg",
    price: 480000,
    stock: 23,
    sold: 78,
    status: "draft",
    colors: ["đen", "navy", "đỏ đô"],
    sizes: ["M", "L"],
  },
];

export const customers: Customer[] = [
  {
    id: "1",
    name: "Nguyễn Thị Lan",
    email: "lan.nguyen@gmail.com",
    phone: "0901 234 567",
    orders: 8,
    totalSpent: 2840000,
    joinedDate: "12/01/2024",
    status: "active",
    avatar: "NL",
  },
  {
    id: "2",
    name: "Trần Minh Khoa",
    email: "khoa.tran@gmail.com",
    phone: "0912 345 678",
    orders: 3,
    totalSpent: 1050000,
    joinedDate: "28/02/2024",
    status: "active",
    avatar: "TK",
  },
  {
    id: "3",
    name: "Phạm Thu Hà",
    email: "ha.pham@gmail.com",
    phone: "0923 456 789",
    orders: 12,
    totalSpent: 5670000,
    joinedDate: "05/11/2023",
    status: "active",
    avatar: "PH",
  },
  {
    id: "4",
    name: "Lê Văn Đức",
    email: "duc.le@gmail.com",
    phone: "0934 567 890",
    orders: 5,
    totalSpent: 3210000,
    joinedDate: "19/03/2024",
    status: "active",
    avatar: "LĐ",
  },
  {
    id: "5",
    name: "Võ Thị Bích",
    email: "bich.vo@gmail.com",
    phone: "0945 678 901",
    orders: 2,
    totalSpent: 680000,
    joinedDate: "07/04/2024",
    status: "inactive",
    avatar: "VB",
  },
  {
    id: "6",
    name: "Hoàng Thanh Tú",
    email: "tu.hoang@gmail.com",
    phone: "0956 789 012",
    orders: 7,
    totalSpent: 4290000,
    joinedDate: "22/09/2023",
    status: "active",
    avatar: "HT",
  },
];

export const revenueData = [
  { month: "T1", value: 8.5 },
  { month: "T2", value: 12.0 },
  { month: "T3", value: 9.8 },
  { month: "T4", value: 14.5 },
  { month: "T5", value: 13.2 },
  { month: "T6", value: 18.0 },
  { month: "T7", value: 16.5 },
  { month: "T8", value: 22.0 },
  { month: "T9", value: 19.8 },
  { month: "T10", value: 25.0 },
  { month: "T11", value: 28.5 },
  { month: "T12", value: 32.0 },
];

export const recentActivities = [
  {
    id: "1",
    type: "order",
    message: "Đơn hàng mới #DH-2025001 từ Nguyễn Thị Lan",
    time: "2 phút trước",
    color: "green",
  },
  {
    id: "2",
    type: "stock",
    message: "Khăn thêu lụa cao cấp hết hàng",
    time: "18 phút trước",
    color: "red",
  },
  {
    id: "3",
    type: "customer",
    message: "Khách hàng mới: Đặng Thị Minh đã đăng ký",
    time: "45 phút trước",
    color: "blue",
  },
  {
    id: "4",
    type: "order",
    message: "Đơn #DH-2025002 đã được giao thành công",
    time: "1 giờ trước",
    color: "green",
  },
  {
    id: "5",
    type: "review",
    message: "Đánh giá 5⭐ mới cho Bộ kit DIY thêu tranh sen",
    time: "2 giờ trước",
    color: "amber",
  },
  {
    id: "6",
    type: "promo",
    message: "Voucher MIRA20 được sử dụng 3 lần hôm nay",
    time: "3 giờ trước",
    color: "purple",
  },
];

export const promotions: Promotion[] = [
  {
    id: "1",
    name: "Khai trương tháng 5",
    code: "MIRA20",
    type: "percent",
    value: 20,
    usageLimit: 100,
    usageCount: 67,
    startDate: "01/05/2025",
    endDate: "31/05/2025",
    status: "active",
  },
  {
    id: "2",
    name: "Giảm giá combo kit",
    code: "KIT50K",
    type: "fixed",
    value: 50000,
    usageLimit: 50,
    usageCount: 50,
    startDate: "01/04/2025",
    endDate: "30/04/2025",
    status: "expired",
  },
  {
    id: "3",
    name: "Ưu đãi khách VIP",
    code: "VIP15",
    type: "percent",
    value: 15,
    usageLimit: 200,
    usageCount: 34,
    startDate: "15/05/2025",
    endDate: "15/08/2025",
    status: "active",
  },
  {
    id: "4",
    name: "Flash sale cuối tuần",
    code: "WEEKEND30",
    type: "percent",
    value: 30,
    usageLimit: 30,
    usageCount: 0,
    startDate: "17/05/2025",
    endDate: "18/05/2025",
    status: "draft",
  },
];

export function formatVND(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
}

export const statusLabels: Record<OrderStatus, string> = {
  cho_xu_ly: "Chờ xử lý",
  dang_giao: "Đang giao",
  hoan_thanh: "Hoàn thành",
  da_huy: "Đã hủy",
  hoan_tien: "Hoàn tiền",
};

export const statusColors: Record<OrderStatus, string> = {
  cho_xu_ly: "badge-warning",
  dang_giao: "badge-info",
  hoan_thanh: "badge-success",
  da_huy: "badge-danger",
  hoan_tien: "badge-neutral",
};

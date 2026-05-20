// Thêm vào cuối data.ts

export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  code: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  address: string;
  shippingFee: number;
  carrier?: string;
  trackingNumber?: string;
}

export const mockOrders: Order[] = [
  {
    id: 'o1',
    code: 'ME-20240312-001',
    date: '2024-03-12',
    status: 'completed',
    address: '12 Phố Huế, Hai Bà Trưng, Hà Nội',
    shippingFee: 0,
    items: [
      { productId: 'p1', name: 'Túi Tote Thêu Cúc Họa Mi', image: 'https://picsum.photos/600/800?random=1', price: 285000, quantity: 1 },
      { productId: 'p4', name: 'Khăn Tay Thêu Tên Theo Yêu Cầu', image: 'https://picsum.photos/600/800?random=4', price: 120000, quantity: 2 },
    ],
    total: 525000,
  },
  {
    id: 'o2',
    code: 'ME-20240408-002',
    date: '2024-04-08',
    status: 'shipping',
    address: '12 Phố Huế, Hai Bà Trưng, Hà Nội',
    shippingFee: 30000,
    carrier: 'GHN',
    trackingNumber: 'GHN123456789',
    items: [
      { productId: 'p3', name: 'Bộ Kit Thêu Tay Cho Người Mới', image: 'https://picsum.photos/600/800?random=3', price: 195000, quantity: 1 },
    ],
    total: 225000,
  },
  {
    id: 'o3',
    code: 'ME-20240501-003',
    date: '2024-05-01',
    status: 'pending',
    address: '12 Phố Huế, Hai Bà Trưng, Hà Nội',
    shippingFee: 30000,
    items: [
      { productId: 'p6', name: 'Túi Đeo Chéo Thêu Hoa Sen', image: 'https://picsum.photos/600/800?random=19', price: 345000, quantity: 1 },
      { productId: 'p8', name: 'Cài Tóc Thêu Hoa Nhỏ', image: 'https://picsum.photos/600/800?random=24', price: 85000, quantity: 1 },
    ],
    total: 460000,
  },
  {
    id: 'o4',
    code: 'ME-20240210-004',
    date: '2024-02-10',
    status: 'cancelled',
    address: '12 Phố Huế, Hai Bà Trưng, Hà Nội',
    shippingFee: 30000,
    items: [
      { productId: 'p5', name: 'Tranh Thêu Phong Cảnh Làng Quê', image: 'https://picsum.photos/600/800?random=17', price: 420000, quantity: 1 },
    ],
    total: 450000,
  },
];

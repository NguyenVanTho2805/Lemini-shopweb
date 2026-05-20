import fs from 'fs';
import path from 'path';

export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface AdminOrder {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: { productId: string; name: string; image: string; price: number; quantity: number }[];
  total: number;
  shippingFee: number;
  discount: number;
  voucherCode?: string;
  paymentMethod?: 'cod' | 'bank' | 'momo';
  carrier?: string;
  trackingNumber?: string;
  status: OrderStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'orders.json');

export function readOrders(): AdminOrder[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch { return []; }
}

export function writeOrders(orders: AdminOrder[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

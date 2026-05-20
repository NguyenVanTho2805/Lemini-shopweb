import fs from 'fs';
import path from 'path';

export interface AdminPromotion {
  id: string;
  code: string;
  description: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'draft';
  expiresAt: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'promotions.json');

const SEED: AdminPromotion[] = [
  {
    id: 'v1', code: 'WELCOME10', description: 'Giảm 10% cho đơn từ 200.000đ',
    type: 'percent', value: 10, minOrder: 200000, maxDiscount: 50000,
    usageLimit: 100, usageCount: 23, status: 'active',
    expiresAt: '2027-12-31', createdAt: '2026-01-01',
  },
  {
    id: 'v2', code: 'FREESHIP', description: 'Miễn phí vận chuyển (giảm 30.000đ)',
    type: 'fixed', value: 30000, minOrder: 0,
    usageLimit: 500, usageCount: 127, status: 'active',
    expiresAt: '2027-12-31', createdAt: '2026-01-01',
  },
  {
    id: 'v3', code: 'LEMINI20', description: 'Giảm 20% tối đa 100.000đ',
    type: 'percent', value: 20, minOrder: 300000, maxDiscount: 100000,
    usageLimit: 50, usageCount: 12, status: 'active',
    expiresAt: '2027-12-31', createdAt: '2026-01-01',
  },
];

export function readPromotions(): AdminPromotion[] {
  try {
    if (!fs.existsSync(FILE)) return SEED;
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch { return SEED; }
}

export function writePromotions(p: AdminPromotion[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(p, null, 2), 'utf-8');
}

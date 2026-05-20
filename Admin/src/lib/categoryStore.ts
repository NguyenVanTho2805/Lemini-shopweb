import fs from 'fs';
import path from 'path';

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  order: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'categories.json');

const SEED: AdminCategory[] = [
  { id: 'c1', name: 'Túi thêu', slug: 'tui-theu', icon: '👜', description: 'Túi xách, túi tote, túi đeo vai thêu tay', order: 1 },
  { id: 'c2', name: 'Tranh thêu', slug: 'tranh-theu', icon: '🖼️', description: 'Tranh phong cảnh, hoa lá, chân dung thêu tay', order: 2 },
  { id: 'c3', name: 'Bộ kit DIY', slug: 'bo-kit-diy', icon: '🧵', description: 'Bộ nguyên liệu tự thêu tại nhà', order: 3 },
  { id: 'c4', name: 'Phụ kiện', slug: 'phu-kien', icon: '✨', description: 'Cài tóc, khăn, vòng tay thêu', order: 4 },
];

export function readCategories(): AdminCategory[] {
  try {
    if (!fs.existsSync(FILE)) return SEED;
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch { return SEED; }
}

export function writeCategories(cats: AdminCategory[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(cats, null, 2), 'utf-8');
}

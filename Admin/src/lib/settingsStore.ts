import fs from 'fs';
import path from 'path';

export interface AppSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  bankAccount: string;
  bankOwner: string;
  shippingFee: number;
  freeShippingThreshold: number;
}

const DEFAULT: AppSettings = {
  storeName: 'Lemini',
  storeEmail: 'hello@lemini.com',
  storePhone: '0901 234 567',
  storeAddress: '12 Lê Lợi, Q.1, TP.HCM',
  bankAccount: '0123456789 - Vietcombank',
  bankOwner: 'NGUYEN THI MIRA',
  shippingFee: 30000,
  freeShippingThreshold: 500000,
};

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'settings.json');

export function readSettings(): AppSettings {
  try {
    if (!fs.existsSync(FILE)) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(fs.readFileSync(FILE, 'utf-8')) };
  } catch { return { ...DEFAULT }; }
}

export function writeSettings(s: AppSettings): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(s, null, 2), 'utf-8');
}

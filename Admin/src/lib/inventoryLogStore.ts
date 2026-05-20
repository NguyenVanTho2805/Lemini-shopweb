import fs from 'fs';
import path from 'path';

export interface InventoryLogEntry {
  id: string;
  productId: string;
  productName: string;
  previousStock: number;
  newStock: number;
  delta: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'inventory-log.json');

export function readLog(): InventoryLogEntry[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch { return []; }
}

export function writeLog(entries: InventoryLogEntry[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

export function appendLog(entry: Omit<InventoryLogEntry, 'id' | 'createdAt'>): InventoryLogEntry {
  const entries = readLog();
  const newEntry: InventoryLogEntry = {
    id: `log_${Date.now()}`,
    ...entry,
    createdAt: new Date().toISOString(),
  };
  entries.push(newEntry);
  if (entries.length > 200) entries.splice(0, entries.length - 200);
  writeLog(entries);
  return newEntry;
}

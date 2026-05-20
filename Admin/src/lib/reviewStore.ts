import fs from 'fs';
import path from 'path';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface AdminReview {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  content: string;
  status: ReviewStatus;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'reviews.json');

export function readReviews(): AdminReview[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch { return []; }
}

export function writeReviews(reviews: AdminReview[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(reviews, null, 2), 'utf-8');
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  badge?: "new" | "sale" | "hot";
  colors: string[];
  sizes: string[];
  stock: number;
  sold: number;
  status: "active" | "draft" | "out_of_stock";
  featured: boolean;
  details: string[];
  care: string[];
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    à: "a", á: "a", ả: "a", ã: "a", ạ: "a",
    ă: "a", ắ: "a", ặ: "a", ằ: "a", ẳ: "a", ẵ: "a",
    â: "a", ấ: "a", ầ: "a", ẩ: "a", ẫ: "a", ậ: "a",
    è: "e", é: "e", ẹ: "e", ẻ: "e", ẽ: "e",
    ê: "e", ế: "e", ề: "e", ệ: "e", ể: "e", ễ: "e",
    ì: "i", í: "i", ị: "i", ỉ: "i", ĩ: "i",
    ò: "o", ó: "o", ọ: "o", ỏ: "o", õ: "o",
    ô: "o", ố: "o", ồ: "o", ộ: "o", ổ: "o", ỗ: "o",
    ơ: "o", ớ: "o", ờ: "o", ợ: "o", ở: "o", ỡ: "o",
    ù: "u", ú: "u", ụ: "u", ủ: "u", ũ: "u",
    ư: "u", ứ: "u", ừ: "u", ự: "u", ử: "u", ữ: "u",
    ỳ: "y", ý: "y", ỵ: "y", ỷ: "y", ỹ: "y",
    đ: "d",
  };
  return text
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

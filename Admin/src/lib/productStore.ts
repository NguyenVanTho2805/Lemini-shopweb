import fs from "fs";
import path from "path";
import type { AdminProduct } from "@/types/product";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

const DEFAULT_PRODUCTS: AdminProduct[] = [
  {
    id: "1",
    name: "Túi thêu hoa cúc vàng",
    slug: "tui-theu-hoa-cuc-vang",
    description:
      "Chiếc túi xách được thêu tay tỉ mỉ với họa tiết hoa cúc vàng rực rỡ. Mỗi đường kim mũi chỉ đều thể hiện sự khéo léo và tình yêu nghề của nghệ nhân Lemini.",
    category: "tui-theu",
    price: 320000,
    originalPrice: 380000,
    image: "https://picsum.photos/600/800?random=10",
    images: [
      "https://picsum.photos/600/800?random=10",
      "https://picsum.photos/600/800?random=11",
    ],
    badge: "sale",
    colors: ["kem", "xanh nhạt", "hồng"],
    sizes: ["S", "M"],
    stock: 45,
    sold: 128,
    status: "active",
    featured: true,
    details: [
      "Chất liệu: vải canvas cao cấp",
      "Thêu tay 100% thủ công",
      "Quai đeo chắc chắn",
      "Kích thước S: 25×20cm, M: 30×25cm",
    ],
    care: [
      "Giặt tay nhẹ nhàng với nước lạnh",
      "Không dùng máy giặt",
      "Không phơi nắng trực tiếp",
      "Ủi mặt trái với nhiệt độ thấp",
    ],
    metaDescription:
      "Túi thêu hoa cúc vàng handmade, thêu tay tỉ mỉ từ Lemini",
    createdAt: "2025-01-10T07:00:00.000Z",
    updatedAt: "2025-05-10T07:00:00.000Z",
  },
  {
    id: "2",
    name: "Tranh thêu phong cảnh Hội An",
    slug: "tranh-theu-phong-canh-hoi-an",
    description:
      "Tác phẩm tranh thêu tay mô tả vẻ đẹp cổ kính của phố cổ Hội An. Từng chi tiết được thêu cẩn thận với chỉ tơ cao cấp trên nền vải lụa tự nhiên.",
    category: "tranh-theu",
    price: 850000,
    image: "https://picsum.photos/600/800?random=20",
    images: [
      "https://picsum.photos/600/800?random=20",
      "https://picsum.photos/600/800?random=21",
    ],
    colors: ["nâu cổ", "trắng ngà"],
    sizes: ["30×40cm", "40×60cm"],
    stock: 12,
    sold: 67,
    status: "active",
    featured: true,
    details: [
      "Chất liệu: vải lụa tự nhiên",
      "Chỉ thêu: tơ tằm cao cấp",
      "Khung tranh: gỗ thông tự nhiên",
      "Thêu tay 100% thủ công",
    ],
    care: [
      "Tránh ánh nắng trực tiếp",
      "Lau bụi nhẹ bằng khăn khô",
      "Bảo quản nơi thoáng mát, không ẩm",
    ],
    metaDescription: "Tranh thêu phong cảnh Hội An handmade thêu tay cao cấp",
    createdAt: "2025-01-15T07:00:00.000Z",
    updatedAt: "2025-05-12T07:00:00.000Z",
  },
  {
    id: "3",
    name: "Bộ kit DIY thêu tranh sen",
    slug: "bo-kit-diy-theu-tranh-sen",
    description:
      "Bộ nguyên liệu DIY đầy đủ để tự tay thêu bức tranh hoa sen. Phù hợp cho người mới bắt đầu học thêu với hướng dẫn chi tiết từng bước.",
    category: "bo-kit-diy",
    price: 280000,
    originalPrice: 320000,
    image: "https://picsum.photos/600/800?random=30",
    images: ["https://picsum.photos/600/800?random=30"],
    badge: "sale",
    colors: ["đỏ", "hồng", "trắng"],
    sizes: ["20×20cm"],
    stock: 89,
    sold: 243,
    status: "active",
    featured: false,
    details: [
      "Bao gồm: vải thêu, khung thêu, chỉ thêu đủ màu, kim thêu, sơ đồ thêu",
      "Phù hợp người mới bắt đầu",
      "Hướng dẫn bằng hình ảnh chi tiết",
      "Hoàn thành trong 5–8 giờ",
    ],
    care: ["Bảo quản chỉ thêu nơi khô ráo", "Tránh ẩm mốc"],
    metaDescription:
      "Bộ kit DIY thêu tranh hoa sen cho người mới bắt đầu học thêu",
    createdAt: "2025-02-01T07:00:00.000Z",
    updatedAt: "2025-05-08T07:00:00.000Z",
  },
  {
    id: "4",
    name: "Khăn thêu lụa cao cấp",
    slug: "khan-theu-lua-cao-cap",
    description:
      "Chiếc khăn làm từ lụa tự nhiên với họa tiết thêu tay tinh tế. Món quà tặng sang trọng và ý nghĩa cho người thân.",
    category: "phu-kien",
    price: 430000,
    image: "https://picsum.photos/600/800?random=40",
    images: ["https://picsum.photos/600/800?random=40"],
    colors: ["trắng", "be", "vàng champagne"],
    sizes: ["45×45cm", "60×60cm"],
    stock: 0,
    sold: 156,
    status: "out_of_stock",
    featured: false,
    details: [
      "Chất liệu: lụa tự nhiên 100%",
      "Thêu tay tỉ mỉ",
      "Viền cuộn tay tinh tế",
    ],
    care: [
      "Giặt tay với nước lạnh",
      "Dùng xà phòng dành riêng cho lụa",
      "Phơi bóng mát",
    ],
    metaDescription: "Khăn lụa thêu tay cao cấp, quà tặng sang trọng",
    createdAt: "2025-02-10T07:00:00.000Z",
    updatedAt: "2025-05-01T07:00:00.000Z",
  },
  {
    id: "5",
    name: "Cài tóc thêu hoa mai",
    slug: "cai-toc-theu-hoa-mai",
    description:
      "Cài tóc handmade với họa tiết hoa mai thêu tay, mang nét duyên dáng truyền thống Việt Nam vào phong cách hiện đại.",
    category: "phu-kien",
    price: 75000,
    image: "https://picsum.photos/600/800?random=50",
    images: ["https://picsum.photos/600/800?random=50"],
    colors: ["vàng", "bạc", "đồng"],
    sizes: ["One size"],
    stock: 234,
    sold: 489,
    status: "active",
    featured: true,
    details: [
      "Chất liệu: kim loại mạ vàng/bạc/đồng",
      "Hoa mai thêu tay bằng chỉ tơ",
      "Kẹp tóc chắc chắn, không trơn trượt",
    ],
    care: ["Lau khô sau khi dùng", "Bảo quản trong hộp tránh va đập"],
    metaDescription: "Cài tóc thêu hoa mai handmade, phong cách truyền thống",
    createdAt: "2025-03-01T07:00:00.000Z",
    updatedAt: "2025-05-14T07:00:00.000Z",
  },
  {
    id: "6",
    name: "Bộ kit DIY thêu túi bướm",
    slug: "bo-kit-diy-theu-tui-buom",
    description:
      "Bộ nguyên liệu tự làm túi thêu hình bướm đầy màu sắc. Sản phẩm hoàn thiện sẽ là chiếc túi nhỏ xinh để đựng tiền lẻ hoặc đồ dùng cá nhân.",
    category: "bo-kit-diy",
    price: 285000,
    image: "https://picsum.photos/600/800?random=60",
    images: ["https://picsum.photos/600/800?random=60"],
    colors: ["xanh", "hồng", "tím"],
    sizes: ["25×25cm"],
    stock: 67,
    sold: 112,
    status: "active",
    featured: false,
    details: [
      "Bao gồm đầy đủ nguyên vật liệu",
      "Hướng dẫn step-by-step bằng hình ảnh",
      "Thời gian hoàn thành: 6–10 giờ",
    ],
    care: [],
    metaDescription: "Bộ kit DIY thêu túi bướm, tự làm túi handmade tại nhà",
    createdAt: "2025-03-15T07:00:00.000Z",
    updatedAt: "2025-05-09T07:00:00.000Z",
  },
  {
    id: "7",
    name: "Tranh thêu chân dung tùy chỉnh",
    slug: "tranh-theu-chan-dung-tuy-chinh",
    description:
      "Dịch vụ thêu chân dung theo yêu cầu từ ảnh của bạn. Mỗi tác phẩm là duy nhất, được thêu tay hoàn toàn trong 15–20 ngày làm việc.",
    category: "tranh-theu",
    price: 1200000,
    image: "https://picsum.photos/600/800?random=70",
    images: [
      "https://picsum.photos/600/800?random=70",
      "https://picsum.photos/600/800?random=71",
    ],
    colors: ["tuỳ chọn"],
    sizes: ["20×25cm", "25×30cm", "30×40cm"],
    stock: 8,
    sold: 34,
    status: "active",
    featured: true,
    details: [
      "Thêu theo ảnh của khách",
      "Thời gian: 15–20 ngày làm việc",
      "Giao hàng toàn quốc",
      "Kèm chứng nhận thêu tay thủ công",
    ],
    care: [
      "Tránh ánh nắng trực tiếp",
      "Lau nhẹ bằng khăn khô",
      "Bảo quản nơi thoáng mát",
    ],
    metaDescription:
      "Thêu chân dung theo yêu cầu, quà tặng độc đáo và ý nghĩa",
    createdAt: "2025-04-01T07:00:00.000Z",
    updatedAt: "2025-05-13T07:00:00.000Z",
  },
  {
    id: "8",
    name: "Túi thêu chim phượng hoàng",
    slug: "tui-theu-chim-phuong-hoang",
    description:
      "Túi tote size lớn với hình thêu chim phượng hoàng uy nghi, biểu tượng may mắn và thịnh vượng trong văn hóa Á Đông.",
    category: "tui-theu",
    price: 480000,
    image: "https://picsum.photos/600/800?random=80",
    images: ["https://picsum.photos/600/800?random=80"],
    badge: "new",
    colors: ["đen", "navy", "đỏ đô"],
    sizes: ["M", "L"],
    stock: 23,
    sold: 78,
    status: "draft",
    featured: false,
    details: [
      "Chất liệu: vải canvas dày dặn",
      "Phượng hoàng thêu tay công phu",
      "Túi có lớp lót bên trong",
    ],
    care: [
      "Giặt tay nhẹ nhàng",
      "Không vắt mạnh",
      "Phơi bóng mát, tránh nắng",
    ],
    metaDescription:
      "Túi thêu chim phượng hoàng may mắn, handmade cao cấp Lemini",
    createdAt: "2025-04-20T07:00:00.000Z",
    updatedAt: "2025-05-14T07:00:00.000Z",
  },
];

export function readProducts(): AdminProduct[] {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      writeProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    }
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function writeProducts(products: AdminProduct[]): void {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write products.json", e);
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: 'new' | 'sale' | 'hot';
  colors?: string[];
  sizes?: string[];
  slug: string;
  category: string;
  description?: string;
  details?: string[];
  care?: string[];
  inStock?: boolean;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export const mockCategories: Category[] = [
  {
    id: 'c1',
    name: 'Túi Thêu',
    slug: 'tui-theu',
    image: 'https://picsum.photos/600/800?random=5',
    description: 'Những chiếc túi tote, túi đeo vai được thêu tay tỉ mỉ — mang nghệ thuật vào cuộc sống hàng ngày.'
  },
  {
    id: 'c2',
    name: 'Tranh Thêu',
    slug: 'tranh-theu',
    image: 'https://picsum.photos/600/800?random=6',
    description: 'Các tác phẩm tranh thêu tay tinh xảo, mang hơi thở của thiên nhiên và văn hóa Việt Nam.'
  },
  {
    id: 'c3',
    name: 'Bộ Kit DIY',
    slug: 'bo-kit-diy',
    image: 'https://picsum.photos/600/800?random=7',
    description: 'Tự tay tạo nên những kỷ niệm — bộ kit thêu đầy đủ dụng cụ dành cho người mới bắt đầu.'
  },
  {
    id: 'c4',
    name: 'Phụ Kiện',
    slug: 'phu-kien',
    image: 'https://picsum.photos/600/800?random=8',
    description: 'Khăn tay, cài tóc, huy hiệu thêu tay — những phụ kiện nhỏ xinh mang dấu ấn riêng.'
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Túi Tote Thêu Cúc Họa Mi',
    price: 285000,
    originalPrice: 350000,
    image: 'https://picsum.photos/600/800?random=1',
    images: [
      'https://picsum.photos/600/800?random=1',
      'https://picsum.photos/600/800?random=11',
      'https://picsum.photos/600/800?random=12',
    ],
    badge: 'sale',
    stock: 3,
    rating: 4.8,
    reviewCount: 24,
    colors: ['#FAF8FF', '#EDE0FF', '#C4A8E8'],
    slug: 'tui-tote-theu-cuc-hoa-mi',
    category: 'tui-theu',
    description: 'Chiếc túi tote canvas trắng được thêu tay hình bông cúc họa mi tinh tế. Mỗi đường kim mũi chỉ đều mang theo tình yêu và sự tỉ mỉ của người thợ thêu. Phù hợp đi học, đi làm hay làm quà tặng ý nghĩa.',
    details: ['Canvas 100% cotton', 'Kích thước: 38 x 40 cm', 'Quai dài có thể điều chỉnh', 'Khóa kéo bên trong'],
    care: ['Giặt tay nhẹ nhàng với nước lạnh', 'Không vắt mạnh', 'Phơi nơi thoáng mát, tránh ánh nắng trực tiếp'],
  },
  {
    id: 'p2',
    name: 'Vòng Thêu Trang Trí Vintage',
    price: 150000,
    image: 'https://picsum.photos/600/800?random=2',
    images: [
      'https://picsum.photos/600/800?random=2',
      'https://picsum.photos/600/800?random=13',
    ],
    badge: 'new',
    rating: 4.7,
    reviewCount: 18,
    sizes: ['15cm', '20cm', '25cm'],
    slug: 'vong-theu-trang-tri-vintage',
    category: 'tranh-theu',
    description: 'Vòng thêu phong cách vintage với các mẫu hoa lá và chim bướm đặc trưng. Có thể dùng trang trí tường, làm quà lưu niệm hoặc làm điểm nhấn cho không gian sống.',
    details: ['Khung gỗ tự nhiên', 'Vải linen 100%', 'Chỉ thêu DMC chính hãng', 'Có thể treo tường ngay sau khi nhận'],
    care: ['Không giặt nước', 'Dùng chổi mềm phủi bụi nhẹ nhàng', 'Tránh độ ẩm cao'],
  },
  {
    id: 'p3',
    name: 'Bộ Kit Thêu Tay Cho Người Mới',
    price: 195000,
    image: 'https://picsum.photos/600/800?random=3',
    images: [
      'https://picsum.photos/600/800?random=3',
      'https://picsum.photos/600/800?random=14',
      'https://picsum.photos/600/800?random=15',
    ],
    badge: 'hot',
    stock: 5,
    rating: 4.9,
    reviewCount: 42,
    slug: 'bo-kit-theu-tay-cho-nguoi-moi',
    category: 'bo-kit-diy',
    description: 'Bộ kit thêu tay hoàn chỉnh dành cho người mới bắt đầu. Bao gồm tất cả những gì bạn cần để tạo ra tác phẩm đầu tiên của mình — từ vải, chỉ màu đến kim và hướng dẫn chi tiết bằng hình ảnh.',
    details: ['1 vòng gỗ 15cm', '8 cuộn chỉ màu DMC', '5 kim thêu các cỡ', 'Vải aida 18 count', 'Hướng dẫn thêu cho người mới (tiếng Việt)'],
    care: ['Bảo quản chỉ màu nơi khô thoáng', 'Tránh để ẩm'],
  },
  {
    id: 'p4',
    name: 'Khăn Tay Thêu Tên Theo Yêu Cầu',
    price: 120000,
    inStock: false,
    rating: 4.6,
    reviewCount: 15,
    image: 'https://picsum.photos/600/800?random=4',
    images: [
      'https://picsum.photos/600/800?random=4',
      'https://picsum.photos/600/800?random=16',
    ],
    colors: ['#FFFFFF', '#F3EEFF', '#E5D5F5'],
    slug: 'khan-tay-theu-ten-theo-yeu-cau',
    category: 'phu-kien',
    description: 'Khăn tay cotton mềm mại được thêu tên hoặc initials theo yêu cầu. Món quà cá nhân hóa hoàn hảo cho sinh nhật, kỷ niệm hay lễ tốt nghiệp. Ghi rõ tên cần thêu trong phần ghi chú đơn hàng.',
    details: ['Cotton 100% cao cấp', 'Kích thước: 25 x 25 cm', 'Thêu tên / initials / ngày tháng', 'Đóng gói hộp quà xinh xắn'],
    care: ['Giặt máy chế độ nhẹ', 'Ủi mặt trong để giữ đường thêu'],
  },
  {
    id: 'p5',
    name: 'Tranh Thêu Phong Cảnh Làng Quê',
    price: 420000,
    originalPrice: 480000,
    image: 'https://picsum.photos/600/800?random=17',
    images: [
      'https://picsum.photos/600/800?random=17',
      'https://picsum.photos/600/800?random=18',
    ],
    badge: 'sale',
    rating: 4.8,
    reviewCount: 31,
    sizes: ['20x30cm', '30x40cm'],
    slug: 'tranh-theu-phong-canh-lang-que',
    category: 'tranh-theu',
    description: 'Tác phẩm tranh thêu tay mô tả cảnh đồng lúa xanh mướt và mái nhà tranh đặc trưng của làng quê Việt Nam. Mỗi tác phẩm là công trình thủ công hàng tuần của nghệ nhân.',
    details: ['Vải silk cao cấp', 'Khung gỗ đi kèm', 'Ký hiệu của nghệ nhân', 'Chứng nhận thủ công'],
    care: ['Không giặt nước', 'Lau nhẹ bằng khăn khô mềm', 'Tránh ánh nắng trực tiếp để màu sắc bền đẹp'],
  },
  {
    id: 'p6',
    name: 'Túi Đeo Chéo Thêu Hoa Sen',
    price: 345000,
    image: 'https://picsum.photos/600/800?random=19',
    images: [
      'https://picsum.photos/600/800?random=19',
      'https://picsum.photos/600/800?random=21',
    ],
    badge: 'new',
    rating: 4.7,
    reviewCount: 22,
    colors: ['#FFFFFF', '#F3EEFF'],
    slug: 'tui-deo-cheo-theu-hoa-sen',
    category: 'tui-theu',
    description: 'Túi đeo chéo nhỏ xinh phong cách minimalist với họa tiết hoa sen thêu tay nổi bật. Kích thước vừa vặn để đựng điện thoại, ví và chìa khóa.',
    details: ['Vải canvas cotton', 'Kích thước: 20 x 15 x 5 cm', 'Dây đeo có thể tháo rời', 'Ngăn phụ bên trong'],
    care: ['Giặt tay nhẹ nhàng', 'Phơi nơi thoáng'],
  },
  {
    id: 'p7',
    name: 'Bộ Kit Thêu Chữ & Monogram',
    price: 165000,
    inStock: false,
    rating: 4.5,
    reviewCount: 9,
    image: 'https://picsum.photos/600/800?random=22',
    images: [
      'https://picsum.photos/600/800?random=22',
      'https://picsum.photos/600/800?random=23',
    ],
    slug: 'bo-kit-theu-chu-monogram',
    category: 'bo-kit-diy',
    description: 'Bộ kit thêu chuyên biệt để luyện thêu chữ và monogram cá nhân. Bao gồm vải tập, chỉ, kim và bảng mẫu chữ cái đầy đủ từ A-Z.',
    details: ['Vải cotton 5 tờ', 'Chỉ DMC 12 màu', '3 kim thêu', 'Bảng mẫu 26 chữ cái A-Z'],
    care: ['Bảo quản nơi khô ráo'],
  },
  {
    id: 'p8',
    name: 'Cài Tóc Thêu Hoa Nhỏ',
    price: 85000,
    image: 'https://picsum.photos/600/800?random=24',
    images: [
      'https://picsum.photos/600/800?random=24',
    ],
    badge: 'hot',
    stock: 2,
    rating: 4.9,
    reviewCount: 38,
    colors: ['#FAF8FF', '#EDE0FF', '#C4A8E8', '#2E1A4A'],
    slug: 'cai-toc-theu-hoa-nho',
    category: 'phu-kien',
    description: 'Cài tóc nỉ được thêu tay với hoa nhỏ xinh tinh tế. Bộ gồm 2 cài, phù hợp cài mái hay búi gọn. Màu sắc pastel nhẹ nhàng, thanh lịch cho mọi trang phục.',
    details: ['Nỉ cao cấp', 'Thêu tay 100%', 'Bộ 2 cái', 'Clip inox không gỉ'],
    care: ['Không giặt nước', 'Lau khô nhẹ nhàng nếu bị bẩn'],
  },
];

export const mockReviews = [
  { id: 'r1', author: 'Minh Hằng', content: 'Chất vải đẹp, đường thêu tỉ mỉ, rất đáng tiền!', rating: 5 },
  { id: 'r2', author: 'Thu Trang', content: 'Shop tư vấn nhiệt tình, gói hàng xinh xắn.', rating: 5 },
  { id: 'r3', author: 'Mai Liên', content: 'Bộ kit đầy đủ dụng cụ, hướng dẫn dễ hiểu cho người mới.', rating: 4 },
  { id: 'r4', author: 'Lan Phương', content: 'Túi đeo chéo thêu hoa sen rất đẹp, nhiều người hỏi mua luôn!', rating: 5 },
  { id: 'r5', author: 'Bích Ngọc', content: 'Khăn tay thêu tên làm quà sinh nhật, bạn mình rất thích.', rating: 5 },
];

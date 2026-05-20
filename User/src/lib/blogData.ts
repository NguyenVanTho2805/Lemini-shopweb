export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogCategories = ['Hướng dẫn', 'Cảm hứng', 'Chăm sóc sản phẩm', 'Câu chuyện'];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'huong-dan-theu-tay-co-ban-cho-nguoi-moi',
    title: 'Hướng Dẫn Thêu Tay Cơ Bản Cho Người Mới Bắt Đầu',
    excerpt: 'Bạn muốn học thêu tay nhưng chưa biết bắt đầu từ đâu? Bài viết này sẽ hướng dẫn bạn từng bước từ cách chọn kim, chỉ đến các mũi thêu cơ bản nhất.',
    content: `Thêu tay là một nghệ thuật thủ công đẹp đẽ mà bất kỳ ai cũng có thể học được. Dưới đây là những bước cơ bản để bắt đầu hành trình thêu tay của bạn.

## Dụng cụ cần thiết

Trước khi bắt đầu, bạn cần chuẩn bị:
- **Vòng thêu** (hoop): Giúp giữ vải căng đều, kích thước 15–20cm là phù hợp cho người mới
- **Kim thêu**: Chọn loại kim có lỗ to để xâu chỉ dễ dàng, số 7 hoặc 8 là lý tưởng
- **Chỉ thêu DMC**: Chỉ được tách thành 6 sợi nhỏ, thường dùng 2–3 sợi khi thêu
- **Vải**: Vải cotton hoặc linen có độ dày vừa phải, không quá mỏng hay quá dày

## Mũi thêu cơ bản đầu tiên

### 1. Mũi thêu thẳng (Running Stitch)
Đây là mũi thêu đơn giản nhất — đưa kim lên rồi xuống theo đường thẳng, cách đều nhau. Thích hợp để vẽ đường viền và tạo họa tiết đơn giản.

### 2. Mũi thêu lùi (Backstitch)
Mũi thêu lùi tạo ra đường liên tục, không đứt đoạn. Đưa kim lên tại điểm A, xuống tại điểm B (phía sau), rồi lên tại điểm C (phía trước). Dùng để viền nét và tạo chữ thêu.

### 3. Mũi thêu satin (Satin Stitch)
Lấp đầy một vùng màu bằng cách thêu các mũi song song sát nhau. Bí quyết là giữ các mũi thêu cùng hướng và độ căng đều nhau để bề mặt phẳng mịn.

## Lời khuyên cho người mới

Đừng nản lòng nếu những đường thêu đầu tiên chưa đẹp — đó là điều hoàn toàn bình thường! Hãy bắt đầu với các mẫu đơn giản như hoa nhỏ hay hình học, và dần dần thử các mẫu phức tạp hơn khi bạn đã quen tay.`,
    image: 'https://picsum.photos/800/500?random=101',
    category: 'Hướng dẫn',
    author: 'Lemini Team',
    date: '2024-03-15',
    readTime: 6,
    tags: ['Hướng dẫn', 'Người mới', 'Thêu tay'],
  },
  {
    id: 'b2',
    slug: 'cach-bao-quan-san-pham-theu-tay',
    title: 'Cách Bảo Quản Sản Phẩm Thêu Tay Để Luôn Bền Đẹp',
    excerpt: 'Sản phẩm thêu tay handmade cần được chăm sóc đúng cách để giữ màu sắc và đường chỉ bền đẹp theo năm tháng. Đây là những bí quyết bảo quản từ các nghệ nhân Lemini.',
    content: `Sản phẩm thêu tay handmade không chỉ là món đồ sử dụng mà còn là tác phẩm nghệ thuật. Việc bảo quản đúng cách sẽ giúp chúng luôn đẹp như mới qua nhiều năm.

## Giặt đúng cách

Quy tắc số một: **không bao giờ cho vào máy giặt** với các sản phẩm thêu tinh xảo. Thay vào đó:

- Giặt tay nhẹ nhàng với nước lạnh (dưới 30°C)
- Dùng xà phòng trung tính, không chứa chất tẩy
- Không vò mạnh hay vắt xoắn — chỉ nhẹ nhàng ép nước ra
- Đặt sản phẩm phẳng trên khăn bông để thấm nước

## Phơi khô

- Phơi nơi thoáng mát, tránh ánh nắng trực tiếp vì UV sẽ làm phai màu chỉ thêu
- Không dùng máy sấy quần áo
- Phơi phẳng hoặc treo nhẹ, không kẹp kẹp vào vùng thêu

## Ủi và bảo quản

- Khi ủi, lật mặt trong ra ngoài và đặt khăn cotton lên trên phần thêu
- Không ủi thẳng lên đường chỉ thêu
- Bảo quản trong túi vải thoáng khí, tránh nơi ẩm ướt`,
    image: 'https://picsum.photos/800/500?random=102',
    category: 'Chăm sóc sản phẩm',
    author: 'Lemini Team',
    date: '2024-04-02',
    readTime: 4,
    tags: ['Bảo quản', 'Mẹo hay', 'Thêu tay'],
  },
  {
    id: 'b3',
    slug: 'y-tuong-qua-tang-doc-dao-tu-san-pham-theu',
    title: 'Ý Tưởng Quà Tặng Độc Đáo Từ Sản Phẩm Thêu Tay',
    excerpt: 'Đang tìm kiếm món quà ý nghĩa và độc đáo cho người thân? Sản phẩm thêu tay handmade mang dấu ấn cá nhân là lựa chọn tuyệt vời cho mọi dịp đặc biệt.',
    content: `Trong thời đại sản phẩm công nghiệp tràn lan, một món quà handmade mang theo câu chuyện và tâm huyết của người làm ra nó sẽ luôn có giá trị đặc biệt.

## Quà tặng sinh nhật

**Khăn tay thêu tên** là món quà sinh nhật hoàn hảo — vừa thực dụng vừa mang dấu ấn cá nhân. Bạn có thể thêu tên, ngày sinh, hoặc một câu quote ý nghĩa. Gói trong hộp quà xinh xắn, đây là món quà không ai nỡ bỏ qua.

## Quà tặng đám cưới

**Tranh thêu phong cảnh** hoặc **túi tote thêu tên cặp đôi** là ý tưởng quà cưới độc đáo. Không ai muốn tặng thứ giống mọi người — một tác phẩm nghệ thuật handmade sẽ được treo trang trọng trong không gian sống mới của họ.

## Quà tặng ngày lễ

- **Valentine**: Vòng thêu hình trái tim với hai tên lồng vào nhau
- **8/3**: Túi tote hoa thêu tay thanh lịch
- **Tết**: Tranh thêu hoa đào, hoa mai mang không khí xuân

## Cách cá nhân hóa

Tất cả sản phẩm tại Lemini đều có thể được cá nhân hóa theo yêu cầu. Chỉ cần ghi rõ nội dung muốn thêu (tên, ngày tháng, câu chữ) trong phần ghi chú đơn hàng. Đội ngũ nghệ nhân của chúng tôi sẽ biến ý tưởng của bạn thành hiện thực.`,
    image: 'https://picsum.photos/800/500?random=103',
    category: 'Cảm hứng',
    author: 'Lemini Team',
    date: '2024-04-20',
    readTime: 5,
    tags: ['Quà tặng', 'Ý tưởng', 'Cá nhân hóa'],
  },
  {
    id: 'b4',
    slug: 'cau-chuyen-nguoi-tho-theu-lemini',
    title: 'Câu Chuyện Người Thợ Thêu Đằng Sau Mỗi Sản Phẩm Lemini',
    excerpt: 'Mỗi đường kim mũi chỉ trên sản phẩm Lemini đều mang theo câu chuyện của những người phụ nữ tài hoa. Hãy cùng chúng tôi khám phá những con người đằng sau thương hiệu.',
    content: `Khi bạn cầm trên tay một chiếc túi tote thêu cúc họa mi hay nhìn ngắm bức tranh thêu phong cảnh làng quê, bạn không chỉ đang chạm vào một sản phẩm — bạn đang chạm vào tâm huyết của người thợ thêu.

## Nguồn gốc của Lemini

Lemini được thành lập năm 2020 bởi nhóm những người yêu nghề thêu tay truyền thống Việt Nam. Chúng tôi nhận thấy rằng nghề thêu — vốn là di sản văn hóa quý giá — đang dần mai một trước làn sóng công nghiệp hóa.

Mục tiêu của chúng tôi rất đơn giản: **mang nghệ thuật thêu tay vào cuộc sống hiện đại**, tạo ra những sản phẩm vừa đẹp vừa thực dụng, phù hợp với lối sống của người Việt trẻ hôm nay.

## Những đôi tay tài hoa

Đội ngũ nghệ nhân của Lemini gồm hơn 20 người, chủ yếu là phụ nữ từ các làng nghề thêu truyền thống ở Hà Đông và Thường Tín (Hà Nội). Nhiều người trong số họ đã gắn bó với nghề từ thuở thiếu thời, học nghề từ bà, từ mẹ.

Chị Nguyễn Thị Hoa, một trong những nghệ nhân lâu năm nhất của Lemini, chia sẻ: *"Mỗi mẫu thêu là một câu chuyện. Khi tôi thêu bông cúc họa mi, tôi nghĩ về những buổi chiều thơ ấu trên cánh đồng. Đó là điều tôi muốn người dùng cảm nhận được."*

## Cam kết của chúng tôi

Chúng tôi trả mức lương công bằng và bảo đảm môi trường làm việc tốt cho tất cả nghệ nhân. Mỗi sản phẩm bán ra là một đóng góp trực tiếp vào việc bảo tồn nghề thêu truyền thống Việt Nam.`,
    image: 'https://picsum.photos/800/500?random=104',
    category: 'Câu chuyện',
    author: 'Lemini Team',
    date: '2024-05-05',
    readTime: 7,
    tags: ['Câu chuyện', 'Nghệ nhân', 'Thương hiệu'],
  },
  {
    id: 'b5',
    slug: 'xu-huong-theu-tay-2024',
    title: 'Xu Hướng Thêu Tay 2024: Những Họa Tiết Đang Làm Mưa Làm Gió',
    excerpt: 'Năm 2024, thêu tay đang trở lại mạnh mẽ với những xu hướng mới lạ. Từ thêu botanical hiện đại đến thêu abstract tối giản, cùng xem điều gì đang hot trong cộng đồng thêu tay.',
    content: `Thêu tay đang trải qua một cuộc phục hưng thú vị. Không còn bị xem là "đồ của bà ngoại", thêu tay ngày nay được giới trẻ đón nhận như một hình thức self-care và biểu đạt sáng tạo.

## Botanical & Wildflower

Họa tiết thực vật — từ hoa cỏ dại đến các loại lá cây nhiệt đới — đang thống trị xu hướng thêu 2024. Phong cách này mang lại cảm giác tự nhiên, tươi mới và rất phù hợp để trang trí túi canvas hoặc khăn tay.

## Thêu Abstract Tối Giản

Ít chi tiết hơn, màu sắc trầm hơn, nhưng lại có chiều sâu hơn. Thêu abstract với các đường nét hình học, màu sắc monochrome đang được ưa chuộng bởi những ai thích phong cách tối giản Bắc Âu.

## Thêu Text & Typography

Thêu chữ không còn dừng lại ở tên hay initials — năm 2024, người ta thêu cả quotes, lyrics bài hát, hay thậm chí là emoji lên vải. Thêu chữ in hoa với font serif lên áo sơ mi đang là trend hot nhất trên Instagram.

## Sustainable & Upcycling

Xu hướng bền vững ảnh hưởng đến cả thêu tay — người ta thêu lên quần áo cũ để tái chế, vá víu những chiếc áo sờn cũ bằng những mảng màu thêu thủ công. Đây là cách thú vị để "slow fashion" trở thành lifestyle.`,
    image: 'https://picsum.photos/800/500?random=105',
    category: 'Cảm hứng',
    author: 'Lemini Team',
    date: '2024-05-18',
    readTime: 5,
    tags: ['Xu hướng', '2024', 'Sáng tạo'],
  },
  {
    id: 'b6',
    slug: 'kit-diy-theu-tay-qua-tang-y-nghia',
    title: 'Tại Sao Bộ Kit DIY Là Món Quà Ý Nghĩa Nhất Bạn Có Thể Tặng',
    excerpt: 'Thay vì tặng một vật phẩm, hãy tặng một trải nghiệm. Bộ kit thêu tay DIY không chỉ là đồ vật — đó là cánh cửa dẫn vào một sở thích mới, một kỹ năng mới.',
    content: `Trong thời đại mà mọi thứ đều có thể mua online trong vài cú click, một món quà thực sự ý nghĩa là thứ mang lại trải nghiệm, không chỉ là vật chất.

## Quà tặng là trải nghiệm

Bộ kit thêu tay DIY của Lemini không chỉ là hộp dụng cụ — đó là:
- Một hobby mới để khám phá
- Thời gian yên tĩnh để thư giãn và sáng tạo
- Sản phẩm tự tay làm ra mang lại cảm giác tự hào

## Phù hợp với mọi đối tượng

**Cho bạn bè thích crafting**: Đây là điều hiển nhiên — nhưng ngay cả người chưa bao giờ thêu cũng sẽ thích bộ kit beginner-friendly với hướng dẫn chi tiết bằng hình ảnh.

**Cho trẻ em**: Thêu tay phát triển sự khéo léo, kiên nhẫn và tư duy sáng tạo. Bộ kit dành cho trẻ từ 8 tuổi trở lên với các mẫu đơn giản và an toàn.

**Cho người cao tuổi**: Thêu tay là hoạt động nhẹ nhàng giúp giữ đôi tay linh hoạt và tâm trí minh mẫn. Nhiều khách hàng của Lemini mua kit để tặng ông bà.

## Bộ kit Lemini có gì?

Mỗi bộ kit đều bao gồm đầy đủ: vải, chỉ màu DMC chính hãng, kim, vòng gỗ và hướng dẫn step-by-step bằng tiếng Việt. Không cần mua thêm bất cứ thứ gì — chỉ cần mở ra và bắt đầu.`,
    image: 'https://picsum.photos/800/500?random=106',
    category: 'Cảm hứng',
    author: 'Lemini Team',
    date: '2024-05-25',
    readTime: 4,
    tags: ['Kit DIY', 'Quà tặng', 'Hướng dẫn'],
  },
];

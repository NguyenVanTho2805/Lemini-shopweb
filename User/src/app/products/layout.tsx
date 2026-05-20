import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tất Cả Sản Phẩm — Lemini',
  description: 'Khám phá toàn bộ sản phẩm thêu tay handmade của Lemini: túi thêu, tranh thêu, bộ kit DIY và phụ kiện.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bộ Sưu Tập — Lemini',
  description: 'Khám phá các bộ sưu tập thêu tay handmade của Lemini: túi thêu, tranh thêu, kit DIY và phụ kiện.',
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

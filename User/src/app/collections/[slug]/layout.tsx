import { mockCategories } from '@/lib/data';
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cat = mockCategories.find(c => c.slug === slug);
  if (!cat) return { title: 'Bộ sưu tập — Lemini' };
  return {
    title: `${cat.name} — Lemini`,
    description: cat.description ?? `Khám phá bộ sưu tập ${cat.name} tại Lemini. Sản phẩm thêu tay handmade độc đáo.`,
    openGraph: {
      title: cat.name,
      description: cat.description,
      images: [{ url: cat.image, width: 600, height: 800, alt: cat.name }],
    },
  };
}

export default function CollectionDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

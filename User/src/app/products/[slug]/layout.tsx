import { mockProducts } from '@/lib/data';
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);
  if (!product) return { title: 'Sản phẩm — Lemini' };
  return {
    title: `${product.name} — Lemini`,
    description: product.description ?? `Mua ${product.name} tại Lemini. Sản phẩm thêu tay handmade chất lượng cao.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, width: 600, height: 800, alt: product.name }],
      type: 'website',
    },
  };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

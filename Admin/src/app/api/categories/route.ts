import { readCategories, writeCategories, type AdminCategory } from '@/lib/categoryStore';

export async function GET() {
  return Response.json(readCategories());
}

export async function POST(request: Request) {
  const body = await request.json();
  const cats = readCategories();

  const newCat: AdminCategory = {
    id: `c_${Date.now()}`,
    name: body.name ?? '',
    slug: body.slug ?? '',
    icon: body.icon ?? '📦',
    description: body.description ?? '',
    order: cats.length + 1,
  };

  cats.push(newCat);
  writeCategories(cats);
  return Response.json(newCat, { status: 201 });
}

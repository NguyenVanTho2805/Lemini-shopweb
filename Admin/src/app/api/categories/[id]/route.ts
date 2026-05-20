import { readCategories, writeCategories } from '@/lib/categoryStore';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const cats = readCategories();
  const idx = cats.findIndex(c => c.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  cats[idx] = { ...cats[idx], ...body };
  writeCategories(cats);
  return Response.json(cats[idx]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  writeCategories(readCategories().filter(c => c.id !== id));
  return Response.json({ ok: true });
}

import { readPromotions, writePromotions } from '@/lib/promotionStore';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const promotions = readPromotions();
  const idx = promotions.findIndex(p => p.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  promotions[idx] = { ...promotions[idx], ...body };
  writePromotions(promotions);
  return Response.json(promotions[idx]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  writePromotions(readPromotions().filter(p => p.id !== id));
  return Response.json({ ok: true });
}

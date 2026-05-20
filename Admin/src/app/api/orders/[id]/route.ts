import { readOrders, writeOrders } from '@/lib/orderStore';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = readOrders().find(o => o.id === id);
  if (!order) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(order);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });

  orders[idx] = { ...orders[idx], ...body, updatedAt: new Date().toISOString() };
  writeOrders(orders);
  return Response.json(orders[idx]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orders = readOrders().filter(o => o.id !== id);
  writeOrders(orders);
  return Response.json({ ok: true });
}

import { readOrders, writeOrders, type AdminOrder } from '@/lib/orderStore';
import { readPromotions, writePromotions } from '@/lib/promotionStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  let orders = readOrders();
  if (email) orders = orders.filter(o => o.customerEmail === email);
  return Response.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const orders = readOrders();

  const now = new Date().toISOString();
  const code = `LM-${Date.now().toString().slice(-8)}`;

  const newOrder: AdminOrder = {
    id: `o_${Date.now()}`,
    code,
    customerName: body.customerName ?? '',
    customerEmail: body.customerEmail ?? '',
    customerPhone: body.customerPhone ?? '',
    address: body.address ?? '',
    items: body.items ?? [],
    total: body.total ?? 0,
    shippingFee: body.shippingFee ?? 0,
    discount: body.discount ?? 0,
    voucherCode: body.voucherCode,
    paymentMethod: body.paymentMethod,
    status: 'pending',
    note: body.note,
    createdAt: now,
    updatedAt: now,
  };

  orders.unshift(newOrder);
  writeOrders(orders);

  // Increment voucher usage count when order is placed with a voucher code
  if (body.voucherCode) {
    const promos = readPromotions();
    const idx = promos.findIndex(p => p.code === String(body.voucherCode).toUpperCase());
    if (idx !== -1) {
      promos[idx] = { ...promos[idx], usageCount: promos[idx].usageCount + 1 };
      writePromotions(promos);
    }
  }

  return Response.json(newOrder, { status: 201 });
}

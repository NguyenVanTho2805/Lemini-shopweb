import { readLog, appendLog } from '@/lib/inventoryLogStore';

export async function GET() {
  const entries = [...readLog()].reverse().slice(0, 50);
  return Response.json(entries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const entry = appendLog({
    productId: body.productId,
    productName: body.productName,
    previousStock: body.previousStock,
    newStock: body.newStock,
    delta: body.newStock - body.previousStock,
  });
  return Response.json(entry, { status: 201 });
}

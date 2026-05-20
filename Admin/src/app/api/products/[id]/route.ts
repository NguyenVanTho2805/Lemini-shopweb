import { readProducts, writeProducts } from "@/lib/productStore";
import type { AdminProduct } from "@/types/product";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = readProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as Partial<AdminProduct>;
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });
  products[idx] = {
    ...products[idx],
    ...body,
    id,
    updatedAt: new Date().toISOString(),
  };
  writeProducts(products);
  return Response.json(products[idx]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = readProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length)
    return Response.json({ error: "Not found" }, { status: 404 });
  writeProducts(filtered);
  return Response.json({ success: true });
}

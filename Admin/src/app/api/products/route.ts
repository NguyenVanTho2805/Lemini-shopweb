import { readProducts, writeProducts } from "@/lib/productStore";
import type { AdminProduct } from "@/types/product";

export async function GET() {
  const products = readProducts();
  return Response.json(products);
}

export async function POST(request: Request) {
  const body = (await request.json()) as AdminProduct;
  const products = readProducts();
  products.unshift(body);
  writeProducts(products);
  return Response.json(body, { status: 201 });
}

import { readReviews, writeReviews } from '@/lib/reviewStore';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return Response.json({}, { headers: CORS });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const reviews = readReviews();
  const idx = reviews.findIndex(r => r.id === params.id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });

  reviews[idx] = { ...reviews[idx], ...body };
  writeReviews(reviews);
  return Response.json(reviews[idx], { headers: CORS });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const reviews = readReviews();
  const filtered = reviews.filter(r => r.id !== params.id);
  writeReviews(filtered);
  return Response.json({ ok: true }, { headers: CORS });
}

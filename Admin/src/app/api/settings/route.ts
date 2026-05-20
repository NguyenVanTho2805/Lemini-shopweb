import { readSettings, writeSettings } from '@/lib/settingsStore';

export async function GET() {
  return Response.json(readSettings());
}

export async function PUT(request: Request) {
  const body = await request.json();
  const current = readSettings();
  const updated = { ...current, ...body };
  writeSettings(updated);
  return Response.json(updated);
}

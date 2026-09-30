export const dynamic = 'force-dynamic';
import { getChatGPTUser } from '../../chatgpt-auth';
import { database } from '../../../db/storage';

// In-memory fallback for serverless runtime when Cloudflare D1 is not attached
const memoryEntries = new Map<string, Record<string, any>>();

export async function GET() {
  const u = await getChatGPTUser();
  if (!u) return Response.json({ error: 'Sign in to load your practice.' }, { status: 401 });

  try {
    const db: any = database();
    const r: any = await db.prepare('SELECT key,value FROM entries WHERE user_id=?').bind(u.userId).all();
    return Response.json(Object.fromEntries((r.results || []).map((x: any) => [x.key, JSON.parse(x.value)])));
  } catch {
    // Graceful fallback on Vercel without Cloudflare D1
    const userMap = memoryEntries.get(u.userId) || {};
    return Response.json(userMap);
  }
}

export async function POST(req: Request) {
  const u = await getChatGPTUser();
  if (!u) return Response.json({ error: 'Sign in to save your practice.' }, { status: 401 });
  if (req.headers.get('origin') && req.headers.get('origin') !== new URL(req.url).origin) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const raw = await req.text();
    if (raw.length > 200000) return new Response('Too large', { status: 413 });
    const { key, value } = JSON.parse(raw);
    if (typeof key !== 'string' || !key.match(/^[a-zA-Z0-9_-]{1,120}$/) || value === undefined) {
      return new Response('Invalid entry', { status: 400 });
    }

    try {
      const db: any = database();
      await db.prepare('INSERT INTO entries(user_id,key,value,updated) VALUES(?,?,?,?) ON CONFLICT(user_id,key) DO UPDATE SET value=excluded.value,updated=excluded.updated').bind(u.userId, key, JSON.stringify(value), new Date().toISOString()).run();
    } catch {
      // Memory store fallback on Vercel
      if (!memoryEntries.has(u.userId)) memoryEntries.set(u.userId, {});
      memoryEntries.get(u.userId)![key] = value;
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return Response.json({ error: 'Could not save. Your draft is still on this screen; please retry.' }, { status: 500 });
  }
}

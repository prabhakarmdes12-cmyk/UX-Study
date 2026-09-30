export const dynamic = 'force-dynamic';
import { createSessionToken, ADMIN_EMAIL, ADMIN_NAME, COOKIE_NAME } from '@/app/auth';

export async function POST(req: Request) {
  try {
    const body: any = await req.json().catch(() => ({}));
    const passcode = typeof body?.passcode === 'string' ? body.passcode.trim() : '';

    const expectedPasscode = (process.env.STUDIO_PASSCODE || 'prabhakar2026').trim();

    if (!passcode || passcode !== expectedPasscode) {
      return Response.json({ ok: false, error: 'Incorrect passcode. Please try again.' }, { status: 401 });
    }

    const user = {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: 'admin' as const,
      authMethod: 'passcode' as const,
    };

    const token = await createSessionToken(user);

    const isProd = process.env.NODE_ENV === 'production';
    const cookieHeader = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${isProd ? '; Secure' : ''}`;

    const headers = new Headers();
    headers.append('Set-Cookie', cookieHeader);

    return Response.json({ ok: true, user: { email: user.email, name: user.name, role: user.role } }, { headers });
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || 'Authentication error' }, { status: 500 });
  }
}

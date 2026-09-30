export const dynamic = 'force-dynamic';
import { getSessionUser, isGoogleConfigured, ADMIN_EMAIL, COOKIE_NAME } from '@/app/auth';

export async function GET() {
  const user = await getSessionUser();
  return Response.json({
    authenticated: !!user,
    user: user ? { email: user.email, name: user.name, role: user.role } : null,
    googleConfigured: isGoogleConfigured(),
    adminEmail: ADMIN_EMAIL,
  });
}

export async function DELETE() {
  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
  return Response.json({ ok: true, signedOut: true }, { headers });
}

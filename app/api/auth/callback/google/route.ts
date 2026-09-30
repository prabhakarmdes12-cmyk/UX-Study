export const dynamic = 'force-dynamic';
import { createSessionToken, ADMIN_EMAIL, COOKIE_NAME } from '@/app/auth';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    return Response.redirect(new URL('/?auth_error=' + encodeURIComponent(error || 'missing_code'), url.origin));
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${url.origin}/api/auth/callback/google`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Google token exchange error:', errText);
      return Response.redirect(new URL('/?auth_error=token_exchange_failed', url.origin));
    }

    const tokenData: any = await tokenRes.json();
    const idToken = tokenData.id_token;

    // Decode JWT payload without third-party library
    const payloadPart = idToken.split('.')[1];
    let base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const profile: any = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));

    const userEmail = (profile?.email || '').toLowerCase().trim();
    const targetAdmin = (ADMIN_EMAIL || 'prabhakarmdes12@gmail.com').toLowerCase().trim();

    if (userEmail !== targetAdmin) {
      return Response.redirect(new URL(`/?auth_error=unauthorized&attempted=${encodeURIComponent(userEmail)}`, url.origin));
    }

    const sessionUser = {
      email: userEmail,
      name: profile?.name || 'Prabhakar Kumar',
      role: 'admin' as const,
      authMethod: 'google' as const,
    };

    const sessionToken = await createSessionToken(sessionUser);
    const isProd = process.env.NODE_ENV === 'production';
    const cookieHeader = `${COOKIE_NAME}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${isProd ? '; Secure' : ''}`;

    const headers = new Headers();
    headers.append('Set-Cookie', cookieHeader);
    headers.append('Location', `${url.origin}/#signed_in`);

    return new Response(null, { status: 302, headers });
  } catch (e: any) {
    console.error('Google auth callback error:', e);
    return Response.redirect(new URL('/?auth_error=callback_error', url.origin));
  }
}

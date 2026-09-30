export const dynamic = 'force-dynamic';
import { isGoogleConfigured } from '@/app/auth';

export async function GET(req: Request) {
  if (!isGoogleConfigured()) {
    return Response.json({
      error: 'Google Sign-In is not yet configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel environment variables or use Option B (Passcode).'
    }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const requestUrl = new URL(req.url);
  const redirectUri = `${requestUrl.origin}/api/auth/callback/google`;

  const state = crypto.randomUUID();
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'select_account');

  // Store state in temporary cookie for validation
  const headers = new Headers();
  headers.append('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`);
  headers.append('Location', authUrl.toString());

  return new Response(null, { status: 302, headers });
}

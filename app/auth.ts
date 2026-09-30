import { cookies } from 'next/headers';

export type StudioUser = {
  email: string;
  name: string;
  role: 'admin';
  authMethod: 'passcode' | 'google';
};

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'prabhakarmdes12@gmail.com';
export const ADMIN_NAME = 'Prabhakar Kumar';
export const COOKIE_NAME = 'studio_session';
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.AUTH_SECRET || 'ux-study-prabhakar-studio-secret-2026';

function base64UrlEncode(str: string): string {
  return Buffer.from(str, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return Buffer.from(base64, 'base64').toString('utf8');
}

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    enc.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionToken(user: StudioUser): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadData = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };
  const payload = base64UrlEncode(JSON.stringify(payloadData));
  const dataToSign = new TextEncoder().encode(`${header}.${payload}`);
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);
  const signature = Buffer.from(signatureBuffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return `${header}.${payload}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<StudioUser | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;

    const dataToVerify = new TextEncoder().encode(`${header}.${payload}`);
    const key = await getCryptoKey();

    let sigBase64 = signature.replace(/-/g, '+').replace(/_/g, '/');
    while (sigBase64.length % 4) sigBase64 += '=';
    const sigBytes = Buffer.from(sigBase64, 'base64');

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, dataToVerify);
    if (!isValid) return null;

    const parsedPayload = JSON.parse(base64UrlDecode(payload));
    if (parsedPayload.exp && parsedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      email: parsedPayload.email,
      name: parsedPayload.name,
      role: parsedPayload.role || 'admin',
      authMethod: parsedPayload.authMethod || 'passcode',
    };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<StudioUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return null;
    return await verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

export function isGoogleConfigured(): boolean {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

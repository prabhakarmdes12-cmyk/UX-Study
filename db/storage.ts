// Safe runtime binding for Cloudflare D1 and R2
let cfEnv: any = null;
try {
  // @ts-ignore
  const cf = await import('cloudflare:workers');
  cfEnv = cf.env;
} catch {
  // Runtime without cloudflare:workers (e.g. Vercel, Node.js, Next build)
}

export function database(): any {
  if (!cfEnv || !cfEnv.DB) throw new Error('Database unavailable in this runtime');
  return cfEnv.DB;
}

export function bucket(): any {
  if (!cfEnv || !cfEnv.BUCKET) throw new Error('Audio storage unavailable in this runtime');
  return cfEnv.BUCKET;
}

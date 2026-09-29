import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let cfEnv: any = null;
try {
  // @ts-ignore
  const cf = await import("cloudflare:workers");
  cfEnv = cf.env;
} catch {}

export function getDb() {
  if (!cfEnv || !cfEnv.DB) {
    throw new Error(
      "Cloudflare D1 binding DB is unavailable in this environment."
    );
  }
  return drizzle(cfEnv.DB, { schema });
}

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when Supabase creds are configured. If false, the app falls back to the seed catalog. */
export const supabaseEnabled = Boolean(url && anonKey);

/**
 * Supabase client scoped to the `macyprints` Postgres schema, so all queries
 * hit our isolated tables (not the project's other schemas).
 */
export const supabase = supabaseEnabled
  ? createClient(url!, anonKey!, { db: { schema: "macyprints" } })
  : null;

/** Email allowed to manage the shop (must match the RLS owner policy). */
export const OWNER_EMAIL = "yosoytujeffe@gmail.com";

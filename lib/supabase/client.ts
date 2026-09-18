import { createBrowserClient } from "@supabase/ssr";

function readSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "Cargalas en .env.local y en las variables de entorno del hosting.",
    );
  }

  return { url, key };
}

export function createSupabaseBrowserClient() {
  const { url, key } = readSupabaseEnv();

  return createBrowserClient(url, key, {
    auth: {
      flowType: "pkce",
    },
  });
}

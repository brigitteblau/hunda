import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

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

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, key } = readSupabaseEnv();

  return createServerClient(url, key, {
    auth: {
      flowType: "pkce",
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components can't set cookies directly.
        }
      },
    },
  });
}

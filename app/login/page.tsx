import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  const params = new URLSearchParams({ auth: sp.auth === "signup" ? "signup" : "login" });
  if (typeof sp.error === "string") params.set("error", sp.error);

  redirect(`/?${params.toString()}`);
}

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";
import { ErrorAlert } from "./error-alert";
import LandingNavbar from "@/components/landingnavbar";

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

  if (user) redirect("/home");

  return (

    <div className="flex h-screen flex-col overflow-hidden">
      <LandingNavbar />
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      {typeof sp.error === "string" && <ErrorAlert />}
      <LoginForm />
    </main>
    </div>
  );
}
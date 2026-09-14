import { redirect } from "next/navigation";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";
import { ErrorAlert } from "./error-alert";

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

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0F0D]">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-160 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-16 blur-[130px]"
        style={{ background: "radial-gradient(circle, #41C086, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <Link
        href="/"
        className="relative z-10 pt-8 pl-6 text-sm font-semibold tracking-[-0.02em] text-white sm:pl-10"
      >
        hunda<span className="text-[#41C086]">.</span>
      </Link>

      <main className="relative flex flex-1 items-center justify-center px-6 py-16">
        {typeof sp.error === "string" && <ErrorAlert />}
        <LoginForm />
      </main>
    </div>
  );
}
import { redirect } from "next/navigation";

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

  if (user) redirect("/home");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#D9D9D9] px-6 py-6">

      <section
        className="relative mx-auto flex w-full max-w-[520px] min-h-[400px] flex-col rounded-[28px] bg-white px-10 py-8 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
      >
        <h2 className="absolute right-8 top-6 text-lg font-bold">
          hunda.
        </h2>

        <h1 className="mt-2 text-center text-4xl font-black">
          LOGIN
        </h1>

        {typeof sp.error === "string" && <ErrorAlert />}

        <div className="mt-14 flex justify-center">
          <LoginForm />
        </div>

        <p className="mt-auto pb-4 text-center text-sm text-zinc-600">
          ¿Sos nuevo?{" "}
          <span className="cursor-pointer font-semibold underline">
            Registrate
          </span>
        </p>
      </section>
    </main>
  );
}
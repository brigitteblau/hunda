"use client";

import { useMemo, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleGoogle() {
    setBusy(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/home`,
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data?.url) window.location.href = data.url;
    } finally {
      setBusy(false);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    setBusy(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/home`,
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Revisá tu correo para continuar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex w-[80%] max-w-[420px] flex-col gap-8">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black text-base font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        <FcGoogle size={26} />
        Continuar con Google
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-300" />
        <span className="text-sm text-zinc-500">o</span>
        <div className="h-px flex-1 bg-zinc-300" />
      </div>

      <form onSubmit={handleEmail} className="flex flex-col gap-6">
        <div>
          <label className="mb-3 block text-sm font-medium text-black">
            Email
          </label>

          <input
            type="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-full bg-[#E6E6E6] px-5 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={busy || !email}
          className="h-11 w-full rounded-full bg-black text-base font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
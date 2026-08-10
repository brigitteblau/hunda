"use client";

import { useMemo, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export function LoginForm() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    setBusy(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        window.location.href = "/home";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/home`,
          },
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert("Cuenta creada.");
        setMode("login");
        setPassword("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[380px] flex-col gap-6 rounded-[28px] border border-white/40 bg-white/70 px-8 py-9 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl">
      <span className="absolute right-7 top-6 text-base font-bold text-zinc-900">
        hunda.
      </span>

      <h1
        className="mt-2 text-center text-3xl font-black tracking-[0.15em] text-zinc-900"
        style={{ textShadow: "0 1px 1px rgba(255,255,255,0.6)" }}
      >
        {mode === "login" ? "LOG IN" : "REGISTRO"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            E-mail o Usuario
          </label>

          <input
            type="email"
            placeholder="Escribí acá..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-full border border-white/60 bg-white/80 px-5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Escribí acá..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-full border border-white/60 bg-white/80 px-5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="mt-1 flex justify-center gap-4">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            title="Continuar con Google"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 disabled:opacity-50"
          >
            <FcGoogle size={22} />
          </button>

          <button
            type="button"
            disabled
            title="Próximamente"
            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full bg-white/60 shadow-md opacity-50"
          >
            <FaFacebook size={20} className="text-[#1877F2]" />
          </button>

          <button
            type="button"
            disabled
            title="Próximamente"
            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full bg-white/60 shadow-md opacity-50"
          >
            <FaApple size={20} className="text-zinc-900" />
          </button>
        </div>

        <button
          type="submit"
          disabled={busy || !email || !password}
          className="mt-2 h-11 w-full rounded-full bg-[#2FD9A8] text-base font-semibold text-white transition hover:bg-[#25c396] disabled:opacity-50"
        >
          {mode === "login" ? "Iniciar sesión" : "Registrarme"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-700">
        {mode === "login" ? "¿Sos nuevo? " : "¿Ya tenés cuenta? "}
        <span
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="cursor-pointer font-semibold underline"
        >
          {mode === "login" ? "Registrate" : "Iniciar sesión"}
        </span>
      </p>
    </div>
  );
}
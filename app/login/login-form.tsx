"use client";

import { useMemo, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { PawPrint } from "lucide-react";

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
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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

        window.location.href = "/dashboard";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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
    <div className="relative mx-auto flex w-full max-w-100 flex-col gap-7 rounded-4xl border border-white/10 bg-white/4 px-8 py-10 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#41C086]/15 text-[#41C086]">
          <PawPrint size={18} />
        </span>

        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-center text-[clamp(1.8rem,4vw,2.2rem)] leading-none tracking-[-0.04em] font-extrabold text-white">
            {mode === "login" ? (
              <>Bienvenido de <span className="text-[#41C086]">vuelta.</span></>
            ) : (
              <>Creá tu <span className="text-[#41C086]">cuenta.</span></>
            )}
          </h1>
          <p className="text-sm text-white/45">
            {mode === "login"
              ? "Tu perro te está esperando."
              : "Empecemos a diseñar su próximo paso."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/60">
            E-mail o Usuario
          </label>

          <input
            type="email"
            placeholder="Escribí acá..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/60">
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Escribí acá..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#41C086] focus:ring-2 focus:ring-[#41C086]/30"
          />
        </div>

        <button
          type="submit"
          disabled={busy || !email || !password}
          className="mt-1 h-11 w-full rounded-full bg-[#41C086] text-sm font-semibold text-[#0B0F0D] transition hover:bg-white disabled:opacity-50"
        >
          {mode === "login" ? "Iniciar sesión" : "Registrarme"}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/25">o</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            title="Continuar con Google"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:bg-white/10 disabled:opacity-50"
          >
            <FcGoogle size={20} />
          </button>

          <button
            type="button"
            disabled
            title="Próximamente"
            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-40"
          >
            <FaFacebook size={18} className="text-[#1877F2]" />
          </button>

          <button
            type="button"
            disabled
            title="Próximamente"
            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-40"
          >
            <FaApple size={18} className="text-white" />
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-white/45">
        {mode === "login" ? "¿Sos nuevo? " : "¿Ya tenés cuenta? "}
        <span
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="cursor-pointer font-medium text-[#41C086] underline underline-offset-4 hover:text-white transition"
        >
          {mode === "login" ? "Registrate" : "Iniciá sesión"}
        </span>
      </p>
    </div>
  );
}
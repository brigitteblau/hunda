"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  Aviso,
  BotonEnlace,
  Campo,
  Sociales,
  botonPrincipal,
  campo,
  entrarConGoogle,
} from "./auth-ui";

const REMEMBER_KEY = "hunda:remember-email";

function guardarEmail(email: string | null) {
  try {
    if (email) localStorage.setItem(REMEMBER_KEY, email);
    else localStorage.removeItem(REMEMBER_KEY);
  } catch {
    // localStorage no disponible: no pasa nada
  }
}

function emailGuardado() {
  try {
    return localStorage.getItem(REMEMBER_KEY) ?? "";
  } catch {
    return "";
  }
}

export function LoginForm({
  initialError,
  initialNotice,
  onCambiarModo,
}: {
  initialError?: string;
  initialNotice?: string;
  onCambiarModo: () => void;
}) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState(() => emailGuardado());
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [recordar, setRecordar] = useState(() => emailGuardado() !== "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [aviso, setAviso] = useState<string | null>(initialNotice ?? null);

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    try {
      const mensaje = await entrarConGoogle(supabase);
      if (mensaje) setError(mensaje);
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    setBusy(true);
    setError(null);
    setAviso(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      guardarEmail(recordar ? email : null);
      window.location.href = "/dashboard";
    } finally {
      setBusy(false);
    }
  }

  async function handleOlvide() {
    setError(null);
    setAviso(null);
    if (!email) {
      setError("Escribí tu email arriba y volvé a tocar “¿Olvidaste tu contraseña?”.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/configuracion`,
      });
      if (error) {
        setError(error.message);
        return;
      }
      setAviso(`Te mandamos un mail a ${email} para recuperar tu cuenta.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Campo id="auth-email" label="Email o usuario" icono={<Mail className="h-4 w-4" />}>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          className={campo}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Campo>

      <Campo id="auth-password" label="Contraseña" icono={<Lock className="h-4 w-4" />}>
        <input
          id="auth-password"
          type={verPassword ? "text" : "password"}
          autoComplete="current-password"
          className={`${campo} pr-12`}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setVerPassword((v) => !v)}
          aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/55 transition-colors hover:text-white"
        >
          {verPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </Campo>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex cursor-pointer items-center gap-2.5 text-white/85">
          <input
            type="checkbox"
            checked={recordar}
            onChange={(e) => setRecordar(e.target.checked)}
            className="h-4 w-4 accent-[#00e39a]"
          />
          Recordarme
        </label>
        <button
          type="button"
          onClick={handleOlvide}
          disabled={busy}
          className="text-[13px] font-medium text-mint transition-colors hover:text-white disabled:opacity-50"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {error && <Aviso tipo="error">{error}</Aviso>}
      {aviso && <Aviso tipo="ok">{aviso}</Aviso>}

      <button type="submit" disabled={busy || !email || !password} className={botonPrincipal}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Iniciar sesión
        {!busy && <ArrowRight className="h-4 w-4" />}
      </button>

      <Sociales onGoogle={handleGoogle} busy={busy} />

      <p className="text-sm text-white/75">
        ¿Sos nuevo? <BotonEnlace onClick={onCambiarModo}>Creá tu cuenta</BotonEnlace>
      </p>
    </form>
  );
}

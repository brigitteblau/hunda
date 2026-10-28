"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
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


function fortaleza(password: string) {
  const largo = password.length >= 8;
  const letras = /[a-zA-Z]/.test(password);
  const numeros = /\d/.test(password);
  const extra = /[^a-zA-Z0-9]/.test(password) || (/[a-z]/.test(password) && /[A-Z]/.test(password));
  const valida = largo && letras && numeros;
  const puntos = password.length === 0 ? 0 : 1 + Number(largo) + Number(letras && numeros) + Number(extra && largo);
  return { valida, puntos: Math.min(4, puntos) };
}

export function SignupForm({
  initialError,
  onCambiarModo,
  onCuentaCreada,
}: {
  initialError?: string;
  onCambiarModo: () => void;
  onCuentaCreada: (aviso: string) => void;
}) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);

  const { valida, puntos } = fortaleza(password);
  const textoFortaleza =
    password.length === 0
      ? "Mínimo 8 caracteres con letras y números"
      : valida
        ? "Segura · mínimo 8 caracteres con letras y números"
        : "Débil · mínimo 8 caracteres con letras y números";

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
    setError(null);

    if (!valida) {
      setError("La contraseña necesita al menos 8 caracteres, con letras y números.");
      return;
    }
    if (!acepta) {
      setError("Para crear la cuenta tenés que aceptar los términos y condiciones.");
      return;
    }

    setBusy(true);
    try {
      const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`.trim();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: { full_name: nombreCompleto, first_name: nombre.trim(), last_name: apellido.trim() },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }


      if (data.user && data.user.identities?.length === 0) {
        setError("Ese email ya tiene una cuenta. Probá iniciando sesión.");
        return;
      }


      if (data.session) {
        window.location.href = "/dashboard";
        return;
      }

      onCuentaCreada("¡Cuenta creada! Te mandamos un mail para confirmarla. Cuando lo hagas, iniciá sesión acá.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="auth-nombre" label="Nombre" icono={<User className="h-4 w-4" />}>
          <input
            id="auth-nombre"
            autoComplete="given-name"
            required
            className={campo}
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Campo>
        <Campo id="auth-apellido" label="Apellido">
          <input
            id="auth-apellido"
            autoComplete="family-name"
            required
            className={`${campo} pl-4`}
            placeholder="Tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Campo>
      </div>

      <Campo id="auth-email-signup" label="Email" icono={<Mail className="h-4 w-4" />}>
        <input
          id="auth-email-signup"
          type="email"
          autoComplete="email"
          required
          className={campo}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Campo>

      <div className="flex flex-col gap-2">
        <Campo id="auth-password-signup" label="Creá una contraseña" icono={<Lock className="h-4 w-4" />}>
          <input
            id="auth-password-signup"
            type={verPassword ? "text" : "password"}
            autoComplete="new-password"
            required
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
        <div className="flex items-center gap-3">
          <span className="flex flex-1 gap-1.5" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={`h-1 flex-1 rounded-full ${n <= puntos ? "bg-mint" : "bg-white/15"}`} />
            ))}
          </span>
          <span className="text-[11px] text-white/60">{textoFortaleza}</span>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/85">
        <input
          type="checkbox"
          checked={acepta}
          onChange={(e) => setAcepta(e.target.checked)}
          className="h-4 w-4 accent-[#00e39a]"
        />
        <span>
          Acepto los{" "}
          <Link href="/terminos" target="_blank" className="text-mint underline-offset-2 hover:underline">
            términos y condiciones
          </Link>
        </span>
      </label>

      {error && <Aviso tipo="error">{error}</Aviso>}

      <button type="submit" disabled={busy || !nombre || !apellido || !email || !password} className={botonPrincipal}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Crear cuenta
        {!busy && <ArrowRight className="h-4 w-4" />}
      </button>

      <Sociales onGoogle={handleGoogle} busy={busy} />

      <p className="text-sm text-white/75">
        ¿Ya tenés cuenta? <BotonEnlace onClick={onCambiarModo}>Iniciá sesión</BotonEnlace>
      </p>
    </form>
  );
}

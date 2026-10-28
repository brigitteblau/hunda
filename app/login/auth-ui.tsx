"use client";

// Piezas compartidas por los pop ups de iniciar sesión y crear cuenta.

import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type AuthMode = "login" | "signup";

/** Devuelve un mensaje de error, o null si redirigió bien a Google. */
export async function entrarConGoogle(
  supabase: ReturnType<typeof createSupabaseBrowserClient>
): Promise<string | null> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
  });
  if (error) return error.message;
  if (data?.url) window.location.href = data.url;
  return null;
}

export const campo =
  "h-[52px] w-full rounded-xl border border-white/12 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint focus:ring-2 focus:ring-mint/20";
export const etiqueta = "text-sm font-medium text-white";

export function Campo({
  id,
  label,
  icono,
  children,
}: {
  id: string;
  label: string;
  icono?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={etiqueta}>
        {label}
      </label>
      <div className="relative">
        {icono && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45">{icono}</span>
        )}
        {children}
      </div>
    </div>
  );
}

export function Aviso({ tipo, children }: { tipo: "error" | "ok"; children: React.ReactNode }) {
  return (
    <p
      role={tipo === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-xs ${
        tipo === "error"
          ? "border-red-400/30 bg-red-400/10 text-red-300"
          : "border-mint/30 bg-mint/10 text-white/90"
      }`}
    >
      {children}
    </p>
  );
}

export function Sociales({ onGoogle, busy }: { onGoogle: () => void; busy: boolean }) {
  const base =
    "flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white transition-colors";
  return (
    <div className="flex gap-3">
      <button type="button" onClick={onGoogle} disabled={busy} className={`${base} hover:bg-white/10 disabled:opacity-50`}>
        <FcGoogle size={18} />
        Google
      </button>
      <button type="button" disabled title="Próximamente" className={`${base} cursor-not-allowed opacity-40`}>
        <FaApple size={17} />
        Apple
      </button>
      <button type="button" disabled title="Próximamente" className={`${base} cursor-not-allowed opacity-40`}>
        <FaFacebook size={17} className="text-[#1877F2]" />
        Facebook
      </button>
    </div>
  );
}

export const botonPrincipal =
  "inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-mint text-[15px] font-semibold text-[#0B0F0D] shadow-[0_10px_30px_-8px_rgba(0,227,154,0.55)] transition-colors hover:bg-white disabled:opacity-50";

export function BotonEnlace({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="font-medium text-mint transition-colors hover:text-white">
      {children}
    </button>
  );
}

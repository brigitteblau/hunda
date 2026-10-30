"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { AuthMode } from "./auth-ui";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

export type { AuthMode };

const FOTO_LOGIN = "/auth/login.png";
const FOTO_SIGNUP = "/auth/signup.png";


function PanelFoto({ mode }: { mode: AuthMode }) {
  const src = mode === "login" ? FOTO_LOGIN : FOTO_SIGNUP;

  return (
    <div
      className="relative hidden w-[400px] shrink-0 overflow-hidden md:block"
      style={{ background: "linear-gradient(160deg,#2f5a4a 0%,#17302a 100%)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- imagen estática de /public */}
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

export default function AuthModal({
  open,
  mode,
  initialError,
  onClose,
  onModeChange,
}: {
  open: boolean;
  mode: AuthMode;
  initialError?: string;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}) {
  const tituloId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [aviso, setAviso] = useState<string | undefined>();

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const esLogin = mode === "login";

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        className="relative flex w-full max-w-[960px] overflow-hidden rounded-[32px] border border-white/15 bg-[#14231f] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] outline-none"
      >
        <PanelFoto mode={mode} />

        <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-6 px-6 py-12 sm:px-12">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-2 pr-10">
            <h2 id={tituloId} className="font-display text-[34px] font-bold leading-tight tracking-[-0.03em] text-white">
              {esLogin ? (
                <>
                  ¡Hola <span className="text-mint">de nuevo!</span>
                </>
              ) : (
                <>
                  Creá <span className="text-mint">tu cuenta</span>
                </>
              )}
            </h2>
            <p className="text-sm text-white/70">
              {esLogin
                ? "Ingresá para seguir acompañando a tu perro."
                : "Sumate a la comunidad Hunda en menos de un minuto."}
            </p>
          </div>

          {esLogin ? (
            <LoginForm
              key="login"
              initialError={initialError}
              initialNotice={aviso}
              onCambiarModo={() => {
                setAviso(undefined);
                onModeChange("signup");
              }}
            />
          ) : (
            <SignupForm
              key="signup"
              initialError={initialError}
              onCambiarModo={() => onModeChange("login")}
              onCuentaCreada={(texto) => {
                setAviso(texto);
                onModeChange("login");
              }}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

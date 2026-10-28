"use client";

// Maneja los pop ups de "Iniciar sesión" y "Crear cuenta" de la landing.
//
// Cualquier botón abre el pop up con:
//   const { openAuth } = useAuthModal();
//   <button onClick={() => openAuth("login")}>...</button>   // o "signup"
//
// También se abre solo si la URL trae ?auth=login o ?auth=signup (opcionalmente
// con ?error=...). Así siguen funcionando los redirects viejos a /login.

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import AuthModal, { type AuthMode } from "./auth-modal";

interface AuthModalContextValue {
  openAuth: (mode: AuthMode, opciones?: { error?: string }) => void;
  closeAuth: () => void;
}

// Sin provider (ej. una página fuera de (marketing)) caemos a la ruta /login,
// que redirige a la landing con el pop up abierto.
const AuthModalContext = createContext<AuthModalContextValue>({
  openAuth: (mode) => {
    window.location.href = `/login${mode === "signup" ? "?auth=signup" : ""}`;
  },
  closeAuth: () => {},
});

export function useAuthModal() {
  return useContext(AuthModalContext);
}

function AuthDesdeUrl({ abrir }: { abrir: (mode: AuthMode, opciones?: { error?: string }) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const auth = searchParams.get("auth");
  const error = searchParams.get("error") ?? undefined;

  useEffect(() => {
    if (auth !== "login" && auth !== "signup") return;
    abrir(auth, { error });
    // Limpiamos la URL para que un refresh no vuelva a abrir el pop up
    window.history.replaceState(null, "", pathname);
  }, [auth, error, abrir, pathname]);

  return null;
}

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<{ open: boolean; mode: AuthMode; error?: string }>({
    open: false,
    mode: "login",
  });

  const openAuth = useCallback((mode: AuthMode, opciones?: { error?: string }) => {
    setEstado({ open: true, mode, error: opciones?.error });
  }, []);

  const closeAuth = useCallback(() => setEstado((prev) => ({ ...prev, open: false })), []);

  const value = useMemo(() => ({ openAuth, closeAuth }), [openAuth, closeAuth]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      {/* useSearchParams necesita Suspense para que la página pueda prerenderizarse */}
      <Suspense fallback={null}>
        <AuthDesdeUrl abrir={openAuth} />
      </Suspense>

      <AuthModal
        open={estado.open}
        mode={estado.mode}
        initialError={estado.error}
        onClose={closeAuth}
        onModeChange={(mode) => setEstado((prev) => ({ ...prev, mode, error: undefined }))}
      />
    </AuthModalContext.Provider>
  );
}

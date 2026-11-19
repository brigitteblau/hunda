"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Modal from "@/components/modal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type Unidad = "cm" | "pulgadas";

type Notificaciones = {
  estado: boolean;
  ajuste: boolean;
  comunidad: boolean;
  novedades: boolean;
};

export type ConfiguracionInicial = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ubicacion: string;
  avatarUrl: string | null;
  perros: number;
  miembroDesde: number;
  notificaciones: Notificaciones;
  unidad: Unidad;
};

const tarjeta = "rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-7";
const tituloTarjeta = "font-display text-xl font-semibold text-white";
const subtitulo = "text-sm text-white/55";
const etiqueta = "text-sm font-medium text-white";
const input =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint focus:ring-2 focus:ring-mint/20";
const botonContorno =
  "inline-flex h-10 w-full shrink-0 items-center justify-center rounded-full border border-mint/60 sm:w-auto px-5 text-sm font-medium text-mint transition-colors hover:bg-mint/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";
const botonMint =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-mint px-6 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-mint";

function Switch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "bg-mint" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full transition-all ${
          checked ? "left-6 bg-[#0B0F0D]" : "left-1 bg-white"
        }`}
      />
    </button>
  );
}

function Fila({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/10">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[15px] text-white">{titulo}</span>
        <span className="text-sm text-white/50">{descripcion}</span>
      </div>
      {children}
    </div>
  );
}

function CampoTexto({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={etiqueta}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={input}
      />
    </div>
  );
}

export default function ConfiguracionForm({ inicial }: { inicial: ConfiguracionInicial }) {
  const router = useRouter();

  // Perfil
  const [guardado, setGuardado] = useState({
    nombre: inicial.nombre,
    apellido: inicial.apellido,
    email: inicial.email,
    telefono: inicial.telefono,
    ubicacion: inicial.ubicacion,
  });
  const [perfil, setPerfil] = useState(guardado);
  const [guardando, setGuardando] = useState(false);
  const [avisoPerfil, setAvisoPerfil] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  // Preferencias (se guardan solas al cambiarlas)
  const [notif, setNotif] = useState(inicial.notificaciones);
  const [unidad, setUnidad] = useState<Unidad>(inicial.unidad);
  const [errorPref, setErrorPref] = useState<string | null>(null);

  // Contraseña
  const [passwordAbierto, setPasswordAbierto] = useState(false);
  // Eliminar cuenta
  const [eliminarAbierto, setEliminarAbierto] = useState(false);

  const modificado = (Object.keys(perfil) as (keyof typeof perfil)[]).some((k) => perfil[k] !== guardado[k]);

  const iniciales =
    `${perfil.nombre.charAt(0)}${perfil.apellido.charAt(0)}`.toUpperCase() || perfil.email.charAt(0).toUpperCase();

  async function guardarPerfil() {
    setAvisoPerfil(null);
    setGuardando(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const nombre = perfil.nombre.trim();
      const apellido = perfil.apellido.trim();
      const emailNuevo = perfil.email.trim();
      const cambioEmail = emailNuevo !== guardado.email;

      const { error } = await supabase.auth.updateUser({
        ...(cambioEmail ? { email: emailNuevo } : {}),
        data: {
          first_name: nombre,
          last_name: apellido,
          full_name: `${nombre} ${apellido}`.trim(),
          phone: perfil.telefono.trim(),
          location: perfil.ubicacion.trim(),
        },
      });

      if (error) {
        setAvisoPerfil({ tipo: "error", texto: error.message });
        return;
      }

      // El email no cambia hasta que confirma el mail que le mandamos.
      const nuevo = { ...perfil, nombre, apellido, email: cambioEmail ? guardado.email : emailNuevo };
      setGuardado(nuevo);
      setPerfil({ ...nuevo, email: emailNuevo });
      setAvisoPerfil({
        tipo: "ok",
        texto: cambioEmail
          ? "Guardamos tus datos. Te mandamos un mail para confirmar el cambio de email."
          : "Cambios guardados.",
      });
      router.refresh();
    } finally {
      setGuardando(false);
    }
  }

  function cancelarPerfil() {
    setPerfil(guardado);
    setAvisoPerfil(null);
  }

  async function guardarPreferencias(data: Record<string, unknown>, revertir: () => void) {
    setErrorPref(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ data });
    if (error) {
      revertir();
      setErrorPref("No pudimos guardar el cambio. Probá de nuevo.");
    }
  }

  function cambiarNotif(clave: keyof Notificaciones, valor: boolean) {
    const previo = notif;
    setNotif({ ...notif, [clave]: valor });
    void guardarPreferencias({ [`notif_${clave}`]: valor }, () => setNotif(previo));
  }

  function cambiarUnidad(valor: Unidad) {
    if (valor === unidad) return;
    const previa = unidad;
    setUnidad(valor);
    void guardarPreferencias({ unidad: valor }, () => setUnidad(previa));
  }

  const perrosTexto = `${inicial.perros} ${inicial.perros === 1 ? "perro registrado" : "perros registrados"}`;

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-6">
          {/* Perfil */}
          <section className={`${tarjeta} flex flex-col gap-6`}>
            <div className="flex flex-col gap-1">
              <h2 className={tituloTarjeta}>Perfil</h2>
              <p className={subtitulo}>Tus datos personales y cómo te ven en hunda.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6">
              {inicial.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- avatar externo (host variable)
                <img src={inicial.avatarUrl} alt="" className="h-[60px] w-[60px] rounded-full border-2 border-mint object-cover" />
              ) : (
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-mint bg-mint/10 font-display text-xl font-semibold text-mint">
                  {iniciales}
                </span>
              )}
              <div className="flex min-w-[170px] flex-1 flex-col gap-0.5">
                <span className="truncate text-lg font-semibold text-white">
                  {`${guardado.nombre} ${guardado.apellido}`.trim() || guardado.email}
                </span>
                <span className="text-sm text-white/55">
                  {perrosTexto} · Miembro desde {inicial.miembroDesde}
                </span>
              </div>
              <button type="button" disabled title="Próximamente" className={botonContorno}>
                Cambiar foto
              </button>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                void guardarPerfil();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <CampoTexto label="Nombre" autoComplete="given-name" value={perfil.nombre} onChange={(v) => setPerfil({ ...perfil, nombre: v })} />
                <CampoTexto label="Apellido" autoComplete="family-name" value={perfil.apellido} onChange={(v) => setPerfil({ ...perfil, apellido: v })} />
                <CampoTexto label="Email" type="email" autoComplete="email" value={perfil.email} onChange={(v) => setPerfil({ ...perfil, email: v })} />
                <CampoTexto label="Teléfono" type="tel" autoComplete="tel" value={perfil.telefono} onChange={(v) => setPerfil({ ...perfil, telefono: v })} />
                <CampoTexto className="sm:col-span-2" label="Ubicación" autoComplete="address-level2" value={perfil.ubicacion} onChange={(v) => setPerfil({ ...perfil, ubicacion: v })} />
              </div>

              {avisoPerfil && (
                <p
                  role="status"
                  className={`rounded-xl border px-4 py-3 text-xs ${
                    avisoPerfil.tipo === "ok"
                      ? "border-mint/30 bg-mint/10 text-mint"
                      : "border-red-400/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {avisoPerfil.texto}
                </p>
              )}

              <div className="flex items-center justify-end gap-5">
                <button
                  type="button"
                  onClick={cancelarPerfil}
                  disabled={!modificado || guardando}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white disabled:opacity-40 disabled:hover:text-white/60"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={!modificado || guardando || !perfil.nombre.trim()} className={botonMint}>
                  {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
                  Guardar cambios
                </button>
              </div>
            </form>
          </section>

          {/* Seguridad */}
          <section className={`${tarjeta} flex flex-col gap-5`}>
            <h2 className={tituloTarjeta}>Seguridad</h2>
            <div>
              <Fila titulo="Contraseña" descripcion="Cambiala cuando quieras para mantener tu cuenta segura.">
                <button type="button" onClick={() => setPasswordAbierto(true)} className={botonContorno}>
                  Cambiar
                </button>
              </Fila>
              <Fila titulo="Verificación en dos pasos" descripcion="Agregá una capa extra de seguridad al iniciar sesión. Próximamente.">
                <Switch checked={false} disabled label="Verificación en dos pasos" />
              </Fila>
            </div>
          </section>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6">
          {/* Notificaciones */}
          <section className={`${tarjeta} flex flex-col gap-5`}>
            <div className="flex flex-col gap-1">
              <h2 className={tituloTarjeta}>Notificaciones</h2>
              <p className={subtitulo}>Elegí qué avisos querés recibir.</p>
            </div>
            <div>
              <Fila titulo="Estado de impresión" descripcion="Cuando una prótesis cambie de estado.">
                <Switch checked={notif.estado} onChange={(v) => cambiarNotif("estado", v)} label="Estado de impresión" />
              </Fila>
              <Fila titulo="Controles de ajuste" descripcion="Recordatorio para revisar la prótesis de tu perro.">
                <Switch checked={notif.ajuste} onChange={(v) => cambiarNotif("ajuste", v)} label="Controles de ajuste" />
              </Fila>
              <Fila titulo="Mensajes de la comunidad" descripcion="Respuestas de voluntarios e impresores.">
                <Switch checked={notif.comunidad} onChange={(v) => cambiarNotif("comunidad", v)} label="Mensajes de la comunidad" />
              </Fila>
              <Fila titulo="Novedades de hunda" descripcion="Noticias y consejos por email.">
                <Switch checked={notif.novedades} onChange={(v) => cambiarNotif("novedades", v)} label="Novedades de hunda" />
              </Fila>
            </div>
          </section>

          {/* Preferencias */}
          <section className={`${tarjeta} flex flex-col gap-5`}>
            <h2 className={tituloTarjeta}>Preferencias</h2>
            <div>
              <Fila titulo="Idioma" descripcion="Idioma de la plataforma.">
                <select
                  aria-label="Idioma"
                  defaultValue="es"
                  className="h-10 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none focus:border-mint"
                >
                  <option value="es" className="bg-[#1c2f2a]">
                    Español
                  </option>
                </select>
              </Fila>
              <Fila titulo="Unidades de medida" descripcion="Para las medidas del muñón.">
                <div role="group" aria-label="Unidades de medida" className="flex rounded-xl border border-white/10 bg-white/[0.06] p-1">
                  {(["cm", "pulgadas"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      aria-pressed={unidad === u}
                      onClick={() => cambiarUnidad(u)}
                      className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        unidad === u ? "bg-mint text-[#0B0F0D]" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </Fila>
            </div>
            {errorPref && <p className="text-xs text-red-300">{errorPref}</p>}
          </section>

          {/* Eliminar cuenta */}
          <section className="flex flex-col gap-2 rounded-[28px] border border-red-400/25 bg-red-950/20 p-6 sm:p-7">
            <h2 className="text-lg font-semibold text-red-400">Eliminar cuenta</h2>
            <p className="text-sm text-white/60">Se borrarán tus perros, diseños e historial de forma permanente.</p>
            <button
              type="button"
              onClick={() => setEliminarAbierto(true)}
              className="mt-2 w-fit text-sm font-medium text-red-400 underline-offset-4 transition-colors hover:text-red-300 hover:underline"
            >
              Quiero eliminar mi cuenta
            </button>
          </section>
        </div>
      </div>

      <CambiarPasswordModal open={passwordAbierto} onClose={() => setPasswordAbierto(false)} />
      <EliminarCuentaModal open={eliminarAbierto} onClose={() => setEliminarAbierto(false)} />
    </>
  );
}

function CambiarPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [repetir, setRepetir] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  function cerrar() {
    setPassword("");
    setRepetir("");
    setError(null);
    setListo(false);
    onClose();
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setError("La contraseña necesita al menos 8 caracteres, con letras y números.");
      return;
    }
    if (password !== repetir) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
        return;
      }
      setListo(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={cerrar} titulo="Cambiá tu" acento="contraseña" descripcion="Elegí una nueva contraseña para tu cuenta." anchoMax={520}>
      {listo ? (
        <div className="flex flex-col gap-5">
          <p className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-mint">Contraseña actualizada.</p>
          <button type="button" onClick={cerrar} className={botonMint}>
            Listo
          </button>
        </div>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-4">
          <CampoTexto label="Nueva contraseña" type="password" autoComplete="new-password" value={password} onChange={setPassword} />
          <CampoTexto label="Repetí la contraseña" type="password" autoComplete="new-password" value={repetir} onChange={setRepetir} />
          <p className="text-xs text-white/50">Mínimo 8 caracteres con letras y números.</p>
          {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">{error}</p>}
          <button type="submit" disabled={busy || !password || !repetir} className={botonMint}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Guardar contraseña
          </button>
        </form>
      )}
    </Modal>
  );
}

function EliminarCuentaModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [texto, setTexto] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function cerrar() {
    setTexto("");
    setError(null);
    onClose();
  }

  async function eliminar() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/cuenta", { method: "DELETE" });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "No pudimos eliminar la cuenta. Probá de nuevo.");
        return;
      }
      window.location.href = "/";
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={cerrar} titulo="Eliminar" acento="cuenta" descripcion="Se borrarán tus perros, diseños e historial de forma permanente. No se puede deshacer." anchoMax={520}>
      <div className="flex flex-col gap-4">
        <CampoTexto label='Escribí "ELIMINAR" para confirmar' value={texto} onChange={setTexto} />
        {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">{error}</p>}
        <div className="flex items-center justify-end gap-5">
          <button type="button" onClick={cerrar} className="text-sm font-medium text-white/60 transition-colors hover:text-white">
            Cancelar
          </button>
          <button
            type="button"
            onClick={eliminar}
            disabled={busy || texto.trim().toUpperCase() !== "ELIMINAR"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Eliminar cuenta
          </button>
        </div>
      </div>
    </Modal>
  );
}

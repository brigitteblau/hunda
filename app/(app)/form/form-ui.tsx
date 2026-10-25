// Piezas de estilo compartidas por los pasos del formulario.

export const tarjeta =
  "rounded-3xl border border-white/15 bg-white/[0.07] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm";

export const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint focus:ring-2 focus:ring-mint/20";

export const labelClass = "text-sm font-medium text-white/85";

export const botonPrimario =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint px-7 text-sm font-semibold text-[#0B0F0D] transition-colors hover:bg-white disabled:opacity-50";

export const botonSecundario =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50";

export function Required() {
  return <span className="text-mint">*</span>;
}

/** Ícono redondo con borde verde que encabeza cada tarjeta. */
export function IconoTarjeta({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
      {children}
    </span>
  );
}

/** Franja inferior con ícono, título y texto (ej. "Cada perro es único"). */
export function Franja({
  icono,
  titulo,
  children,
  accion,
}: {
  icono: React.ReactNode;
  titulo: string;
  children?: React.ReactNode;
  accion?: React.ReactNode;
}) {
  return (
    <div className={`${tarjeta} flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center`}>
      <IconoTarjeta>{icono}</IconoTarjeta>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-base font-semibold text-white">{titulo}</h3>
        {children}
      </div>
      {accion}
    </div>
  );
}

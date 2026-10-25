// Piezas compartidas por las páginas "Trabajá con nosotros" y "Sobre nosotros".

import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { Caveat } from "next/font/google";

/** Fuente manuscrita de los textos chiquitos en verde ("más huellas en movimiento"). */
export const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

/** Barra superior simple: logo + botón Volver. */
export function Topbar() {
  return (
    <header className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-5 py-5 sm:px-8 lg:px-16">
      <Link href="/" className="text-2xl font-extrabold tracking-[-0.03em] text-white">
        hunda<span className="text-mint">.</span>
      </Link>
      <Link
        href="/"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>
    </header>
  );
}

/** Banda de la página: verde o violeta, con los puntitos del fondo. */
export function Seccion({
  id,
  tono = "verde",
  className = "",
  children,
}: {
  id?: string;
  tono?: "verde" | "violeta";
  className?: string;
  children: React.ReactNode;
}) {
  const fondo =
    tono === "verde"
      ? "bg-[linear-gradient(180deg,#2a4640_0%,#1f352f_100%)]"
      : "bg-[linear-gradient(180deg,#2e2a36_0%,#262230_100%)]";

  return (
    <section id={id} className={`relative scroll-mt-4 overflow-hidden ${fondo} ${className}`}>
      <div className="dots pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-medium uppercase tracking-[0.2em] text-white/80 ${className}`}>{children}</p>
  );
}

/** Título con una parte en verde. `acento` va después de `antes`. */
export function Titulo({
  antes,
  acento,
  despues,
  nivel = 2,
  className = "",
}: {
  antes?: string;
  acento: string;
  despues?: string;
  nivel?: 1 | 2;
  className?: string;
}) {
  const Tag = nivel === 1 ? "h1" : "h2";
  const tamano = nivel === 1 ? "text-4xl sm:text-5xl lg:text-[56px]" : "text-3xl sm:text-4xl lg:text-[40px]";
  return (
    <Tag className={`font-display font-bold leading-[1.1] tracking-[-0.04em] text-white ${tamano} ${className}`}>
      {antes}
      <span className="text-leaf">{acento}</span>
      {despues}
    </Tag>
  );
}

export function Chip({ icono, children }: { icono?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1.5 text-xs font-medium text-mint">
      {icono}
      {children}
    </span>
  );
}

export function Tarjeta({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-3xl border border-white/15 bg-white/[0.06] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function IconoRedondo({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
      {children}
    </span>
  );
}

/**
 * Lugar para una foto. Si pasás `src` muestra la imagen; si no, deja un
 * recuadro punteado para acordarte de cuál falta bajar de Figma.
 * Las fotos van en /public (ej. public/sobre-nosotros/equipo.jpg → "/sobre-nosotros/equipo.jpg").
 */
export function FotoSlot({
  src,
  alt,
  etiqueta,
  className = "",
  redondeo = "rounded-[32px]",
}: {
  src?: string;
  alt: string;
  etiqueta: string;
  className?: string;
  redondeo?: string;
}) {
  const marco = `${redondeo} border-2 border-mint/70 overflow-hidden ${className}`;

  if (src) {
    return (
      <div className={marco}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fotos estáticas de /public */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Falta la foto: ${etiqueta}`}
      className={`${marco} flex flex-col items-center justify-center gap-2 bg-white/5 p-4 text-center`}
    >
      <ImagePlus className="h-7 w-7 text-mint/70" />
      <span className="text-xs text-white/55">Foto: {etiqueta}</span>
    </div>
  );
}

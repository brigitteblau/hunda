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
  // Mismos fondos que las secciones de la landing (verde y violeta).
  const fondo =
    tono === "verde"
      ? "bg-[linear-gradient(90deg,#2d4741_0%,#334845_55%,#374647_100%)]"
      : "bg-[radial-gradient(ellipse_at_75%_15%,#4a3a4d_0%,transparent_55%),linear-gradient(160deg,#3b3a44_0%,#3a3844_40%,#393341_70%,#2f3b3b_100%)]";

  return (
    <section id={id} className={`relative scroll-mt-4 overflow-hidden ${fondo} ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(20deg,rgba(55,80,75,0.45)_0%,transparent_45%)]" />
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
      className={`rounded-3xl border border-white/30 bg-white/[0.12] shadow-[0_14px_36px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
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
 *
 * - `conMarco={false}`: la imagen ya trae su propio marco (descargada de Figma con marco):
 *   se muestra entera, sin borde ni recorte.
 * - `redondeo`: forma del marco. Acepta cualquier clase de border-radius de Tailwind
 *   (también formas orgánicas como `rounded-[42%_58%_...]`).
 */
export function FotoSlot({
  src,
  alt,
  etiqueta,
  className = "",
  redondeo = "rounded-[32px]",
  conMarco = true,
}: {
  src?: string;
  alt: string;
  etiqueta: string;
  className?: string;
  redondeo?: string;
  conMarco?: boolean;
}) {
  if (src && !conMarco) {
    // eslint-disable-next-line @next/next/no-img-element -- fotos estáticas de /public
    return <img src={src} alt={alt} className={`block h-auto w-full ${className}`} />;
  }

  const marco = `${redondeo} border-2 border-mint/70 overflow-hidden ${className}`;

  if (src) {
    return (
      <div className={marco}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fotos estáticas de /public */}
        <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Falta la foto: ${etiqueta}`}
      className={`${marco} flex flex-col items-center justify-center gap-2 bg-white/10 p-4 text-center`}
    >
      <ImagePlus className="h-7 w-7 text-mint/70" />
      <span className="text-xs text-white/55">Foto: {etiqueta}</span>
    </div>
  );
}

/**
 * Card de un perro. La imagen de Figma ya trae todo (foto + nombre + frase),
 * así que con `src` se muestra la card entera, tal cual. Sin `src`, dibuja una
 * card de ejemplo con el mismo tamaño para ver cómo va a quedar.
 */
export function CardPerroSlot({
  src,
  nombre,
  frase,
}: {
  src?: string;
  nombre: string;
  frase: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- fotos estáticas de /public
    return <img src={src} alt={`${nombre}, ${frase}`} className="block h-auto w-full" />;
  }

  return (
    <div className="flex aspect-[4/5] w-full flex-col overflow-hidden rounded-3xl border border-mint/50 bg-[#17231f]">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-white/10 text-center">
        <ImagePlus className="h-7 w-7 text-mint/70" />
        <span className="text-xs text-white/55">Card entera de {nombre}</span>
      </div>
      <p className="flex flex-wrap items-baseline gap-x-2 px-4 py-3">
        <span className="text-sm font-semibold text-white">{nombre}</span>
        <span className={`${script.className} text-base text-mint`}>{frase}</span>
      </p>
    </div>
  );
}

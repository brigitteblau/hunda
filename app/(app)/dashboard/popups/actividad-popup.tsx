"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  MapPin,
  PawPrint,
  Plus,
  Printer,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Modal from "@/components/modal";
import {
  ACTIVIDAD_TOTAL,
  fotoDePerro,
  perros,
  type Actividad,
  type IconoActividad,
  type TipoActividad,
} from "../dashboard-data";
import { DogAvatar, StatusBadge } from "../dashboard-ui";

export const iconosActividad: Record<IconoActividad, LucideIcon> = {
  regla: Ruler,
  impresora: Printer,
  mas: Plus,
  patita: PawPrint,
  reloj: Clock,
  pin: MapPin,
  check: Check,
};

type Filtro =
  | { clase: "todo" }
  | { clase: "perro"; valor: string }
  | { clase: "tipo"; valor: TipoActividad };

const filtrosTipo: { etiqueta: string; valor: TipoActividad }[] = [
  { etiqueta: "Medidas", valor: "medidas" },
  { etiqueta: "Diseños", valor: "diseno" },
  { etiqueta: "Impresiones", valor: "impresion" },
];

function coincide(a: Actividad, f: Filtro) {
  if (f.clase === "todo") return true;
  if (f.clase === "perro") return a.perro === f.valor;
  return a.tipo === f.valor;
}

export default function ActividadPopup({
  open,
  onClose,
  actividad,
}: {
  open: boolean;
  onClose: () => void;
  actividad: Actividad[];
}) {
  const [filtro, setFiltro] = useState<Filtro>({ clase: "todo" });

  const visibles = actividad.filter((a) => coincide(a, filtro));
  const total = filtro.clase === "todo" ? ACTIVIDAD_TOTAL : visibles.length;

  // Agrupa respetando el orden en que vienen
  const grupos: { nombre: string; items: Actividad[] }[] = [];
  for (const a of visibles) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.nombre === a.grupo) ultimo.items.push(a);
    else grupos.push({ nombre: a.grupo, items: [a] });
  }

  const chip = (activo: boolean) =>
    `inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
      activo
        ? "border-mint bg-mint/15 text-mint"
        : "border-white/20 bg-white/5 text-white hover:bg-white/10"
    }`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      titulo="Toda tu"
      acento="actividad"
      descripcion="Todo lo que pasó con Milo y Luna, en orden."
      anchoMax={780}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setFiltro({ clase: "todo" })}
          aria-pressed={filtro.clase === "todo"}
          className={chip(filtro.clase === "todo")}
        >
          Todo
        </button>
        {perros.map((perro) => {
          const activo = filtro.clase === "perro" && filtro.valor === perro.nombre;
          return (
            <button
              key={perro.nombre}
              type="button"
              onClick={() => setFiltro({ clase: "perro", valor: perro.nombre })}
              aria-pressed={activo}
              className={chip(activo)}
            >
              <DogAvatar nombre={perro.nombre} fotoUrl={fotoDePerro(perro.nombre)} size={22} />
              {perro.nombre}
            </button>
          );
        })}
        <span className="h-6 w-px bg-white/20" aria-hidden />
        {filtrosTipo.map((t) => {
          const activo = filtro.clase === "tipo" && filtro.valor === t.valor;
          return (
            <button
              key={t.valor}
              type="button"
              onClick={() => setFiltro({ clase: "tipo", valor: t.valor })}
              aria-pressed={activo}
              className={chip(activo)}
            >
              {t.etiqueta}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {grupos.length === 0 && (
          <p className="text-sm text-white/65">No hay actividad para este filtro.</p>
        )}

        {grupos.map((grupo) => (
          <section key={grupo.nombre} className="flex flex-col gap-1">
            <h3 className="pb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              {grupo.nombre}
            </h3>
            <ul className="flex flex-col divide-y divide-white/10">
              {grupo.items.map((a) => {
                const Icono = iconosActividad[a.icono];
                return (
                  <li key={a.id} className="flex items-center gap-4 py-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mint/40 bg-mint/10 text-mint">
                      <Icono className="h-5 w-5" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-[15px] font-semibold text-white">{a.titulo}</span>
                      <span className="text-sm text-white/55">{a.detalle}</span>
                    </div>
                    {a.estado && <StatusBadge estado={a.estado} />}
                    <DogAvatar nombre={a.perro} fotoUrl={fotoDePerro(a.perro)} size={28} />
                    <span className="w-20 shrink-0 whitespace-nowrap text-right text-sm text-white/75">
                      {a.hora}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <p className="text-sm text-white/65">
          Mostrando {visibles.length} de {total} actividades
        </p>
        {visibles.length < total && (
          // TODO: pedir las siguientes actividades a Supabase
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Cargar más
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>
    </Modal>
  );
}

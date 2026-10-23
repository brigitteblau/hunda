"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, Box, Clock, PawPrint, Plus, Printer, type LucideIcon } from "lucide-react";
import type { DashboardData } from "./dashboard-data";
import { DogAvatar, StatusBadge, botonFantasma } from "./dashboard-ui";
import ActividadPopup, { iconosActividad } from "./popups/actividad-popup";
import CreadasPopup from "./popups/creadas-popup";
import ListaImprimirPopup from "./popups/lista-imprimir-popup";
import ProcesosPopup from "./popups/procesos-popup";
import ProximasPopup from "./popups/proximas-popup";

type PopupId = "actividad" | "proceso" | "lista" | "proximas" | "creadas" | null;

const tarjeta =
  "rounded-3xl border border-white/15 bg-white/[0.07] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm";

const linkVerde =
  "inline-flex items-center gap-1.5 text-sm font-medium text-leaf transition-colors hover:text-white";

function unirNombres(nombres: string[]) {
  if (nombres.length <= 1) return nombres.join("");
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}

function nombresUnicos(nombres: string[]) {
  return [...new Set(nombres)];
}

export default function DashboardContent({
  nombre,
  datos,
}: {
  nombre: string;
  datos: DashboardData;
}) {
  const [popup, setPopup] = useState<PopupId>(null);
  const cerrar = useCallback(() => setPopup(null), []);

  const { perros, protesis, actividad } = datos;
  const enProceso = protesis.filter((p) => p.estado !== "Lista para imprimir");
  const listas = protesis.filter((p) => p.estado === "Lista para imprimir");
  // Hoy "próxima impresión" = prótesis con archivo listo (no hay turnos en la base todavía)
  const proximas = listas;
  // En el home: lo último de cada perro (máx. 3). El pop up muestra todo.
  const perrosVistos = new Set<string>();
  const resumenActividad = actividad
    .filter((a) => {
      if (perrosVistos.has(a.perroId)) return false;
      perrosVistos.add(a.perroId);
      return true;
    })
    .slice(0, 3);

  const stats: { id: Exclude<PopupId, null>; valor: number; etiqueta: string; icono: LucideIcon }[] = [
    { id: "proceso", valor: enProceso.length, etiqueta: "Prótesis en proceso", icono: Clock },
    { id: "lista", valor: listas.length, etiqueta: "Lista para imprimir", icono: Printer },
    { id: "creadas", valor: protesis.length, etiqueta: "Prótesis creadas", icono: Box },
  ];

  const lineasResumen = (() => {
    if (perros.length === 0) {
      return ["Todavía no cargaste ningún perro.", "Cargá a tu perro y creá su primera prótesis."];
    }
    if (protesis.length === 0) {
      const nombres = unirNombres(nombresUnicos(perros.map((p) => p.nombre)));
      return ["Todavía no creaste ninguna prótesis.", `Creá la primera para ${nombres}.`];
    }

    const partes: string[] = [];
    if (enProceso.length > 0) partes.push(`${enProceso.length} prótesis en proceso`);
    if (listas.length > 0) {
      partes.push(`${listas.length} ${listas.length === 1 ? "lista" : "listas"} para imprimir`);
    }
    const conProtesis = nombresUnicos(protesis.map((p) => p.perro));
    return [
      `Tenés ${partes.join(" y ")}.`,
      `${unirNombres(conProtesis)} ${conProtesis.length === 1 ? "está" : "están"} cada vez más cerca de volver a correr.`,
    ];
  })();

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-12">
      {/* Bienvenida */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-sm text-white">Dashboard Hunda</span>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-white sm:text-[34px]">
            ¡Bienvenido de vuelta, <span className="text-leaf">{nombre}!</span>
          </h1>
          <span className="h-[3px] w-80 max-w-full rounded-full bg-white" />
        </div>
        <p className="flex flex-col text-base text-white/90">
          {lineasResumen.map((linea) => (
            <span key={linea}>{linea}</span>
          ))}
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map(({ id, valor, etiqueta, icono: Icono }) => (
          <div key={id} className={`${tarjeta} flex items-center gap-5 p-6`}>
            <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
              <Icono className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[38px] font-medium leading-none text-white">
                {String(valor).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-white/85">{etiqueta}</span>
              {valor > 0 && (
                <button type="button" onClick={() => setPopup(id)} className={linkVerde}>
                  Ver todas
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Próximas impresiones + actividad */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <section className={`${tarjeta} flex flex-col gap-5 p-6`}>
          <h2 className="font-display text-[22px] font-medium text-white">Próximas impresiones</h2>

          {proximas.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-12 text-center">
              <PawPrint className="h-8 w-8 text-white/30" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white/70">
                  Todavía no tenés impresiones en curso
                </span>
                <span className="text-xs text-white/40">Creá una nueva prótesis para empezar</span>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {proximas.slice(0, 2).map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-3.5"
                >
                  <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} size={68} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[17px] font-semibold text-white">{p.perro}</span>
                    <span className="text-sm text-white/80">
                      {p.nombre}
                      {p.raza ? ` · ${p.raza}` : ""}
                    </span>
                  </div>
                  <StatusBadge estado={p.estado} />
                  <Link href={p.href} className={`${botonFantasma} h-9`}>
                    Ver detalles
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {proximas.length > 0 && (
            <div className="flex justify-center pt-2">
              <button type="button" onClick={() => setPopup("proximas")} className={linkVerde}>
                Ver todas mis impresiones
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </section>

        <section className={`${tarjeta} flex flex-col gap-5 p-6`}>
          <h2 className="font-display text-[22px] font-medium text-white">Actividad reciente</h2>

          {resumenActividad.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-12 text-center">
              <PawPrint className="h-8 w-8 text-white/30" />
              <span className="text-sm font-medium text-white/70">Todavía no hay actividad</span>
            </div>
          ) : (
            <ol className="flex flex-col">
              {resumenActividad.map((a, i) => {
                const Icono = iconosActividad[a.icono];
                const ultimo = i === resumenActividad.length - 1;
                return (
                  <li key={a.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
                        <Icono className="h-[18px] w-[18px]" />
                      </span>
                      {!ultimo && (
                        <span className="flex flex-1 py-1">
                          <span className="border-l border-dashed border-mint/40" />
                        </span>
                      )}
                    </div>
                    <div className={`flex flex-col gap-0.5 ${ultimo ? "" : "pb-5"}`}>
                      <span className="text-sm text-mint">{a.corto}</span>
                      <span className="text-sm text-white/90">{a.titulo}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {resumenActividad.length > 0 && (
            <div className="flex justify-center pt-2">
              <button type="button" onClick={() => setPopup("actividad")} className={linkVerde}>
                Ver toda la actividad
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* CTA nueva prótesis */}
      <section className={`${tarjeta} flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center`}>
        <div className="flex items-center gap-5">
          <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-mint text-[#0B0F0D]">
            <PawPrint className="h-6 w-6" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-[22px] font-medium text-white">
              ¿Querés crear una nueva prótesis?
            </h2>
            <p className="text-sm text-white/75">
              Comenzá el proceso y completá los datos de tu perro.
            </p>
          </div>
        </div>
        <Link
          href="/form"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-mint px-8 text-base font-semibold text-[#0B0F0D] shadow-[0_8px_30px_-8px_rgba(0,227,154,0.6)] transition-colors hover:bg-white"
        >
          <Plus className="h-4 w-4" />
          Nueva prótesis
        </Link>
      </section>

      {/* Pop ups */}
      <ActividadPopup open={popup === "actividad"} onClose={cerrar} actividad={actividad} perros={perros} />
      <ProcesosPopup open={popup === "proceso"} onClose={cerrar} protesis={enProceso} />
      <ListaImprimirPopup open={popup === "lista"} onClose={cerrar} protesis={listas} />
      <ProximasPopup open={popup === "proximas"} onClose={cerrar} protesis={proximas} />
      <CreadasPopup open={popup === "creadas"} onClose={cerrar} protesis={protesis} />
    </div>
  );
}

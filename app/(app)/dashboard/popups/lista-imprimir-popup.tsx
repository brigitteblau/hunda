"use client";

import { useState } from "react";
import { Clock, Download, FileText, Info, Layers, Map, MapPin } from "lucide-react";
import Modal from "@/components/modal";
import { puntosCercanos, type Protesis } from "../dashboard-data";
import { DogAvatar, StatusBadge, botonFantasma, botonMint, tarjetaModal } from "../dashboard-ui";

export default function ListaImprimirPopup({
  open,
  onClose,
  protesis,
}: {
  open: boolean;
  onClose: () => void;
  /** La prótesis lista para imprimir (si hay varias, se muestra la primera) */
  protesis: Protesis | undefined;
}) {
  // TODO: guardar el punto elegido en Supabase. Por ahora es solo visual.
  const [elegido, setElegido] = useState<string | null>(null);
  const archivo = protesis?.archivo ?? null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      titulo="Lista"
      acento="para imprimir"
      descripcion={
        protesis
          ? `La prótesis de ${protesis.perro} ya tiene su archivo listo.`
          : "No tenés prótesis listas para imprimir por ahora."
      }
      anchoMax={820}
    >
      {protesis && (
        <>
          <div className={`${tarjetaModal} flex items-center gap-4 p-5`}>
            <DogAvatar nombre={protesis.perro} fotoUrl={protesis.fotoUrl} size={64} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="text-[17px] font-semibold text-white">
                {protesis.perro} · {protesis.nombre}
              </h3>
              <p className="text-sm text-white/55">
                {protesis.tipo} · {protesis.raza}
              </p>
            </div>
            <StatusBadge estado={protesis.estado} />
          </div>

          {archivo && (
            <>
              <div className="flex items-center gap-4 rounded-2xl border border-dashed border-mint/40 bg-mint/10 p-5">
                <FileText className="h-6 w-6 shrink-0 text-mint" />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-base font-semibold text-white">{archivo.nombre}</span>
                  <span className="text-sm text-white/55">{archivo.tamano} · listo para imprimir</span>
                </div>
                {archivo.url ? (
                  <a href={archivo.url} download className={botonFantasma}>
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    title="El archivo todavía no está disponible"
                    className={`${botonFantasma} cursor-not-allowed opacity-50`}
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icono: Layers, etiqueta: "Material", valor: archivo.material },
                  { icono: Clock, etiqueta: "Tiempo estimado", valor: archivo.tiempo },
                  { icono: Info, etiqueta: "Relleno", valor: archivo.relleno },
                ].map(({ icono: Icono, etiqueta, valor }) => (
                  <div
                    key={etiqueta}
                    className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3"
                  >
                    <Icono className="h-5 w-5 shrink-0 text-mint" />
                    <div className="flex flex-col">
                      <span className="text-xs text-white/55">{etiqueta}</span>
                      <span className="text-sm font-semibold text-white">{valor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              Puntos de impresión cerca tuyo
            </h4>
            <ul className="flex flex-col divide-y divide-white/10">
              {puntosCercanos.map((punto) => {
                const activo = elegido === punto.id;
                return (
                  <li key={punto.id} className="flex items-center gap-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mint/40 bg-mint/10 text-mint">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-base font-semibold text-white">{punto.nombre}</span>
                      <span className="text-sm text-white/55">{punto.detalle}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setElegido(activo ? null : punto.id)}
                      aria-pressed={activo}
                      className={`${botonFantasma} h-9 ${activo ? "border-mint bg-mint/15 text-mint" : ""}`}
                    >
                      {activo ? "Elegido" : "Elegir"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/65">Te avisamos cuando esté lista para retirar.</p>
            {/* TODO: llevar a la pantalla/mapa de puntos de impresión */}
            <button type="button" className={botonMint}>
              <Map className="h-4 w-4" />
              Ver en el mapa
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

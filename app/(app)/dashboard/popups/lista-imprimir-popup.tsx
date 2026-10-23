"use client";

import { useState } from "react";
import { Download, FileText, Map, MapPin } from "lucide-react";
import Modal from "@/components/modal";
import { printLocations } from "@/lib/print-locations";
import type { Protesis } from "../dashboard-data";
import {
  DogAvatar,
  StatusBadge,
  botonFantasma,
  botonMint,
  tarjetaModal,
} from "../dashboard-ui";

export default function ListaImprimirPopup({
  open,
  onClose,
  protesis,
}: {
  open: boolean;
  onClose: () => void;
  /** Las prótesis con el archivo listo para imprimir */
  protesis: Protesis[];
}) {
  // TODO: guardar el punto elegido en Supabase. Por ahora es solo visual.
  const [elegido, setElegido] = useState<string | null>(null);

  const descripcion =
    protesis.length === 0
      ? "No tenés prótesis listas para imprimir por ahora."
      : protesis.length === 1
        ? `La prótesis de ${protesis[0].perro} ya tiene su archivo listo.`
        : `Tenés ${protesis.length} prótesis con su archivo listo.`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      titulo="Lista"
      acento="para imprimir"
      descripcion={descripcion}
      anchoMax={820}
    >
      {protesis.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            {protesis.map((p) => (
              <div key={p.id} className="flex flex-col gap-3">
                <div className={`${tarjetaModal} flex items-center gap-4 p-5`}>
                  <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} size={64} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h3 className="text-[17px] font-semibold text-white">
                      {p.perro} · {p.nombre}
                    </h3>
                    {p.raza && <p className="text-sm text-white/55">{p.raza}</p>}
                  </div>
                  <StatusBadge estado={p.estado} />
                </div>

                {p.archivo && (
                  <div className="flex items-center gap-4 rounded-2xl border border-dashed border-mint/40 bg-mint/10 p-5">
                    <FileText className="h-6 w-6 shrink-0 text-mint" />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-base font-semibold text-white">
                        {p.archivo.nombre}
                      </span>
                      <span className="text-sm text-white/55">Listo para imprimir</span>
                    </div>
                    {p.archivo.url ? (
                      <a href={p.archivo.url} download={p.archivo.nombre} className={botonFantasma}>
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
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              Puntos de impresión
            </h4>
            <ul className="flex flex-col divide-y divide-white/10">
              {printLocations.slice(0, 4).map((punto) => {
                const activo = elegido === punto.id;
                return (
                  <li key={punto.id} className="flex items-center gap-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mint/40 bg-mint/10 text-mint">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-base font-semibold text-white">{punto.name}</span>
                      <span className="text-sm text-white/55">
                        {punto.type} · {punto.hours}
                      </span>
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

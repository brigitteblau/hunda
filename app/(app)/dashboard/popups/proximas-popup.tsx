"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Info, Map, MapPin } from "lucide-react";
import Modal from "@/components/modal";
import type { Protesis } from "../dashboard-data";
import { DogAvatar, StatusBadge, botonFantasma, botonMint, tarjetaModal } from "../dashboard-ui";

export default function ProximasPopup({
  open,
  onClose,
  protesis,
}: {
  open: boolean;
  onClose: () => void;
  protesis: Protesis[];
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      titulo="Próximas"
      acento="impresiones"
      descripcion="Dónde y cuándo se imprime cada prótesis."
    >
      <div className="flex flex-col gap-4">
        {protesis.length === 0 && (
          <p className="text-sm text-white/65">No tenés impresiones próximas por ahora.</p>
        )}

        {protesis.map((p) => (
          <article key={p.id} className={`${tarjetaModal} flex flex-col gap-4 p-5`}>
            <div className="flex items-center gap-4">
              <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-[17px] font-semibold text-white">
                  {p.perro} · {p.nombre}
                </h3>
                <p className="text-sm text-white/55">{p.tipo}</p>
              </div>
              <StatusBadge estado={p.estado} />
            </div>

            {p.taller ? (
              <>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-mint" />
                    {p.taller.nombre} · {p.taller.distancia}
                  </span>
                  {p.taller.turno && (
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-mint" />
                      {p.taller.turno}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={p.href} className={botonFantasma}>
                    Ver detalles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {/* TODO: abrir selector de turno */}
                  <button type="button" className={botonFantasma}>
                    Cambiar turno
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-sm text-white/80">
                  <Info className="h-4 w-4 shrink-0" />
                  Todavía no elegiste dónde imprimirla.
                </p>
                <div>
                  {/* TODO: llevar a la elección de punto de impresión */}
                  <button type="button" className={`${botonMint} h-11`}>
                    <MapPin className="h-4 w-4" />
                    Elegir dónde imprimir
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-white/65">Te avisamos por mail cuando cada prótesis esté lista.</p>
        {/* TODO: llevar al mapa de impresión */}
        <button type="button" className={`${botonFantasma} h-12 px-6`}>
          <Map className="h-4 w-4" />
          Ver mapa de impresión
        </button>
      </div>
    </Modal>
  );
}

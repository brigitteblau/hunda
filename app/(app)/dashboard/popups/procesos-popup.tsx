"use client";

import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import Modal from "@/components/modal";
import type { Protesis } from "../dashboard-data";
import {
  DogAvatar,
  StatusBadge,
  Stepper,
  botonFantasma,
  subtituloProtesis,
  tarjetaModal,
} from "../dashboard-ui";

export default function ProcesosPopup({
  open,
  onClose,
  protesis,
}: {
  open: boolean;
  onClose: () => void;
  protesis: Protesis[];
}) {
  const descripcion =
    protesis.length === 0
      ? "No tenés prótesis en proceso por ahora."
      : protesis.length === 1
        ? "Esta es la prótesis que se está preparando."
        : `Estas son las ${protesis.length} prótesis que se están preparando.`;

  return (
    <Modal open={open} onClose={onClose} titulo="Prótesis" acento="en proceso" descripcion={descripcion}>
      <div className="flex flex-col gap-4">
        {protesis.map((p) => (
          <article key={p.id} className={`${tarjetaModal} flex flex-col gap-4 p-5`}>
            <div className="flex items-center gap-4">
              <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-[17px] font-semibold text-white">
                  {p.perro} · {p.nombre}
                </h3>
                <p className="text-sm text-white/55">{subtituloProtesis(p)}</p>
              </div>
              <StatusBadge estado={p.estado} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Stepper etapa={p.etapa} />
              <Link href={p.href} className={botonFantasma}>
                Ver detalles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="flex items-center gap-2 text-sm text-white/60">
              <Info className="h-4 w-4 shrink-0" />
              {p.aviso}
            </p>
          </article>
        ))}
      </div>
    </Modal>
  );
}

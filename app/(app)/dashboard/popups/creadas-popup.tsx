"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import Modal from "@/components/modal";
import { fotoDePerro, perros, type Protesis } from "../dashboard-data";
import { DogAvatar, StatusBadge, botonFantasma, botonMint, tarjetaModal } from "../dashboard-ui";

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function CreadasPopup({
  open,
  onClose,
  protesis,
}: {
  open: boolean;
  onClose: () => void;
  protesis: Protesis[];
}) {
  const [filtro, setFiltro] = useState<string>("todas");

  // Las más nuevas primero
  const ordenadas = [...protesis].reverse();
  const visibles = filtro === "todas" ? ordenadas : ordenadas.filter((p) => p.perro === filtro);

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
      titulo="Prótesis"
      acento="creadas"
      descripcion="Todas las prótesis que diseñaste en Hunda."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setFiltro("todas")}
          aria-pressed={filtro === "todas"}
          className={chip(filtro === "todas")}
        >
          Todas
        </button>
        {perros.map((perro) => (
          <button
            key={perro.nombre}
            type="button"
            onClick={() => setFiltro(perro.nombre)}
            aria-pressed={filtro === perro.nombre}
            className={chip(filtro === perro.nombre)}
          >
            <DogAvatar nombre={perro.nombre} fotoUrl={fotoDePerro(perro.nombre)} size={22} />
            {perro.nombre}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {visibles.length === 0 && (
          <p className="text-sm text-white/65">Todavía no creaste prótesis para este perro.</p>
        )}
        {visibles.map((p) => (
          <article key={p.id} className={`${tarjetaModal} flex flex-wrap items-center gap-4 p-4`}>
            <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="text-base font-semibold text-white">
                {p.perro} · {p.nombre}
              </h3>
              <p className="text-sm text-white/55">
                {capitalizar(p.creada)} · Versión {p.version}
              </p>
            </div>
            <StatusBadge estado={p.estado} />
            <Link href={p.href} className={botonFantasma}>
              Ver diseño
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-white/65">
          {visibles.length} {visibles.length === 1 ? "prótesis creada" : "prótesis creadas"}
        </p>
        <Link href="/form" className={botonMint}>
          <Plus className="h-4 w-4" />
          Nueva prótesis
        </Link>
      </div>
    </Modal>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import Modal from "@/components/modal";
import type { Protesis } from "../dashboard-data";
import {
  DogAvatar,
  StatusBadge,
  botonFantasma,
  botonMint,
  subtituloProtesis,
  tarjetaModal,
} from "../dashboard-ui";

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

  // Solo los perros que tienen prótesis
  const perros = protesis.map((p) => ({ id: p.perroId, nombre: p.perro, fotoUrl: p.fotoUrl }));
  const visibles = filtro === "todas" ? protesis : protesis.filter((p) => p.perroId === filtro);

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
      {perros.length > 1 && (
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
              key={perro.id}
              type="button"
              onClick={() => setFiltro(perro.id)}
              aria-pressed={filtro === perro.id}
              className={chip(filtro === perro.id)}
            >
              <DogAvatar nombre={perro.nombre} fotoUrl={perro.fotoUrl} size={22} />
              {perro.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {visibles.length === 0 && (
          <p className="text-sm text-white/65">Todavía no creaste prótesis.</p>
        )}
        {visibles.map((p) => (
          <article key={p.id} className={`${tarjetaModal} flex flex-wrap items-center gap-4 p-4`}>
            <DogAvatar nombre={p.perro} fotoUrl={p.fotoUrl} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="text-base font-semibold text-white">
                {p.perro} · {p.nombre}
              </h3>
              <p className="text-sm text-white/55">{subtituloProtesis(p)}</p>
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

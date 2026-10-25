"use client";

import { useState } from "react";
import { ArrowLeft, Lock, PawPrint, Pencil, Ruler, ShieldCheck } from "lucide-react";
import type { ProtesisFormData } from "./types";
import { botonPrimario, botonSecundario, tarjeta } from "./form-ui";

interface Paso3Props {
  data: ProtesisFormData;
  onBack: () => void;
  onEditar: (paso: 1 | 2) => void;
  onConfirm: () => void | Promise<void>;
}

function Fila({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-white/55">{label}</span>
      <span className="truncate text-right font-medium text-white">{value || "—"}</span>
    </div>
  );
}

function Bloque({
  icono,
  titulo,
  onEditar,
  children,
}: {
  icono: React.ReactNode;
  titulo: string;
  onEditar: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="text-mint">{icono}</span>
          {titulo}
        </h3>
        <button
          type="button"
          onClick={onEditar}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-mint transition-colors hover:text-white"
        >
          <Pencil className="h-3 w-3" />
          Editar
        </button>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function cm(valor: string) {
  return valor ? `${valor} cm` : "";
}

export default function Paso3Confirmar({ data, onBack, onEditar, onConfirm }: Paso3Props) {
  const [enviando, setEnviando] = useState(false);
  const { dogInfo, limb } = data;

  const handleConfirm = async () => {
    setEnviando(true);
    try {
      await onConfirm();
    } finally {
      setEnviando(false);
    }
  };

  const miembro =
    limb.side && limb.position
      ? `${limb.position === "delantera" ? "Delantera" : "Trasera"} ${limb.side === "izquierda" ? "izquierda" : "derecha"}`
      : "";

  return (
    <div className={`${tarjeta} flex min-w-0 flex-1 flex-col items-center gap-6 p-6 text-center sm:p-8`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-mint/50 bg-mint/10 text-mint">
        <ShieldCheck className="h-7 w-7" />
      </span>

      <div className="flex max-w-md flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold text-white">¿Está todo bien?</h2>
        <p className="text-sm text-white/65">
          Revisá los datos antes de generar la prótesis. Si algo no coincide, podés volver y editarlo sin perder
          nada.
        </p>
      </div>

      <div className="grid w-full gap-4 text-left md:grid-cols-2">
        <Bloque icono={<PawPrint className="h-4 w-4" />} titulo="Tu perro" onEditar={() => onEditar(1)}>
          <Fila label="Nombre" value={dogInfo.dogName} />
          <Fila label="Raza" value={dogInfo.breed} />
          <Fila label="Edad" value={dogInfo.age ? `${dogInfo.age} años` : ""} />
          <Fila label="Peso" value={dogInfo.weightKg ? `${dogInfo.weightKg} kg` : ""} />
          <Fila label="Sexo" value={dogInfo.sex ? (dogInfo.sex === "macho" ? "Macho" : "Hembra") : ""} />
        </Bloque>

        <Bloque icono={<Ruler className="h-4 w-4" />} titulo="Miembro y medidas" onEditar={() => onEditar(2)}>
          <Fila label="Miembro" value={miembro} />
          <Fila label="Longitud" value={cm(limb.stumpLengthCm)} />
          <Fila label="Circ. distal" value={cm(limb.distalCircumferenceCm)} />
          <Fila label="Circ. proximal" value={cm(limb.proximalCircumferenceCm)} />
        </Bloque>
      </div>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={onBack} disabled={enviando} className={botonSecundario}>
          <ArrowLeft className="h-4 w-4" />
          Volver y editar
        </button>
        <button type="button" onClick={handleConfirm} disabled={enviando} className={botonPrimario}>
          {enviando ? "Generando..." : "Sí, generar prótesis"}
        </button>
      </div>

      <p className="flex items-center gap-2 text-xs text-white/55">
        <Lock className="h-3.5 w-3.5" />
        Tu información está segura y protegida.
      </p>
    </div>
  );
}

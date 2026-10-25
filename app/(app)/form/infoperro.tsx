"use client";

import { Calendar, ImageIcon, PawPrint, Ruler, Tag, Weight } from "lucide-react";
import type { ProtesisFormData } from "./types";
import { tarjeta } from "./form-ui";

interface InfoPerroPreviewProps {
  data: ProtesisFormData;
  step: 1 | 2 | 3;
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-2.5 text-white/60">
        <span className="text-mint">{icon}</span>
        {label}
      </span>
      <span className="truncate text-right font-medium text-white">{value || "—"}</span>
    </div>
  );
}

export default function InfoPerroPreview({ data, step }: InfoPerroPreviewProps) {
  const { dogInfo, limb } = data;

  const miembro =
    limb.side && limb.position
      ? `${limb.position === "delantera" ? "Delantera" : "Trasera"} ${limb.side === "izquierda" ? "izq." : "der."}`
      : "";

  const medidasCargadas = [limb.stumpLengthCm, limb.distalCircumferenceCm, limb.proximalCircumferenceCm].filter(
    Boolean
  ).length;
  const medidas = medidasCargadas === 0 ? "" : medidasCargadas === 3 ? "Completas" : "Completando...";

  const listo = step === 3;

  return (
    <aside className={`${tarjeta} flex h-fit w-full shrink-0 flex-col gap-5 p-6 lg:w-[310px]`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-white">Resumen del caso</h3>
        <span className="rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
          {listo ? "Listo" : "En creación"}
        </span>
      </div>

      <div className="flex h-[140px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-mint/40">
        {dogInfo.photoPreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- vista previa local (blob:)
          <img src={dogInfo.photoPreviewUrl} alt={dogInfo.dogName || "Perro"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-center text-xs text-white/50">
            <PawPrint className="h-6 w-6 text-mint/70" />
            {dogInfo.photoFile ? "" : step === 1 ? "La foto aparece acá" : "Sin foto (opcional)"}
          </div>
        )}
      </div>

      <p className={`font-display text-xl font-semibold ${dogInfo.dogName ? "text-white" : "text-white/45"}`}>
        {dogInfo.dogName || "Aún sin nombre"}
      </p>

      <div className="flex flex-col gap-3">
        <Row icon={<Tag className="h-4 w-4" />} label="Raza" value={dogInfo.breed} />
        <Row icon={<Calendar className="h-4 w-4" />} label="Edad" value={dogInfo.age ? `${dogInfo.age} años` : ""} />
        <Row icon={<Weight className="h-4 w-4" />} label="Peso" value={dogInfo.weightKg ? `${dogInfo.weightKg} kg` : ""} />
        <Row icon={<PawPrint className="h-4 w-4" />} label="Miembro" value={miembro} />
        <Row icon={<Ruler className="h-4 w-4" />} label="Medidas" value={medidas} />
        <Row icon={<ImageIcon className="h-4 w-4" />} label="Fotos" value={dogInfo.photoFile ? "1 foto" : ""} />
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Progreso</span>
          <span className="font-medium text-mint">Paso {step} de 3</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>
    </aside>
  );
}

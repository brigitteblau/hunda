"use client";

import { ImageIcon } from "lucide-react";
import type { ProtesisFormData } from "./types";

interface InfoPerroPreviewProps {
  data: ProtesisFormData;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value || "—"}</span>
    </div>
  );
}

export default function InfoPerroPreview({ data }: InfoPerroPreviewProps) {
  const { dogInfo, limb } = data;

  const miembroAfectado =
    limb.side && limb.position
      ? `${limb.position === "delantera" ? "Delantera" : "Trasera"} ${
          limb.side === "izquierda" ? "izquierda" : "derecha"
        }`
      : "";

  const medidas =
    limb.stumpLengthCm || limb.distalCircumferenceCm || limb.proximalCircumferenceCm
      ? `${limb.stumpLengthCm || "—"} / ${limb.distalCircumferenceCm || "—"} / ${
          limb.proximalCircumferenceCm || "—"
        } cm`
      : "";

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white border border-gray-200 rounded-2xl p-6 h-fit">
      <h3 className="text-gray-900 font-semibold mb-4">Información del perro</h3>

      <div className="w-full aspect-square rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden mb-4">
        {dogInfo.photoPreviewUrl ? (
          <img
            src={dogInfo.photoPreviewUrl}
            alt={dogInfo.dogName || "Perro"}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="text-gray-300" size={32} />
        )}
      </div>

      <p className="text-gray-900 font-medium text-sm mb-1">{dogInfo.dogName || "Aún sin nombre"}</p>
      <span className="inline-block text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-2 py-0.5 mb-4">
        En creación
      </span>

      <div>
        <Row label="Raza" value={dogInfo.breed} />
        <Row label="Edad" value={dogInfo.age ? `${dogInfo.age} años` : ""} />
        <Row label="Peso" value={dogInfo.weightKg ? `${dogInfo.weightKg} kg` : ""} />
        <Row label="Miembro afectado" value={miembroAfectado} />
        <Row label="Medidas" value={medidas} />
        <Row label="Fotos" value={dogInfo.photoFile ? "1 foto" : ""} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
        <span className="text-gray-500">Estado</span>
        <span className="text-gray-900 font-medium">En creación</span>
      </div>
    </aside>
  );
}
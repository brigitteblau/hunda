"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { ProtesisFormData } from "./types";

interface Paso3Props {
  data: ProtesisFormData;
  onBack: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function Paso3Confirmar({ data, onBack, onConfirm }: Paso3Props) {
  const [enviando, setEnviando] = useState(false);
  const { dogInfo } = data;

  const handleConfirm = async () => {
    setEnviando(true);
    try {
      await onConfirm();
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-6 text-center">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Confirmá tu información</h2>
        <p className="mt-1 text-sm text-gray-500">
          Revisá los datos ingresados antes de continuar. Si algo no es
          correcto, podés volver atrás y modificarlo.
        </p>
      </div>

      {dogInfo.photoPreviewUrl ? (
        <img
          src={dogInfo.photoPreviewUrl}
          alt={dogInfo.dogName || "Perro"}
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-200"
        />
      ) : (
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100">
          <Check className="w-9 h-9 text-emerald-500" strokeWidth={2.5} />
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-gray-900">
          ¿Estás seguro de que la información que pusiste es correcta?
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          Esta información se usará para generar tu prótesis personalizada.
        </p>
      </div>

      <div className="flex gap-3 w-full max-w-sm pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={enviando}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Volver atrás
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={enviando}
          className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition disabled:opacity-50"
        >
          {enviando ? "Confirmando..." : "Confirmar pedido"}
        </button>
      </div>

      <p className="text-[11px] text-gray-400 pt-2">
        Tu información está segura y protegida.
      </p>
    </div>
  );
}

"use client";

import { ArrowLeft, ArrowRight, Wrench, Pencil } from "lucide-react";
import type { LimbData } from "./types";

interface Paso2MiembroAfectadoProps {
  data: LimbData;
  onChange: (data: LimbData) => void;
  onContinue: () => void;
  onBack: () => void;
}

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors";

function OptionButton({
  selected,
  onClick,
  icon,
  label,
  reverse = false,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  reverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium transition-colors ${
        reverse ? "flex-row-reverse" : ""
      } ${
        selected
          ? "border-gray-800 bg-gray-100 text-gray-900"
          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Paso2MiembroAfectado({ data, onChange, onContinue, onBack }: Paso2MiembroAfectadoProps) {
  function update<K extends keyof LimbData>(key: K, value: LimbData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onContinue();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white border border-gray-200 rounded-2xl p-8"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-1">Miembro afectado</h2>
      <p className="text-gray-500 text-sm mb-6">
        Completá los datos técnicos para la generación de la prótesis
      </p>

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Lado</label>
          <div className="grid grid-cols-2 gap-3">
            <OptionButton
              selected={data.side === "izquierda"}
              onClick={() => update("side", "izquierda")}
              icon={<ArrowLeft size={16} />}
              label="Izquierda"
            />
            <OptionButton
              selected={data.side === "derecha"}
              onClick={() => update("side", "derecha")}
              icon={<ArrowRight size={16} />}
              label="Derecha"
              reverse
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Tipo</label>
          <div className="grid grid-cols-2 gap-3">
            <OptionButton
              selected={data.position === "delantera"}
              onClick={() => update("position", "delantera")}
              icon={<Wrench size={16} />}
              label="Delantera"
            />
            <OptionButton
              selected={data.position === "trasera"}
              onClick={() => update("position", "trasera")}
              icon={<Wrench size={16} />}
              label="Trasera"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Pencil size={14} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Medidas del muñón</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">Ingresá los valores en centímetros (cm)</p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Longitud</label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              placeholder="Escribí acá..."
              value={data.stumpLengthCm}
              onChange={(e) => update("stumpLengthCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-gray-400 mt-1">Largo total del muñón.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Circunferencia distal</label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              placeholder="Escribí acá..."
              value={data.distalCircumferenceCm}
              onChange={(e) => update("distalCircumferenceCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-gray-400 mt-1">Parte inferior del muñón.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Circunferencia proximal</label>
            <input
              type="number"
              min={0}
              step="0.1"
              className={inputClass}
              placeholder="Escribí acá..."
              value={data.proximalCircumferenceCm}
              onChange={(e) => update("proximalCircumferenceCm", e.target.value)}
              required
            />
            <p className="text-[11px] text-gray-400 mt-1">Parte superior del muñón.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-semibold rounded-xl px-6 py-3 text-sm"
        >
          <ArrowLeft size={16} />
          Atrás
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 transition-colors text-white font-semibold rounded-xl px-6 py-3 text-sm"
        >
          Continuar
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}